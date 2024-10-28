```javascript
const bcrypt = require('bcrypt');

function encryptPassword(plainPassword) {
    const saltRounds = 10;
    return bcrypt.hash(plainPassword, saltRounds);
}

function comparePassword(plainPassword, hash) {
    return bcrypt.compare(plainPassword, hash);
}

module.exports = {
    encryptPassword,
    comparePassword,
    modelName: 'users'
};
```