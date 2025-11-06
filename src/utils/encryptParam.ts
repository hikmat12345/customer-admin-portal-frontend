import crypto from 'crypto';

// Ensure your environment variables are properly set and of the correct type
const ENCRYPTION_KEY = String(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);
const ENCRYPTION_IV = String(process.env.NEXT_PUBLIC_ENCRYPTION_IV);

// Convert them to buffers
const keyBuffer = Buffer.from(ENCRYPTION_KEY, 'hex');
const ivBuffer = Buffer.from(ENCRYPTION_IV, 'hex');

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, ivBuffer);
  let encrypted = cipher.update(text ?? '', 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decrypt = (encryptedText: string): string => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
