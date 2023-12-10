import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema({
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
    rating: { 
        type: Number,
        required: true
    }
}, {timestamps: true});

export default mongoose.model('Ratings', ratingSchema);
