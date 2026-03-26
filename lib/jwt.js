/**
 * @module jwt
 */

const {
  createHmac,
  sign,
  verify,
} = require('node:crypto');

const {
  base64URLEncode,
  base64URLDecode,
  toURLEncode,
  fromURLEncode,
} = require('./base64.js');

const SHA256 = 'sha256';
const SHA384 = 'sha384';
const SHA512 = 'sha512';
const UTF8 = 'utf8';
const BASE64 = 'base64';

/**
 * @module Generate HSAXXX JWT Token
 */

const _generateHSXXXJWTToken = (alg, encodedHeader, encodedPayload, secret) =>
  new Promise(async (resolve, reject) => {
    try {
      const signature = createHmac(alg, secret)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest(BASE64);
      const signatureJWT = toURLEncode(signature);
      const generatedJWTToken = `${encodedHeader}.${encodedPayload}.${signatureJWT}`;
      resolve(generatedJWTToken);
    } catch (err) {
      console.error(err); // debug
      reject(err);      
    }
  });

const _createHSXXXJWT = (alg, header, payload, secret) =>
  new Promise(async (resolve, reject) => {
    try {
      const headerJWT = base64URLEncode(JSON.stringify(header));
      const payloadJWT = base64URLEncode(JSON.stringify(payload));
      const generatedJWTToken = await _generateHSXXXJWTToken(alg, headerJWT, payloadJWT, secret);
      resolve(generatedJWTToken);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  }); 


const createHS256JWT = (header, payload, secret) =>
  new Promise(async (resolve, reject) => {
    try {
      const hash = await _createHSXXXJWT(SHA256, header, payload, secret);
      resolve(hash);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const createHS384JWT = (header, payload, secret) =>
  new Promise(async (resolve, reject) => {
    try {
      const hash = await _createHSXXXJWT(SHA384, header, payload, secret);
      resolve(hash);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const createHS512JWT = (header, payload, secret) =>
  new Promise(async (resolve, reject) => {
    try {
      const hash = await _createHSXXXJWT(SHA512, header, payload, secret);
      resolve(hash);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const verifyHS256JWTToken = (jwtToken, secret) =>
  new Promise(async (resolve, reject) => {
    try {
      const [header, payload, signature] = jwtToken.split('.');
      const generatedToken = await _generateHSXXXJWTToken(SHA256, header, payload, secret);
      resolve(generatedToken === jwtToken);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const verifyHS384JWTToken = (jwtToken, secret) =>
  new Promise(async (resolve, reject) => {
    try {
      const [header, payload, signature] = jwtToken.split('.');
      const generatedToken = await _generateHSXXXJWTToken(SHA384, header, payload, secret);
      resolve(generatedToken === jwtToken);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const verifyHS512JWTToken = (jwtToken, secret) =>
  new Promise(async (resolve, reject) => {
    try {
      const [header, payload, signature] = jwtToken.split('.');
      const generatedToken = await _generateHSXXXJWTToken(SHA512, header, payload, secret);
      resolve(generatedToken === jwtToken);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

/**
 * @module Generate RSXXX JWT Token
 */
const _generateRSXXXJWTToken = (alg, encodedHeader, encodedPayload, privateKey = null) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = Buffer.from(`${encodedHeader}.${encodedPayload}`);
      const signature = sign(alg, data, privateKey).toString(BASE64);
      const signatureJWT = toURLEncode(signature);
      const generatedJWTToken = `${encodedHeader}.${encodedPayload}.${signatureJWT}`;
      resolve(generatedJWTToken);
    } catch (err) {
      console.error(err); // debug
      reject(err);      
    }
  });

const _createRSXXXJWT = (alg, header, payload, privateKey = null) =>
  new Promise(async (resolve, reject) => {
    try {
      const headerJWT = base64URLEncode(JSON.stringify(header));
      const payloadJWT = base64URLEncode(JSON.stringify(payload));
      const generatedJWTToken = await _generateRSXXXJWTToken(alg, headerJWT, payloadJWT, privateKey);
      resolve(generatedJWTToken);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const createRS256JWTToken = (header, payload, privateKey = null) =>
  new Promise(async (resolve, reject) => {
    try {
      const hash = await _createRSXXXJWT(SHA256, header, payload, privateKey);
      resolve(hash);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const createRS384JWTToken = (header, payload, privateKey = null) =>
  new Promise(async (resolve, reject) => {
    try {
      const hash = await _createRSXXXJWT(SHA384, header, payload, privateKey);
      resolve(hash);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const createRS512JWTToken = (header, payload, privateKey = null) =>
  new Promise(async (resolve, reject) => {
    try {
      const hash = await _createRSXXXJWT(SHA512, header, payload, privateKey);
      resolve(hash);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const _verifyRSXXXJWTToken = (alg, encodedHeader, encodedPayload, signature, publicKey = null) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = Buffer.from(`${encodedHeader}.${encodedPayload}`);
      const b64Signature = fromURLEncode(signature);
      const originalSignature = Buffer.from(b64Signature, BASE64);
      const isVerified = verify(alg, data, publicKey, originalSignature);
      resolve(isVerified);
    } catch (err) {
      console.error(err); // debug
      reject(err);      
    }
  });

const verifyRS256JWTToken = (jwtToken, publicKey = null) =>
  new Promise(async (resolve, reject) => {
    try {
      const [header, payload, signature] = jwtToken.split('.');
      const isVerified = await _verifyRSXXXJWTToken(SHA256, header, payload, signature, publicKey);
      resolve(isVerified);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const verifyRS384JWTToken = (jwtToken, publicKey = null) =>
  new Promise(async (resolve, reject) => {
    try {
      const [header, payload, signature] = jwtToken.split('.');
      const isVerified = await _verifyRSXXXJWTToken(SHA384, header, payload, signature, publicKey);
      resolve(isVerified);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

const verifyRS512JWTToken = (jwtToken, publicKey = null) =>
  new Promise(async (resolve, reject) => {
    try {
      const [header, payload, signature] = jwtToken.split('.');
      const isVerified = await _verifyRSXXXJWTToken(SHA512, header, payload, signature, publicKey);
      resolve(isVerified);
    } catch (err) {
      console.error(err); // debug
      reject(err);
    }
  });

module.exports = {
  /* HSXXX */
  createHS256JWT,
  createHS384JWT,
  createHS512JWT,
  verifyHS256JWTToken,
  verifyHS384JWTToken,
  verifyHS512JWTToken,
  /* RSXXX */
  createRS256JWTToken,
  createRS384JWTToken,
  createRS512JWTToken,
  verifyRS256JWTToken,
  verifyRS384JWTToken,
  verifyRS512JWTToken,
};