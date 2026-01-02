import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import PropertiesPage from '../features/properties/PropertiesPage';
import PropertyDetailsPage from '../features/properties/PropertyDetailsPage';
// import LoginPage from '../features/auth/components/LoginForm';
// import RegisterPage from '../features/auth/components/RegisterForm';
// import TenantDashboardPage from '../features/tenant/pages/TenantDashboardPage';
// import OwnerDashboardPage from '../features/owner/pages/OwnerDashboardPage';
// import AdminPanel from '../features/admin/pages/AdminPanel';
// import PrivateRoute from './PrivateRoute';
// import TenantRoute from './TenantRoute';
// import OwnerRoute from './OwnerRoute';
// import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/properties/:id" element={<PropertyDetailsPage />} />
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> */}
      

    </Routes>
  );
};

export default AppRoutes;