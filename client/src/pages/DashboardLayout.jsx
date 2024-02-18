import { useState, createContext, useContext } from 'react';
import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components';
import { setDefaultTheme, changeTheme } from '../utils/setTheme';
import customFetch from '../utils/customFetch';

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const res = await customFetch.get('/users/current-user');
    return res.data;
  },
};

const loader = (queryClient) => {
  return async () => {
    try {
      // Retrieve user details from backend. Token will get passed along.
      // On success, data will be available to component.
      // On failure, we will redirect user to root page for security reasons
      return await queryClient.ensureQueryData(userQuery);
    } catch (error) {
      return redirect('/');
    }
  };
};

const DashboardContext = createContext();

const DashboardLayout = ({ queryClient }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { user } = useQuery(userQuery).data;
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(setDefaultTheme());

  const isPageLoading = navigation.state === 'loading';

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
    navigate('/');
    await customFetch.get('/auth/logout');
    queryClient.invalidateQueries();
    toast.success('Logging out...');
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
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

DashboardLayout.loader = loader;

DashboardLayout.propTypes = {
  queryClient: PropTypes.object,
};

export default DashboardLayout;
