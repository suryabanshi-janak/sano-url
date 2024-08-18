import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import AuthPage from './pages/Auth';
import LinkPage from './pages/Link';
import RedirectLinkPage from './pages/RedirectLink';
import UrlProvider from './components/URLProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/auth', element: <AuthPage /> },
      {
        path: '/link:id',
        element: (
          <ProtectedRoute>
            <LinkPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/:id',
        element: (
          <ProtectedRoute>
            <RedirectLinkPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
