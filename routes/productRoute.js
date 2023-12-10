import express from 'express'
import { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, filteredProductController } from '../controllers/productController.js'
import {requireSignIn, isAdmin} from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'


const router = express.Router();

// Routes:
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);
// Get Products:
router.get('/get-product', getProductController);
// Get Single Product: 
router.get('/get-product/:slug', getSingleProductController)
export default router;
// Get photo:
router.get('/product-photo/:pid', productPhotoController);
// Delete product:
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);
// Update Product:
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);
// Filtered Products:
router.get('/get-filtered-products', filteredProductController);


