import React, { useState } from "react";
import { X, Mail, Lock, Loader2 } from "lucide-react";
import { useLoginMutation } from "../../store/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

const LoginModal = ({ isOpen, onClose, onLoginSuccess, redirectPath }) => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (response.success) {
        const userData = response.data?.user || response.user;
        const token = response.token || response.data?.token;

        if (token && userData) {
          dispatch(setCredentials({ user: userData, token }));
        }

        setSuccess("Login successful!");
        
        // Call success callback after short delay
        setTimeout(() => {
          onLoginSuccess?.(userData);
          onClose();
        }, 1000);
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.data?.message || err.message || "Invalid credentials");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-400 p-4">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:text-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-white">Login Required</h2>
          <p className="text-white/90 text-sm mt-1">
            Login to like or save this property
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {success && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <div className="text-center text-sm text-gray-600">
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    window.location.href = "/register";
                  }}
                  className="text-yellow-600 font-semibold hover:text-yellow-700"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;