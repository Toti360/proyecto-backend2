import express from 'express';
import CartController from '../controllers/cart.controller.js';
import ViewController from '../controllers/view.controller.js';

const router = express.Router();

router.get('/', ViewController.renderHome);
router.get('/products', ViewController.renderProducts);
router.get('/product/:id', ViewController.renderProductDetail);
router.get('/cart/:id', ViewController.renderCart);

// Ruta para ver el carrito
router.get('/carrito/:cartId', CartController.viewCarrito);

export default router;
