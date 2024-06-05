const express = require("express");
const router = express.Router();

//Аутентификация
const userLogin = require("../userLogin");
const userRegister = require("../userRegister");

//Записи
const userAppointments = require("../userAppointments");
const userNewAppointment = require("../userNewAppointment");
const appointments = require("../appointments");

//Информация о машине
const updateCarInfo = require("../updateCarInfo");
const deleteCarInfo = require("../deleteCarInfo");

//Клиенты - сотрудники
const departments = require("../departments");
const employees = require("../employees");
const employee = require("../employeeId");
const EditProfile = require("../editProfile");
const EditEmployee = require("../editEmployee");
const profile = require("../profileId");
const clients = require("../clients");
const clientId = require("../clientId");
const addClients = require("../addClients");

//Категории услуг - услуги
const services = require("../services");
const servicesCategories = require("../servicesCategories");

//Добавление записей в таблицу базы данных
router.post("/updatecarinfo", updateCarInfo);
router.post("/myappointments", userAppointments);
router.post("/newappointment", userNewAppointment);
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/services", services);
router.post("/service-categories", servicesCategories);
router.post("/clients", addClients);
router.post("/appointments", appointments);
router.post("/departments", departments);
router.post("/appointments/:id/pay", appointments);

//Получение записей из таблицы базы данных
router.get("/employees/:id", employee);
router.get("/employees", employees);
router.get("/clients", clients);
router.get("/clients/:id", clientId);
router.get("/services", services);
router.get("/services/:id", services);
router.get("/service-categories", servicesCategories);
router.get("/appointments", appointments);
router.get("/appointments/:id", appointments);
router.get("/profile/:id", profile);
router.get("/departments", departments);

//Удаление записей из таблицы базы данных
router.delete("/deletecarinfo", deleteCarInfo);
router.delete("/service/:id", services);
router.delete("/service-categories/:id", servicesCategories);
router.delete("/appointments/:id", appointments);
router.delete("/departments/:id", departments);

//Обновление записей в таблице базы данных
router.put("/service/:id", services);
router.put("/service_categories/:id", servicesCategories);
router.put("/appointments/:id", appointments);
router.put("/profile/:id", EditProfile);
router.put("/employees/:id", EditEmployee);
router.put("/departments/:id", departments);

module.exports = router;
