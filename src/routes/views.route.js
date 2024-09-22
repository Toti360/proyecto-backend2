import express from 'express';
import CartController from '../controllers/cart.controller.js';
import ViewController from '../controllers/view.controller.js';
//import ProductService from "../services/product.service.js";
//import CartService from "../services/CartService.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ProductController from '../controllers/product.controller.js';
import { Admin, User } from '../middlewares/auth.js';


const router = express.Router();

router.get('/', ViewController.renderHome);
router.get('/products', ViewController.renderProducts);
router.get('/product/:id', ViewController.renderProductDetail);
router.get('/carts/:id', ViewController.renderCart);

// Ruta para ver el carrito
router.get('/carrito/:cartId', CartController.viewCarrito);

const authenticateJWT = (req, res, next) => {
    const token = req.cookies["coderCookieToken"];
    if (!token) return res.redirect("/login");

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.redirect("/login");
        req.user = user;
        next();
    });
};

// Ruta de productos en tiempo real
router.get("/realtimeproducts", Admin,  (req, res) => {
    res.render("realtimeproducts");
});

// Ruta de productos
router.get("/home", User,  authenticateJWT, async (req, res) => {
    const { page = 1, limit = 10, sort = 'asc' } = req.query;
    try {
        const productos = await ProductService.getProducts({ page, limit, sort });
        res.render("home", { productos: productos.docs, ...productos, user: req.user });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

// Ver carrito por ID
router.get("/carts/:cid", authenticateJWT, async (req, res) => {
    try {
        const carrito = await CartService.getCarritoById(req.params.cid);
        res.render("carts", { productos: carrito.products, user: req.user });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
});

// Vista de login
router.get("/login", (req, res) => {
    const token = req.cookies["coderCookieToken"];
    if (token) return res.redirect("/productos");
    res.render("login");
});

// Vista de registro
router.get("/register", (req, res) => {
    const token = req.cookies["coderCookieToken"];
    if (token) return res.redirect("/productos");
    res.render("register");
});

// Vista de perfil
router.get("/profile", authenticateJWT, (req, res) => {
    res.render("profile", { user: req.user });
});


export default router;
