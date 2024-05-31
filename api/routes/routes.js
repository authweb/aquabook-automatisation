const express = require("express");
const router = express.Router();

//Аутентификация
const userLogin = require("../userLogin");
const userRegister = require("../userRegister");

//Записи
const userAppointments = require("../userAppointments");
const userNewAppointment = require("../userNewAppointment");
const getAppointments = require("../getAppointments");
const getAppointmentId = require("../getAppointmentId");
const addAppointmentIsPay = require("../addAppointmentIsPay");
const addAppointments = require("../addAppointments");

//Информация о машине
const updateCarInfo = require("../updateCarInfo");
const deleteCarInfo = require("../deleteCarInfo");

//Клиенты - сотрудники
const employees = require("../employees");
const employee = require("../employeeId");
const EditProfile = require("../editProfile");
const EditEmployee = require("../editEmployee");
const profile = require("../profileId");
const clients = require("../clients");
const clientId = require("../clientId");
const addClients = require("../addClients");

//Категории услуг - услуги
const getServices = require("../getServices");
const getServiceId = require("../getServiceId");
const getServicesCategories = require("../getServicesCategories");
const addServices = require("../addServices");
const addServicesCategories = require("../addServicesCategories");
const deleteServices = require("../deleteService");
const deleteServicesCategories = require("../deleteServiceCategory");
const updateServices = require("../updateService");
const updateServicesCategories = require("../updateServiceCategory");

//Добавление записей в таблицу базы данных
router.post("/updatecarinfo", updateCarInfo);
router.post("/myappointments", userAppointments);
router.post("/newappointment", userNewAppointment);
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/services", addServices);
router.post("/service-categories", addServicesCategories);
router.post("/clients", addClients);
router.post("/appointments", addAppointments);
router.post("/appointments/:id/pay", addAppointmentIsPay);
router.put("/profile/:id", EditProfile);
router.put("/employees/:id", EditEmployee);

//Получение записей из таблицы базы данных
router.get("/employees/:id", employee);
router.get("/employees", employees);
router.get("/clients", clients);
router.get("/clients/:id", clientId);
router.get("/services", getServices);
router.get("/services/:id", getServiceId);
router.get("/service-categories", getServicesCategories);
router.get("/appointments", getAppointments);
router.get("/appointments/:id", getAppointmentId);
router.get("/profile/:id", profile);

//Удаление записей из таблицы базы данных
router.delete("/deletecarinfo", deleteCarInfo);
router.delete("/service/:id", deleteServices);
router.delete("/service-categories/:id", deleteServicesCategories);

//Обновление записей в таблице базы данных
router.put("/service/:id", updateServices);
router.put("/service_categories/:id", updateServicesCategories);

module.exports = router;
