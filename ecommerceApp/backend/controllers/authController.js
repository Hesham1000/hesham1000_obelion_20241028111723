```javascript
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Database connection
const sequelize = new Sequelize('ecommerceApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

// Define User model
const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

// Import SQL files
const createUsersTableSQL = fs.readFileSync(path.join(__dirname, '../database/migrations/createUsersTable.sql')).toString();
const seedUsersSQL = fs.readFileSync(path.join(__dirname, '../database/seeders/seedUsers.sql')).toString();

// Initialize the database
sequelize.query(createUsersTableSQL)
  .then(() => sequelize.query(seedUsersSQL))
  .catch(err => console.log('Error initializing database:', err));

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const newUser = await User.create({ email, password });
    res.status(201).json({ message: 'Registration successful!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};
```