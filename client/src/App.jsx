import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Landing,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
  DeleteJob
} from './pages';
// import DeleteJob.action as deleteJobAction from './pages/DeleteJob';
import { setDefaultTheme } from './utils/setTheme';

// Set dark or light theme
setDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: Register.action,
      },
      {
        path: 'login',
        element: <Login />,
        action: Login.action,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: DashboardLayout.loader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: AddJob.action,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: AllJobs.loader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: Profile.action,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: Admin.loader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: EditJob.loader,
            action: EditJob.action,
          },
          {
            path: 'delete-job/:id',
            action: DeleteJob.action,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
