// Express Imports
import { Request, Response } from 'express';

// API Response Enum Imports
import { ProductResponseMessage, ResponseCode } from '../../common/apiResponse';

// Product Helper Function Imports
import { addProductReviewService, addProductService,
  filterProductService,
  getAllProductsService,
  getCategoriesService,
  getProductByIdService,
  getProductsByBrandService,
  getProductsByCategoryService,
  partialUpdateProductService,
  removeProductService,
  searchProductService,
  updateProductService }
  from './services';

/**
 * Add products
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const addProduct = async (request: Request, response: Response) => {
  try {
    return await addProductService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_ADDED_UNSUCCESSFUL
    });
  }
};

/**
 * Get all products
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getProducts = async (request: Request, response: Response) => {
  try {
    return await getAllProductsService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCTS_FETCH_UNSUCCESSFUL
    });
  }
};

/**
 * Get product by ID
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getProductById = async (request: Request, response: Response) => {
  try {
    return await getProductByIdService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCTS_FETCH_UNSUCCESSFUL
    });
  }
};

/**
 * Remove product by id
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const removeProduct = async (request: Request, response: Response) => {
  try {
    return await removeProductService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_REMOVE_UNSUCCESSFUL
    });
  }
};

/**
 * Update product using Id (put)
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const updateProduct = async (request: Request, response: Response) => {
  try {
    return await updateProductService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_UPDATE_UNSUCCESSFUL
    });
  }
};

/**
 * Partially update product by id (PATCH)
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const partialUpdateProduct = async (request: Request, response: Response) => {
  try {
    return await partialUpdateProductService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_UPDATE_UNSUCCESSFUL
    });
  }
};

/**
 * Search products and provide suggestions
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const searchProducts = async (request: Request, response: Response) => {
  try {
    return await searchProductService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_SEARCH_UNSUCCESSFUL
    });
  }
};

/**
 * Filter products by various attributes
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const filterProducts = async (request: Request, response: Response) => {
  try {
    return await filterProductService(request, response);
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_SEARCH_UNSUCCESSFUL
    });
  }
};

/**
 * Get all product categories
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getCategories = async (request: Request, response: Response) => {
  try {
    return await getCategoriesService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.CATEGORIES_SEARCH_UNSUCCESSFUL
    });
  }
};

/**
 * Get all products based on the category provided
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getProductsByCategory = async (request: Request, response: Response) => {
  try {
    return await getProductsByCategoryService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.CATEGORIES_SEARCH_UNSUCCESSFUL
    });
  }
};

/**
 * Get all products based on the category provided
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getProductsByBrand = async (request: Request, response: Response) => {
  try {
    return await getProductsByBrandService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_SEARCH_UNSUCCESSFUL
    });
  }
};

/**
 * Get product reviews
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getProductReviews = async (request: Request, response: Response) => {
  try {
    return await getProductsByBrandService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_SEARCH_UNSUCCESSFUL
    });
  }
};

/**
 * Add product reviews
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const addProductReviews = async (request: Request, response: Response) => {
  try {
    return await addProductReviewService(request, response);
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.REVIEW_ADDED_UNSUCCESSFUL
    });
  }
};

// END OF FILE