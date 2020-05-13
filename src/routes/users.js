const fs = require('fs')
var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController')

/* GET home page. */
router.get('/register', usersController.register)
router.post('/register', usersController.guardar)
router.get('/login', usersController.login)
router.post('/auth', usersController.auth)


module.exports = router;