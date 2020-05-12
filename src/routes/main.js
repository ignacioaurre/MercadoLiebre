const fs = require('fs')
var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController')

/* GET home page. */
router.get('/', mainController.home)
router.get('/ofertas', mainController.ofertas)

module.exports = router;
