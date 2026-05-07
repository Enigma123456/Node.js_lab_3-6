const sequelize = require('../config/db');
const Petition = require('../models/Petition');
const VoteLog = require('../models/VoteLog');

module.exports = {
    getAllPetitions: async () => {
        return await Petition.findAll({ order: [['created_at', 'DESC']] });
    },

    createPetition: async (title, description) => {
        const t = await sequelize.transaction();
        try {
            const petition = await Petition.create({ title, description }, { transaction: t });
            await t.commit();
            return petition;
        } catch (e) { await t.rollback(); throw e; }
    },

    deletePetition: async (id) => {
        const t = await sequelize.transaction();
        try {
            await Petition.destroy({ where: { id }, transaction: t });
            await t.commit();
        } catch (e) { await t.rollback(); throw e; }
    },

    updatePetition: async (id, title, description) => {
        const t = await sequelize.transaction();
        try {
            await Petition.update({ title, description }, { where: { id }, transaction: t });
            await t.commit();
        } catch (e) { await t.rollback(); throw e; }
    },

    votePetition: async (id) => {
        const t = await sequelize.transaction();
        try {
            const petition = await Petition.findByPk(id, { transaction: t });
            if (petition) {
                await petition.increment('votes', { by: 1, transaction: t });
                await VoteLog.create({ petition_id: id }, { transaction: t });
            }
            await t.commit();
        } catch (error) { await t.rollback(); throw error; }
    }
};

// module.exports = {
//     1. Синхронне читання
//     getPetitionsSync: () => {
//         const data = fs.readFileSync(dataPath, 'utf8');
//         return JSON.parse(data);
//     },

//     2. Асинхронне читання з використанням Callback
//     getPetitionsCallback: (callback) => {
//         fs.readFile(dataPath, 'utf8', (err, data) => {
//             if (err) return callback(err, null);
//             callback(null, JSON.parse(data));
//         });
//     },

//     3. Асинхронне читання з використанням Promise
//     getPetitionsPromise: () => {
//         return new Promise((resolve, reject) => {
//             fs.readFile(dataPath, 'utf8', (err, data) => {
//                 if (err) reject(err);
//                 else resolve(JSON.parse(data));
//             });
//         });
//     },