const {
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
} = require('../lib/jwt');

const headerHS256 = {
  "alg": "HS256",
  "typ": "JWT"
};

const headerHS384 = {
  "alg": "HS384",
  "typ": "JWT"
};

const headerHS512 = {
  "alg": "HS512",
  "typ": "JWT"
};

const headerRS256 = {
  "alg": "RS256",
  "typ": "JWT"
};

const headerRS384 = {
  "alg": "RS384",
  "typ": "JWT"
};

const headerRS512 = {
  "alg": "RS512",
  "typ": "JWT"
};

const payload = {
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
};

const RSA_PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA2VDBILn1RbtbOniouy9vGlvKdihxkCiSGKPvZnO7SSkTpZ45
XfOe47M+/saIRHkSPRKJc2Z3EPGCC3T2LiJepEw7NeAdQrYZAmxhuUY4kQaK1uH1
9J5hSfLj1SMXbMN7E0f0kRjgopgEYHDAuyY5noBsjWeoTxSs7yEJ8VT8CnmUu0UH
eubIfPwe2jyLCEyAjs1k9Ptl6yPh6p+00byRJowqEeczmTNDxCuESNfVP8HRvlzg
QulvfcYPR/OT30PIkDnA1VoUf8L+3+G5AiBs/34jDjT7Wx1tY6Y/cqTOd+Z8ABsR
tCyTqn6tbnc7INNAlUyj0Vn1obyvLDWiZ7o3ZQIDAQABAoIBAFPqfhlAFblupsTG
cQmPQIziIyVLasbrE7dWHozmZczTgtWyap6gA5wTzGCfk2E1i1hv/wnD6HhvefMo
oCOie/9fvIGKYGIxZSjtZzMfLZq69wQRT2O9gP4IP/g+y73hInaIk6UwARZoM1B2
WcYq9ZcCKmjUPUcESd8xV+CMG6ODJwD4FxX5QxHnhHgIyMYRif/3/hbqhtgE63lP
VKt18uOhvjGJ3PFnBq2CkIHr1rCjAXHsKb56qruDux1GbEaTpWhNAVNOpTTbua++
qrM1iSl3LEqp3541N5h2J3i1YkqFXKN6EWYxX7LOIpOMAgOqzaDFUfhRrI+E0IzJ
ApDfmyUCgYEA+QDoy6dWEadfys2/lkhixH4dx9P3GDPyROdfFt6da07YrZS8tKtd
c2XYwvDSxwZqyWJFZFZefUGtHq18eO32wTvClJMZGp+JFZg2fXyLjh4mJy5YEUma
0raXMD8mRsbu9jNQSsEP3R1vkUBx9OpJ9TC4RcyQ4YENwggK4/HBSWcCgYEA32vp
Vo/Q/+D2+NbfNmmkezfIlswjonMwFLNE2Hi5gD3Nqu14hii9XQCwbVuTtlK70LlD
E4r7ZrS7xvyshWaqObeYkaA4NesFO54dX9vjD9SawrY8HwYPjzfUYOCYz5MwhgEA
qkdmLMrjaoowjdNvEkiUYUeVY2IB2DxrP65TXVMCgYB6EXgOXnpTLTpIsZS6l8HT
kgAHdmIr+0tJfCOhkoCZmo2eisv3xgqKB+O7rVOnPf4bu5FJHw4zWX8FCwd6QS42
jJVXQMWNx6fsbjJIUkYX5a/OhWmnD+5WXiy/+jVJfTyodX9nJj4gp82J5432AuU+
ziOIFEDyS9HyzP6JwHqBAQKBgQCLfV84iR/usbDgWZ8Q5NIpkAFvjNJuuUX6lpZU
JMOEOpHutsa51DOuHiEIldVaTrsuLIyhZfNiA1L9gIHh4+BBmsvpl8OgfjRNLYGf
eLSCDLX2/Tn6EJmkTDIPrgoaBwaTk4qrxVoYey+TM+XulmRRYPkq5ztwyh7mt4oq
PxeTOwKBgCb+86m8dspHm6i1UKYbTfTJRXA20A9rkkWIl5iextbPebdGrigy1veR
BsN40gonsl5U7pwoEx7/CA8slfaP97po8REa5YlIk+Tjx8bjwIVPNIEMdh1VNf2Z
Rlz7BnoeE8btg47dMKVdOIGDVoZ8vqfOMHieRzrHoyljDY8qA+6+
-----END RSA PRIVATE KEY-----
`
const RSA_PUBLIC_KEY = `
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEA2VDBILn1RbtbOniouy9vGlvKdihxkCiSGKPvZnO7SSkTpZ45XfOe
47M+/saIRHkSPRKJc2Z3EPGCC3T2LiJepEw7NeAdQrYZAmxhuUY4kQaK1uH19J5h
SfLj1SMXbMN7E0f0kRjgopgEYHDAuyY5noBsjWeoTxSs7yEJ8VT8CnmUu0UHeubI
fPwe2jyLCEyAjs1k9Ptl6yPh6p+00byRJowqEeczmTNDxCuESNfVP8HRvlzgQulv
fcYPR/OT30PIkDnA1VoUf8L+3+G5AiBs/34jDjT7Wx1tY6Y/cqTOd+Z8ABsRtCyT
qn6tbnc7INNAlUyj0Vn1obyvLDWiZ7o3ZQIDAQAB
-----END RSA PUBLIC KEY-----
`

const RSA_PUBLIC_KEY_TEST_FAIL = `
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAruRKzi+lc0C9VxaIeyc7gM2kuqhyE0Uds1LIexOCLxZX8oLOaWfR
nHoca8BfrUTnOuLndJI3cxAaZRX0d3boZABElOJ0kjvKz212z2uLk0W2pFeWcBzU
EC3lDsSnxhK1BEZdrrV8gZkcLdJVRj5KduHvfyBrjzq8KWSGoef6HJGiVw1txTbw
jkpoXQYEA0HZFGk7jCq0tGN+Cbr/ceM6YTbUTjoUaI/AfFTDufs6FtGxDWx3rj3Q
gna43hawbzoTETqokOosm02vaiBtfjpjrA43JVqhmNwLUsnwG+3tVhp3czLcZq+l
Qw/tRuvHX9itfsmPwLoUzjzAj1F0KmgCCwIDAQAB
-----END RSA PUBLIC KEY-----
`
/**
 * @module HS256
 */
QUnit.module('Generate / Verify JWT using HS256', (hooks) => {
  const HS256_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  QUnit.test('createHS256JWT()', async (assert) => {
    const result = await createHS256JWT(
      headerHS256,
      payload,
      'your-256-bit-secret',
    );
    assert.equal(result, HS256_JWT_TOKEN)
  });

  QUnit.test('verifyHS256JWTToken() - Pass Test', async (assert) => {
    const result = await verifyHS256JWTToken(
      HS256_JWT_TOKEN,
      'your-256-bit-secret',
    );
    assert.equal(result, true);
  });

  QUnit.test('verifyHS256JWTToken() - Fail Test', async (assert) => {
    const result = await verifyHS256JWTToken(
      HS256_JWT_TOKEN,
      'your-256-bit-secret-test-fail',
    );
    assert.equal(result, false);
  });
});

/**
 * @module HS384
 */
QUnit.module('Generate / Verify JWT using HS384', (hooks) => {
  /**
   * @constants
   */
  const HS384_JWT_TOKEN = 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.8aMsJp4VGY_Ia2s9iWrS8jARCggx0FDRn2FehblXyvGYRrVVbu3LkKKqx_MEuDjQ';

  QUnit.test('createHS384JWT()', async (assert) => {
    const result = await createHS384JWT(headerHS384, payload, 'your-384-bit-secret');
    assert.equal(result, HS384_JWT_TOKEN);
  });

  QUnit.test('verifyHS384JWTToken() - Pass Test', async (assert) => {
    const result = await verifyHS384JWTToken(
      HS384_JWT_TOKEN,
      'your-384-bit-secret',
    );
    assert.equal(result, true);
  });

  QUnit.test('verifyHS384JWTToken() - Fail Test', async (assert) => {
    const result = await verifyHS384JWTToken(
      HS384_JWT_TOKEN,
      'your-384-bit-secret-test-fail',
    );
    assert.equal(result, false);
  });
});

/**
 * @module HS512
 */
QUnit.module('Generate / Verify JWT using HS512', (hooks) => {
  /**
   * @constants
   */
  const HS512_JWT_TOKEN = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ._MRZSQUbU6G_jPvXIlFsWSU-PKT203EdcU388r5EWxSxg8QpB3AmEGSo2fBfMYsOaxvzos6ehRm4CYO1MrdwUg';

  QUnit.test('createHS512JWT()', async (assert) => {
    const result = await createHS512JWT(headerHS512, payload, 'your-512-bit-secret');
    assert.equal(result, HS512_JWT_TOKEN);
  });

  QUnit.test('verifyHS512JWTToken() - Pass Test', async (assert) => {
    const result = await verifyHS512JWTToken(
      HS512_JWT_TOKEN,
      'your-512-bit-secret',
    );
    assert.equal(result, true);
  });

  QUnit.test('verifyHS512JWTToken() - Fail Test', async (assert) => {
    const result = await verifyHS512JWTToken(
      HS512_JWT_TOKEN,
      'your-512-bit-secret-test-fail',
    );
    assert.equal(result, false);
  });
});

/**
 * @module RS256
 */
QUnit.module('Generate / Verify JWT Using RS256 algorithm', (hooks) => {
  /**
   * @constants
   */
  const RS256_JWT_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.pjW_YfpcIRDu_3kxrrv7eHWzgfzjpZsOFnR9jVPiQhLVyAWKK1pHjdZMx-zJWkX8cH08IC1wEOxr0sQRPQnnnzsA-4jERrq8_e-_tqeejg22kAqT6EKUcHFvcBsLWiLP_dKoWbBOxWecCLCRBMOwBtjThp2ALGAFCfXP7I_RQ4iWHHpc5WIAEP7xkZgCPOreHlhbnYVLYzJ_khBVDeZDRcMQLYVo9wtlHk2H8s2Cwb_HHNZw6EqlbLL7pNnS_9iow1CBp2bCSSmeLVS7WylMJQF0WmgnTffQBCuWasQ-f9r6GuVjbJr1PrRV2Ctsq6XxKnlDlDA5n4H0NKSwosNlVg';

  QUnit.test('createRS256JWTToken()', async (assert) => {
    const result = await createRS256JWTToken(headerRS256, payload, RSA_PRIVATE_KEY);
    assert.equal(result, RS256_JWT_TOKEN);
  });

  QUnit.test('verifyRS256JWTToken() - Pass Test', async (assert) => {
    const result = await verifyRS256JWTToken(RS256_JWT_TOKEN, RSA_PUBLIC_KEY);
    assert.equal(result, true);
  });

  QUnit.test('verifyRS256JWTToken() - Fail Test', async (assert) => {
    const result = await verifyRS256JWTToken(RS256_JWT_TOKEN, RSA_PUBLIC_KEY_TEST_FAIL);
    assert.equal(result, false);
  });
});

/**
 * @module RS384
 */
QUnit.module('Generate / Verify JWT Using RS384 algorithm', (hooks) => {
  /**
   * @constants
   */
  const RS384_JWT_TOKEN = 'eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.alLkQJ_hCCdFIrvs_Hc2yGz-IZQvGjPooQgbrb3Zg_OPemZZSn-byatwyitg1a2Pc2tV6uweGaDwhZKBvcXDhKSz3XTbQPmwd6PdPLdMTqh4Cz_tkW2_5F-nHcnDKN0lbvuNcPna9nGCrtMyQirRbTCnMSk4Z8pcrR1eRYPG20GtBqdOrtjOxpGUzIgdJtbjDyE5BqKll9vJdaEBMWP8vi8g1Se0X8gyqX4Xt97k4JnQNL4m8k-Y26ATmszdOYN18j_EQ8KagjEfwGm6NxxNu0GlPK-7MCWkTQSP5iRR3NiYepXrRUyJh4gDcd-GlrRKmqC02x7VeModuV7uN4lv_A';

  QUnit.test('createRS384JWT()', async (assert) => {
    const result = await createRS384JWTToken(headerRS384, payload, RSA_PRIVATE_KEY);
    assert.equal(result, RS384_JWT_TOKEN);
  });

  QUnit.test('verifyRS384JWTToken() - Pass Test', async (assert) => {
    const result = await verifyRS384JWTToken(RS384_JWT_TOKEN, RSA_PUBLIC_KEY);
    assert.equal(result, true);
  });

  QUnit.test('verifyRS384JWTToken() - Fail Test', async (assert) => {
    const result = await verifyRS384JWTToken(RS384_JWT_TOKEN, RSA_PUBLIC_KEY_TEST_FAIL);
    assert.equal(result, false);
  });
});

/**
 * @module RS512
 */
QUnit.module('Generate / Verify JWT Using RS512 algorithm', (hooks) => {
  /**
   * @constants
   */
  const RS512_JWT_TOKEN = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.HlujHF0OAdz3vIiepuuodKODML0vm7qS1mwymWil9bfkJ5O3IUJxWNp4hDsH51kosev3GRfYk-gmaxtVkjSEUWRhL5dGfeUL1yQMU8V09xvECvbLiP64oyJUW5N9OI8o6cgkWmUDX6T6dGl2HMbc9usEamqa1ujFTVKr8khqpdE0IX8iw1Nljwr1v3FSgddesYyEN5Senuy95RZIWUx_YfDQiQ5FyFKSqgIyBJ-Jvj7CK0_2flw-8nGGdNOBnTFUSOpCLG4tYm_2QUKNQDTUVCVpp4H1E3eR_ukrAwo4554LRJF_hNz9BeapC5FFWVZJ1wSZxTTIMkA0q7WNs7DUIg';

  QUnit.test('createRS512JWT()', async (assert) => {
    const result = await createRS512JWTToken(headerRS512, payload, RSA_PRIVATE_KEY);
    assert.equal(result, RS512_JWT_TOKEN);
  });

  QUnit.test('verifyRS512JWTToken() - Pass Test', async (assert) => {
    const result = await verifyRS512JWTToken(RS512_JWT_TOKEN, RSA_PUBLIC_KEY);
    assert.equal(result, true);
  });

  QUnit.test('verifyRS512JWTToken() - Fail Test', async (assert) => {
    const result = await verifyRS512JWTToken(RS512_JWT_TOKEN, RSA_PUBLIC_KEY_TEST_FAIL);
    assert.equal(result, false);
  });
});

