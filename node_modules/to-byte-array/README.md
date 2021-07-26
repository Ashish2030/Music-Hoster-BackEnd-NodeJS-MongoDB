# to-byte-array

Convert a string or buffer into a plain array of bytes

## Why

This small package was first used throughout multiple repositories within the
company I work at. In each of the instances, small changes were made sometimes,
so we never knew which version was the right one.

This package simply prevents such mistakes from happening again.

## Usage

This package only returns a function. That one functions accepts a string in
either hexidecimal or base64url format. Whenever a non-hexidecimal character is
encountered within the string, base64url is assumed (so no whitespace support
in hexidecimal strings).

```js
const toBytes = require('to-byte-array');

toBytes('DEADBEEF');   // [ 222, 173, 190, 239 ]
toBytes('deadbeef');   // [ 222, 173, 190, 239 ]
toBytes('HelloWorld'); // [  29, 233, 101, 161, 43, 149 ]
```
