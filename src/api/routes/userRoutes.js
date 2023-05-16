const express = require('express');
const router = express.Router();

const userLogin = require('../userLogin');
const userRegister = require('../userRegister');

router.post('/register', userRegister);
router.post('/login', userLogin);

module.exports = router;
