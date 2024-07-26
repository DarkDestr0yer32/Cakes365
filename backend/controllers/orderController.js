// import Order from '../models/orderModel.js';
// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '../config/config.js';

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });


// export const verifyPayment = async (req, res) => {
//     const { orderId, paymentId, signature } = req.body;

//     try {
//         const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//             .update(`${orderId}|${paymentId}`)
//             .digest('hex');

//         if (generatedSignature === signature) {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: 'Payment verified successfully' });
//         } else {
//             res.json({ success: false, message: 'Invalid signature' });
//         }
//     } catch (error) {
//         console.error('Error verifying payment:', error);
//         res.json({ success: false, message: 'Error verifying payment' });
//     }
// }

// export const placeOrder = async (req, res) => {
//     const { address, items, amount } = req.body;
//     const userId = req.body.userId;

//     try {
//         const order = await razorpay.orders.create({
//             amount: amount * 100, // Amount in paise
//             currency: 'INR',
//             receipt: crypto.randomBytes(16).toString('hex')
//         });

//         // Ensure that userId is correctly included in the order creation
//         const newOrder = new orderModel({
//             userId,
//             items,
//             amount,
//             address,
//             payment: false
//         });

//         await newOrder.save();

//         res.json({
//             success: true,
//             orderId: order.id,
//             amount: amount * 100,
//             currency: 'INR'
//         });
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.json({ success: false, message: 'Error placing order' });
//     }
// }
