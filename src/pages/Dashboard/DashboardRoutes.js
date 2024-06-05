import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
    AppointmentDetails, CalendarDay, Clients, Employees, EmployeesEdit, EmployeesPersona, PersonalInfoDashboard,
    PersonalEdit, Settings, DashboardMain, ServicesManagement, Analytics
} from "../../components";
import { Company, Services, ServicePage, ServiceAdd } from "../../components/Settings";

const DashboardRoutes = () => (
    <Routes>
        <Route path="/" element={<DashboardMain />} />
        <Route path="appointments/:eventId" element={<AppointmentDetails />} />
        <Route path="employees/">
            <Route index element={<Employees />} />
            <Route path=":id" element={<EmployeesPersona />} />
            <Route path=":id/edit" element={<EmployeesEdit />} />
        </Route>
        <Route path="clients" element={<Clients />} />
        <Route path="calendar" element={<CalendarDay />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="services" element={<ServicesManagement />} />
        <Route path="settings/">
            <Route index element={<Settings />} />
            <Route path="company" element={<Company />} />
            <Route path="services/">
                <Route index element={<Services />} />
                <Route path=":id" element={<ServicePage />} />
                <Route path="add" element={<ServiceAdd />} />
            </Route>
        </Route>
        <Route path="users/:id/">
            <Route index element={<PersonalInfoDashboard />} />
            <Route path="edit" element={<PersonalEdit />} />
        </Route>
    </Routes>
);

export default DashboardRoutes;
