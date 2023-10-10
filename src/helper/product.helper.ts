// Cloudinary Imports
// import cloudinary from '../config/cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// Winston Logger Import
import { logger } from '../config/winstonLog';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads the image to cloudinary
 * @param { String } url
 * @returns { String } secure_url
 */
export const uploadImage = async (url: string) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: false,
  };

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(url, options);
    return result.secure_url;
  } catch (error) {
    // Handle errors and log them using the logger
    logger.error('Error Uploading the image: ', error);
    throw error; // Rethrow the error to handle it at the caller's level
  }
};

// END OF FILE