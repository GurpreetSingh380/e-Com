import productModel from '../models/productModel.js'
import fs from 'fs'
import slugify from 'slugify'

export const createProductController = async (req, res) => {
    try{
        const {name, slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        // Validation:
        switch (true){
            case !name:
                return res.status(500).send({error: 'Name Required!'});
            case !description:
                return res.status(500).send({error: 'Description Required!'});
            case !price:
                return res.status(500).send({error: 'Price Required!'});
            case !category:
                return res.status(500).send({error: 'Category Required!'});
            case !quantity:
                    return res.status(500).send({error: 'Quantity Required!'});
            case photo && photo.size > 1000000:
                return res.status(500).send({error: 'Phone Required ans should be less than 1Mb!'}); 
        }
        const product = await productModel({...req.fields, slug: slugify(name)});
        if (photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        return res.status(201).send({
            success: true,
            message: 'Product created Successfully',
            product
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error in creating Product'
        });
    }
}

export const getProductController = async(req ,res) => {
    try{
        const products = await productModel.find({}).select('-photo').populate('category').limit(12).sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            message: 'All products',
            products,
            count: products.length
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error: error.message
        })
    }
}

export const getSingleProductController = async(req, res) => {
    try{
        const product = await productModel.findOne({slug: req.params.slug}).select('-photo').populate('category');
        return res.status(200).send({
            success: true,
            message: 'Single Product Fetched',
            product
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while getting single product',
            error
        })
    }
}

export const productPhotoController = async(req, res) => {
    try{
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data){
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error
        })
    }
}

export const deleteProductController = async(req, res) => {
    try{
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        return res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error
        });
    }
}

export const updateProductController = async(req, res) => {
    try{
        const {name, slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        // Validation:
        switch (true){
            case !name:
                return res.status(500).send({error: 'Name Required!'});
            case !description:
                return res.status(500).send({error: 'Description Required!'});
            case !price:
                return res.status(500).send({error: 'Price Required!'});
            case !category:
                return res.status(500).send({error: 'Category Required!'});
            case !quantity:
                    return res.status(500).send({error: 'Quantity Required!'});
            case photo && photo.size > 1000000:
                return res.status(500).send({error: 'Phone Required ans should be less than 1Mb!'}); 
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug: slugify(name)}, {new: true});
        if (photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        return res.status(201).send({
            success: true,
            message: 'Product Updated Successfully',
            product
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error in Updating Product'
        });
    }
}