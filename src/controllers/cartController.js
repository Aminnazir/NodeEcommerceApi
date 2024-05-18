const supabase = require('../models/supabaseClient');

const createCart = async (req, res) => {
    const { userId } = req.body;

    const { data, error } = await supabase
        .from('carts')
        .insert([{ user_id: userId }]);

    if (error) return res.status(400).send(error.message);

    res.send('Cart created successfully');
};

const addToCart = async (req, res) => {
    const { cartId, productId, quantity } = req.body;

    const { data, error } = await supabase
        .from('cart_items')
        .insert([{ cart_id: cartId, product_id: productId, quantity }]);

    if (error) return res.status(400).send(error.message);

    res.send('Product added to cart');
};

const removeFromCart = async (req, res) => {
    const { cartId, productId } = req.body;

    const { data, error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId)
        .eq('product_id', productId);

    if (error) return res.status(400).send(error.message);

    res.send('Product removed from cart');
};

const getCartContents = async (req, res) => {
    const { cartId } = req.params;

    const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cartId);

    if (error) return res.status(400).send(error.message);

    res.json(data);
};

module.exports = { createCart, addToCart, removeFromCart, getCartContents };
