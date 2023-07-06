import express from 'express';
import {loginUser, registerController, testController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// Router object:
const router = express.Router();

// Routing:
// Register (method POST)
router.post('/register', registerController);
router.post('/login', loginUser);
router.get('/test', requireSignIn, isAdmin, testController);
router.get('/user-auth', requireSignIn, (req, res) => {
    return res.status(200).send({ok: true});
})
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    return res.status(200).send({ok: true});
})

export default router;