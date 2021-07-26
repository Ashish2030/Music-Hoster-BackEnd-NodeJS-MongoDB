const test    = require('tape');
const toBytes = require('./to-byte-array');
const toHex   = require('to-hex');

test('lib/to-byte-array', t => {
  t.plan(9);
  t.equal(toHex(toBytes('48656c6c6f20576f726c64'))                                            , '48656c6c6f20576f726c64', 'Hex input -> str'          );
  t.equal(toHex(toBytes('SGVsbG8gV29ybGQ'))                                                   , '48656c6c6f20576f726c64', 'Base64url input -> str'    );
  t.equal(toHex(toBytes(Buffer.from('Hello World')))                                          , '48656c6c6f20576f726c64', 'Buffer input -> str'       );
  t.equal(toHex(toBytes([ 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64 ])), '48656c6c6f20576f726c64', 'Array<number> input -> str');
  t.equal(toBytes({foo:'bar'})                                                                , null                    , 'Object input -> null'      );
  t.equal(toBytes(true)                                                                       , null                    , 'TRUE input -> null'        );
  t.equal(toBytes(false)                                                                      , null                    , 'FALSE input -> null'       );
  t.equal(toBytes(null)                                                                       , null                    , 'NULL input -> null'        );
  t.equal(toBytes(undefined)                                                                  , null                    , 'UNDEFINED input -> null'   );
});
