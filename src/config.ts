import * as dotenv from 'dotenv';

dotenv.config();

export default {
  secret: process.env.JWT_SECRET || 'defaultSecretValueisS3cr3t', // You can provide a default value here
};