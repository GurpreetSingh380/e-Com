import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import {orderPlaceController, userOrderController,  allUserOrderController, updateStatusController} from '../controllers/orderController.js'


const router = express.Router();
router.post('/place-order', orderPlaceController); 
router.get('/user-order/:id',  userOrderController);
router.get('/all-orders',  allUserOrderController);
router.put('/update-status', updateStatusController);
export default router;