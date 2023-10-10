// Express Imports
import express from 'express';
import { paymentIntent } from './controller';

// eslint-disable-next-line new-cap
const paymentRoutes = express.Router();

paymentRoutes.post('/process-payment', paymentIntent);

export default paymentRoutes;

// END OF FILE