// Express Imports
import express from 'express';

// Controller Imports
import { addProduct, addProductReviews, filterProducts, getCategories, getProductById, getProducts, getProductsByBrand, getProductsByCategory, partialUpdateProduct, removeProduct, searchProducts, updateProduct } from './controller';
import { userAuthentication } from '../auth/middleware';
import { validateProduct } from './middleware';
import { validateRequest } from '../../common/validationMiddleware';

// eslint-disable-next-line new-cap
const productRoutes = express.Router();

productRoutes.post('/add', addProduct);
productRoutes.get('/getAllProducts', getProducts);
productRoutes.get('/:id', getProductById);
productRoutes.delete('/remove/:id', userAuthentication, removeProduct);
productRoutes.put('/update/:id', validateProduct, validateRequest, userAuthentication, updateProduct);
productRoutes.patch('/partial-update/:id', userAuthentication, partialUpdateProduct);
productRoutes.get('/filter', filterProducts);
productRoutes.get('/search/:q', searchProducts);
productRoutes.get('/categories', userAuthentication, getCategories);
productRoutes.get('/category/:categoryName/products', getProductsByCategory);
productRoutes.get('/brand/:brandName/products', getProductsByBrand);
productRoutes.put('/add-review/:productId', addProductReviews);

export default productRoutes;

// END OF FILE