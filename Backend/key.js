const crypto = require('crypto');
module.exports = {
    jwtSecret: crypto.randomBytes(64).toString('hex')
};