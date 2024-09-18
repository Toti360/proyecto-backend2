import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/config.js"; 
import UserService from "../services/user.service.js";

const router = Router();

// Registro
router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password, age, role } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await UserService.getUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        // Verificar que la contraseña no sea nula o vacía
        if (!password) {
            return res.status(400).json({ error: "La contraseña es requerida" });
        }

        // Registrar al usuario
        const newUser = await UserService.registerUser({ first_name, last_name, email, password, age, role });

        // Generar el token JWT para autenticar al usuario recién registrado
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, config.jwtSecret, { expiresIn: "1h" });

        // Guardar el token en una cookie
        res.cookie("coderCookieToken", token, { maxAge: 3600000, httpOnly: true });

        // Responder con éxito
        return res.status(200).json({ message: "Registro exitoso", user: newUser });
    } catch (error) {
        return res.status(500).json({ error: `Error interno del servidor: ${error.message}` });
    }
});


// Login
router.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({ message: "Usuario o contraseña incorrecta." });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);

            // Verificar si el usuario tiene un ID válido
            if (!user._id) {
                return res.status(500).json({ message: "Error interno: el usuario no tiene un ID válido." });
            }

            // Generar el token JWT
            const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: "1h" });

            // Guardar el token en una cookie
            res.cookie("coderCookieToken", token, { maxAge: 3600000, httpOnly: true });

            // Responder con éxito
            return res.status(200).json({ message: "Login exitoso", token });
        });
    })(req, res, next);
});


// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
});

export default router;
