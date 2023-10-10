// Nodemailer Import
import { createTransport } from 'nodemailer';

// Nodemailer Port
const PORT = process.env.NODE_MAILER_PORT;
const parsedPort = PORT ? parseInt(PORT, 10) : 456;

// Create transporter
const transporter = createTransport({
  service: process.env.NODE_MAILER_SERVICE,
  host: process.env.NODE_MAILER_HOST,
  port: parsedPort,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_ADDRESS,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

export default transporter;

// END OF FILE