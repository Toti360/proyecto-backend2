import CartService from "../services/cart.service.js";


const crearCarrito = async (req, res) => {
    try {
        const carrito = await CartService.crearCarrito();
        res.status(201).json(carrito);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
};

const getCarritoById = async (req, res) => {
    try {
        const carrito = await CartService.getCarritoById(req.params.cartId);
        if (!carrito) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).json(carrito);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener el carrito' });
    }
};

const agregarProductoAlCarrito = async (req, res) => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    try {
        const carrito = await CartService.agregarProductoAlCarrito(cartId, productId, quantity);
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
};

const eliminarProductoDelCarrito = async (req, res) => {
    const { cartId, productId } = req.params;
    try {
        const carrito = await CartService.eliminarProductoDelCarrito(cartId, productId);
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    }
};

const eliminarTodosLosProductos = async (req, res) => {
    const { cartId } = req.params;
    try {
        const carrito = await CartService.eliminarTodosLosProductos(cartId);
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar todos los productos del carrito' });
    }
};

const viewCarrito = async (req, res) => {
    try {
        const carrito = await CartService.getCarritoById(req.params.cartId);
        res.render('cart', { 
            products: carrito.products,
            cartId: carrito.id
        });
    } catch (error) {
        console.error('Error al obtener la vista del carrito:', error);
        res.status(500).render('error', { message: 'Error al cargar el carrito' });
    }
};

export default {
    crearCarrito,
    getCarritoById,
    agregarProductoAlCarrito,
    eliminarProductoDelCarrito,
    eliminarTodosLosProductos,
    viewCarrito
};
