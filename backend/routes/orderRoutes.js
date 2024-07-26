import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import orderModel from '../models/orderModel.js';
import authMiddleware from '../middleware/paymentauth.js';

const router = express.Router();
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/place', authMiddleware, async (req, res) => {

    const frontend_url = 'https://cakes365-frontend.onrender.com/';
    const { address, items, amount } = req.body;
    const userId = req.body.userId;

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: crypto.randomBytes(16).toString('hex')
        });

        // Ensure that userId is correctly included in the order creation
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            payment: false
        });

        await newOrder.save();

        res.json({
            success: true,
            orderId: order.id,
            amount: amount * 100,
            currency: 'INR'
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.json({ success: false, message: 'Error placing order' });
    }
});

router.post('/verify', authMiddleware, async (req, res) => {
    const { orderId, paymentId, signature } = req.body;

    try {
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        if (generatedSignature === signature) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.json({ success: false, message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.json({ success: false, message: 'Error verifying payment' });
    }
});

//use orders for frontend
router.post('/userorders', authMiddleware, async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Error" })
    }
});

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
router.get('/list', listOrders);


//api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
router.post('/status', updateStatus)

export default router;
