const express = require('express');
const router = express.Router();
const translateController = require('../controllers/translate')

router.post('/', translateController.Translate)

module.exports = router;
