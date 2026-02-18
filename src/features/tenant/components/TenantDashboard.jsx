import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Home,
  Building,
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
  Target,
  Zap,
  Shield,
  AlertCircle,
  TrendingDown,
  CheckSquare,
  XSquare,
  FileText,
  Settings,
  RefreshCw,
  Percent,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Package,
  UserCheck,
  UserX,
  DollarSign as Dollar,
  PieChart,
  BarChart3,
  LineChart,
  Home as HomeIcon,
  Receipt,
  CalendarDays,
  CreditCard as CreditCardIcon,
  ClipboardCheck,
  PhoneCall,
  Smartphone,
  Heart,
  Bookmark,
  Unlock,
  Star,
  MessageSquare,
  ShoppingCart,
} from "lucide-react";
import { useDispatch } from "react-redux";
// Import tenant components
import TenantProfile from "./TenantProfile";
import SavedProperties from "./SavedProperties";
import LikedProperties from "./LikedProperties";
import UnlockedContacts from "./UnlockedContacts";
import CreditSystem from "./CreditSystem";
import Tenant_setting from "./Tenant_setting";
import { Link, useNavigate } from "react-router-dom";

// Import RTK Query hooks
import { useSelector } from "react-redux";
import {
  useGetLikedPropertiesQuery,
  useGetSavedPropertiesQuery,
  useGetUserPropertyCountsQuery
} from "../../../store/api/propertyApi";
import {
  useGetTenantProfileQuery,
  useGetTenantCreditsQuery,
  useGetPaymentHistoryQuery,
  useGetUnlockedContactsQuery
} from "../../../store/api/tenantApi";
import { logout } from "../../../store/slices/authSlice";

