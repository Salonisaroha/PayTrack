import express from 'express';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import SubscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middlewares.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', SubscriptionRouter);

app.use(errorMiddleware);
app.get('/', (req, res)=>{
    res.send('Welcome to the Subscription Tracker API!');
});

app.listen(PORT, async()=>{
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
});

export default app;