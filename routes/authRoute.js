import express from 'express';
import {loginUser, registerController, userPhotoController, userProfileController, getUserController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable'

// Router object:
const router = express.Router();

// Routing:
// Register (method POST)
router.post('/register', registerController);
router.post('/login', loginUser);
router.get('/user-auth', requireSignIn, (req, res) => {
    return res.status(200).send({ok: true});
})
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    return res.status(200).send({ok: true});
})
router.get('/get-userphoto/:id',  userPhotoController);
router.put('/store-profile-photo', requireSignIn, formidable(),  userProfileController);
router.get('/get-user/:id', getUserController);
export default router;