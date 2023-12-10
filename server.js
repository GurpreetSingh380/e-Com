import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import orderRoutes from './routes/orderRoute.js'
import commentRoutes from './routes/commentRoute.js'
import ratingRoutes from './routes/ratingRoute.js'

// Configuring .env file
dotenv.config();

// Connecting Database
connectDB();

// Rest object
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes:
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/ratings', ratingRoutes);

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to e-Commerce app"
    })
});

const PORT = process.env.PORT;

// Run/Listen
app.listen(PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT} in ${process.env.DEV_MODE}`);
})
