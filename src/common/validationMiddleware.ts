// Express Imports
import { Request, Response, NextFunction } from 'express';

// Express Validator Imports
import { validationResult } from 'express-validator';

// Response Code [ENUM] Imports
import { ResponseCode } from './apiResponse';

/**
 * Validates the request data using express-validator rules defined
 * @param { Request } request
 * @param { Response }response
 * @param { NextFunction } next
 * @returns { Response }response
 */
export const validateRequest = (request: Request, response: Response, next: NextFunction) => {
  // Validate the request using express-validator rules
  const errors = validationResult(request);

  // If validation errors exist, send a bad request response with error details
  if (!errors.isEmpty()) {
    return response.status(ResponseCode.BAD_REQUEST).json({ message: errors.array() });
  }

  // If validation is successful, proceed to the next middleware
  next();
};

// END OF FILE