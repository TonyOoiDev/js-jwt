/**
 * @module base64
 */

const base64Encode = (unencoded) => {
  if (typeof unencoded !== 'string' || unencoded.length === 0) {
    throw new Error('base64Encode() - Params not string or empty string');
  }
  return Buffer.from(unencoded).toString('base64');
};

const base64Decode = (encoded) => {
  if (typeof encoded !== 'string' || encoded.length === 0) {
    throw new Error('base64Decode() - Params not string or empty string');
  }
  return Buffer.from(encoded, 'base64').toString('utf8');
};

const base64URLEncode = (unencoded) => {
  if (typeof unencoded !== 'string' || unencoded.length === 0) {
    throw new Error('base64URLEncode() - Params not string or empty string');
  }
  const encoded = base64Encode(unencoded);
  // return encoded.replace('+', '-').replace('/', '_').replace(/=+$/, '');
  return toURLEncode(encoded);
};

const base64URLDecode = (encoded) => {
  if (typeof encoded !== 'string' || encoded.length === 0) {
    throw new Error('base64URLDecode() - Params not string or empty string');
  }
  encoded = encoded.replace('-', '+').replace('_', '/');
  while (encoded.length % 4)
    encoded += '=';
  return base64Decode(encoded);
};

/**
 * @function toURLEncode
 * @description
 * converts from base64 string to base64URLEncoded string
 * @param {String} encoded
 * @return {String}
 */
const toURLEncode = (encoded) => {
  if (typeof encoded !== 'string' || encoded.length === 0) {
    throw new Error('toURLEncode() - Params not string or empty string');
  }
  return encoded.replace(/\+/ig, '-').replace(/\//ig, '_').replace(/=+$/, '');
}

/**
 * @function fromURLEncode
 * @description
 * converts from base64URLEncoded string to base64 string
 * @param {String} encoded
 * @return {String}
 */
const fromURLEncode = (encoded) => {
  if (typeof encoded !== 'string' || encoded.length === 0) {
    throw new Error('fromURLEnncode() - Params not string or empty string');
  }
  // return encoded.replace(/-/ig, '+').replace(/_/ig, '/').replace(/=+$/, ''); // works too
  encoded = encoded.replace(/-/ig, '+').replace(/_/ig, '/');
  return encoded + '==';
};

module.exports = {
  base64Encode,
  base64Decode,
  base64URLEncode,
  base64URLDecode,
  toURLEncode,
  fromURLEncode,
};