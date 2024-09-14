import ProductService from "../services/product.service.js";

class ProductController {
    async addProduct(req, res) {
        try {
            const product = await ProductService.addProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getProducts(req, res) {
        try {
            const { page = 1, limit = 10, ...filter } = req.query;
            const options = { page: parseInt(page), limit: parseInt(limit) };
            const products = await ProductService.getProducts(filter, options);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await ProductService.getProductById(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await ProductService.updateProduct(req.params.id, req.body);
            res.json(product);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            await ProductService.deleteProduct(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

export default new ProductController();
