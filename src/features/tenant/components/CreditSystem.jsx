import React, { useState, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  History,
  Download,
  CheckCircle,
  Clock,
  ShoppingCart,
  Gift,
  Percent,
  Smartphone,
  BarChart,
  Shield,
  Zap,
  Star,
  Target,
  RefreshCw,
  AlertCircle,
  Loader,
  CreditCard,
  Users,
  Calendar,
  Coins,
  ShieldCheck,
  Zap as Lightning,
  Gift as GiftIcon,
  Percent as PercentIcon,
  Calendar as CalendarIcon,
  Smartphone as SmartphoneIcon,
  Sparkles,
  BadgeCheck,
  Crown,
  Wallet as WalletIcon,
  Phone,
  MessageSquare,
  Mail,
  Shield as ShieldIcon,
  Lock,
  Key,
  Eye,
  FileText,
  Receipt,
  IndianRupee
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetTenantCreditsQuery, useGetPaymentHistoryQuery } from "../../../store/api/tenantApi";

function CreditSystem() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const userToken = localStorage.getItem('token');

  // Fetch credit data from API using tenantApi
  const {
    data: creditApiData,
    isLoading: creditsLoading,
    isError: creditsError,
    error: creditsErrorDetails,
    refetch: refetchCredits
  } = useGetTenantCreditsQuery(undefined, {
    skip: !userToken,
    refetchOnMountOrArgChange: true
  });

  // Fetch payment history
  const {
    data: paymentHistoryData,
    isLoading: historyLoading,
    isError: historyError
  } = useGetPaymentHistoryQuery({ page: 1, limit: 10 }, {
    skip: !userToken
  });

  // Debug logging
  useEffect(() => {
    console.log('=== CREDIT SYSTEM DEBUG ===');
    console.log('Credit API Data:', creditApiData);
    console.log('Payment History Data:', paymentHistoryData);
  }, [creditApiData, paymentHistoryData]);

  // Format currency with proper Indian Rupee format
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "₹0";
    const numAmount = Number(amount);
    if (isNaN(numAmount)) return "₹0";

    // Format for Indian Rupees
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  const formatCurrencyWithDecimal = (amount) => {
    if (!amount && amount !== 0) return "₹0.00";
    const numAmount = Number(amount);
    if (isNaN(numAmount)) return "₹0.00";

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numAmount);
  };

  // Calculate expiry status
  const getExpiryStatus = () => {
    if (!creditApiData?.data) return null;

    const { expiryInfo, isExpired } = creditApiData.data;

    if (isExpired) {
      return {
        text: "Credits Expired",
        color: "text-red-600",
        bgColor: "bg-red-100",
        borderColor: "border-red-200",
        icon: "⚠️",
        badgeColor: "bg-red-500"
      };
    }

    if (expiryInfo) {
      const { daysRemaining, isExpired: expired } = expiryInfo;

      if (expired) {
        return {
          text: "Credits Expired",
          color: "text-red-600",
          bgColor: "bg-red-100",
          borderColor: "border-red-200",
          icon: "⚠️",
          badgeColor: "bg-red-500"
        };
      }

      if (daysRemaining <= 3) {
        return {
          text: `Expires in ${daysRemaining} days`,
          color: "text-red-600",
          bgColor: "bg-red-100",
          borderColor: "border-red-200",
          icon: "⏳",
          badgeColor: "bg-red-500"
        };
      }

      if (daysRemaining <= 7) {
        return {
          text: `Expires in ${daysRemaining} days`,
          color: "text-amber-600",
          bgColor: "bg-amber-100",
          borderColor: "border-amber-200",
          icon: "⏳",
          badgeColor: "bg-amber-500"
        };
      }

      return {
        text: `Valid for ${daysRemaining} days`,
        color: "text-emerald-600",
        bgColor: "bg-emerald-100",
        borderColor: "border-emerald-200",
        icon: "✅",
        badgeColor: "bg-emerald-500"
      };
    }

    return {
      text: "No expiry",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-200",
      icon: "ℹ️",
      badgeColor: "bg-gray-500"
    };
  };

  const expiryStatus = getExpiryStatus();

  // Calculate total spent
  const calculateTotalSpent = () => {
    if (!paymentHistoryData?.data?.payments) return 0;

    return paymentHistoryData.data.payments.reduce((total, payment) => {
      if (payment.status === 'completed' || payment.status === 'success') {
        return total + (Number(payment.amount) || 0);
      }
      return total;
    }, 0);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "No date";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return formatDate(dateString);
    }
  };

  // Handle error states
  if (!userToken) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
        <div className="max-w-md mx-auto mt-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-lg">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Login Required
            </h3>
            <p className="text-gray-600 mb-8">
              Please login to view your credit balance and purchase credits.
            </p>
            <div className="space-y-4">
              <Link
                to="/login"
                className="block w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
              >
                Go to Login
              </Link>
              <Link
                to="/register"
                className="block w-full px-6 py-3.5 border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (creditsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <Wallet className="w-10 h-10 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Credits</h3>
                <p className="text-gray-600">Fetching your credit information...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (creditsError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
        <div className="max-w-2xl mx-auto mt-12">
          <div className="bg-white rounded-2xl border border-red-200 p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-800 mb-2">
                  Unable to Load Credit Data
                </h3>
                <p className="text-red-600 mb-6">
                  We encountered an issue while fetching your credit information.
                </p>

                <div className="bg-red-50 p-4 rounded-lg mb-6">
                  <p className="text-red-800 text-sm font-mono">
                    {creditsError?.data?.message || 'Please try again later'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={refetchCredits}
                    className="px-5 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                  <Link
                    to="/pricing-plans"
                    className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Go to Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const creditData = creditApiData?.data;
  const totalSpent = calculateTotalSpent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Credit Wallet</h1>
              <p className="text-blue-100 text-lg">
                Unlock property owner contacts with credits
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={refetchCredits}
                className="px-4 py-2.5 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/30 transition-colors flex items-center gap-2 border border-white/30"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <Link
                to="/pricing-plans"
                target="_blank"
                className="px-5 py-2.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-4 h-4" />
                Buy Credits
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Success Banner */}
        {creditData?.balance > 0 && (
          <div className="mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">Welcome! Credits Available</h3>
                  <p className="text-emerald-100">
                    You have {creditData.balance} credits ready to use for contacting property owners
                  </p>
                </div>
                <Link
                  to="/properties"
                  target="_blank"
                  className="px-5 py-2.5 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Credit Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Credit Card */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <WalletIcon className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Available Credits</p>
                      <p className="text-xs text-gray-400">Ready to unlock contacts</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-bold">{creditData?.balance || 0}</span>
                    <span className="text-gray-400 text-lg">credits</span>
                  </div>
                </div>

                {expiryStatus && (
                  <div className={`px-4 py-3 rounded-xl ${expiryStatus.bgColor} border ${expiryStatus.borderColor}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{expiryStatus.icon}</span>
                      <div>
                        <p className={`text-sm font-semibold ${expiryStatus.color}`}>
                          {expiryStatus.text}
                        </p>
                        {creditData?.creditExpiry && (
                          <p className="text-xs text-gray-600">
                            Expires: {formatDate(creditData.creditExpiry)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-300">Credit Usage</span>
                  <span className="font-medium">
                    {creditData?.totalUsed || 0}/{creditData?.totalPurchased || 0}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-green-400 h-3 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, ((creditData?.totalUsed || 0) / (creditData?.totalPurchased || 1)) * 100)}%`
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-2xl font-bold">{creditData?.activeCredits || 0}</div>
                  <p className="text-sm text-gray-400">Active</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-2xl font-bold">{creditData?.totalPurchased || 0}</div>
                  <p className="text-sm text-gray-400">Purchased</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-2xl font-bold">{creditData?.totalUsed || 0}</div>
                  <p className="text-sm text-gray-400">Used</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
                  <p className="text-sm text-gray-400">Total Spent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <Link
                to="/pricing-plans"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Buy More Credits</p>
                  <p className="text-sm text-gray-600">Add credits to your wallet</p>
                </div>
                <div className="text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link
                to="/properties"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <SmartphoneIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Browse Properties</p>
                  <p className="text-sm text-gray-600">Find and contact owners</p>
                </div>
                <div className="text-emerald-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <button className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200 hover:border-purple-300 transition-all group w-full">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Gift className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">Gift Credits</p>
                  <p className="text-sm text-gray-600">Share credits with friends</p>
                </div>
                <div className="text-purple-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:border-amber-300 transition-all group w-full">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">View Receipts</p>
                  <p className="text-sm text-gray-600">Download payment history</p>
                </div>
                <div className="text-amber-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Why Use Credits?</h2>
              <p className="text-gray-600">Get direct access to property owners</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-blue-100 p-6 hover:shadow-lg transition-shadow hover:border-blue-200">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Lightning className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Instant Access</h4>
              <p className="text-gray-600 text-sm">
                Get owner contacts immediately after unlocking. No waiting period.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100 p-6 hover:shadow-lg transition-shadow hover:border-emerald-200">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Verified Owners</h4>
              <p className="text-gray-600 text-sm">
                All property owners are verified for authenticity and reliability.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-purple-100 p-6 hover:shadow-lg transition-shadow hover:border-purple-200">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Best Value</h4>
              <p className="text-gray-600 text-sm">
                More credits = Lower per-contact cost. Save with bulk purchases.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-amber-100 p-6 hover:shadow-lg transition-shadow hover:border-amber-200">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-amber-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-gray-600 text-sm">
                Your transactions and contacts are protected with encryption.
              </p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Purchase History */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Purchase History</h3>
                  <p className="text-gray-600 text-sm">Your credit purchase transactions</p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="p-4">
              {historyLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 text-sm mt-3">Loading history...</p>
                </div>
              ) : !paymentHistoryData?.data?.payments?.length ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Receipt className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-900 font-medium mb-2">No purchases yet</p>
                  <p className="text-gray-600 text-sm mb-6">Buy your first credits to get started</p>
                  <Link
                    to="/pricing-plans"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Credits
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {paymentHistoryData.data.payments.slice(0, 10).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${payment.status === 'completed' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                          {payment.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                          ) : (
                            <Clock className="w-6 h-6 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {payment.plan_type ? payment.plan_type.charAt(0).toUpperCase() + payment.plan_type.slice(1) + ' Plan' : 'Credit Purchase'}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {formatDateTime(payment.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 text-lg">
                          +{payment.credits || 0} credits
                        </div>
                        <div className="text-gray-600 font-medium">
                          {formatCurrency(payment.amount)}
                        </div>
                        <div className={`text-sm font-medium px-2 py-1 rounded-full inline-block ${payment.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {payment.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Usage History */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Usage History</h3>
                  <p className="text-gray-600 text-sm">Properties you've unlocked</p>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {creditData?.totalUsed || 0} credits used
                </span>
              </div>
            </div>

            <div className="p-4">
              {!creditData?.recentTransactions?.length ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-gray-900 font-medium mb-2">No credits used yet</p>
                  <p className="text-gray-600 text-sm mb-6">Use credits to unlock property owner contacts</p>
                  <Link
                    to="/properties"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <SmartphoneIcon className="w-4 h-4" />
                    Browse Properties
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {creditData.recentTransactions.filter(t => t.transaction_type === 'used').slice(0, 10).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Phone className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.description?.replace('Used 1 credit to view property #', 'Property ') || 'Property Contact'}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {formatDateTime(transaction.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600 text-lg">
                          -1 credit
                        </div>
                        <div className="text-gray-600 text-sm">
                          Contact unlocked
                        </div>
                        <div className="text-emerald-600 text-sm font-medium">
                          ✓ Success
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h3>
            <p className="text-blue-100 text-lg mb-8">
              Use your credits to connect directly with property owners. No brokers, no hidden fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing-plans"
                className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Credits Now
              </Link>
              <Link
                to="/properties"
                className="px-8 py-3.5 bg-transparent text-white font-bold rounded-xl border-2 border-white/50 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <SmartphoneIcon className="w-5 h-5" />
                Browse Properties
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-blue-400/30">
              <p className="text-blue-200 text-sm">
                Need assistance? <a href="/support" className="text-white font-medium underline hover:text-blue-100">Contact Support</a> •
                Read our <a href="/faq" className="text-white font-medium underline hover:text-blue-100">FAQ</a> •
                <a href="/terms" className="text-white font-medium underline hover:text-blue-100 ml-2">Terms</a>
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default CreditSystem;