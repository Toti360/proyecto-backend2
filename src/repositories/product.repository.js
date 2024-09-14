import ProductDAO from "../daos/product.dao.js";
import ProductDTO from "../dtos/product.dto.js";

class ProductRepository {
    async addProduct(productData) {
        const product = await ProductDAO.create(productData);
        return new ProductDTO(product);
    }

    async getProducts(filter = {}, options = {}) {
        const result = await ProductDAO.getAll(filter, options);
        result.docs = result.docs.map(doc => new ProductDTO(doc));
        return result;
    }

    async getProductById(id) {
        const product = await ProductDAO.getById(id);
        return product ? new ProductDTO(product) : null;
    }

    async updateProduct(id, updatedFields) {
        const product = await ProductDAO.update(id, updatedFields);
        return product ? new ProductDTO(product) : null;
    }

    async deleteProduct(id) {
        const product = await ProductDAO.delete(id);
        return product ? new ProductDTO(product) : null;
    }
}

export default new ProductRepository();
