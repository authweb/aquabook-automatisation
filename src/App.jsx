import React, { useState, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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

import './scss/globalscss/_global.scss';

const App = () => {
  const location = useLocation();
  const { users } = useContext(AuthContext);
  const [_, setUsers] = useState(null);
  const className = location.pathname.includes('/dashboard/calendar/add')
    ? 'eb-page-aside'
    : 'ab-layout';
  console.log(users?.first_name);
  return (
    <div id="__layout">
      <div>
        <div className={className}>
          <AuthProvider>
            <UserContext.Provider value={{ users, setUsers }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />

                <Route path="dashboard/*" element={<Dashboard />} />
                {/* <Route path="profile/:clients_id">
                <Route index element={<Profile />} />
                <Route path="personal-info" element={<PersonalInfo />}>
                  <Route path="car-info" element={<CarInfoPage />} />
                </Route>
              </Route> */}
              </Routes>
            </UserContext.Provider>
          </AuthProvider>
        </div>
      </div>
    </div>
  );
};
export default App;
