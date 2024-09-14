import express from 'express';
import ProductController from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', ProductController.addProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;
