const repository = require('../repositories/petitionRepository');

module.exports = {
    getAllPetitions: async () => {
        return await repository.getAllPetitions();
    },

    addPetition: async (title, description) => {
        await repository.createPetition(title, description);
    },

    votePetition: async (id) => {
        await repository.votePetition(id);
    },

    deletePetition: async (id) => {
        await repository.deletePetition(id);
    },

    updatePetition: async (id, title, description) => {
        await repository.updatePetition(id, title, description);
    }
};