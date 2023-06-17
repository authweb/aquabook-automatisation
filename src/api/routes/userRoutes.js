const express = require('express');
const router = express.Router();

const userLogin = require('../userLogin');
const userRegister = require('../userRegister');
const userAppointments = require('../userAppointments');
const userNewAppointment = require('../userNewAppointment');
const updateCarInfo = require('../updateCarInfo');
const deleteCarInfo = require('../deleteCarInfo');
const employees = require('../employees');
const employee = require('../employeeId');
const clients = require('../clients');

router.post('/updatecarinfo', updateCarInfo);
router.post('/myappointments', userAppointments);
router.post('/newappointment', userNewAppointment);
router.post('/register', userRegister);
router.post('/login', userLogin);

router.get('/employees/:id', employee);
router.get('/employees', employees);
router.get('/clients', clients);

router.delete('/deletecarinfo', deleteCarInfo);

module.exports = router;
