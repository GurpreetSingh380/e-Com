import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    photo: {
        data: {type: Buffer, default: Buffer.alloc(0)},
        contentType: {type: String, default: null}
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

export default mongoose.model('users', userSchema);