import ProductRepository from "../repositories/product.repository.js";

class ProductService {
    async addProduct(productData) {
        if (!productData.title || !productData.description || !productData.price || 
            !productData.code || !productData.stock || !productData.category) {
            throw new Error("Todos los campos son obligatorios");
        }

        const existingProduct = await this.getProductByCode(productData.code);
        if (existingProduct) {
            throw new Error("El código debe ser único");
        }

        return await ProductRepository.addProduct({
            ...productData,
            status: true,
            thumbnails: productData.thumbnails || []
        });
    }

    async getProducts(filter = {}, options = {}) {
        return await ProductRepository.getProducts(filter, options);
    }

    async getProductById(id) {
        const product = await ProductRepository.getProductById(id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

    async updateProduct(id, updatedFields) {
        const product = await ProductRepository.updateProduct(id, updatedFields);
        if (!product) {
            throw new Error("No se encuentra el producto a actualizar");
        }
        return product;
    }

    async deleteProduct(id) {
        const product = await ProductRepository.deleteProduct(id);
        if (!product) {
            throw new Error("No se encuentra el producto que se debe borrar");
        }
        return product;
    }

    async getProductByCode(code) {
        const products = await this.getProducts({ code: code }, { limit: 1 });
        return products.docs[0] || null;
    }
}

export default new ProductService();
