import CryptoJS from 'crypto-js';

//------------------------------------------------------------------------------------
export const encrypt = (message: string | number, secret: string): string => {
  return CryptoJS.AES.encrypt(message.toString(), secret).toString();
};
