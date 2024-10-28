module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      email: 'user1@example.com',
      password: 'hashedpassword1'
    },
    {
      email: 'user2@example.com',
      password: 'hashedpassword2'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
