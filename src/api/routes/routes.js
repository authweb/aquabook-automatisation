const express = require('express');
const router = express.Router();

//Аутентификация
const userLogin = require('../userLogin');
const userRegister = require('../userRegister');

//Записи
const userAppointments = require('../userAppointments');
const userNewAppointment = require('../userNewAppointment');

//Информация о машине
const updateCarInfo = require('../updateCarInfo');
const deleteCarInfo = require('../deleteCarInfo');

//Клиенты - сотрудники
const employees = require('../employees');
const employee = require('../employeeId');
const clients = require('../clients');

//Категории услуг - услуги
const getServices = require('../getServices');
const getServicesCategories = require('../getServicesCategories');
const addServices = require('../addServices');
const addServicesCategories = require('../addServicesCategories');
const deleteServices = require('../deleteService');
const deleteServicesCategories = require('../deleteServiceCategory');
const updateServices = require('../updateService');
const updateServicesCategories = require('../updateServiceCategory');

//Добавление записей в таблицу базы данных
router.post('/updatecarinfo', updateCarInfo);
router.post('/myappointments', userAppointments);
router.post('/newappointment', userNewAppointment);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/services', addServices);
router.post('/services_categories', addServicesCategories);

//Получение записей из таблицы базы данных
router.get('/employees/:id', employee);
router.get('/employees', employees);
router.get('/clients', clients);
router.get('/services', getServices);
router.get('/services_categories', getServicesCategories);

//Удаление записей из таблицы базы данных
router.delete('/deletecarinfo', deleteCarInfo);
router.delete('/service/:id', deleteServices);
router.delete('/service-categories/:id', deleteServicesCategories);

//Обновление записей в таблице базы данных
router.put('/service/:id', updateServices);
router.put('/service_categories/:id', updateServicesCategories);

module.exports = router;
