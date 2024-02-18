import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
  DeleteJob,
} from './pages';
import { ErrorElement } from './components';
import { setDefaultTheme } from './utils/setTheme';

// Set dark or light theme
setDefaultTheme();

// Setup React query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // setting 5 minutes as cache time
    },
  },
});

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
        action: Login.action(queryClient),
      },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: DashboardLayout.loader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: AddJob.action(queryClient),
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: Stats.loader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: AllJobs.loader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: Profile.action(queryClient),
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: Admin.loader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: EditJob.loader(queryClient),
            action: EditJob.action(queryClient),
          },
          {
            path: 'delete-job/:id',
            action: DeleteJob.action(queryClient),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
