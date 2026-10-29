const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Checkout API Endpoint
app.post('/api/checkout', (req, res) => {
    const { items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Cart items are required.' });
    }

    // Calculate bill on server
    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    console.log('--- New Order Received ---');
    console.log('Items:', items);
    console.log('Total Amount:', `$${totalAmount}`);

    return res.json({
        success: true,
        message: 'Order placed successfully!',
        orderId: 'RED-' + Math.floor(100000 + Math.random() * 900000),
        totalAmount: totalAmount.toFixed(2)
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});