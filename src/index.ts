// Express Imports
import express, { Express } from 'express';

// Dotenv Imports
import dotenv from 'dotenv';

// Routes Imports
import userRoutes from './modules/auth/routes';

// DB Import
import connectDB from './config/db';

// Cors Import
import cors from 'cors';

// Redis Imports
import connectRedis from './config/redis';

// Winston Logger Imports
import { logger } from './config/winstonLog';
import productRoutes from './modules/product/routes';
import cartRoutes from './modules/cart/routes';
import paymentRoutes from './modules/payment/routes';
import orderRouter from './modules/order/routes';

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT;

// Database Connection
connectDB();

// Redis Connection
connectRedis();

// Create express application instance
const app: Express = express();
const port = PORT || 3000;

// Configure App
// app.use((_req, res, next) => {
//   console.log('CORS middleware executed');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the dedicated routes middleware
app.use('/user/', userRoutes);
app.use('/product/', productRoutes);
app.use('/cart/', cartRoutes);
app.use('/checkout/', paymentRoutes);
app.use('/order/', orderRouter);
// Start the server and listen on the specified port

app.listen(port, () => {
  logger.info(`Server running at https://localhost:${port}`);
});

// END OF FILE