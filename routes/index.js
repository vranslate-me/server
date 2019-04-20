const express = require('express');
const router = express.Router();
const translateController = require('../controllers/translate')
const scoresController = require('../controllers/scores')

router.get('/scores', scoresController.fetchSortedScores)              
router.post('/scores', scoresController.inputScore) 
router.post('/translate', translateController.Translate)

module.exports = router;
