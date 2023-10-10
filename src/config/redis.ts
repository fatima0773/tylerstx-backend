// Redis Import
import * as redis from 'redis';

// Dotenv Imports
import dotenv from 'dotenv';
import { logger } from './winstonLog';

// // Load environment variables from .env file
dotenv.config();

// Redis Port
const PORT = process.env.REDIS_PORT;
const parsedPort = PORT ? parseInt(PORT, 10) : 13705;

// Redis Host
const HOST = process.env.REDIS_HOST;

// Redis Password
const PASSWORD = process.env.REDIS_PASSWORD;

// Establish Connection with Redis
export const redisClient = redis.createClient({
  password: PASSWORD,
  socket: {
    host: HOST,
    port: parsedPort
  }
});

// Wait for client to connect
const connectRedis = async () => {
  // try {
  //   await redisClient.connect();
  //   logger.info(`Redis connected: ${HOST}`);

  // }
  // catch (error) {
  //   logger.error('Redis connection error:', error);
  //   process.exit(1);
  // }
};

export default connectRedis;

// END OF FILE