import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import UserService from "../services/user.service.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import config from "./config.js";

const initializePassport = () => {
    // Estrategia de registro
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;

        try {
            let user = await UserService.getUserByEmail(email);
            if (user) return done(null, false, { message: "El usuario ya existe" });

            const newUser = await UserService.registerUser({
                first_name,
                last_name,
                email,
                password,
                age,
                role
            });

            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
    }));

    // Estrategia de login
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            const user = await UserService.loginUser(email, password);
            if (!user) return done(null, false, { message: "Usuario o contraseña incorrecta." });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    // Serialización del usuario (guardar solo el _id en la sesión)
    passport.serializeUser((user, done) => {
        done(null, user._id.toString()); // Se serializa el ID del usuario
    });

    // Deserialización del usuario (recuperar el usuario completo a partir del _id)
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserService.getUserById(id);
            if (!user) {
                return done(null, false);
            }
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

export default initializePassport;
