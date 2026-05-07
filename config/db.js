const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Petitions_DB', 'root', '#As1029384756As', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false     // Викл вивід
});

sequelize.authenticate()
    .then(() => console.log('Sequelize успішно підключився до бази даних!'))
    .catch(err => console.error('Помилка підключення Sequelize:', err));

module.exports = sequelize;
