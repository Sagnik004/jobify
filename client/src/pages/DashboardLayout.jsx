import { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import { setDefaultTheme, changeTheme } from '../utils/setTheme';

const DashboardContext = createContext();

const DashboardLayout = () => {
  // Temporary until server is ready
  const user = { name: 'Sumith' };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(setDefaultTheme());

  const toggleDarkTheme = () => {
    const newState = !isDarkTheme;
    setIsDarkTheme(newState);
    changeTheme(newState);
  };
  const toggleSidebar = () => {
    console.log('toggleSidebar');
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    console.log('logout user');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
