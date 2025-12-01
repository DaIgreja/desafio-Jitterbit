const Order = require('../models/order');

module.exports = {
    async create(req, res) {
        try {
            const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

            // Transform the data
            const transformedItems = items.map(item => ({
                productId: parseInt(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }));

            const orderData = {
                orderId: numeroPedido,
                value: valorTotal,
                creationDate: new Date(dataCriacao),
                items: transformedItems
            };

            const order = await Order.create(orderData);
            return res.status(201).json(order);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async list(req, res) {
        const orders = await Order.find();
        return res.json(orders);
    },

    async getByNumeroPedido(req, res) {
        try {
            const order = await Order.findOne({ orderId: req.params.numeroPedido });
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            return res.json(order);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const order = await Order.findOneAndUpdate(
                { orderId: req.params.numeroPedido },
                req.body,
                { new: true }
            );
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            return res.json(order);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const order = await Order.findOneAndDelete({ orderId: req.params.numeroPedido });
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            return res.json({ message: "Deleted successfully" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
};
