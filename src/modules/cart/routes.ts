// Express Imports
import express from 'express';
import { addToCart, emptyCart, getCart, removeItemFromCart, updateCart } from './controller';

// eslint-disable-next-line new-cap
const cartRoutes = express.Router();

cartRoutes.get('/get-cart/:userId', getCart);
cartRoutes.post('/add', addToCart);
cartRoutes.delete('/remove-item/:userId/:productId', removeItemFromCart);
cartRoutes.put('/update/:id', updateCart);
cartRoutes.delete('/empty-cart/:userId', emptyCart);

export default cartRoutes;

// END OF FILE