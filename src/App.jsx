import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/styles.scss'; // добавляем импорт стилей
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
  //   const { user } = useContext(AuthContext);
  const [clients, setClients] = useState(null);
  //   console.log(user.first_name);
  return (
    <div className="App">
      <main className="App-main container">
        {/* <h1>User: {user && user.first_name}</h1> */}
        {/* first_name={user.first_name} */}
        <AuthProvider>
          <UserContext.Provider value={{ clients, setClients }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="profile/:clients_id">
                <Route index element={<Profile />} />
                <Route path="personal-info" element={<PersonalInfo />}>
                  <Route path="car-info" element={<CarInfoPage />} />
                </Route>
              </Route>
              <Route path="/admin/dashboard/" element={<Dashboard />} />
            </Routes>
          </UserContext.Provider>
        </AuthProvider>
      </main>
    </div>
  );
};
export default App;
