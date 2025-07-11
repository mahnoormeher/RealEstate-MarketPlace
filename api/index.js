import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import uploadRouter from './routes/upload.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();


dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{

    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});




const app=express();

app.use(cors({
  origin: 'https://reale-state-website.netlify.app',
  credentials: true,
}));

app.use(express.json());

app.use(cookieParser());

app.listen(3000, ()=>{
console.log('Server is running on PORT 3000!!');
})
//console.log("Mongo URI is:", process.env.MONGO);




app.use('/api/user',userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing',listingRouter);
app.use('/api/upload', uploadRouter);

// Serve static files from React
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route for React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});




//middleware
app.use((err,req,res,next)=>{
const statusCode = err.statusCode || 500;
const message = err.message || 'Internal Server Error';
console.error(" Global error handler caught:", message); 
return res.status(statusCode).json({
    success : false,
    statusCode,
    message,
})
})