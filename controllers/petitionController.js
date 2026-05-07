const petitionService = require('../services/petitionService');

module.exports = {
    getHomePage: async (req, res) => {
        try {
            const petitions = await petitionService.getAllPetitions();
            res.render('index', { petitions });
        } catch (error) {
            console.error(error);
            res.status(500).send("Помилка завантаження даних.");
        }
    },

    // Відобразити сторінку редагування
    getEditPage: async (req, res) => {
        try {
            const petitions = await petitionService.getAllPetitions();
            const petition = petitions.find(p => p.id == req.params.id);
            res.render('edit', { petition });
        } catch (error) {
            res.status(500).send("Помилка завантаження форми.");
        }
    },

    addPetition: async (req, res) => {
        await petitionService.addPetition(req.body.title, req.body.description);
        res.redirect('/');
    },

    votePetition: async (req, res) => {
        await petitionService.votePetition(req.params.id);
        res.redirect('/');
    },

    deletePetition: async (req, res) => {
        await petitionService.deletePetition(req.params.id);
        res.redirect('/');
    },

    // Оновити дані
    updatePetition: async (req, res) => {
        await petitionService.updatePetition(req.params.id, req.body.title, req.body.description);
        res.redirect('/');
    }
};