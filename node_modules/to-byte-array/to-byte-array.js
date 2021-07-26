const b64url   = require('base64url'),
      isBuffer = require('is-buffer');

/**
 * @param subject
 * @returns {Array}
 */
module.exports = function toByteArray( subject ) {
  if(!subject) return null;
  if(Array.isArray(subject)) return subject;
  if(isBuffer(subject)) return [...subject];
  if('string'!==typeof subject) return null;
  if(subject.match(/[^0-9a-f]/ig)) {
    return [...b64url.toBuffer(subject)];
  } else {
    return subject.match(/[0-9a-f]{1,2}/ig).map(c=>parseInt(c,16));
  }
};
