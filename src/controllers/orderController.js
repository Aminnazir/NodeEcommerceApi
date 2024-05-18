const supabase = require('../models/supabaseClient');

const placeOrder = async (req, res) => {
    const { userId, cartId } = req.body;

    // Retrieve cart contents
    const { data: cartItems, error: cartError } = await supabase
        .from('cart_items')
        .select('*, products(*)')
        .eq('cart_id', cartId);

    if (cartError) return res.status(400).send(cartError.message);

    // Calculate total cost
    const totalCost = cartItems.reduce((total, item) => total + item.quantity * item.products.price, 0);

    // Create order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{ user_id: userId, total_cost: totalCost }])
        .single();

    if (orderError) return res.status(400).send(orderError.message);

    // Insert order items
    const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity
    }));

    const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

    if (orderItemsError) return res.status(400).send(orderItemsError.message);

    // Clear cart
    const { error: clearCartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId);

    if (clearCartError) return res.status(400).send(clearCartError.message);

    res.send('Order placed successfully');
};

const getOrderDetails = async (req, res) => {
    const { orderId } = req.params;

    const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', orderId)
        .single();

    if (error) return res.status(400).send(error.message);

    res.json(data);
};

module.exports = { placeOrder, getOrderDetails };
