// Express Imports
import { Request, Response } from 'express';

// Model Imports
import UserModel from '../../models/user';

// JWT Import
import jwt from 'jsonwebtoken';

// Helper Function Imports
import { comparePassword, getHashedPassword, getOtp, sendResetPasswordEmail, sendSignUpEmail, setOtp } from '../../helper/auth.helper';

// Dotenv Imports
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get Mongo Secret Key
const SECRET_KEY = process.env.SECRET_KEY;

// API Response Enum Imports
import { AuthResponseMessage, ResponseCode } from '../../common/apiResponse';

/**
 * Sends OTP for user authentication
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const sendSignupOtp = async (request: Request, response: Response) => {
  try {
    const { email } = request.body;
    // Check if user with the email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return response
        .status(ResponseCode.CONFLICT)
        .json({
          message: AuthResponseMessage.USER_EXISTS,
        });

    // Generate and set OTP for the user using redis
    const verificationCode = await setOtp(email);

    // Send signup otp email
    await sendSignUpEmail(email, verificationCode);

    // Secret key not found
    if (!SECRET_KEY) {
      return response.status(500).send('Server configuration issue: Secret key is missing');
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ email: email }, SECRET_KEY);

    // Prepare response data
    const result = {
      token,
    };

    // Send success response
    return response.status(ResponseCode.SUCCESS).json({
      message: AuthResponseMessage.OTP_SUCCESS,
      result
    });

  } catch (error) {
    // Handle errors and send an error response
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: AuthResponseMessage.OTP_ERROR
    });
  }
};

/**
 * Registers a user
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const signup = async (request: Request, response: Response) => {
  const { email, password, firstName, lastName, otp } =
  request.body;
  try {
    // Retrieve OTP associated with the email using redis
    const emailOTP = await getOtp(email);

    // Compare the provided OTP with the retrieved OTP
    if (emailOTP == otp) {
      // Hash the user's password
      const hashedPassword = await getHashedPassword(password);

      // Create a new user in the database
      const newUser = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      // Send success response
      return response.status(ResponseCode.SUCCESS).json({
        message: AuthResponseMessage.SIGNUP_SUCCESS,
        // eslint-disable-next-line no-underscore-dangle
        userId: newUser._id
      });
    }
    else {
      // If OTP does not match, send unauthorized response
      return response.status(ResponseCode.UNAUTHORIZED).json({
        message: AuthResponseMessage.OTP_MISMATCH
      });
    }
  }
  catch (error) {
    // Handle errors and send an error response
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: AuthResponseMessage.SIGNUP_ERROR
    });
  }
};

/**
 * Signs in a user
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const signin = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  try {
    // Check if the user exists
    const existingUser = await UserModel.findOne({ email });

    // If user doesn't exist, send a not found response
    if (!existingUser)
      return response.status(ResponseCode.NOT_FOUND).json({
        message: AuthResponseMessage.USER_NOT_FOUND
      });

    // Compare provided password with the user's stored password
    const isPasswordCorrect = await comparePassword(password, existingUser.password);

    if (!isPasswordCorrect) {
      // If password is incorrect, send a bad request response
      return response.status(ResponseCode.BAD_REQUEST).json({
        message: AuthResponseMessage.INVALID_PASSWORD,
      });
    }

    // Send success response if authentication is successful
    return response.status(ResponseCode.SUCCESS).json({
      message: AuthResponseMessage.SIGNIN_SUCCESS,
      // eslint-disable-next-line no-underscore-dangle
      userId: existingUser._id
    });
  } catch (error) {
    // Handle errors and send an error response
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: AuthResponseMessage.SIGNIN_ERROR
    });
  }
};

/**
 * Sends OTP for reset password request
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const sendResetPasswordOtp = async (request: Request, response: Response) => {
  const { email } = request.body;
  try {
    // check if the user exists
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return response.status(ResponseCode.CONFLICT).json({
        message: AuthResponseMessage.USER_NOT_FOUND
      });
    }

    // Generate and set OTP for the user
    const verificationCode = await setOtp(email);

    // Send reset password email
    sendResetPasswordEmail(email, verificationCode);

    // Send success response
    return response
      .status(ResponseCode.SUCCESS)
      .json({
        message: AuthResponseMessage.OTP_SUCCESS
      });
  } catch (error) {
    // Handle errors and send an error response
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: AuthResponseMessage.OTP_ERROR
    });
  }
};

/**
 * Resets user password Sends OTP for user authentication
 * @param { Request } request
 * @param { Response }response
 * @returns { Response } response
 */
export const resetPassword = async (request: Request, response: Response) => {
  const { email, newPassword, otp } = request.body;
  try {
    // Check if the user exists
    const existingUser = await UserModel.findOne({ email });

    // Retrieve OTP associated with the email
    const resetPasswordOtp = await getOtp(email);

    // check if the user exists
    if (!existingUser) {
      return response.status(ResponseCode.CONFLICT).json({
        message: AuthResponseMessage.USER_NOT_FOUND
      });
    }

    // Hash the new password
    const hashedPassword = await getHashedPassword(newPassword);

    // Check if the new password matches the existing password
    const isPasswordSame = await comparePassword(newPassword, existingUser.password);

    if (isPasswordSame) {
      // If new password matches existing password, send a conflict response
      return response
        .status(ResponseCode.CONFLICT)
        .json({
          message: AuthResponseMessage.NEW_PASSWORD_MISMATCH
        });
    }

    if (resetPasswordOtp == otp) {
      // If OTP matches, update the user's password and save
      existingUser.password = hashedPassword;
      await existingUser.save();

      // Send success response
      return response
        .status(ResponseCode.SUCCESS)
        .json({
          message: AuthResponseMessage.RESET_PASSWORD_SUCCESS
        });
    }
    else {
      // If OTP does not match, send unauthorized response
      return response.status(ResponseCode.UNAUTHORIZED).json({
        message: AuthResponseMessage.OTP_MISMATCH
      });
    }
  } catch (error) {
    // Handle errors and send an error response
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: AuthResponseMessage.RESET_PASSWORD_ERROR
    });
  }
};

// END OF FILE