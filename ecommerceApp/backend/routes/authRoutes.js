```javascript
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('ecommerceApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

// Authenticate the connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('User table synced'))
  .catch(err => console.log('Error syncing user table: ' + err));

// Register route
router.post('/register', async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
```