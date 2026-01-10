import React, { useState, useEffect, useRef } from "react";
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

// Import tenant components
import TenantProfile from "./TenantProfile";
import SavedProperties from "./SavedProperties";
import LikedProperties from "./LikedProperties";
import UnlockedContacts from "./UnlockedContacts";
import CreditSystem from "./CreditSystem";
import Tenant_setting from "./Tenant_setting";
import { Link, useNavigate } from "react-router-dom";

function TenantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem("tenantActiveSection");
    return savedSection || "dashboard";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);

  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const profileBtnRef = useRef(null);
  const notificationBtnRef = useRef(null);

  // Save active section to localStorage
  useEffect(() => {
    localStorage.setItem("tenantActiveSection", activeSection);
  }, [activeSection]);

  const navigate = useNavigate()
  // Formatting functions
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

  // Credit Calculation Logic
  const calculateCredits = (amount) => {
    if (amount >= 149) return 3; // ₹149 = 3 credits
    if (amount >= 99) return 1; // ₹99 = 1 credit
    return 0; // Less than ₹99 = 0 credits
  };

  // Tenant-specific data
  const [tenantData, setTenantData] = useState({
    // Tenant Overview
    tenantName: "Rohan Mehta",
    tenantEmail: "rohan.mehta@email.com",
    tenantPhone: "+91 9876543210",
    joinDate: "2024-01-15",

    // Credit Information
    creditBalance: 5,
    totalCreditsUsed: 3,
    totalCreditsPurchased: 8,
    remainingContacts: 5,

    // Property Stats
    savedProperties: 12,
    likedProperties: 8,
    unlockedContacts: 3,
    viewedProperties: 24,

    // Financial Overview
    totalSpent: 447,
    lastPurchase: 149,
    avgPurchaseValue: 149,

    // Recent Activity
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
      {
        id: 4,
        type: "property_liked",
        property: "3BHK Flat",
        location: "Kalyani Nagar",
        date: "2024-02-17",
      },
      {
        id: 5,
        type: "contact_viewed",
        property: "1BHK Studio",
        owner: "Priya Sharma",
        date: "2024-02-16",
        creditsUsed: 1,
      },
    ],

    // Saved Properties Preview
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
      {
        id: 3,
        name: "1BHK Studio Apartment",
        location: "Viman Nagar",
        price: "₹45 L",
        liked: false,
        saved: true,
      },
    ],

    // Liked Properties Preview
    likedPropertiesPreview: [
      {
        id: 1,
        name: "Premium 4BHK Penthouse",
        location: "Baner",
        price: "₹3.8 Cr",
        liked: true,
        saved: false,
      },
      {
        id: 2,
        name: "2BHK with Garden",
        location: "Aundh",
        price: "₹1.2 Cr",
        liked: true,
        saved: false,
      },
    ],

    // Unlocked Contacts
    unlockedContactsList: [
      {
        id: 1,
        ownerName: "Rajesh Kumar",
        property: "2BHK Apartment",
        phone: "+91 98765 43210",
        unlockDate: "2024-02-20",
        creditsUsed: 1,
      },
      {
        id: 2,
        ownerName: "Priya Sharma",
        property: "1BHK Studio",
        phone: "+91 98765 43211",
        unlockDate: "2024-02-16",
        creditsUsed: 1,
      },
      {
        id: 3,
        ownerName: "Amit Patel",
        property: "3BHK Flat",
        phone: "+91 98765 43212",
        unlockDate: "2024-02-10",
        creditsUsed: 1,
      },
    ],

    // Credit Purchase History
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
      {
        id: 3,
        date: "2024-02-05",
        amount: 149,
        creditsEarned: 3,
        status: "completed",
      },
      {
        id: 4,
        date: "2024-02-01",
        amount: 99,
        creditsEarned: 1,
        status: "completed",
      },
    ],

    // Upcoming Viewings
    upcomingViewings: [
      {
        id: 1,
        property: "Luxury Villa",
        date: "2024-02-22",
        time: "10:00 AM",
        owner: "Rajesh Kumar",
      },
      {
        id: 2,
        property: "2BHK Flat",
        date: "2024-02-23",
        time: "3:00 PM",
        owner: "Amit Patel",
      },
    ],
  });

  // Tenant menu items
  const menuItems = [
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
    },
    {
      id: "liked",
      label: "Liked Properties",
      icon: Heart,
      active: activeSection === "liked",
    },
    {
      id: "unlocked",
      label: "Unlocked Contacts",
      icon: Unlock,
      active: activeSection === "unlocked",
    },
    {
      id: "credits",
      label: "Credit System",
      icon: CreditCard,
      active: activeSection === "credits",
    },
    // {
    //   id: "viewings",
    //   label: "My Viewings",
    //   icon: Calendar,
    //   active: activeSection === "viewings",
    // },
    // {
    //   id: "messages",
    //   label: "Messages",
    //   icon: MessageSquare,
    //   active: activeSection === "messages",
    // },
    {
      id: "tenant_setting",
      label: "Tenant Setting",
      icon: Settings,
      active: activeSection === "tenant_setting",
    },
  ];

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

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  // Handle section change
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Handle actions
  const handleBuyCredits = () => {
    navigate("/pricing-plans")

  };

  const handleSearchProperties = () => {
    alert("Searching properties...");
  };

  const handleRefreshData = () => {
    alert("Refreshing tenant data...");
  };

  // Calculate total spent
  const calculateTotalSpent = () => {
    return tenantData.creditPurchaseHistory.reduce((total, purchase) => {
      return total + purchase.amount;
    }, 0);
  };

  // Render different sections
  const renderMainContent = () => {
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
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-600">Credits</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {tenantData.creditBalance}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Available contacts
                </div>
              </div>

              {/* Saved Properties */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Bookmark className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-600">Saved</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {tenantData.savedProperties}
                </div>
                <div className="text-xs text-gray-500 mt-1">Properties</div>
              </div>

              {/* Liked Properties */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Heart className="w-4 h-4 text-red-600" />
                  <span className="text-xs text-gray-600">Liked</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {tenantData.likedProperties}
                </div>
                <div className="text-xs text-gray-500 mt-1">Properties</div>
              </div>

              {/* Unlocked Contacts */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Unlock className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-gray-600">Unlocked</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {tenantData.unlockedContacts}
                </div>
                <div className="text-xs text-gray-500 mt-1">Contacts</div>
              </div>

              {/* Total Spent */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-4 h-4 text-yellow-600" />
                  <span className="text-xs text-gray-600">Total Spent</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {formatCurrency(tenantData.totalSpent)}
                </div>
                <div className="text-xs text-gray-500 mt-1">On credits</div>
              </div>

              {/* Viewed Properties */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-4 h-4 text-orange-600" />
                  <span className="text-xs text-gray-600">Viewed</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {tenantData.viewedProperties}
                </div>
                <div className="text-xs text-gray-500 mt-1">Properties</div>
              </div>
            </div>

            {/* Credit Information Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
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
                    <div className="text-lg font-bold text-blue-900">₹99</div>
                    <div className="text-xs text-blue-700">1 Credit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-900">₹149</div>
                    <div className="text-xs text-blue-700">3 Credits</div>
                  </div>
                  <Link
                    to="/pricing-plans"
                    target="_blank"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Buy More Credits
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Recent Activity & Saved Properties */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-base font-semibold text-gray-900">
                        Recent Activity
                      </h2>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {tenantData.recentActivities.map((activity) => (
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
                                    : activity.type === "property_saved"
                                      ? "bg-green-100 text-green-600"
                                      : "bg-purple-100 text-purple-600"
                                  }`}
                              >
                                {activity.type === "contact_unlock" ? (
                                  <Unlock className="w-4 h-4" />
                                ) : activity.type === "credit_purchase" ? (
                                  <CreditCard className="w-4 h-4" />
                                ) : activity.type === "property_saved" ? (
                                  <Bookmark className="w-4 h-4" />
                                ) : (
                                  <Heart className="w-4 h-4" />
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

                  {/* Saved Properties Preview */}
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-gray-900">
                          Saved Properties
                        </h2>
                        <span className="text-xs text-gray-500">
                          {tenantData.savedProperties} total
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {tenantData.savedPropertiesPreview.map((property) => (
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
                      <button
                        onClick={() => handleSectionChange("saved")}
                        className="w-full mt-3 text-xs text-center text-blue-600 hover:text-blue-700 py-2"
                      >
                        View All Saved Properties →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Credit Info */}
              <div className="space-y-6">
                {/* Quick Actions */}
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
                        <span className="text-xs font-medium">Saved</span>
                      </button>
                      <button
                        onClick={() => handleSectionChange("unlocked")}
                        className="p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 flex flex-col items-center justify-center"
                      >
                        <Unlock className="w-5 h-5 mb-1" />
                        <span className="text-xs font-medium">Contacts</span>
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
                    <div className="space-y-3">
                      {tenantData.creditPurchaseHistory
                        .slice(0, 3)
                        .map((purchase) => (
                          <div
                            key={purchase.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {purchase.creditsEarned} Credit
                                {purchase.creditsEarned !== 1 ? "s" : ""}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(purchase.date)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-green-600">
                                ₹{purchase.amount}
                              </p>
                              <p className="text-xs text-gray-500">
                                {purchase.status}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                    <button
                      onClick={() => handleSectionChange("credits")}
                      className="w-full mt-3 text-xs text-center text-blue-600 hover:text-blue-700 py-2"
                    >
                      View Purchase History →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Viewings & Unlocked Contacts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Viewings */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-base font-semibold text-gray-900">
                    Upcoming Viewings
                  </h2>
                  <p className="text-xs text-gray-600">
                    Scheduled property visits
                  </p>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {tenantData.upcomingViewings.map((viewing) => (
                      <div
                        key={viewing.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {viewing.property}
                            </p>
                            <p className="text-xs text-gray-500">
                              {viewing.owner}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900">
                            {formatDate(viewing.date)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {viewing.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">
                      Need to reschedule? Contact the owner directly from
                      Unlocked Contacts.
                    </div>
                  </div>
                </div>
              </div>

              {/* Unlocked Contacts Preview */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-gray-900">
                        Recently Unlocked
                      </h2>
                      <p className="text-xs text-gray-600">
                        Owner contacts you've unlocked
                      </p>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">
                      {tenantData.unlockedContacts} total
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {tenantData.unlockedContactsList
                      .slice(0, 2)
                      .map((contact) => (
                        <div
                          key={contact.id}
                          className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-900">
                              {contact.ownerName}
                            </h3>
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              -{contact.creditsUsed} credit
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            {contact.property}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-700">
                                {contact.phone}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatDate(contact.unlockDate)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={() => handleSectionChange("unlocked")}
                    className="w-full mt-3 text-xs text-center text-blue-600 hover:text-blue-700 py-2"
                  >
                    View All Unlocked Contacts →
                  </button>
                </div>
              </div>
            </div>

            {/* Credit Summary Card */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Credit Summary
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Track your credit usage
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {tenantData.creditBalance}
                  </div>
                  <div className="text-xs text-gray-500">Available Credits</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-700">
                    {tenantData.totalCreditsPurchased}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Total Purchased
                  </div>
                </div>

                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-700">
                    {tenantData.totalCreditsUsed}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Used</div>
                </div>

                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-700">
                    {tenantData.remainingContacts}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Contacts Left
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

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
                    {tenantData.creditBalance} Credits
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                  <Bookmark className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {tenantData.savedProperties} Saved
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {tenantData.likedProperties} Liked
                  </span>
                </div>
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
                          {tenantData.creditBalance} available
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
                      <button className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">
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
        className={`fixed top-3 left-0 z-40 w-56 h-screen bg-white border-r border-gray-200 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${item.active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
                {item.active && (
                  <ChevronRight className="w-4 h-4 ml-auto text-blue-600" />
                )}
              </button>
            ))}
          </nav>

          {/* Credit Summary in Sidebar */}
          <div className=" p-4 rounded-xl bg-gradient-to-br from-blue-900 to-purple-900 border border-white/10 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-300" />
                <span className="text-xs font-medium tracking-wide text-gray-200">
                  Credit Balance
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-300/30">
                Active
              </span>
            </div>


            <div className="text-sm text-gray-300 mb-3">
              {tenantData.creditBalance} Available credits for unlocking contacts
            </div>

            <div className="text-[11px] text-gray-300 mb-3">
              ₹99 = 1 Contact &nbsp; <br /> ₹149 = 3 Contacts
            </div>

            <Link
              to="/pricing-plans"
              target="_blank"
              className="w-full py-2 text-xs font-semibold rounded-lg bg-white text-blue-900 hover:bg-gray-100 transition-all shadow-md"
            >
              Buy More Credits
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content with Breadcrumb */}
      <main className="lg:ml-56 pt-14 mt-2">
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
