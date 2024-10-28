```javascript
const jwt = require('jsonwebtoken');
const { User } = require('../models/user'); // Import User model

module.exports = function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded.user;
    
    // Ensure the user exists in the database
    User.findByPk(req.user.id).then(user => {
      if (!user) {
        return res.status(401).json({ msg: 'User not found' });
      }
      next();
    }).catch(err => {
      res.status(500).json({ msg: 'Server error' });
    });
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
```