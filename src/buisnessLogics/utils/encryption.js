// encryption.js
import CryptoJS from 'crypto-js';

export const encryptData = (data, password) => {
  return CryptoJS.AES.encrypt(data, password).toString();
};
