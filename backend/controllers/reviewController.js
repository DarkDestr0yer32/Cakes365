import Review from '../models/reviewModel.js';

export const getAllReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const reviews = await Review.find({ cakeId: id }).populate('userId', 'name');
        res.json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { body, rating } = req.body;
        const userId = req.user._id;
        const newReview = new Review({ cakeId: id, userId, body, rating });
        await newReview.save();
        res.json({ success: true, review: newReview });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);

        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        await review.remove();
        res.json({ success: true, message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};