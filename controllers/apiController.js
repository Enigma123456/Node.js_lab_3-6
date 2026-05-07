const Petition = require('../models/Petition');
const { Op } = require('sequelize'); // фільтрація

module.exports = {
    // 1. READ
    getAllPetitions: async (req, res) => {
        try {
            // Пагінація
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const offset = (page - 1) * limit;

            // Фільтрація
            const search = req.query.search || '';
            const whereCondition = search ? { title: { [Op.like]: `%${search}%` } } : {};

            const { count, rows } = await Petition.findAndCountAll({
                where: whereCondition,
                limit: limit,
                offset: offset,
                order: [['created_at', 'DESC']]
            });

            res.status(200).json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                data: rows
            });
        } catch (error) {
            res.status(500).json({ message: "Помилка сервера", error: error.message });
        }
    },

// 2. CREATE
    createPetition: async (req, res) => {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({ message: "Назва та опис обов’язкові" });
            }
            const newPetition = await Petition.create({ title, description });
            res.status(201).json(newPetition);
        } catch (error) {
            res.status(500).json({ message: "Помилка при створенні", error: error.message });
        }
    },

    // 3. UPDATE
    updatePetition: async (req, res) => {
        try {
            const { title, description } = req.body;
            const petition = await Petition.findByPk(req.params.id);
            if (!petition) {
                return res.status(404).json({ message: "Петицію не знайдено" });
            }
            await petition.update({ title, description });
            res.status(200).json(petition);
        } catch (error) {
            res.status(500).json({ message: "Помилка при оновленні", error: error.message });
        }
    },

    // 4. DELETE
    deletePetition: async (req, res) => {
        try {
            const deleted = await Petition.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                return res.status(404).json({ message: "Петицію не знайдено" });
            }
            res.status(200).json({ message: "Петицію успішно видалено" });
        } catch (error) {
            res.status(500).json({ message: "Помилка при видаленні", error: error.message });
        }
    }
};