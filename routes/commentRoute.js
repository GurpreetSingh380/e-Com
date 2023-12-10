import express from "express";
import { requireSignIn } from '../middlewares/authMiddleware.js';
import {createCommentController, getCommentController, deleteCommentController,updateCommentController} from '../controllers/commentController.js'

const router = express.Router();

router.get('/get-comments/:p_id', getCommentController);
router.post('/create-comment', createCommentController);
router.put('/update-comment', updateCommentController);
router.delete('/delete-comment/:comment_id', deleteCommentController);

export default router;
