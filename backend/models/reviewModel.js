import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    cakeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cake',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
