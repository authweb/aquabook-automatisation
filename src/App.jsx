import React, { useState, useContext, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContexts';
import { HomePage, Login, Register, Dashboard } from './pages';
import { UserContext } from './contexts/UserContexts';
import AuthProvider from './contexts/AuthContexts';

import './scss/globalscss/_global.scss';

const useUpdateViewportDimensions = () => {
  useEffect(() => {
    const updateDimensions = () => {
      const html = document.documentElement;
      html.style.setProperty('--viewport-width', `${window.innerWidth}px`);
      html.style.setProperty('--viewport-height', `${window.innerHeight}px`);
    };

    window.addEventListener('resize', updateDimensions);

    // Устанавливаем начальные размеры
    updateDimensions();

    // Очистка обработчика
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
};

const App = () => {
  useUpdateViewportDimensions();
  const location = useLocation();
  const { users } = useContext(AuthContext);
  const [_, setUsers] = useState(null);
  const isHomePage = location.pathname === '/';
  const classNameMain = isHomePage ? 'flex flex-col min-h-screen' : '';
  const appointmentDetailsRegex = /\/dashboard\/calendar\/appointments\/\d+/;
  const isAppointmentDetailsPage = appointmentDetailsRegex.test(location.pathname);
  const className = (() => {
    if (location.pathname === '/') {
      return 'overflow-hidden relative flex flex-col video-block-app flex-grow link-white font-montserrat';
    } else if (location.pathname.includes('/dashboard/calendar/add')) {
      return 'eb-page-aside';
    } else if (isAppointmentDetailsPage) {
      return 'eb-appointments-details-page';
    }else if (location.pathname === '/login') {
      return 'eb-auth-layout';
    } else if (location.pathname === '/register') {
      return 'eb-register-page eb-register-page--has-image';
    } else {
      return 'ab-layout';
    }
  })();

  console.log(users?.first_name);
  return (
    <div id="__layout">
      <div className={classNameMain}>
        <div className={className}>
          <AuthProvider>
            <UserContext.Provider value={{ users, setUsers }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="dashboard/*" element={<Dashboard />} />
              </Routes>
            </UserContext.Provider>
          </AuthProvider>
        </div>
      </div>
    </div>
  );
};
export default App;
