// Express Imports
import { Request, Response, NextFunction } from 'express';

// JWT Imports
import jwt from 'jsonwebtoken';

// Model Imports
import User from '../../models/user';

// Express Validartor Imports
import { body } from 'express-validator';

// API Response Enum Imports
import { AuthResponseMessage, ResponseCode } from '../../common/apiResponse';

// Dotenv Imports
import dotenv from 'dotenv';

// // Load environment variables from .env file
dotenv.config();

// Get Mongo Secret Key
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Function to authorize user by checking the JWT
 * @param { Request } request
 * @param { NextFunction } next
 * @param { Response }response
 * @returns { Response } response
 */
export const userAuthentication = (request: Request, response: Response, next: NextFunction) => {
  const { token } = request.body;

  // Token not found
  if (!token) {
    return response.status(ResponseCode.UNAUTHORIZED).json({
      message: AuthResponseMessage.NO_TOKEN_FOUND
    });
  }

  // Secret key not found
  if (!SECRET_KEY) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: AuthResponseMessage.NO_SECRET_KEY
    });
  }

  // Verify Token
  jwt.verify(token, SECRET_KEY, async (err: unknown, payload: unknown) => {
    if (err) {
      return response.status(ResponseCode.UNAUTHORIZED).json({
        message: AuthResponseMessage.INVALID_TOKEN
      });
    }

    // Try to fetch the user and catch any errors
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user = await User.findOne({ email: (payload as any).email });

      if (!user) {
        return response.status(ResponseCode.UNAUTHORIZED).send('No such user');
      }

      // Add user to request object so it can be accessed in subsequent middleware
      next();
    } catch (err) {
      return response.status(ResponseCode.INTERNAL_SERVER_ERROR).send('Error communicating with the database');
    }
  });
};

// Define rules to validate signin call though express-validator
export const validateSignIn = [
  body('email').isEmail().withMessage('Invalid email format.'),

  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character.'),
];

// Define rules to validate signup call though express-validator
export const validateSignUp = [
  body('email').isEmail().withMessage('Invalid email format.'),

  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character.'),

  body('firstName').notEmpty().withMessage('First name is required.').isAlpha().withMessage('First name must only contain alphabetic characters.'),

  body('lastName').notEmpty().withMessage('Last name is required.').isAlpha().withMessage('Last name must only contain alphabetic characters.'),
];

// Define rules to validate reset password call though express-validator
export const validateResetPassword = [
  body('email').isEmail().withMessage('Invalid email format.'),

  body('newPassword')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character.'),
];

// END OF FILE