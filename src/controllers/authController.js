const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

module.exports = {
    async register(req, res) {
        try {
            const { username, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = await User.create({ username, password: hashedPassword });

            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Find user
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Generate token
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

            res.json({ token });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};
