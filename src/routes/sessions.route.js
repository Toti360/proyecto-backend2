import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/config.js"; 
import UserService from "../services/UserService.js";

const router = Router();

// Registro
router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password, age, role } = req.body;
        const userExists = await UserService.getUserByEmail(email);
        
        if (userExists) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }
        
        const newUser = await UserService.registerUser({ first_name, last_name, email, password, age, role });
        const token = jwt.sign({ email: newUser.email, role: newUser.role }, config.jwtSecret, { expiresIn: "1h" });
        
        res.cookie("coderCookieToken", token, { maxAge: 3600000, httpOnly: true });
        res.redirect("/productos");
    } catch (error) {
        res.status(500).json({ error: `Error interno del servidor: ${error.message}` });
    }
});

// Login
router.post("/login", passport.authenticate("login", {
    successRedirect: "/productos",
    failureRedirect: "/login",
    failureFlash: true
}));

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
});

export default router;
