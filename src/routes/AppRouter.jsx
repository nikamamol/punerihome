import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import PropertiesPage from "../features/properties/PropertiesPage";
import PropertyDetailsPage from "../features/properties/PropertyDetailsPage";
import Footer from "../components/layout/Footer/Footer";
import AddProperty from "../features/properties/pages/AddProperty";
import RegisterForm from "../features/auth/components/RegisterForm";
import LoginForm from "../features/auth/components/LoginForm";
import VerifiedProperties from "../features/properties/VerifiedProperties";
import Support from "../pages/Contact/Support";
import PremiumListings from "../features/properties/PremiumListings";
import Areaexperts from "../pages/Contact/Areaexperts";
import FlexibleViewings from "../pages/Contact/FlexibleViewings";
import Insights from "../pages/OwnerVerification/Insights";
import Articles from "../pages/Articlesandnews/Articles";
import News from "../pages/Articlesandnews/News";
import OwnerDashboard from "../features/owner/OwnerDashboard";
import Header from "../components/layout/Header/Header";
import OwnerProperties from "../features/owner/OwnerProperties";
import OTPVerification from "../features/auth/components/OTPVerification";
import AddPayment from "../features/owner/AddPayment";

// Import Footer Components
import AboutUs from "../pages/Footer/Aboutus";
import Blog from "../pages/Footer/Blog";
import Careers from "../pages/Footer/Careers";
import Disclaimer from "../pages/Footer/Disclaimer";
import Faq from "../pages/Footer/Faq";
import PrivacyPolicy from "../pages/Footer/PrivacyPolicy";
import TermsOfUse from "../pages/Footer/TermsofUse";

// Import Admin Components
import AdminDashboard from "../features/admin/components/AdminDashboard";
import TenantDashboard from "../features/tenant/components/TenantDashboard";
import Paymentintegration from "../features/payment/components/Paymentintegration";
import Pricing from "../features/Pricing/TenantPricing";
import OwnerPricing from "../features/Pricing/OwnerPricing";
// import AdminProperties from "../features/admin/AdminProperties";
// import AdminOwners from "../features/admin/AdminOwners";
// import AdminTenants from "../features/admin/AdminTenants";
// import AdminPayments from "../features/admin/AdminPayments";
// import AdminAnalytics from "../features/admin/AdminAnalytics";
// import AdminReports from "../features/admin/AdminReports";
// import AdminInquiries from "../features/admin/AdminInquiries";
// import AdminSettings from "../features/admin/AdminSettings";
// import AdminLogin from "../features/admin/AdminLogin";

// Layout Components
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const OwnerLayout = ({ children }) => {
  return <>{children}</>;
};

const AuthLayout = ({ children }) => {
  return <>{children}</>;
};

const AdminLayout = ({ children }) => {
  return <>{children}</>;
};
const TenantLayout = ({ children }) => {
  return <>{children}</>;
};
// PaymentLayout को हटा दिया क्योंकि अब MainLayout का use करेंगे

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Main Layout (Header + Footer) */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      <Route
        path="/articles"
        element={
          <MainLayout>
            <Articles />
          </MainLayout>
        }
      />

      <Route
        path="/news"
        element={
          <MainLayout>
            <News />
          </MainLayout>
        }
      />

      <Route
        path="/properties"
        element={
          <MainLayout>
            <PropertiesPage />
          </MainLayout>
        }
      />

      <Route
        path="/properties/:id"
        element={
          <MainLayout>
            <PropertyDetailsPage />
          </MainLayout>
        }
      />

      <Route
        path="/services/verified-properties"
        element={
          <MainLayout>
            <VerifiedProperties />
          </MainLayout>
        }
      />

      <Route
        path="/services/24/7-support"
        element={
          <MainLayout>
            <Support />
          </MainLayout>
        }
      />

      <Route
        path="/services/premium-listings"
        element={
          <MainLayout>
            <PremiumListings />
          </MainLayout>
        }
      />

      <Route
        path="/services/area-experts"
        element={
          <MainLayout>
            <Areaexperts />
          </MainLayout>
        }
      />

      <Route
        path="/services/flexible-viewings"
        element={
          <MainLayout>
            <FlexibleViewings />
          </MainLayout>
        }
      />

      <Route
        path="/addownerproperty"
        element={
          <MainLayout>
            <AddProperty />
          </MainLayout>
        }
      />

      <Route
        path="/owner/insights"
        element={
          <MainLayout>
            <Insights />
          </MainLayout>
        }
      />

      {/* Footer Pages Routes */}
      <Route
        path="/about-us"
        element={
          <MainLayout>
            <AboutUs />
          </MainLayout>
        }
      />

      <Route
        path="/blog"
        element={
          <MainLayout>
            <Blog />
          </MainLayout>
        }
      />

      <Route
        path="/careers"
        element={
          <MainLayout>
            <Careers />
          </MainLayout>
        }
      />

      <Route
        path="/disclaimer"
        element={
          <MainLayout>
            <Disclaimer />
          </MainLayout>
        }
      />

      <Route
        path="/faq"
        element={
          <MainLayout>
            <Faq />
          </MainLayout>
        }
      />

      <Route
        path="/privacy-policy"
        element={
          <MainLayout>
            <PrivacyPolicy />
          </MainLayout>
        }
      />

      <Route
        path="/terms-of-use"
        element={
          <MainLayout>
            <TermsOfUse />
          </MainLayout>
        }
      />
          <Route
        path="/pricing-plans"
        element={
          <MainLayout>
            <Pricing />
          </MainLayout>
        }
      />
               <Route
        path="/owner-pricing-plans"
        element={
          <MainLayout>
            <OwnerPricing />
          </MainLayout>
        }
      />

      {/* Payment Integration Route - With Header & Footer */}
      <Route
        path="/payment-integration"
        element={
          <MainLayout>
            <Paymentintegration />
          </MainLayout>
        }
      />

      {/* Auth Routes - NO Header/Footer */}
      <Route
        path="/register"
        element={
          <AuthLayout>
            <RegisterForm />
          </AuthLayout>
        }
      />

      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginForm />
          </AuthLayout>
        }
      />

      <Route
        path="/otp-verification"
        element={
          <AuthLayout>
            <OTPVerification />
          </AuthLayout>
        }
      />

      {/* Owner Dashboard Routes - NO Header/Footer */}
      <Route
        path="/owner/dashboard_section"
        element={
          <OwnerLayout>
            <OwnerDashboard />
          </OwnerLayout>
        }
      />
      <Route
        path="/owner/ownerproperties_section"
        element={
          <OwnerLayout>
            <OwnerProperties />
          </OwnerLayout>
        }
      />

      <Route
        path="/owner/add-payment"
        element={
          <OwnerLayout>
            <AddPayment />
          </OwnerLayout>
        }
      />

      {/* Admin Dashboard Routes - Admin Layout */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />

      {/* Tenant Dashboard Routes - Tenant Layout */}
      <Route
        path="/tenant/dashboard_section"
        element={
          <TenantLayout>
            <TenantDashboard />
          </TenantLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;