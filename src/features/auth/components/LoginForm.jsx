import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
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
  Hash,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("tenant"); // 'tenant', 'owner', 'admin'
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userTypes = [
    {
      id: "tenant",
      label: "Tenant",
      icon: User,
      color: "bg-gradient-to-br from-gray-800 to-gray-900",
      borderColor: "border-gray-700",
      iconColor: "text-yellow-400",
      idLabel: "Tenant ID",
      idPlaceholder: "Enter your tenant ID",
      idPrefix: "TEN",
    },
    {
      id: "owner",
      label: "Property Owner",
      icon: Home,
      color: "bg-gradient-to-br from-gray-800 to-gray-900",
      borderColor: "border-gray-700",
      iconColor: "text-yellow-400",
      idLabel: "Owner ID",
      idPlaceholder: "Enter your owner ID",
      idPrefix: "OWN",
    },
    {
      id: "admin",
      label: "Admin",
      icon: Shield,
      color: "bg-gradient-to-br from-gray-800 to-gray-900",
      borderColor: "border-gray-700",
      iconColor: "text-yellow-400",
      idLabel: "Admin ID",
      idPlaceholder: "Enter your admin ID",
      idPrefix: "ADM",
    },
  ];

  const currentUserType = userTypes.find((type) => type.id === userType);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.id || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Login Data:", { userType, ...formData });

      // Show success message
      alert("Login successful!");

      // Redirect based on user type
      switch (userType) {
        case "tenant":
          navigate("/otp-verification");
          break;
        case "owner":
          navigate("/otp-verification");
          break;
        case "admin":
          navigate("/otp-verification");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleQuickLogin = (type) => {
    // Simulate quick login
    const userTypeInfo = userTypes.find((t) => t.id === type);
    setUserType(type);
    setFormData({
      id: `${userTypeInfo.idPrefix}${Math.floor(1000 + Math.random() * 9000)}`,
      email: type === "admin" ? "admin@example.com" : `${type}@example.com`,
      password: "demo123",
      rememberMe: false,
    });
  };

  const handleForgotId = () => {
    navigate("/forgot-id");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black py-8 px-4 md:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-glow">
            Welcome Back
          </h1>
          <p className="text-gray-400">Sign in to access your account</p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* User Type Selection */}
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Login As:
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {userTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = userType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      isSelected
                        ? `border-yellow-500 ${type.color} shadow-lg shadow-yellow-500/20`
                        : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`p-2 rounded-full ${
                          isSelected
                            ? "bg-gradient-to-br from-yellow-500/20 to-yellow-400/10"
                            : "bg-gray-800"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            isSelected ? "text-yellow-400" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isSelected ? "text-white" : "text-gray-400"
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
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                </div>
              )}

              {/* ID Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    {currentUserType?.idLabel} *
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotId}
                    className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Forgot ID?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
                    placeholder={currentUserType?.idPlaceholder}
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded border border-gray-700">
                      {currentUserType?.idPrefix}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-yellow-400 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-yellow-400 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Quick Login */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-500/50 focus:ring-offset-gray-900 border-gray-600 rounded bg-gray-800 cursor-pointer group-hover:border-yellow-400 transition-colors"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    Remember me
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Quick Login:</span>
                  <div className="flex gap-1">
                    {userTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleQuickLogin(type.id)}
                        className="p-1.5 bg-gray-800 border border-gray-700 rounded hover:border-yellow-500/50 hover:bg-gray-700 transition-colors"
                        title={`Login as ${type.label}`}
                      >
                        <type.icon className="h-3 w-3 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-3 md:py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-2">
                        Sign In
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white to-transparent transition-opacity duration-300 animate-wave"></div>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-3 bg-gray-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Alternative Login Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => {
                  // Save user type in localStorage
                  localStorage.setItem("loginUserType", userType);
                  navigate("/otp-verification", { state: { userType } });
                }}
                className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
              >
                <Smartphone className="h-5 w-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                <span className="text-sm text-gray-300">OTP Login</span>
              </button>
              <button
                type="button"
                className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
              >
                <Fingerprint className="h-5 w-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                <span className="text-sm text-gray-300">Biometric</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  onClick={handleSignUp}
                  className="text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-2 transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700">
                  <Shield className="h-3.5 w-3.5 text-yellow-400" />
                </div>
                <span className="text-xs text-gray-400">Secure Login</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <CheckCircle className="h-3 w-3 text-yellow-400" />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-500">
            <div className="flex items-center justify-center gap-1">
              <Key className="h-3 w-3" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Shield className="h-3 w-3" />
              <span>2FA Available</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>Verified Platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
