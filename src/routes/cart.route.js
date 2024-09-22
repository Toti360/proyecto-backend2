import express from 'express';
import CartController from '../controllers/cart.controller.js';
import ProductModel from '../models/product.model.js';
import UserModel from '../models/user.model.js';
import TicketModel from '../models/ticket.model.js';

const router = express.Router();

router.post('/', CartController.crearCarrito);
router.get('/:cartId', CartController.getCarritoById);
router.post('/:cartId/producto/:productId', CartController.agregarProductoAlCarrito);
router.delete('/:cartId/producto/:productId', CartController.eliminarProductoDelCarrito);
router.delete('/:cartId', CartController.eliminarTodosLosProductos);

router.get('/:cartId/view', CartController.viewCarrito);

//Para la Compra
router.get("/:cid/purchase", CartController.purchaseCart);

export default router;
