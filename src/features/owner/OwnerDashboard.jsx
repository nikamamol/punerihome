import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Home,
  Building,
  Plus,
  MessageSquare,
  Users,
  BarChart,
  Bell,
  Search,
  Eye,
  DollarSign,
  TrendingUp,
  Filter,
  Download,
  User,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  CreditCard,
  Wallet,
  ChevronRight,
  Camera,
  Target,
  Zap,
  Users as UsersIcon,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";
import OwnerProperties from "./OwnerProperties";
import Inquiries from "./Inquiries";
import Analytics from "./Analytics";
import OwnerPayments from "./OwnerPayments";
import OwnerTenants from "./OwnerTenants";
import AddPayment from "./AddPayment";
import { Link, useNavigate } from "react-router-dom";
import { useGetOwnerPropertiesQuery } from "../../store/api/ownerApi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

// Memoized components for better performance
const StatCard = React.memo(({ icon: Icon, label, value, subtext, color = "blue" }) => {
  const colorClasses = {
    blue: { icon: "text-blue-600" },
    green: { icon: "text-green-600" },
    purple: { icon: "text-purple-600" },
    yellow: { icon: "text-yellow-600" },
    orange: { icon: "text-orange-600" },
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-4 h-4 ${colorClasses[color].icon}`} />
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{subtext}</div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

const TransactionItem = React.memo(({ transaction, formatCurrency, formatDate }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.type === "credit"
          ? "bg-green-100 text-green-600"
          : transaction.type === "debit"
            ? "bg-red-100 text-red-600"
            : "bg-yellow-100 text-yellow-600"
          }`}
      >
        {transaction.type === "credit" ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : transaction.type === "debit" ? (
          <ArrowDownRight className="w-4 h-4" />
        ) : (
          <Clock className="w-4 h-4" />
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
      </div>
    </div>
    <div className="text-right">
      <div
        className={`text-sm font-bold ${transaction.type === "credit"
          ? "text-green-600"
          : transaction.type === "debit"
            ? "text-red-600"
            : "text-yellow-600"
          }`}
      >
        {transaction.type === "credit" ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </div>
      <div className={`text-xs ${transaction.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>
        {transaction.status}
      </div>
    </div>
  </div>
));

TransactionItem.displayName = 'TransactionItem';

// Formatting helpers
const formatNumber = (num) => {
  if (num >= 10000000) return (num / 10000000).toFixed(1) + "Cr";
  if (num >= 100000) return (num / 100000).toFixed(1) + "L";
  if (num >= 1000) return (num / 1000).toFixed(0) + "K";
  return num.toString();
};

const formatCurrency = (amount) => {
  if (amount >= 10000000) return "₹" + (amount / 10000000).toFixed(1) + "Cr";
  if (amount >= 100000) return "₹" + (amount / 100000).toFixed(1) + "L";
  if (amount >= 1000) return "₹" + (amount / 1000).toFixed(0) + "K";
  return "₹" + amount.toString();
};

function OwnerDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem("ownerActiveSection");
    return savedSection || "dashboard";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

  // Refs
  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const profileBtnRef = useRef(null);
  const notificationBtnRef = useRef(null);

  // Redux
  const auth = useSelector((state) => state.auth);

  // RTK Query API call - सिर्फ properties data fetch करने के लिए
  const {
    data: apiResponse,
    isLoading: propertiesLoading,
    isError: propertiesError,
    error: propertiesErrorData,
    refetch: refetchProperties
  } = useGetOwnerPropertiesQuery();

  // Calculate total properties count
  const totalProperties = useMemo(() => {
    if (propertiesLoading) return 0;
    if (propertiesError || !apiResponse?.success) return 0;
    return apiResponse.data?.length || 0;
  }, [apiResponse, propertiesLoading, propertiesError]);

  // Calculate approved properties count
  const approvedProperties = useMemo(() => {
    if (propertiesLoading || propertiesError || !apiResponse?.success) return 0;
    return apiResponse.data?.filter(property =>
      property.status === 'approved' || property.status === 'active'
    ).length || 0;
  }, [apiResponse, propertiesLoading, propertiesError]);

  // Calculate total views
  const totalViews = useMemo(() => {
    if (propertiesLoading || propertiesError || !apiResponse?.success) return 0;
    return apiResponse.data?.reduce((sum, property) => sum + (property.views || 0), 0) || 0;
  }, [apiResponse, propertiesLoading, propertiesError]);

  // Calculate total inquiries
  const totalInquiries = useMemo(() => {
    if (propertiesLoading || propertiesError || !apiResponse?.success) return 0;
    return apiResponse.data?.reduce((sum, property) => sum + (property.inquiry_count || 0), 0) || 0;
  }, [apiResponse, propertiesLoading, propertiesError]);

  // Owner name from auth
  const ownerName = useMemo(() => auth.user?.name || "Owner", [auth.user]);

  // Save active section to localStorage
  useEffect(() => {
    localStorage.setItem("ownerActiveSection", activeSection);
  }, [activeSection]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownOpen &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        notificationDropdownOpen &&
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        notificationBtnRef.current &&
        !notificationBtnRef.current.contains(event.target)
      ) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen, notificationDropdownOpen]);

  // Format date helper
  const formatDate = useCallback((dateString) => {
    const options = { day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  }, []);

  // Payment data
  const paymentData = useMemo(() => ({
    availableCredits: 4500,
    totalEarnings: 125000,
    pendingPayouts: 18500,
    subscriptionPlan: "Premium",
    subscriptionEnds: "2024-06-30",
    recentTransactions: [
      {
        id: 1,
        type: "credit",
        amount: 25000,
        description: "Property Rental - Penthouse",
        date: "2024-02-15",
        status: "completed",
      },
      {
        id: 2,
        type: "debit",
        amount: 500,
        description: "Featured Listing",
        date: "2024-02-10",
        status: "completed",
      },
      {
        id: 3,
        type: "debit",
        amount: 300,
        description: "Premium Badge",
        date: "2024-02-05",
        status: "completed",
      },
      {
        id: 4,
        type: "credit",
        amount: 18000,
        description: "Property Rental - Apartment",
        date: "2024-02-01",
        status: "completed",
      },
      {
        id: 5,
        type: "pending",
        amount: 45000,
        description: "Property Rental - Villa",
        date: "2024-02-20",
        status: "pending",
      },
    ],
    creditUsage: {
      available: 4500,
      used: 800,
      total: 5300,
    },
  }), []);

  // Stats data using API values
  const stats = useMemo(() => ({
    totalProperties,
    approved: approvedProperties,
    pending: propertiesLoading ? 0 : Math.floor(totalProperties * 0.2),
    rejected: propertiesLoading ? 0 : Math.floor(totalProperties * 0.1),
    draft: propertiesLoading ? 0 : Math.floor(totalProperties * 0.1),
    totalViews,
    totalInquiries,
    avgResponseTime: "1 day",
    occupancyRate: "80%",
    monthlyEarnings: "₹18.5K",
    conversionRate: "12%",
    avgScore: 72,
  }), [totalProperties, approvedProperties, totalViews, totalInquiries, propertiesLoading]);

  // Menu items
  const menuItems = useMemo(() => [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      active: activeSection === "dashboard",
    },
    {
      id: "properties",
      label: "Properties",
      icon: Building,
      active: activeSection === "properties",
      count: totalProperties,
    },
    {
      id: "inquiries",
      label: "Inquiries",
      icon: MessageSquare,
      active: activeSection === "inquiries",
    },
    {
      id: "tenants",
      label: "Tenants",
      icon: Users,
      active: activeSection === "tenants",
    },
    {
      id: "reports",
      label: "Analytics",
      icon: BarChart,
      active: activeSection === "reports",
    },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
      active: activeSection === "payments",
    },
    {
      id: "addpayment",
      label: "Tenant Rent Pay",
      icon: Home,
      active: activeSection === "addpayment",
    },
  ], [activeSection, totalProperties]);

  // Handlers
  const handleAddCredits = useCallback(() => {
    navigate("/owner-pricing-plans");
  }, [navigate]);

  const handleWithdraw = useCallback(() => {
    alert("Redirect to withdraw earnings page");
  }, []);

  const handleViewTransactions = useCallback(() => {
    alert("Redirect to transactions page");
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  const handleSectionChange = useCallback((sectionId) => {
    setActiveSection(sectionId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  const handleRefetchProperties = useCallback(() => {
    refetchProperties();
  }, [refetchProperties]);

  // Render different sections based on activeSection
  const renderMainContent = useCallback(() => {
    switch (activeSection) {
      case "properties":
        return <OwnerProperties />;
      case "inquiries":
        return <Inquiries />;
      case "reports":
        return <Analytics />;
      case "payments":
        return <OwnerPayments />;
      case "tenants":
        return <OwnerTenants />;
      case "addpayment":
        return <AddPayment />;
      case "dashboard":
      default:
        return (
          <div className="p-4">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900">Owner Portal</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your properties & payments
              </p>
              {propertiesLoading && (
                <div className="text-xs text-blue-600 mt-1">
                  Loading properties data...
                </div>
              )}
              {propertiesError && (
                <div className="text-xs text-red-600 mt-1">
                  Error loading properties data
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              <StatCard
                icon={Building}
                label="Properties"
                value={propertiesLoading ? "..." : totalProperties}
                subtext={`${stats.approved} live`}
                color="blue"
              />
              <StatCard
                icon={Eye}
                label="Views"
                value={formatNumber(stats.totalViews)}
                subtext="+245 this month"
                color="green"
              />
              <StatCard
                icon={MessageSquare}
                label="Inquiries"
                value={stats.totalInquiries}
                subtext="12% conversion"
                color="purple"
              />
              <StatCard
                icon={Wallet}
                label="Credits"
                value={formatCurrency(paymentData.availableCredits)}
                subtext="Available"
                color="blue"
              />
              <StatCard
                icon={DollarSign}
                label="Earnings"
                value={formatCurrency(paymentData.totalEarnings)}
                subtext="Total"
                color="yellow"
              />
              <StatCard
                icon={Clock}
                label="Pending"
                value={formatCurrency(paymentData.pendingPayouts)}
                subtext="To withdraw"
                color="orange"
              />
            </div>

            {/* Payment Summary Section */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      Payment Summary
                    </h2>
                    <p className="text-xs text-gray-600">
                      Manage your credits and earnings
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={"/owner-pricing-plans"}
                      target="_blank"
                      className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Credits
                    </Link>
                    <button
                      onClick={handleWithdraw}
                      className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Credit Balance */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">
                          Credit Balance
                        </span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded">
                        Available
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900 mb-2">
                      {formatCurrency(paymentData.availableCredits)}
                    </div>
                    <div className="text-xs text-blue-700">
                      Used: {formatCurrency(paymentData.creditUsage.used)} of{" "}
                      {formatCurrency(paymentData.creditUsage.total)}
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(paymentData.creditUsage.used /
                            paymentData.creditUsage.total) *
                            100
                            }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Total Earnings */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-900">
                          Total Earnings
                        </span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded">
                        Lifetime
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-900 mb-2">
                      {formatCurrency(paymentData.totalEarnings)}
                    </div>
                    <div className="text-xs text-green-700">
                      This month: {formatCurrency(18500)}
                    </div>
                    <div className="flex items-center text-green-600 text-xs mt-2">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span>+8% from last month</span>
                    </div>
                  </div>

                  {/* Pending Payouts */}
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <span className="text-sm font-medium text-orange-900">
                          Pending Payouts
                        </span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-orange-200 text-orange-800 rounded">
                        Processing
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900 mb-2">
                      {formatCurrency(paymentData.pendingPayouts)}
                    </div>
                    <div className="text-xs text-orange-700">
                      Next payout: 25 Feb 2024
                    </div>
                    <button
                      onClick={handleWithdraw}
                      className="w-full mt-3 text-xs bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors"
                    >
                      Request Withdrawal
                    </button>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Recent Transactions
                    </h3>
                    <button
                      onClick={handleViewTransactions}
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      View All <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {paymentData.recentTransactions
                      .slice(0, 3)
                      .map((transaction) => (
                        <TransactionItem
                          key={transaction.id}
                          transaction={transaction}
                          formatCurrency={formatCurrency}
                          formatDate={formatDate}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            {totalProperties > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Properties Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Live</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {stats.approved}
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-gray-700">Pending</span>
                    </div>
                    <div className="text-lg font-bold text-yellow-600">
                      {stats.pending}
                    </div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Rejected</span>
                    </div>
                    <div className="text-lg font-bold text-red-600">
                      {stats.rejected}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Edit className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Draft</span>
                    </div>
                    <div className="text-lg font-bold text-gray-600">
                      {stats.draft}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/addownerproperty"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Property
                </Link>
                <button
                  onClick={() => handleSectionChange("properties")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Building className="w-4 h-4" />
                  View All Properties ({totalProperties})
                </button>
                <Link
                  to={"/owner-pricing-plans"}
                  target="_blank"
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  Add Credits
                </Link>
              </div>
            </div>
          </div>
        );
    }
  }, [activeSection, stats, paymentData, totalProperties, propertiesLoading, propertiesError, ownerName, formatDate, handleWithdraw, handleViewTransactions, handleSectionChange]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="flex items-center cursor-pointer">
                <div className="text-xl font-bold text-blue-600">
                  Puneri Homes
                </div>
              </div>
            </div>

            <div className="hidden lg:block flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Properties Count in Navbar */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
                <Building className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {propertiesLoading ? "..." : totalProperties} Properties
                </span>
              </div>

              {/* Credit Display in Navbar */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {formatCurrency(paymentData.availableCredits)}
                </span>
              </div>

              <button
                ref={notificationBtnRef}
                onClick={() =>
                  setNotificationDropdownOpen(!notificationDropdownOpen)
                }
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  ref={profileBtnRef}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{ownerName}</p>
                    <p className="text-xs text-gray-500">Owner</p>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div
                    ref={userDropdownRef}
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{ownerName}</p>
                          <p className="text-xs text-gray-500">Owner</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Shield className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600">Verified Owner</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <div className="flex items-center gap-1">
                            <Building className="w-3 h-3 text-blue-600" />
                            <span className="text-xs text-gray-700">Properties</span>
                          </div>
                          <div className="text-sm font-bold text-blue-600 mt-1">
                            {propertiesLoading ? "..." : totalProperties}
                          </div>
                        </div>
                        <div className="bg-green-50 p-2 rounded-lg">
                          <div className="flex items-center gap-1">
                            <Wallet className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-gray-700">Credits</span>
                          </div>
                          <div className="text-sm font-bold text-green-600 mt-1">
                            {formatCurrency(paymentData.availableCredits)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/owner-profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded w-full"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={() => handleSectionChange("properties")}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded w-full"
                      >
                        <Building className="w-4 h-4" />
                        My Properties ({propertiesLoading ? "..." : totalProperties})
                      </button>
                      <button
                        onClick={() => handleSectionChange("payments")}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded w-full"
                      >
                        <CreditCard className="w-4 h-4" />
                        Payments
                      </button>
                      <Link
                        to={"/owner-pricing-plans"}
                        target="_blank"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded w-full"
                      >
                        <Plus className="w-4 h-4" />
                        Add Credits
                      </Link>
                      <button
                        onClick={handleWithdraw}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded w-full"
                      >
                        <Download className="w-4 h-4" />
                        Withdraw Earnings
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={() => navigate("/owner-settings")}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded w-full"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-3 left-0 z-40 w-56 h-screen bg-white border-r border-gray-200 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform`}
      >
        <div className="h-full p-4">
          <div className="mb-6 px-2">
            <span className="text-sm font-semibold text-gray-900">
              Owner Portal
            </span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg relative ${item.active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
                {item.count !== undefined && (
                  <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                    {propertiesLoading ? "..." : item.count}
                  </span>
                )}
                {item.active && (
                  <ChevronRight className="w-4 h-4 ml-2 text-blue-600" />
                )}
              </button>
            ))}
          </nav>

          {/* Credit Summary in Sidebar */}
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-[#0f172a] via-[#020617] to-black border border-white/10 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-medium tracking-wide text-gray-300">
                  Available Credits
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-400/20">
                Balance
              </span>
            </div>

            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(paymentData.availableCredits)}
            </div>

            <p className="text-[11px] text-white mb-3">
              Use credits to promote & unlock leads
            </p>

            <Link
              to={"/owner-pricing-plans"}
              target="_blank"
              className="w-full py-2 px-5 text-xs font-semibold rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-all shadow-md"
            >
              Add Credits +
            </Link>
          </div>

          {/* Properties Count in Sidebar */}
          {/* <div className="mt-4 p-4 rounded-lg bg-white border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-900">
                Total Properties
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {propertiesLoading ? "..." : totalProperties}
            </div>
            <p className="text-[11px] text-gray-600 mt-1">
              {totalProperties === 0 ? "No properties listed yet" : "Manage your property listings"}
            </p>
            <button
              onClick={() => handleSectionChange("properties")}
              className="w-full mt-3 py-2 px-4 text-xs font-medium rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
            >
              View All Properties
              <ChevronRight className="w-3 h-3" />
            </button>
          </div> */}
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-56 pt-14 mt-2">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 hidden lg:block">
          <div className="flex items-center text-sm text-gray-600">
            <button
              onClick={() => handleSectionChange("dashboard")}
              className="hover:text-blue-600"
            >
              Dashboard
            </button>
            {activeSection !== "dashboard" && (
              <>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="font-medium text-gray-900 capitalize">
                  {activeSection}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Mobile Breadcrumb */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1 mr-2 text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <span className="font-medium text-gray-900 capitalize">
                {activeSection}
              </span>
            </div>
            <button
              onClick={() => {
                if (activeSection !== "dashboard") {
                  handleSectionChange("dashboard");
                }
              }}
              className={`text-sm ${activeSection !== "dashboard"
                ? "text-blue-600"
                : "text-gray-400"
                }`}
            >
              {activeSection !== "dashboard" ? "Back to Dashboard" : ""}
            </button>
          </div>
        </div>

        {/* Render the active section content */}
        {renderMainContent()}
      </main>
    </div>
  );
}

export default OwnerDashboard;