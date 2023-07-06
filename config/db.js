import mongoose from 'mongoose'

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected ${conn.connection.host}`);
    }
    catch(err){
        console.log(`Cannot connect to your database! ${err}`);
    }
}

export default connectDB;