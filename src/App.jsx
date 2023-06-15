import React, { useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/styles.scss'; // добавляем импорт стилей
import { AuthContext } from './contexts/AuthContexts';
import {
  HomePage,
  Appointment,
  AuthPage,
  Profile,
  PersonalInfo,
  CarInfoPage,
  Dashboard,
} from './pages';
import { UserContext } from './contexts/UserContexts';
import AuthProvider from './contexts/AuthContexts';
import { PersonalInfoDashboard, Employees, Clients } from './components';

const App = () => {
  const { users } = useContext(AuthContext);
  const [user, setUsers] = useState(null);
  console.log(users?.first_name);
  return (
    <div className="App">
      <main className="App-main container">
        {/* <Route path="profile/:clients_id">
          <Route index element={<Profile />} />
          <Route path="personal-info" element={<PersonalInfo />}>
            <Route path="car-info" element={<CarInfoPage />} />
          </Route>
        </Route> */}
        <AuthProvider>
          <UserContext.Provider value={{ users, setUsers }}>
            {/* <h1>User: {user && user.first_name}</h1>
            first_name={user.first_name} */}
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/auth" element={<AuthPage />} />

              <Route path="dashboard/*" element={<Dashboard />} />
              {/* <Route path="profile" element={<PersonalInfoDashboard />} />
              
              <Route path="clients" element={<Clients />} />
              <Route path="services" element={<div>Services</div>} />
              <Route path="settings" element={<div>Settings</div>} /> */}
            </Routes>
          </UserContext.Provider>
        </AuthProvider>
      </main>
    </div>
  );
};
export default App;
