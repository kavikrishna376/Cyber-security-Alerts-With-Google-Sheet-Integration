const { addRow, getRows } = require('../googleSheets');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const rows = await getRows('users');
        const exists = rows.find(r => r.email === email);
        if (exists) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = rows.length + 1;
        await addRow('users', { id, name, email, password: hashedPassword });

        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id, name, email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const rows = await getRows('users');
        const user = rows.find(r => r.email === email);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
