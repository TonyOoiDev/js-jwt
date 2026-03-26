const {
  base64URLEncode,
  base64URLDecode,
} = require('../lib/base64.js');

const header = {
  "alg": "HS256",
  "typ": "JWT"
};

QUnit.module('base64URLEncode', (hooks) => {
  QUnit.test('encode header to base64URL', assert => {
    const result = base64URLEncode(JSON.stringify(header));
    assert.equal(result, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
  });

  QUnit.test('encode empty string to base64URL', assert => {
    assert.throws(() => base64URLEncode(''));
  });
});

QUnit.module('base64URLDecode', (hooks) => {
  QUnit.test('decode header from base64URL', assert => {
    const result = base64URLDecode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    const resultJson = JSON.parse(result);
    assert.deepEqual(resultJson, header);
  });
});

