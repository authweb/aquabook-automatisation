import React, { useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/styles.scss';
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

const App = () => {
  const { users } = useContext(AuthContext);
  const [_, setUsers] = useState(null);
  console.log(users?.first_name);
  return (
    <div className="App">
      <main className="App-main container-fluid">
        <AuthProvider>
          <UserContext.Provider value={{ users, setUsers }}>
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/appointment" element={<Appointment />} />
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
      </main>
    </div>
  );
};
export default App;
