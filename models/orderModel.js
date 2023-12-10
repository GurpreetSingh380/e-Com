import mongoose from 'mongoose'
const myEnum = ['Order Placed', 'Shipping', 'Out For Delivery', 'Delivered', 'Cancelled'];

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    status: { 
        type: String,
        enum: myEnum,
        required: true
    },
    qty: {
        type: Number,
        default: 1
    }
}, {timestamps: true});

export default mongoose.model('Orders', orderSchema);
