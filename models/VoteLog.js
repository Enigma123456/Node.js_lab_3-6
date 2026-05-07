const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Petition = require('./Petition');

const VoteLog = sequelize.define('VoteLog', {
    vote_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'votes_log',
    timestamps: false
});

// Налаштовуємо зв'язок "Один-до-багатьох"
Petition.hasMany(VoteLog, { foreignKey: 'petition_id', onDelete: 'CASCADE' });
VoteLog.belongsTo(Petition, { foreignKey: 'petition_id' });

module.exports = VoteLog;