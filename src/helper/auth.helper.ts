// Bcrypt Import
import bcrypt from 'bcrypt';

// Redis Import
import { redisClient } from '../config/redis';

// Speakeasy Import
import speakeasy from 'speakeasy';

// Nodemailer Transporter Import
import transporter from '../config/nodeMailerTransporter';

/**
 * Send Signup Email
 * @param { String } email
 * @param { String } verificationCode
 */
export const sendSignUpEmail = async (email: string, verificationCode: string) => {
  const options = {
    from: process.env.MAIL,
    to: email,
    subject: 'Account Verification',
    html: `<h1>Account Verification Code</h1>
          <p>The code for verifying your account is: ${verificationCode}</p>`,
  };

  // Send email with OTP
  await transporter.sendMail(options);
};

/**
 * Send Reset Password Email
 * @param { String } email
 * @param { String } verificationCode
 */
export const sendResetPasswordEmail = async (email: string, verificationCode: string) => {
  const options = {
    from: process.env.MAIL,
    to: email,
    subject: 'Reset Password',
    html: `<h1>Password</h1><p>The code for reseting your password is: ${verificationCode}</p>`,
  };

  // Send email with OTP
  await transporter.sendMail(options);
};

/**
 * Hash password
 * @param { String } password
 * @returns { String } hash
 */
export const getHashedPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

/**
 * Compare password
 * @param { String } incomingPassword
 * @param { String } hashedPassword
 * @returns { Boolean } isMatch
 */
export const comparePassword = async (incomingPassword: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(incomingPassword, hashedPassword);
  return isMatch;
};

/**
 * Store and returns OTP in Redis
 * @param { String } key
 * @returns { String } code
 */
export const setOtp = async (key: string) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const code = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    step: 3600,
  });

  await redisClient.set(key, code);
  return code;
};

/**
 * Get OTP from Redis
 * @param { String } key
 * @returns { String } otp
 */
export const getOtp = async (key: string): Promise<string> => {
  const otp = await redisClient.get(key);
  return otp !== null ? otp : '';
};

// END OF FILE