const express = require('express');
const path = require('path');
const petitionController = require('./controllers/petitionController');
const apiController = require('./controllers/apiController');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.get('/', petitionController.getHomePage);
app.post('/create', petitionController.addPetition);
app.post('/vote/:id', petitionController.votePetition);
app.post('/delete/:id', petitionController.deletePetition);
app.get('/edit/:id', petitionController.getEditPage);
app.post('/update/:id', petitionController.updatePetition);

app.use(express.json()); 

app.get('/api/petitions', apiController.getAllPetitions);
app.post('/api/petitions', apiController.createPetition);
app.put('/api/petitions/:id', apiController.updatePetition);
app.delete('/api/petitions/:id', apiController.deletePetition);

app.listen(PORT, () => {
    console.log(`Сервер запущено! Відкрий у браузері: http://localhost:${PORT}`);
});