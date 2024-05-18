const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../models/supabaseClient');

const register = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password: hashedPassword }]);

    if (error) return res.status(400).send(error.message);

    res.send('User registered successfully');
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !user) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.header('Authorization', token).send(token);
};

module.exports = { register, login };