// Memoized components for better performance
const StatCard = React.memo(({ icon: Icon, label, value, subtext, color = "blue", isLoading = false }) => {
  const colorClasses = {
    blue: { icon: "text-blue-600", bg: "bg-blue-50" },
    green: { icon: "text-green-600", bg: "bg-green-50" },
    purple: { icon: "text-purple-600", bg: "bg-purple-50" },
    yellow: { icon: "text-yellow-600", bg: "bg-yellow-50" },
    orange: { icon: "text-orange-600", bg: "bg-orange-50" },
    red: { icon: "text-red-600", bg: "bg-red-50" },
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-4 h-4 ${colorClasses[color].icon}`} />
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <div className="text-xl font-bold text-gray-900">
        {isLoading ? (
          <div className="h-7 w-16 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          value
        )}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {isLoading ? <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div> : subtext}
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

function TenantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem("tenantActiveSection");
    return savedSection || "dashboard";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const profileBtnRef = useRef(null);
  const notificationBtnRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const userType = user?.userType;
  const userName = user?.name || "Tenant";
  const userEmail = user?.email || "";
  const userPhone = user?.phone || "";
  const joinDate = user?.createdAt || "2024-01-15";

  // RTK Query hooks for data fetching
  // Get liked properties
  const {
    data: likedData,
    isLoading: likedLoading,
    refetch: refetchLiked
  } = useGetLikedPropertiesQuery(undefined, {
    skip: !userId,
  });

  // Get saved properties
  const {
    data: savedData,
    isLoading: savedLoading,
    refetch: refetchSaved
  } = useGetSavedPropertiesQuery(undefined, {
    skip: !userId,
  });

  // Get user property counts
  const {
    data: countsData,
    isLoading: countsLoading
  } = useGetUserPropertyCountsQuery(undefined, {
    skip: !userId,
  });

  // Get tenant profile data
  const {
    data: profileData,
    isLoading: profileLoading
  } = useGetTenantProfileQuery(undefined, {
    skip: !userId,
  });

  // Get tenant credits data
  const {
    data: creditData,
    isLoading: creditsLoading,
    refetch: refetchCredits
  } = useGetTenantCreditsQuery(undefined, {
    skip: !userId,
    refetchOnMountOrArgChange: true
  });

  // Get unlocked contacts
  const {
    data: unlockedData,
    isLoading: unlockedLoading,
    refetch: refetchUnlocked
  } = useGetUnlockedContactsQuery(undefined, {
    skip: !userId,
  });
console.log(unlockedData)
  // Get payment history for total spent calculation
  const {
    data: paymentHistoryData,
    isLoading: historyLoading
  } = useGetPaymentHistoryQuery({ page: 1, limit: 100 }, {
    skip: !userId,
  });

  // Calculate counts from API data
  const likedCount = useMemo(() => {
    if (likedLoading || !likedData?.success) return null;
    return likedData.data?.length || 0;
  }, [likedData, likedLoading]);

  const savedCount = useMemo(() => {
    if (savedLoading || !savedData?.success) return null;
    return savedData.data?.length || 0;
  }, [savedData, savedLoading]);

  // Get counts from counts API
  const apiLikedCount = useMemo(() => {
    if (countsLoading || !countsData?.success) return null;
    return countsData.data?.liked || 0;
  }, [countsData, countsLoading]);

  const apiSavedCount = useMemo(() => {
    if (countsLoading || !countsData?.success) return null;
    return countsData.data?.saved || 0;
  }, [countsData, countsLoading]);

  // Get credit data
  const creditBalance = useMemo(() => {
    if (creditsLoading || !creditData?.data) return null;
    return creditData.data.balance || 0;
  }, [creditData, creditsLoading]);

  const totalCreditsUsed = useMemo(() => {
    if (creditsLoading || !creditData?.data) return null;
    return creditData.data.totalUsed || 0;
  }, [creditData, creditsLoading]);

  const totalCreditsPurchased = useMemo(() => {
    if (creditsLoading || !creditData?.data) return null;
    return creditData.data.totalPurchased || 0;
  }, [creditData, creditsLoading]);

  // Get unlocked contacts count
  const unlockedCount = useMemo(() => {
    if (unlockedLoading || !unlockedData?.success) return null;
    return unlockedData.data?.length || 0;
  }, [unlockedData, unlockedLoading]);

  // Calculate total spent from payment history
  const totalSpent = useMemo(() => {
    if (historyLoading || !paymentHistoryData?.data?.payments) return null;

    return paymentHistoryData.data.payments.reduce((total, payment) => {
      if (payment.status === 'completed' || payment.status === 'success') {
        return total + (Number(payment.amount) || 0);
      }
      return total;
    }, 0);
  }, [paymentHistoryData, historyLoading]);

  // Use whichever count is available
  const finalLikedCount = useMemo(() => {
    return likedCount !== null ? likedCount : (apiLikedCount !== null ? apiLikedCount : null);
  }, [likedCount, apiLikedCount]);

  const finalSavedCount = useMemo(() => {
    return savedCount !== null ? savedCount : (apiSavedCount !== null ? apiSavedCount : null);
  }, [savedCount, apiSavedCount]);

  // Formatting functions
  const formatNumber = useCallback((num) => {
    if (num === null || num === undefined) return "—";
    if (num >= 10000000) return (num / 10000000).toFixed(1) + "Cr";
    if (num >= 100000) return (num / 100000).toFixed(1) + "L";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  }, []);

  const formatCurrency = useCallback((amount) => {
    if (amount === null || amount === undefined) return "—";
    if (amount >= 10000000) return "₹" + (amount / 10000000).toFixed(1) + "Cr";
    if (amount >= 100000) return "₹" + (amount / 100000).toFixed(1) + "L";
    if (amount >= 1000) return "₹" + (amount / 1000).toFixed(0) + "K";
    return "₹" + amount.toString();
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "—";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  }, []);

  // Save active section to localStorage
  useEffect(() => {
    localStorage.setItem("tenantActiveSection", activeSection);
  }, [activeSection]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

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

  // Tenant data - with real data from API
  const [tenantData, setTenantData] = useState({
    tenantName: userName,
    tenantEmail: userEmail,
    tenantPhone: userPhone,
    joinDate: joinDate,
    creditBalance: null,
    totalCreditsUsed: null,
    totalCreditsPurchased: null,
    unlockedContacts: null,
    savedProperties: null,
    likedProperties: null,
    viewedProperties: 24, // This might need a separate API
    totalSpent: null,
    lastPurchase: null,
    avgPurchaseValue: null,
  });

  // Update tenant data when API data changes
  useEffect(() => {
    setTenantData(prev => ({
      ...prev,
      tenantName: userName,
      tenantEmail: userEmail,
      tenantPhone: userPhone,
      joinDate: joinDate,
      savedProperties: finalSavedCount,
      likedProperties: finalLikedCount,
      creditBalance: creditBalance,
      totalCreditsUsed: totalCreditsUsed,
      totalCreditsPurchased: totalCreditsPurchased,
      unlockedContacts: unlockedCount,
      totalSpent: totalSpent,
    }));
  }, [userName, userEmail, userPhone, joinDate, finalSavedCount, finalLikedCount,
    creditBalance, totalCreditsUsed, totalCreditsPurchased, unlockedCount, totalSpent]);

  // Check if any data is loading
  const isLoading = useMemo(() => {
    return {
      liked: likedLoading,
      saved: savedLoading,
      credits: creditsLoading,
      unlocked: unlockedLoading,
      history: historyLoading,
    };
  }, [likedLoading, savedLoading, creditsLoading, unlockedLoading, historyLoading]);

  // Tenant menu items
  const menuItems = useMemo(() => [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      active: activeSection === "dashboard",
    },
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      active: activeSection === "profile",
    },
    {
      id: "saved",
      label: "Saved Properties",
      icon: Bookmark,
      active: activeSection === "saved",
      count: finalSavedCount,
      isLoading: isLoading.saved,
    },
    {
      id: "liked",
      label: "Liked Properties",
      icon: Heart,
      active: activeSection === "liked",
      count: finalLikedCount,
      isLoading: isLoading.liked,
    },
    {
      id: "unlocked",
      label: "Unlocked Contacts",
      icon: Unlock,
      active: activeSection === "unlocked",
      count: unlockedCount,
      isLoading: isLoading.unlocked,
    },
    {
      id: "credits",
      label: "Credit System",
      icon: CreditCard,
      active: activeSection === "credits",
      count: creditBalance,
      isLoading: isLoading.credits,
    },
    {
      id: "tenant_setting",
      label: "Tenant Setting",
      icon: Settings,
      active: activeSection === "tenant_setting",
    },
  ], [activeSection, finalSavedCount, finalLikedCount, unlockedCount, creditBalance, isLoading]);

  // Handle section change
  const handleSectionChange = useCallback((sectionId) => {
    setActiveSection(sectionId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }

    // Refetch data when switching to specific sections
    if (sectionId === "liked") {
      refetchLiked();
    } else if (sectionId === "saved") {
      refetchSaved();
    } else if (sectionId === "unlocked") {
      refetchUnlocked();
    } else if (sectionId === "credits") {
      refetchCredits();
    }
  }, [refetchLiked, refetchSaved, refetchUnlocked, refetchCredits]);

  // Handle actions
  const handleBuyCredits = useCallback(() => {
    navigate("/pricing-plans");
  }, [navigate]);

  const handleSearchProperties = useCallback(() => {
    navigate("/properties");
  }, [navigate]);

  const handleRefreshData = useCallback(() => {
    refetchLiked();
    refetchSaved();
    refetchUnlocked();
    refetchCredits();
  }, [refetchLiked, refetchSaved, refetchUnlocked, refetchCredits]);

  // Static data for preview (only used when real data is not available)
  const staticData = useMemo(() => ({
    recentActivities: [
      {
        id: 1,
        type: "contact_unlock",
        property: "2BHK Apartment",
        owner: "Rajesh Kumar",
        date: "2024-02-20",
        creditsUsed: 1,
      },
      {
        id: 2,
        type: "property_saved",
        property: "Luxury Villa",
        location: "Koregaon Park",
        date: "2024-02-19",
      },
      {
        id: 3,
        type: "credit_purchase",
        amount: 149,
        creditsEarned: 3,
        date: "2024-02-18",
        status: "completed",
      },
    ],
    savedPropertiesPreview: [
      {
        id: 1,
        name: "Luxury 3BHK Villa",
        location: "Koregaon Park",
        price: "₹2.5 Cr",
        liked: true,
        saved: true,
      },
      {
        id: 2,
        name: "Modern 2BHK Flat",
        location: "Kalyani Nagar",
        price: "₹85 L",
        liked: true,
        saved: true,
      },
    ],
    creditPurchaseHistory: [
      {
        id: 1,
        date: "2024-02-18",
        amount: 149,
        creditsEarned: 3,
        status: "completed",
      },
      {
        id: 2,
        date: "2024-02-10",
        amount: 99,
        creditsEarned: 1,
        status: "completed",
      },
    ],
    upcomingViewings: [
      {
        id: 1,
        property: "Luxury Villa",
        date: "2024-02-22",
        time: "10:00 AM",
        owner: "Rajesh Kumar",
      },
    ],
  }), []);

  // Render different sections
  const renderMainContent = useCallback(() => {
    switch (activeSection) {
      case "profile":
        return <TenantProfile />;
      case "saved":
        return <SavedProperties />;
      case "liked":
        return <LikedProperties />;
      case "unlocked":
        return <UnlockedContacts />;
      case "credits":
        return <CreditSystem />;
      case "tenant_setting":
        return <Tenant_setting />;
      case "dashboard":
      default:
        return (
          <div className="p-4">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Welcome back, {tenantData.tenantName}!
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Your personalized property dashboard
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefreshData}
                    className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2.5 rounded-lg transition-all duration-200 text-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                  <Link
                    to="/pricing-plans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-600 hover:to-amber-500 text-gray-900 font-bold px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Buy Credits
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-80" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Cards - Tenant Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {/* Credit Balance */}
              <StatCard
                icon={CreditCard}
                label="Credits"
                value={tenantData.creditBalance !== null ? tenantData.creditBalance : "—"}
                subtext={tenantData.creditBalance !== null ? "Available contacts" : "No data available"}
                color="blue"
                isLoading={isLoading.credits}
              />

              {/* Saved Properties */}
              <StatCard
                icon={Bookmark}
                label="Saved"
                value={tenantData.savedProperties !== null ? tenantData.savedProperties : "—"}
                subtext={tenantData.savedProperties !== null ? "Properties" : "No saved properties"}
                color="green"
                isLoading={isLoading.saved}
              />

              {/* Liked Properties */}
              <StatCard
                icon={Heart}
                label="Liked"
                value={tenantData.likedProperties !== null ? tenantData.likedProperties : "—"}
                subtext={tenantData.likedProperties !== null ? "Properties" : "No liked properties"}
                color="red"
                isLoading={isLoading.liked}
              />

              {/* Unlocked Contacts */}
              <StatCard
                icon={Unlock}
                label="Unlocked"
                value={tenantData.unlockedContacts !== null ? tenantData.unlockedContacts : "—"}
                subtext={tenantData.unlockedContacts !== null ? "Contacts" : "No contacts unlocked"}
                color="purple"
                isLoading={isLoading.unlocked}
              />

              {/* Total Spent */}
              <StatCard
                icon={DollarSign}
                label="Total Spent"
                value={tenantData.totalSpent !== null ? formatCurrency(tenantData.totalSpent) : "—"}
                subtext={tenantData.totalSpent !== null ? "On credits" : "No purchases yet"}
                color="yellow"
                isLoading={isLoading.history}
              />

              {/* Viewed Properties */}
              <StatCard
                icon={Eye}
                label="Viewed"
                value={tenantData.viewedProperties}
                subtext="Properties"
                color="orange"
              />
            </div>

            {/* Credit Information Banner - Only show if credit data exists */}
            {tenantData.creditBalance !== null && tenantData.creditBalance > 0 ? (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-blue-900">
                      Credit Balance: {tenantData.creditBalance}
                    </h3>
                    <p className="text-sm text-blue-700">
                      Unlock property owner contacts using credits
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center border-r border-blue-300 pr-4">
                      <div className="text-lg font-bold text-blue-900">₹249</div>
                      <div className="text-xs text-blue-700">3 Credit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-900">₹499</div>
                      <div className="text-xs text-blue-700">6 Credits</div>
                    </div>
                    <Link
                      to="/pricing-plans"
                      target="_blank"
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
                    >
                      Buy More Credits
                    </Link>
                  </div>
                </div>
              </div>
            ) : tenantData.creditBalance !== null && tenantData.creditBalance === 0 ? (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="text-base font-semibold text-gray-700">
                        No Credits Available
                      </h3>
                      <p className="text-sm text-gray-600">
                        Buy credits to unlock property owner contacts
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/pricing-plans"
                    target="_blank"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Buy Credits
                  </Link>
                </div>
              </div>
            ) : null}

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 " style={{ display: "none" }}>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-base font-semibold text-gray-900">
                        Recent Activity
                      </h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {staticData.recentActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === "contact_unlock"
                                    ? "bg-blue-100 text-blue-600"
                                    : activity.type === "credit_purchase"
                                      ? "bg-green-100 text-green-600"
                                      : "bg-green-100 text-green-600"
                                  }`}
                              >
                                {activity.type === "contact_unlock" ? (
                                  <Unlock className="w-4 h-4" />
                                ) : activity.type === "credit_purchase" ? (
                                  <CreditCard className="w-4 h-4" />
                                ) : (
                                  <Bookmark className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {activity.property || `₹${activity.amount}`}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {activity.owner ||
                                    activity.location ||
                                    `${activity.creditsEarned} credits earned`}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500">
                                {formatDate(activity.date)}
                              </div>
                              {activity.creditsUsed && (
                                <div className="text-xs text-blue-600 font-medium">
                                  -{activity.creditsUsed} credit
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleSectionChange("profile")}
                        className="w-full mt-3 text-xs text-center text-blue-600 hover:text-blue-700 py-2"
                      >
                        View All Activity →
                      </button>
                    </div>
                  </div>


                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-gray-900">
                          Saved Properties
                        </h2>
                        <span className="text-xs text-gray-500">
                          {isLoading.saved ? "Loading..." : (tenantData.savedProperties !== null ? `${tenantData.savedProperties} total` : "No data")}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      {tenantData.savedProperties !== null && tenantData.savedProperties > 0 ? (
                        <div className="space-y-3">
                          {staticData.savedPropertiesPreview.map((property) => (
                            <div
                              key={property.id}
                              className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-gray-900">
                                  {property.name}
                                </h3>
                                <div className="flex items-center gap-1">
                                  {property.liked && (
                                    <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                                  )}
                                  {property.saved && (
                                    <Bookmark className="w-3 h-3 text-green-500 fill-green-500" />
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">
                                {property.location}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-900">
                                  {property.price}
                                </span>
                                <button className="text-xs text-blue-600 hover:text-blue-700">
                                  View Details
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 text-sm">No saved properties yet</p>
                          <Link
                            to="/properties"
                            className="text-blue-600 text-sm font-medium hover:text-blue-700 mt-2 inline-block"
                          >
                            Browse Properties →
                          </Link>
                        </div>
                      )}

                      {tenantData.savedProperties !== null && tenantData.savedProperties > 0 && (
                        <button
                          onClick={() => handleSectionChange("saved")}
                          className="w-full mt-3 text-xs text-center text-blue-600 hover:text-blue-700 py-2"
                        >
                          View All Saved Properties →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>


              <div className="space-y-6">

                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-base font-semibold text-gray-900">
                      Quick Actions
                    </h2>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/pricing-plans"
                        target="_blank"
                        className="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 flex flex-col items-center justify-center"
                      >
                        <CreditCard className="w-5 h-5 mb-1" />
                        <span className="text-xs font-medium">Buy Credits</span>
                      </Link>
                      <button
                        onClick={() => handleSectionChange("saved")}
                        className="p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 flex flex-col items-center justify-center"
                      >
                        <Bookmark className="w-5 h-5 mb-1" />
                        <span className="text-xs font-medium">
                          Saved {isLoading.saved ? "..." : (tenantData.savedProperties !== null ? `(${tenantData.savedProperties})` : "")}
                        </span>
                      </button>
                      <button
                        onClick={() => handleSectionChange("unlocked")}
                        className="p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 flex flex-col items-center justify-center"
                      >
                        <Unlock className="w-5 h-5 mb-1" />
                        <span className="text-xs font-medium">
                          Contacts {isLoading.unlocked ? "..." : (tenantData.unlockedContacts !== null ? `(${tenantData.unlockedContacts})` : "")}
                        </span>
                      </button>
                      <button
                        onClick={handleSearchProperties}
                        className="p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 flex flex-col items-center justify-center"
                      >
                        <Search className="w-5 h-5 mb-1" />
                        <span className="text-xs font-medium">Search</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Credit Purchase History */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-base font-semibold text-gray-900">
                      Recent Purchases
                    </h2>
                  </div>
                  <div className="p-4">
                    {paymentHistoryData?.data?.payments?.length > 0 ? (
                      <div className="space-y-3">
                        {paymentHistoryData.data.payments.slice(0, 3).map((purchase) => (
                          <div
                            key={purchase.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {purchase.credits || 0} Credit{purchase.credits !== 1 ? "s" : ""}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(purchase.created_at)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-green-600">
                                {formatCurrency(purchase.amount)}
                              </p>
                              <p className="text-xs text-gray-500 capitalize">
                                {purchase.status}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500 text-sm">No purchases yet</p>
                      </div>
                    )}

                    {(paymentHistoryData?.data?.payments?.length > 0 || staticData.creditPurchaseHistory) && (
                      <button
                        onClick={() => handleSectionChange("credits")}
                        className="w-full mt-3 text-xs text-center text-blue-600 hover:text-blue-700 py-2"
                      >
                        View Purchase History →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Summary Card */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Property Summary
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Track your property interactions
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {tenantData.savedProperties !== null && tenantData.likedProperties !== null
                      ? tenantData.savedProperties + tenantData.likedProperties
                      : "—"}
                  </div>
                  <div className="text-xs text-gray-500">Total Interactions</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-700">
                    {isLoading.saved ? "..." : (tenantData.savedProperties !== null ? tenantData.savedProperties : "—")}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Saved</div>
                </div>

                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-700">
                    {isLoading.liked ? "..." : (tenantData.likedProperties !== null ? tenantData.likedProperties : "—")}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Liked</div>
                </div>

                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-700">
                    {isLoading.credits ? "..." : (tenantData.creditBalance !== null ? tenantData.creditBalance : "—")}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Credits Left
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }, [
    activeSection,
    tenantData,
    isLoading,
    formatCurrency,
    formatDate,
    staticData,
    paymentHistoryData,
    handleRefreshData,
    handleSearchProperties,
    handleSectionChange
  ]);

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
                  <p>Puneri Homes</p>
                </div>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  Tenant
                </span>
              </div>
            </div>

            <div className="hidden lg:block flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  placeholder="Search properties, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Tenant Quick Stats with Credits */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {isLoading.credits ? "..." : (tenantData.creditBalance !== null ? `${tenantData.creditBalance} Credits` : "No credits")}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                  <Bookmark className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {isLoading.saved ? "..." : (tenantData.savedProperties !== null ? `${tenantData.savedProperties} Saved` : "No saved")}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {isLoading.liked ? "..." : (tenantData.likedProperties !== null ? `${tenantData.likedProperties} Liked` : "No liked")}
                  </span>
                </div>
              </div>

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
                    <p className="text-sm font-medium">
                      {tenantData.tenantName}
                    </p>
                    <p className="text-xs text-gray-500">Tenant</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>

                {userDropdownOpen && (
                  <div
                    ref={userDropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  >
                    <div className="p-3 border-b">
                      <p className="text-sm font-medium">
                        {tenantData.tenantName}
                      </p>
                      <p className="text-xs text-gray-500">Tenant Account</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-600">Credits:</span>
                        <span className="text-xs font-bold text-blue-600">
                          {isLoading.credits ? "..." : (tenantData.creditBalance !== null ? tenantData.creditBalance : "0")} available
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-gray-600">Saved:</span>
                        <span className="text-xs font-bold text-green-600">
                          {isLoading.saved ? "..." : (tenantData.savedProperties !== null ? tenantData.savedProperties : "0")} properties
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-gray-600">Liked:</span>
                        <span className="text-xs font-bold text-red-600">
                          {isLoading.liked ? "..." : (tenantData.likedProperties !== null ? tenantData.likedProperties : "0")} properties
                        </span>
                      </div>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => handleSectionChange("profile")}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </button>
                      <Link
                        to="/pricing-plans"
                        target="_blank"
                        className="block w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
                      >
                        Buy Credits
                      </Link>
                      <button
                        onClick={handleSearchProperties}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Search Properties
                      </button>
                      <hr className="my-1" />
                      <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                        Logout
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
        className={`fixed top-3 left-0 z-40 w-60 h-screen bg-white border-r border-gray-200 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform`}
      >
        <div className="h-full p-4">
          <div className="mb-6 px-2">
            <span className="text-sm font-semibold text-gray-900">
              Tenant Dashboard
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
                {item.isLoading ? (
                  <span className="ml-auto bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded animate-pulse">
                    ...
                  </span>
                ) : item.count !== undefined && item.count !== null ? (
                  <span className={`ml-auto ${item.id === "credits" && item.count === 0
                      ? "bg-gray-100 text-gray-600"
                      : "bg-blue-100 text-blue-800"
                    } text-xs font-medium px-2 py-0.5 rounded`}>
                    {item.id === "credits" && item.count === 0 ? "0" : item.count}
                  </span>
                ) : null}
                {item.active && (
                  <ChevronRight className="w-4 h-4 ml-auto text-blue-600" />
                )}
              </button>
            ))}
          </nav>

          {/* Credit Summary in Sidebar */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-blue-900 to-purple-900 border border-white/10 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-300" />
                <span className="text-xs font-medium tracking-wide text-gray-200">
                  Credit Balance
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-300/30">
                {isLoading.credits ? "..." : (tenantData.creditBalance !== null && tenantData.creditBalance > 0 ? "Active" : "Empty")}
              </span>
            </div>

            <div className="text-sm text-gray-300 mb-3">
              {isLoading.credits ? (
                <div className="h-5 w-20 bg-blue-800/50 animate-pulse rounded"></div>
              ) : tenantData.creditBalance !== null ? (
                <>
                  {tenantData.creditBalance} {tenantData.creditBalance === 1 ? 'Credit' : 'Credits'} available
                </>
              ) : (
                "No credit data"
              )}
            </div>

            <div className="text-[11px] text-gray-300 mb-3">
              ₹249 = 3 Credit<br />₹499 = 6 Credits
            </div>

            <Link
              to="/pricing-plans"
              target="_blank"
              className="w-full py-2 px-2 text-xs font-semibold rounded-lg bg-white text-blue-900 hover:bg-gray-100 transition-all shadow-md block text-center"
            >
              {tenantData.creditBalance !== null && tenantData.creditBalance > 0 ? "Add More Credits" : "Buy Credits"}
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content with Breadcrumb */}
      <main className="lg:ml-60 pt-14 mt-2">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 mt-2 hidden lg:block">
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

export default TenantDashboard;