import { scrypt, createCipheriv, createDecipheriv } from 'node:crypto';
import { promisify } from 'util';

const algorithm = 'aes-256-cbc'; //Using AES encryption

export const encrypt = async (data: string, encryptionPassword: string, encryptionIv: string) => {
  const iv = Buffer.from(encryptionIv, 'hex');
  const key = (await promisify(scrypt)(encryptionPassword, 'salt', 32)) as Buffer;
  const cipher = createCipheriv(algorithm, key, iv);
  const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
  return encryptedData.toString('hex');
};

export const decrypt = async (encryptedData: string, encryptionPassword: string, ivString: string) => {
  const iv = Buffer.from(ivString, 'hex');
  const key = (await promisify(scrypt)(encryptionPassword, 'salt', 32)) as Buffer;
  const encryptedText = Buffer.from(encryptedData, 'hex');
  const decipher = createDecipheriv(algorithm, key, iv);
  const decryptedData = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decryptedData.toString();
};
