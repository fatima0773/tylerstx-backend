// Mongoose Import
import mongoose from 'mongoose';

// Error Handler Import
import to from 'await-to-js';

// Winston Imports
import { logger } from './winstonLog';

// Establish connection to Mongo
const connectDB = async () => {
  if (!process.env.MONGO_URI) { // Check if MONGO_URI is defined in process.env
    logger.error('MONGO_URI not defined in process.env');
    return;
  }

  const [error, connection] = await to(mongoose.connect(process.env.MONGO_URI));

  if (error) {
    logger.error('Mongo db connection error:', error);
    process.exit(1);
  }

  logger.info(`Mongo db connected: ${connection?.connection.host}`);
};

export default connectDB;

// END OF FILE