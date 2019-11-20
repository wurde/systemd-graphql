/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Constants
 */

const schemaPath = path.join(__dirname, '..', 'schema.graphql');

/**
 * Define assertions
 */

describe("Schema", () => {
  test("snapshot", () => {
    const schema = fs.readFileSync(schemaPath, { encoding: 'utf8' });
    const hmac = crypto.createHmac('sha256', schema);
    expect(hmac.digest('hex')).toEqual(
      '23b4a7b8d2b602d124c1a7ee1190d947af10a3ce6ca13f6e42a16774d0e13c2e'
    );
  })
})
