import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Mail, RefreshCw } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [userType, setUserType] = useState("owner"); // Default
  const [loading, setLoading] = useState(false); // Loading state
  const inputRefs = useRef([]);

  // Get user type from location state or localStorage
  useEffect(() => {
    // Try to get user type from location state
    if (location.state?.userType) {
      setUserType(location.state.userType);
    } else {
      // Or from localStorage if coming from login
      const savedUserType = localStorage.getItem("loginUserType");
      if (savedUserType) {
        setUserType(savedUserType);
      }
    }
  }, [location]);

  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle OTP change
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otp];
      pasteData.split("").forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);
      if (pasteData.length < 6) {
        inputRefs.current[pasteData.length].focus();
      }
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      alert("Please enter complete 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call (1.5 seconds delay like login)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(`OTP verified: ${otpString}`);

      // Redirect based on user type
      switch (userType) {
        case "tenant":
          navigate("/tenant/dashboard");
          break;
        case "owner":
          navigate("/owner/dashboard_section");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/owner/dashboard_section"); // Default fallback
      }
    } catch (err) {
      alert("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (!canResend) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
      alert("New OTP has been sent to your email");
    } catch (err) {
      alert("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get email based on user type
  const getUserEmail = () => {
    switch (userType) {
      case "tenant":
        return "tenant@example.com";
      case "owner":
        return "owner@example.com";
      case "admin":
        return "admin@example.com";
      default:
        return "user@example.com";
    }
  };

  // Get user label
  const getUserLabel = () => {
    switch (userType) {
      case "tenant":
        return "Tenant";
      case "owner":
        return "Property Owner";
      case "admin":
        return "Admin";
      default:
        return "User";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/login"
          className="inline-flex items-center text-gray-400 hover:text-yellow-400 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Login
        </Link>

        {/* Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 md:p-8">
          {/* User Type Indicator */}
          <div className="mb-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-900 border border-gray-700">
              <span className="text-sm text-gray-300">
                Logging in as:{" "}
                <span className="text-yellow-400 font-medium">
                  {getUserLabel()}
                </span>
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
              <Mail className="h-8 w-8 text-yellow-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Verify OTP</h1>
            <p className="text-gray-400">
              Enter the 6-digit code sent to your email
            </p>
            <p className="text-yellow-400 font-medium mt-2">{getUserEmail()}</p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit}>
            {/* OTP Inputs */}
            <div className="mb-8">
              <label className="block text-gray-300 text-sm font-medium mb-3">
                6-Digit OTP Code
              </label>
              <div className="flex justify-between gap-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-xl font-bold bg-gray-900 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-white"
                    autoFocus={index === 0}
                    disabled={loading}
                  />
                ))}
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mb-6">
              <p className="text-gray-400">
                {canResend ? (
                  <span>Didn't receive OTP?</span>
                ) : (
                  <span>
                    Resend OTP in{" "}
                    <span className="text-yellow-400 font-bold">{timer}s</span>
                  </span>
                )}
              </p>
            </div>

            {/* Resend Button */}
            <div className="text-center mb-8">
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || loading}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  canResend && !loading
                    ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Sending..." : "Resend OTP"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>

          {/* Note */}
          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400 text-center">
              Check your email inbox and spam folder for the OTP. The code will
              expire in 10 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
