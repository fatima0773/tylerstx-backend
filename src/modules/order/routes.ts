// Express Imports
import express from 'express';

// Controller Imports
import { addShippingDetails, getShippingDetails, processOrder } from './controller';

// eslint-disable-next-line new-cap
const orderRouter = express.Router();

// User Routes
orderRouter.get('/shipping/:userId', getShippingDetails);
orderRouter.post('/add-shipping-details', addShippingDetails);
orderRouter.post('/process-order/', processOrder);

export default orderRouter;

// END OF FILE