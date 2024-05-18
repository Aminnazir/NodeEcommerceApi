const supabase = require('../models/supabaseClient');

const createProduct = async (req, res) => {
    const { name, description, price, category } = req.body;

    const { data, error } = await supabase
        .from('products')
        .insert([{ name, description, price, category }]);

    if (error) return res.status(400).send(error.message);

    res.send('Product created successfully');
};

const getProducts = async (req, res) => {
    const { category } = req.query;
    const query = supabase.from('products').select('*');

    if (category) {
        query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) return res.status(400).send(error.message);

    res.json(data);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id);

    if (error) return res.status(400).send(error.message);

    res.send('Product updated successfully');
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) return res.status(400).send(error.message);

    res.send('Product deleted successfully');
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
