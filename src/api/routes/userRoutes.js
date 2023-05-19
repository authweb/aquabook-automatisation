const express = require('express');
const router = express.Router();

const userLogin = require('../userLogin');
const userRegister = require('../userRegister');
const userAppointments = require('../userAppointments');
const userNewAppointment = require('../userNewAppointment');
const updateCarInfo = require('../updateCarInfo');

router.post('/updatecarinfo', updateCarInfo);
router.post('/myappointments', userAppointments);
router.post('/newappointment', userNewAppointment);
router.post('/register', userRegister);
router.post('/login', userLogin);

module.exports = router;
