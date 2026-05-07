const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Petition = sequelize.define('Petition', {
    // Sequelize автоматично додасть ID, якщо не вказати інше
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'petitions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Petition;