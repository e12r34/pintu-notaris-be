import * as dotenv from 'dotenv';

dotenv.config();

export default {
  secret: process.env.JWT_SECRET || 'defaultSecretValueisS3cr3t', // You can provide a default value here
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'defaultSecretValueisS3cr3tsDifferentBecauseRefreshishavetomoresecureBro', // You can provide a default value here
  minioBucketName: process.env.MINIO_BUCKET_NAME || 'pintu-notaris'
};