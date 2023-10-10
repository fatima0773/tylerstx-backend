// Express Imports
import express from 'express';

// Controller Imports
import { resetPassword, sendResetPasswordOtp, sendSignupOtp, signin, signup } from './controller';
import { validateResetPassword, validateSignIn, userAuthentication, validateSignUp } from './middleware';
import { validateRequest } from '../../common/validationMiddleware';

// eslint-disable-next-line new-cap
const userRoutes = express.Router();

// User Routes
userRoutes.post('/send-signup-otp', sendSignupOtp);
userRoutes.post('/signup', validateSignUp, validateRequest, signup);
userRoutes.post('/signin', userAuthentication, validateSignIn, validateRequest, signin);
userRoutes.post('/reset-password-otp', userAuthentication, validateRequest, sendResetPasswordOtp);
userRoutes.post('/reset-password', userAuthentication, validateResetPassword, validateRequest, resetPassword);

export default userRoutes;

// END OF FILE