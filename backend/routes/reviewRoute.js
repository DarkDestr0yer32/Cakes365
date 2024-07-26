import express from 'express';
import { protect } from '../middleware/reviewauth.js';
import { addReview, getAllReviews, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/allreviews/:id', getAllReviews);
router.post('/add/:id', protect, addReview);
router.delete('/delete/:id', protect, deleteReview);

export default router;
