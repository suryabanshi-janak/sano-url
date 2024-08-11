import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import AuthPage from './pages/Auth';
import LinkPage from './pages/Link';
import RedirectLinkPage from './pages/RedirectLink';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/auth', element: <AuthPage /> },
      { path: '/link:id', element: <LinkPage /> },
      { path: '/:id', element: <RedirectLinkPage /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
