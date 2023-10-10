// Express Validator Imports
import { body } from 'express-validator';

// Validation middleware for a product
export const validateProduct = [
  // Validate the product name
  body('name').trim().notEmpty().withMessage('Product name is required.'),

  // Validate the product category
  body('category').isArray({ min: 1 }).withMessage('At least one category is required.'),

  // Validate the variants array
  body('variants').isArray({ min: 1 }).withMessage('At least one variant is required.'),

  // Validate each variant within the variants array
  body('variants.*.value').trim().notEmpty().withMessage('Variant value is required.'),
  body('variants.*.variantName').trim(),
  body('variants.*.description').trim().notEmpty().withMessage('Variant description is required.'),
  body('variants.*.price.price').isNumeric().withMessage('Invalid price format.'),
  body('variants.*.price.currency').trim().notEmpty().withMessage('Currency is required.'),
  body('variants.*.stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer.'),
  body('variants.*.image').isArray(),

  // Validate the reviews array
  body('reviews').isArray(),

  // Validate each review within the reviews array
  body('reviews.*.userId').trim().notEmpty().withMessage('User ID is required.'),
  body('reviews.*.comment').trim(),
  body('reviews.*.rating').isInt({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5.'),

  // Validate the average rating
  body('averageRating').optional().isFloat({ min: 0, max: 5 }).withMessage('Average rating must be between 0 and 5.'),

  // Validate the tags array
  body('tags').isArray(),
];

// END OF FILE