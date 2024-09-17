import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const router = Router();

// Registro
router.post("/register", passport.authenticate("register", {
    successRedirect: "/productos",
    failureRedirect: "/register",
    failureFlash: true
}));

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
