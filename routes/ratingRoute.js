import express from 'express'
import { requireSignIn } from '../middlewares/authMiddleware.js'
import { createRatingController, getRatingController, ratedController } from '../controllers/ratingController.js';

const router = express.Router();

router.post('/create-rating', createRatingController);
router.get('/get-rating/:p_id', getRatingController);
router.post('/get-ratings', ratedController);


export default router;