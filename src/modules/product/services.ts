// Express Imports
import { Request, Response } from 'express';

// Product Helper Function Imports
import { uploadImage } from '../../helper/product.helper';

// Model Imports
import ProductModel, { IProduct, IReview, IVariant } from '../../models/product';
import { ProductResponseMessage, ResponseCode } from '../../common/apiResponse';

/**
 * Add product service
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const addProductService = async (request: Request, response: Response) => {
  try {
    const {
      name,
      category,
      reviews,
      variants,
      averageRating,
      tags,
      brand
    } = request.body;
    // Create an array to store modified variants with uploaded image URLs
    const updatedVariants: IVariant[] = [];

    // Iterate through each variant in the request
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      const uploadedImages: string[] = [];

      // Iterate through each image URL in the variant
      for (let j = 0; j < variant.image.length; j++) {
        // Upload image to Cloudinary for each URL
        // eslint-disable-next-line no-await-in-loop
        const uploadedImageUrl = await uploadImage(variant.image[j]);
        if (uploadedImageUrl) {
          uploadedImages.push(uploadedImageUrl);
        }
      }
      // Create an updated variant object with uploaded image URLs
      const updatedVariant: IVariant = { ...variant, image: uploadedImages };
      updatedVariants.push(updatedVariant);
    }

    // Create a new product instance with updated variant information
    const newProduct: IProduct= new ProductModel({
      name,
      category,
      reviews,
      brand,
      variants: updatedVariants,
      averageRating,
      tags,
    });

    // Save the new product to the database
    await newProduct.save();
    // Send success response
    return response.status(ResponseCode.SUCCESS).json({
      message: ProductResponseMessage.PRODUCT_ADDED_SUCCESSFULLY,
      data: newProduct
    });
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
export const getAllProductsService = async (request: Request, response: Response) => {
  try {
    // Retrieve all products from the database
    const products = await ProductModel.find({});

    // Return the retrieved products as a JSON response
    return response.send(products);
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
export const getProductByIdService = async (request: Request, response: Response) => {
  // Extract the product ID from the request parameters
  const productId = request.params.id;

  try {
    // Attempt to find the product in the database by its ID
    const product = await ProductModel.findById(productId);

    // If the product is not found, return a 404 error response
    if (!product) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: ProductResponseMessage.PRODUCT_NOT_FOUND
      });
    }

    // Return the retrieved product as a JSON response
    return response.json(product);
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
export const removeProductService = async (request: Request, response: Response) => {
  // Extract the product ID from the request parameters
  const productId = request.params.id;

  try {
    // Attempt to find and remove the product from the database by its ID
    const product = await ProductModel.findByIdAndRemove(productId);

    // If the product is not found, return a 404 error response
    if (!product) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: ProductResponseMessage.PRODUCT_NOT_FOUND
      });
    }

    // Return the removed product as a JSON response
    return response.status(ResponseCode.SUCCESS).json({
      message: ProductResponseMessage.PRODUCT_REMOVE_SUCCESSFUL,
      product
    });
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_REMOVE_UNSUCCESSFUL
    });
  }
};

/**
 * Remove product by id
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const updateProductService = async (request: Request, response: Response) => {
  // Extract the product ID from the request parameters
  const productId = request.params.id;

  try {
    // Attempt to find and update the product in the database by its ID
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { $set: request.body },
      { new: true }
    );

    // If the product is not found, return a 404 error response
    if (!updatedProduct) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: ProductResponseMessage.PRODUCT_NOT_FOUND
      });
    }

    // Return a success message along with the updated product and status code 200
    return response.status(ResponseCode.SUCCESS).json({
      message: ProductResponseMessage.PRODUCT_UPDATE_SUCCESSFUL,
      data: updatedProduct
    });
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
export const partialUpdateProductService = async (request: Request, response: Response) => {
  // Extract the product ID from the request parameters
  const productId = request.params.id;

  try {
    // Attempt to find and partially update the product in the database by its ID
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { $set: request.body },
      { new: true }
    );

    // If the product is not found, return a 404 error response
    if (!updatedProduct) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: ProductResponseMessage.PRODUCT_NOT_FOUND
      });
    }

    // Return a success message with status code 200
    return response.status(ResponseCode.SUCCESS).json({
      message: ProductResponseMessage.PRODUCT_UPDATE_SUCCESSFUL,
      data: updatedProduct
    });
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_UPDATE_UNSUCCESSFUL
    });
  }
};

/**
 * Search products and provide suggestions
 * http://localhost:3000/product/search?q=sma&page=2&perPage=1
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const searchProductService = async (request: Request, response: Response) => {
  try {
    // Extract search query, page number, and items per page from request query
    const { q, page, perPage } = request.query;

    // Parse page number and items per page, with default values if not provided
    const pageNumber = parseInt(page as string, 10) || 1;
    const itemsPerPage = parseInt(perPage as string, 10) || 10;

    // Calculate the offset for pagination
    const offset = (pageNumber - 1) * itemsPerPage;

    // Use the `find` method to search products with a case-insensitive regex match on the name field
    const searchResults = await ProductModel.find({ name: { $regex: q, $options: 'i' } })
      .skip(offset)
      .limit(itemsPerPage);

    // Return the search results as a JSON response
    response.json(searchResults);

    // Return a success message along with the search results and status code 200
    return response.status(ResponseCode.SUCCESS).json({
      message: ProductResponseMessage.PRODUCT_SEARCH_SUCCESSFUL,
      data: searchResults
    });
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_SEARCH_UNSUCCESSFUL
    });
  }
};

/**
 * Filter products by various attributes
 * http://localhost:3000/product/filter?category=Electronics&page=2&perPage=2
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const filterProductService = async (request: Request, response: Response) => {
  try {
    const { minPrice, maxPrice, category, page, perPage } = request.query;

    const pageNumber = parseInt(page as string, 10) || 1;
    const itemsPerPage = parseInt(perPage as string, 10) || 10;

    // Calculate skip value based on page number and items per page
    const offset = (pageNumber - 1) * itemsPerPage;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteringCriteria: any = {};

    // Add price range filtering if provided
    if (minPrice && maxPrice) {
      filteringCriteria['variants.price.price'] = {
        $gte: parseInt(minPrice as string),
        $lte: parseInt(maxPrice as string),
      };
    }

    // Add category filtering if provided
    if (category) {
      filteringCriteria['category'] = category;
    }

    // Perform filtering based on the criteria
    const filteredProducts: IProduct[] = await ProductModel.find(filteringCriteria).skip(offset).limit(itemsPerPage);

    return response.status(ResponseCode.SUCCESS).json({
      message: ProductResponseMessage.PRODUCT_SEARCH_SUCCESSFUL,
      data: filteredProducts
    });
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
export const getCategoriesService = async (request: Request, response: Response) => {
  try {
    // Retrieve distinct product categories from the database
    const categories = await ProductModel.distinct('category');

    // Return the categories as a JSON response
    response.json(categories);

    // Return a success message along with the categories and status code 200
    return response.status(ResponseCode.SUCCESS).json({
      message: ProductResponseMessage.CATEGORIES_SEARCH_SUCCESSFUL,
      data: categories
    });
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
export const getProductsByCategoryService = async (request: Request, response: Response) => {
  try {
    // Extract category name, page number, and items per page from request parameters and query
    const categoryName = request.params.categoryName;
    const { page, perPage } = request.query;
    const pageNumber = parseInt(page as string, 10) || 1;
    const itemsPerPage = parseInt(perPage as string, 10) || 10;

    // Calculate the offset for pagination
    const offset = (pageNumber - 1) * itemsPerPage;

    // Query products with the specified category and pagination
    const products = await ProductModel.find({ category: categoryName })
      .skip(offset)
      .limit(itemsPerPage);

    // Return a success message along with the products and status code 200
    return response.status(ResponseCode.SUCCESS).json({
      message: ProductResponseMessage.PRODUCT_SEARCH_SUCCESSFUL,
      data: products
    });
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
export const getProductsByBrandService = async (request: Request, response: Response) => {
  try {
    // Extract brand name, page number, and items per page from request parameters and query
    const brandName = request.params.brandName;
    const { page, perPage } = request.query;
    const pageNumber = parseInt(page as string, 10) || 1;
    const itemsPerPage = parseInt(perPage as string, 10) || 10;

    // Calculate the offset for pagination
    const offset = (pageNumber - 1) * itemsPerPage;

    // Query products with the specified brand and pagination
    const products = await ProductModel.find({ 'brand.id': brandName })
      .skip(offset)
      .limit(itemsPerPage);

    // Return a success message along with the products and status code 200
    return response.status(ResponseCode.SUCCESS).json({
      message: ProductResponseMessage.PRODUCT_SEARCH_SUCCESSFUL,
      data: products
    });
  } catch (error) {
    // Handle errors by sending an error response with status code 500
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.PRODUCT_SEARCH_UNSUCCESSFUL
    });
  }
};
/**
 * Add a review to a specific product
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const addProductReviewService = async (request: Request, response: Response) => {
  const productId = request.params.productId;

  try {
    const { rating, comment, userId } = request.body;

    // Create a new review instance
    const newReview: IReview = {
      rating,
      comment,
      userId,
    };

    // Find the product by ID and add the review to its reviews array
    const product = await ProductModel.findByIdAndUpdate(
      productId,
      { $push: { reviews: newReview } },
      { new: true }
    );

    if (!product) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: ProductResponseMessage.PRODUCT_NOT_FOUND,
      });
    }

    return response.status(ResponseCode.SUCCESS).json({
      message: ProductResponseMessage.REVIEW_ADDED_SUCCESSFULLY,
      data: newReview,
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: ProductResponseMessage.REVIEW_ADDED_UNSUCCESSFUL,
    });
  }
};
