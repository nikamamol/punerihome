import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Home,
  Shield,
  Key,
  AlertCircle,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Fingerprint,
  Loader2,
  XCircle,
  Check
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// import { useLoginMutation } from '../store/api/authApi';
// import { setCredentials, clearError, setSuccess } from '../store/slices/authSlice';
import { useLoginMutation } from "../../../store/api/authApi";
import { clearError, clearSuccess, setCredentials, setSuccess, setError } from "../../../store/slices/authSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get auth state from Redux store
  const { error: authError, success: authSuccess, loading: authLoading, user } = useSelector(
    (state) => state.auth
  );

  // Use RTK Query mutation for login
  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("tenant");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Combined loading state
  const loading = authLoading || loginLoading;

  const userTypes = [
    {
      id: "tenant",
      label: "Tenant",
      icon: User,
      dashboardPath: "/tenant/dashboard_section"
    },
    {
      id: "owner",
      label: "Property Owner",
      icon: Home,
      dashboardPath: "/owner/dashboard_section"
    },
    {
      id: "admin",
      label: "Admin",
      icon: Shield,
      dashboardPath: "/admin/dashboard"
    },
  ];

  // Check for registration success message from location state
  useEffect(() => {
    if (location.state?.message) {
      dispatch(setSuccess(location.state.message));

      // Auto-clear success message after 5 seconds
      const timer = setTimeout(() => {
        dispatch(setSuccess(""));
      }, 5000);

      return () => clearTimeout(timer);
    }

    // Clear form data
    setFormData({
      email: "",
      password: "",
      rememberMe: false,
    });
  }, [location, dispatch]);

  // Auto-fill remembered email if rememberMe was checked previously
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []);

  // Clear error when user type changes
  useEffect(() => {
    dispatch(clearError());
  }, [userType, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    dispatch(clearError());
  };
  // In LoginForm.jsx - update the handleSubmit function

  // In LoginForm.jsx - Update handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(clearSuccess());

    // Validation
    if (!formData.email || !formData.password) {
      dispatch(setError("Email and password are required"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dispatch(setError("Please enter a valid email address"));
      return;
    }

    try {
      const loginData = {
        email: formData.email,
        password: formData.password
      };

      const response = await login(loginData).unwrap();

      let userData = response.data?.user || response.user || response.data;

      if (response.success || response.status === 'success') {
        const userName = userData?.name || formData.email.split('@')[0];

        const token = response.token || response.data?.token;
        if (token && userData) {
          dispatch(setCredentials({ user: userData, token }));
        }

        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Check for pending like action
        const pendingLikePropertyId = localStorage.getItem('pendingLikePropertyId');
        const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');

        if (pendingLikePropertyId) {
          // User was trying to like a property before login
          console.log("📌 Processing pending like for property:", pendingLikePropertyId);

          // Clear pending data immediately
          localStorage.removeItem('pendingLikePropertyId');

          // Redirect back to properties page
          let redirectPath = '/properties';

          if (redirectAfterLogin) {
            redirectPath = redirectAfterLogin;
            localStorage.removeItem('redirectAfterLogin');
          }

          // Show success message with info about pending like
          dispatch(setSuccess(`Welcome back, ${userName}! You can now like properties.`));

          // Redirect to properties page
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 1000);

        } else {
          // No pending actions - normal login flow

          // Get user role
          let userRole = userData?.user_type ||
            userData?.userType ||
            userData?.role ||
            userData?.userRole ||
            'tenant';

          const matchedUserType = userTypes.find(type => type.id === userRole);
          let redirectPath = matchedUserType?.dashboardPath || '/';

          dispatch(setSuccess(`Welcome back, ${userName}!`));

          // Redirect to dashboard
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 1000);
        }

      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (err) {
      console.error("🔴 Login error:", err);

      if (err.data) {
        dispatch(setError(err.data?.message || err.data?.error || "Invalid credentials"));
      } else if (err.status === 'FETCH_ERROR') {
        dispatch(setError("Network error. Please check your connection."));
      } else {
        dispatch(setError(err.message || "Login failed. Please try again."));
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleQuickLogin = (type) => {
    // Demo credentials for quick login
    const demoCredentials = {
      tenant: {
        email: "tenant@example.com",
        password: "demo123"
      },
      owner: {
        email: "owner@example.com",
        password: "demo123"
      },
      admin: {
        email: "admin@example.com",
        password: "demo123"
      }
    };

    setUserType(type);
    setFormData({
      email: demoCredentials[type]?.email || "",
      password: demoCredentials[type]?.password || "",
      rememberMe: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black py-4 px-3 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        {/* Success and Error Messages from Redux */}
        {authSuccess && (
          <div className="mb-3 bg-green-500/10 border border-green-500/30 rounded-lg p-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
              <p className="text-xs text-green-300">{authSuccess}</p>
            </div>
          </div>
        )}

        {authError && (
          <div className="mb-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-300">{authError}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-white mb-1 text-glow">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-400">Sign in to access your account</p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-700/50">
          {/* User Type Selection */}
          <div className="p-4 border-b border-gray-700/50">
            <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              Login As:
            </h2>
            <div className="grid grid-cols-3 gap-1">
              {userTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = userType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    disabled={loading}
                    className={`p-2 rounded-md border transition-all duration-200 ${isSelected
                      ? `border-yellow-500 bg-gradient-to-br from-gray-800 to-gray-900 shadow shadow-yellow-500/20`
                      : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`p-1 rounded-full ${isSelected
                          ? "bg-gradient-to-br from-yellow-500/20 to-yellow-400/10"
                          : "bg-gray-800"
                          }`}
                      >
                        <Icon
                          className={`h-3 w-3 ${isSelected ? "text-yellow-400" : "text-gray-400"
                            }`}
                        />
                      </div>
                      <span
                        className={`text-[10px] font-medium ${isSelected ? "text-white" : "text-gray-400"
                          }`}
                      >
                        {type.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Mail className="h-3 w-3 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-7 w-full px-2 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-xs text-gray-100 placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-gray-300">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className="text-[10px] text-yellow-400 hover:text-yellow-300 transition-colors disabled:opacity-50"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Lock className="h-3 w-3 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-7 pr-7 w-full px-2 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-xs text-gray-100 placeholder-gray-500"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2 flex items-center"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3 w-3 text-gray-400 hover:text-yellow-400 transition-colors" />
                    ) : (
                      <Eye className="h-3 w-3 text-gray-400 hover:text-yellow-400 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Quick Login */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <label className="flex items-center gap-1 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-3 w-3 text-yellow-500 focus:ring-yellow-500/50 focus:ring-offset-gray-900 border-gray-600 rounded bg-gray-800 cursor-pointer group-hover:border-yellow-400 transition-colors disabled:opacity-50"
                  />
                  <span className={`text-xs ${loading ? 'text-gray-500' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
                    Remember me
                  </span>
                </label>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400">Quick:</span>
                  <div className="flex gap-0.5">
                    {userTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleQuickLogin(type.id)}
                        disabled={loading}
                        className="p-1 bg-gray-800 border border-gray-700 rounded hover:border-yellow-500/50 hover:bg-gray-700 transition-colors disabled:opacity-50"
                        title={`Login as ${type.label}`}
                      >
                        <type.icon className="h-2 w-2 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-2 px-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-md transition-all duration-300 shadow transform hover:-translate-y-0.5 flex items-center justify-center gap-1 group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed text-xs"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="relative z-10">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-1">
                        Sign In
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white to-transparent transition-opacity duration-300 animate-wave"></div>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Alternative Login Options */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("loginUserType", userType);
                  navigate("/otp-verification", { state: { userType } });
                }}
                disabled={loading}
                className="p-2 bg-gray-800/50 border border-gray-700 rounded-md hover:border-gray-600 hover:bg-gray-800 transition-all flex items-center justify-center gap-1 group disabled:opacity-50 text-xs"
              >
                <Smartphone className="h-3 w-3 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                <span className="text-xs text-gray-300">OTP Login</span>
              </button>
              <button
                type="button"
                disabled={loading}
                className="p-2 bg-gray-800/50 border border-gray-700 rounded-md hover:border-gray-600 hover:bg-gray-800 transition-all flex items-center justify-center gap-1 group disabled:opacity-50 text-xs"
              >
                <Fingerprint className="h-3 w-3 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                <span className="text-xs text-gray-300">Biometric</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-xs text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-2 transition-colors text-xs"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/50 px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="p-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded border border-gray-700">
                  <Shield className="h-2 w-2 text-yellow-400" />
                </div>
                <span className="text-[10px] text-gray-400">Secure Login</span>
              </div>
              <div className="flex items-center gap-0.5 text-[10px] text-gray-500">
                <CheckCircle className="h-2 w-2 text-yellow-400" />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;