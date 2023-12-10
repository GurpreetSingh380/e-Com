import orderModel from '../models/orderModel.js'
import productModel from '../models/productModel.js'

// Place Order: 
async function processItems(orders, res) {
    const cantFulfill = [];
    for(const element of orders){
        const product = await productModel.findOne({_id: element.p_id});
        if (product.quantity<element.qty) cantFulfill.push({p_id: element.p_id, qty: product.quantity});
    }
    if (cantFulfill.length>0){
        return res.status(200).send({
            success: false,
            message: 'Not Enough Stock!',
            cantFulfill
        });
    }
    for (const element of orders) {
        await new orderModel({user: element.u_id, product: element.p_id, status: 'Order Placed', qty: (element.qty ? element.qty : 1)}).save();
        const q = -1*element.qty;
        await productModel.updateOne(
            { "_id": element.p_id }, // Specify the query to identify the document you want to update
            { $inc: { "quantity": q } } // Use $inc to increment the "count" field by 1
        );
    }
    return res.status(200).send({
        success: true,
        message: 'Order Placed'
    })
}
export const orderPlaceController = async(req, res) => {
    try{
        const {orders} = req.body;
        console.log(orders);
        orders.forEach(element => {
            if (element.u_id==='' || element.p_id===''){
                return res.status(200).send({
                    success: false,
                    message: 'Check Inputs'
                });
            }
        });
        processItems(orders, res);
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
}

export const userOrderController = async(req, res) => {
    try{
        const {id} = req.params;
        const current = await orderModel.find({$and : [{user: id}, {status: {$in : ['Order Placed', 'Shipping', 'Out For Delivery']}}]}).populate({path: 'product', select: '-photo'});
        const cancelled = await orderModel.find({$and : [{user: id}, {status: 'Cancelled'}]}).populate({path: 'product', select: '-photo'});
        const delivered = await orderModel.find({$and : [{user: id}, {status: 'Delivered'}]}).populate({path: 'product', select: '-photo'});
        const allOrders = {current, cancelled, delivered};
        return res.status(200).send({
            success: true,
            message: "Your Orders",
            allOrders
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'        
        });
    }
}

export const allUserOrderController = async(req, res) => {
    try{
        const current = await orderModel.find({status: {$in : ['Order Placed', 'Shipping', 'Out For Delivery']}}).populate({path: 'product', select: '_id name price slug'}).populate({path: 'user', select: 'name address'});
        const cancelled = await orderModel.find({status: 'Cancelled'}).populate({path: 'product', select: '_id name price slug'}).populate({path: 'user', select: 'name address'});
        const delivered = await orderModel.find({status: 'Delivered'}).populate({path: 'product', select: '_id name price slug'}).populate({path: 'user', select: 'name address'});
        const allUsers = {current, cancelled, delivered};
        return res.status(200).send({
            success: true,
            message: "Your Users",
            allUsers
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'        
        });
    }
}

export const updateStatusController = async(req, res) => {
    try{
        const {status, id} = req.body;
        const order = await orderModel.findByIdAndUpdate(id, {status}, {new: true});
        return res.status(200).send({
            success: true,
            message: "Status Updated",
            order
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'        
        });
    }
}
