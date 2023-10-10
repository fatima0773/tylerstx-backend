// Express Imports
import { Request, Response } from 'express';

// API Response Enum Imports
import { ProductResponseMessage, ResponseCode } from '../../common/apiResponse';
import { addToCartService, clearCartService, getCartService, removeItemFromCartService, updateCartService } from './services';

/**
 * Fetch user cart
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getCart = async (request: Request, response: Response) => {
  try {
    return await getCartService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_ADDED_UNSUCCESSFUL
    });
  }
};

/**
 * Add products to cart
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const addToCart = async (request: Request, response: Response) => {
  try {
    return await addToCartService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_ADDED_UNSUCCESSFUL
    });
  }
};

/**
 * Update cart products
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const updateCart = async (request: Request, response: Response) => {
  try {
    return await updateCartService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_ADDED_UNSUCCESSFUL
    });
  }
};

/**
 * Remove a product from the cart
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const removeItemFromCart = async (request: Request, response: Response) => {
  try {
    return await removeItemFromCartService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_ADDED_UNSUCCESSFUL
    });
  }
};

/**
 * Empty cart
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const emptyCart = async (request: Request, response: Response) => {
  try {
    return await clearCartService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_ADDED_UNSUCCESSFUL
    });
  }
};