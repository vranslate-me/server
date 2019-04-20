const express = require('express');
const router = express.Router();
const translateController = require('../controllers/translate')

router.post('/translate', translateController.Translate)

module.exports = router;
