import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ProductListPage from '../pages/products/ProductListPage';
import AddProductPage from '../pages/products/AddProductPage';
import ProductDetailPage from '../pages/products/ProductDetailPage';
import EditProductPage from '../pages/products/EditProductPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'products/add', element: <AddProductPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'products/:id/edit', element: <EditProductPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
