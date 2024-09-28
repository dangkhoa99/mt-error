import CryptoJS from 'crypto-js';

//------------------------------------------------------------------------------------
/**
 * @deprecated
 */
export const encrypt = (message: string | number, secret: string): string => {
  return CryptoJS.AES.encrypt(message.toString(), secret).toString();
};

//------------------------------------------------------------------------------------
const base64ToArrayBuffer = (base64) => {
  const binaryString = window.atob(base64);
  const length = binaryString.length;
  let bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
};

//------------------------------------------------------------------------------------
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
};

//------------------------------------------------------------------------------------
const importPublicKey = async (spki) => {
  const message = base64ToArrayBuffer(spki);
  const cryptoKey = await window.crypto.subtle.importKey(
    'spki',
    message,
    { name: 'RSA-OAEP', hash: 'sha-1' },
    false,
    ['encrypt'],
  );
  return cryptoKey;
};

//------------------------------------------------------------------------------------
const encryptData = async (message, publicKey) => {
  const enc = new TextEncoder();
  const encodedMessage = enc.encode(message);
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    publicKey,
    encodedMessage,
  );
  const encodedData = arrayBufferToBase64(encryptedData);
  return encodedData;
};

//------------------------------------------------------------------------------------
export const getSignature = async (opts: {
  publicKey?: string;
  environment: string;
  projectId?: number | string;
}) => {
  const { publicKey, environment, projectId } = opts;

  if (!publicKey) {
    return Promise.resolve('');
  }

  const key = await importPublicKey(publicKey);
  const rs = await encryptData(JSON.stringify({ environment, projectId }), key);
  return rs;
};

//------------------------------------------------------------------------------------
// export const getSignature_1 = (publicKey?: string) => {
//   try {
//     const key = await importPublicKey(publicKey);
//     const rs = await encryptData(JSON.stringify({}), key);
//     return rs;
//   } catch (error) {
//     // Handle errors appropriately
//     console.error(error);
//     return null; // Or return a default value
//   }
// };
