import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
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
    comment: { 
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model('Comments', commentSchema);
