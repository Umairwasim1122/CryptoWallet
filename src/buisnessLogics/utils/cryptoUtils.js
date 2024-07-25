// buisnessLogics/utils/cryptoUtils.js
import CryptoJS from 'crypto-js';

const SALT = "21DF7FFBEC8FB174BCE596CE4E46D36C79983D975206C32C593CDCCBDFABEA20";

export const encryptData = (data, password) => {
  const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(SALT), {
    keySize: 256 / 32,
  });
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
  return encrypted;
};

export const decryptData = (encryptedData, password) => {
  const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(SALT), {
    keySize: 256 / 32,
  });
  const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};
