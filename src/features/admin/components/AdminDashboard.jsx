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
} from "lucide-react";

// Import admin components
import AdminProperties from "./AdminProperties";
import AdminInquiries from "./AdminInquiries";
import AdminAnalytics from "./AdminAnalytics";
import AdminPayments from "./AdminPayments";
import AdminTenants from "./AdminTenants";
import AdminOwners from "./AdminOwners";
import AdminReports from "./AdminReports";
import AdminSettings from "./AdminSettings";

function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(() => {
        const savedSection = localStorage.getItem("adminActiveSection");
        return savedSection || "dashboard";
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

    const userDropdownRef = useRef(null);
    const notificationDropdownRef = useRef(null);
    const profileBtnRef = useRef(null);
    const notificationBtnRef = useRef(null);

    // Save active section to localStorage
    useEffect(() => {
        localStorage.setItem("adminActiveSection", activeSection);
    }, [activeSection]);

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
        if (amount >= 99) return 1;  // ₹99 = 1 credit
        return 0; // Less than ₹99 = 0 credits
    };

    // Calculate total credits earned by company
    const calculateTotalCreditsEarned = (transactions) => {
        return transactions.reduce((total, transaction) => {
            if (transaction.type === "credit_purchase") {
                return total + calculateCredits(transaction.amount);
            }
            return total;
        }, 0);
    };

    // Admin-specific data
    const [adminData, setAdminData] = useState({
        // Company Overview
        totalOwners: 156,
        totalTenants: 423,
        totalProperties: 289,
        activeProperties: 245,
        pendingApprovals: 12,

        // Financial Overview
        totalRevenue: 2850000,
        monthlyRevenue: 425000,
        pendingPayouts: 185000,
        companyProfit: 1250000,
        commissionEarned: 285000,

        // Payment & Credit Statistics
        totalTransactions: 2345,
        successfulPayments: 2210,
        failedPayments: 35,
        pendingPayments: 100,
        avgTransactionValue: 18500,

        // Credit Calculation Metrics
        totalCreditsEarned: 8642, // Total contact numbers/credits company earned
        creditsThisMonth: 1245,
        creditConversionRate: "85%", // % of payments that convert to credits

        // Subscription Details
        activeSubscriptions: 132,
        expiringThisMonth: 18,
        premiumSubscriptions: 89,
        basicSubscriptions: 43,

        // Recent Activity
        recentApprovals: [
            { id: 1, type: "property", name: "Luxury Villa", owner: "Rajesh Kumar", date: "2024-02-20", status: "approved" },
            { id: 2, type: "owner", name: "Priya Sharma", email: "priya@email.com", date: "2024-02-19", status: "verified" },
            { id: 3, type: "property", name: "2BHK Apartment", owner: "Amit Patel", date: "2024-02-18", status: "rejected" },
        ],

        pendingActions: [
            { id: 1, type: "property_approval", count: 12, priority: "high" },
            { id: 2, type: "owner_verification", count: 8, priority: "medium" },
            { id: 3, type: "complaint", count: 5, priority: "high" },
            { id: 4, type: "refund_request", count: 3, priority: "low" },
        ],

        topPerformingOwners: [
            { id: 1, name: "Rajesh Kumar", properties: 15, earnings: 450000, rating: 4.8 },
            { id: 2, name: "Priya Sharma", properties: 12, earnings: 380000, rating: 4.7 },
            { id: 3, name: "Amit Patel", properties: 10, earnings: 320000, rating: 4.5 },
        ],

        // Tenant Credit Status with Credit Calculation
        tenantCreditStatus: [
            {
                id: 1,
                name: "Rohan Mehta",
                phone: "+91 9876543210",
                paymentAmount: 99, // Paid ₹99
                creditBalance: calculateCredits(99), // = 1 credit
                contactsAvailable: calculateCredits(99), // = 1 contact
                dueAmount: 0,
                status: "active",
                lastPayment: "2024-02-20"
            },
            {
                id: 2,
                name: "Sneha Reddy",
                phone: "+91 9876543211",
                paymentAmount: 149, // Paid ₹149
                creditBalance: calculateCredits(149), // = 3 credits
                contactsAvailable: calculateCredits(149), // = 3 contacts
                dueAmount: 2500,
                status: "pending",
                lastPayment: "2024-02-18"
            },
            {
                id: 3,
                name: "Vikram Singh",
                phone: "+91 9876543212",
                paymentAmount: 298, // Paid ₹298 (149×2)
                creditBalance: calculateCredits(298), // = 6 credits
                contactsAvailable: calculateCredits(298), // = 6 contacts
                dueAmount: 12000,
                status: "overdue",
                lastPayment: "2024-02-15"
            },
            {
                id: 4,
                name: "Priya Desai",
                phone: "+91 9876543213",
                paymentAmount: 447, // Paid ₹447 (149×3)
                creditBalance: calculateCredits(447), // = 9 credits
                contactsAvailable: 6, // Has used 3 contacts, 6 left
                dueAmount: 0,
                status: "active",
                lastPayment: "2024-02-19"
            },
            {
                id: 5,
                name: "Amit Verma",
                phone: "+91 9876543214",
                paymentAmount: 99, // Paid ₹99
                creditBalance: calculateCredits(99), // = 1 credit
                contactsAvailable: 0, // Has used the contact
                dueAmount: 0,
                status: "active",
                lastPayment: "2024-02-21"
            },
        ],

        // Recent Credit Purchases
        recentCreditPurchases: [
            { id: 1, tenant: "Rohan Mehta", amount: 99, creditsEarned: calculateCredits(99), date: "2024-02-20", status: "completed" },
            { id: 2, tenant: "Sneha Reddy", amount: 149, creditsEarned: calculateCredits(149), date: "2024-02-18", status: "completed" },
            { id: 3, tenant: "Vikram Singh", amount: 298, creditsEarned: calculateCredits(298), date: "2024-02-15", status: "completed" },
            { id: 4, tenant: "Priya Desai", amount: 447, creditsEarned: calculateCredits(447), date: "2024-02-19", status: "completed" },
            { id: 5, tenant: "Amit Verma", amount: 99, creditsEarned: calculateCredits(99), date: "2024-02-21", status: "pending" },
        ],

        subscriptionExpiries: [
            { id: 1, owner: "Rajesh Kumar", plan: "Premium", amount: 4999, expires: "2024-02-28", status: "expiring" },
            { id: 2, owner: "Priya Sharma", plan: "Premium", amount: 4999, expires: "2024-03-05", status: "active" },
            { id: 3, owner: "Amit Patel", plan: "Basic", amount: 1999, expires: "2024-02-25", status: "expiring" },
        ],
    });

    // Admin menu items
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, active: activeSection === "dashboard" },
        { id: "properties", label: "Properties", icon: Building, active: activeSection === "properties" },
        { id: "owners", label: "Owners", icon: Users, active: activeSection === "owners" },
        { id: "tenants", label: "Tenants", icon: User, active: activeSection === "tenants" },
        { id: "payments", label: "Payments", icon: CreditCard, active: activeSection === "payments" },
        { id: "analytics", label: "Analytics", icon: BarChart3, active: activeSection === "analytics" },
        { id: "reports", label: "Reports", icon: FileText, active: activeSection === "reports" },
        { id: "inquiries", label: "Inquiries", icon: AlertCircle, active: activeSection === "inquiries" },
        { id: "settings", label: "Settings", icon: Settings, active: activeSection === "settings" },
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
    const handleApproveAll = () => {
        alert("Approve all pending actions");
    };

    const handleGenerateReport = () => {
        alert("Generate comprehensive report");
    };

    const handleRefreshData = () => {
        alert("Refreshing admin data...");
    };

    // Calculate total credits from tenant payments
    const calculateTotalCreditsFromTenants = () => {
        return adminData.tenantCreditStatus.reduce((total, tenant) => {
            return total + calculateCredits(tenant.paymentAmount);
        }, 0);
    };

    // Get credit breakdown by amount
    const getCreditBreakdown = () => {
        const breakdown = { "₹99": 0, "₹149": 0, "other": 0 };

        adminData.recentCreditPurchases.forEach(purchase => {
            if (purchase.amount === 99) breakdown["₹99"]++;
            else if (purchase.amount === 149) breakdown["₹149"]++;
            else breakdown["other"]++;
        });

        return breakdown;
    };

    // Render different sections
    const renderMainContent = () => {
        switch (activeSection) {
            case "properties":
                return <AdminProperties />;
            case "inquiries":
                return <AdminInquiries />;
            case "analytics":
                return <AdminAnalytics />;
            case "payments":
                return <AdminPayments />;
            case "tenants":
                return <AdminTenants />;
            case "owners":
                return <AdminOwners />;
            case "reports":
                return <AdminReports />;
            case "settings":
                return <AdminSettings />;
            case "dashboard":
            default:
                return (
                    <div className="p-4">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Full company control & analytics
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleRefreshData}
                                        className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1"
                                    >
                                        <RefreshCw className="w-3 h-3" />
                                        Refresh
                                    </button>
                                    <button
                                        onClick={handleGenerateReport}
                                        className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                                    >
                                        <Download className="w-3 h-3" />
                                        Export Report
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards - Company Overview with Credits */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                            {/* Total Owners */}
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <Users className="w-4 h-4 text-purple-600" />
                                    <span className="text-xs text-gray-600">Owners</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    {formatNumber(adminData.totalOwners)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    +12 this month
                                </div>
                            </div>

                            {/* Total Tenants */}
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <User className="w-4 h-4 text-green-600" />
                                    <span className="text-xs text-gray-600">Tenants</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    {formatNumber(adminData.totalTenants)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    +24 this month
                                </div>
                            </div>

                            {/* Credit Earnings */}
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <PhoneCall className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs text-gray-600">Credits Earned</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    {formatNumber(adminData.totalCreditsEarned)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Contact numbers
                                </div>
                            </div>

                            {/* Credit Conversion */}
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <Percent className="w-4 h-4 text-orange-600" />
                                    <span className="text-xs text-gray-600">Conversion</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    {adminData.creditConversionRate}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Payment to credit
                                </div>
                            </div>

                            {/* Monthly Revenue */}
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <DollarSign className="w-4 h-4 text-yellow-600" />
                                    <span className="text-xs text-gray-600">Revenue</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    {formatCurrency(adminData.monthlyRevenue)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">This month</div>
                            </div>

                            {/* Company Profit */}
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-xs text-gray-600">Profit</span>
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    {formatCurrency(adminData.companyProfit)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Lifetime</div>
                            </div>
                        </div>

                        {/* Credit Calculation Information */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-blue-900">Credit Calculation System</h3>
                                    <p className="text-sm text-blue-700">How tenant payments convert to contact numbers</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-900">₹99</div>
                                        <div className="text-xs text-blue-700">= 1 Contact</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-900">₹149</div>
                                        <div className="text-xs text-blue-700">= 3 Contacts</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Overview & Pending Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            {/* Financial & Credit Overview */}
                            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="text-base font-semibold text-gray-900">
                                        Financial & Credit Overview
                                    </h2>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <DollarSign className="w-4 h-4 text-blue-600" />
                                                <span className="text-xs font-medium text-blue-900">Total Revenue</span>
                                            </div>
                                            <div className="text-lg font-bold text-blue-900">
                                                {formatCurrency(adminData.totalRevenue)}
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <TrendingUp className="w-4 h-4 text-green-600" />
                                                <span className="text-xs font-medium text-green-900">Company Profit</span>
                                            </div>
                                            <div className="text-lg font-bold text-green-900">
                                                {formatCurrency(adminData.companyProfit)}
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <PhoneCall className="w-4 h-4 text-purple-600" />
                                                <span className="text-xs font-medium text-purple-900">Total Credits</span>
                                            </div>
                                            <div className="text-lg font-bold text-purple-900">
                                                {adminData.totalCreditsEarned}
                                            </div>
                                            <div className="text-xs text-purple-700">
                                                Contact numbers
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="w-4 h-4 text-orange-600" />
                                                <span className="text-xs font-medium text-orange-900">Pending Payouts</span>
                                            </div>
                                            <div className="text-lg font-bold text-orange-900">
                                                {formatCurrency(adminData.pendingPayouts)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Credit Breakdown */}
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Credit Purchase Breakdown</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                                                <div className="text-lg font-bold text-blue-600">
                                                    {getCreditBreakdown()["₹99"]}
                                                </div>
                                                <div className="text-xs text-gray-600">₹99 Purchases</div>
                                                <div className="text-xs text-blue-500">= {getCreditBreakdown()["₹99"]} Credits</div>
                                            </div>
                                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                                                <div className="text-lg font-bold text-purple-600">
                                                    {getCreditBreakdown()["₹149"]}
                                                </div>
                                                <div className="text-xs text-gray-600">₹149 Purchases</div>
                                                <div className="text-xs text-purple-500">= {getCreditBreakdown()["₹149"] * 3} Credits</div>
                                            </div>
                                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                                <div className="text-lg font-bold text-green-600">
                                                    {calculateTotalCreditsFromTenants()}
                                                </div>
                                                <div className="text-xs text-gray-600">Active Credits</div>
                                                <div className="text-xs text-green-500">From Tenants</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pending Actions */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-base font-semibold text-gray-900">
                                            Pending Actions
                                        </h2>
                                        <button
                                            onClick={handleApproveAll}
                                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Process All
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-3">
                                        {adminData.pendingActions.map((action) => (
                                            <div key={action.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action.priority === 'high' ? 'bg-red-100 text-red-600' :
                                                            action.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                                                'bg-blue-100 text-blue-600'
                                                        }`}>
                                                        <AlertCircle className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 capitalize">
                                                            {action.type.replace('_', ' ')}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Requires attention
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-bold text-gray-900">
                                                        {action.count}
                                                    </div>
                                                    <div className={`text-xs ${action.priority === 'high' ? 'text-red-600' :
                                                            action.priority === 'medium' ? 'text-yellow-600' :
                                                                'text-blue-600'
                                                        }`}>
                                                        {action.priority}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tenant Credit Status & Recent Credit Purchases */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Tenant Credit Status */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-base font-semibold text-gray-900">
                                                Tenant Credit Status
                                            </h2>
                                            <p className="text-xs text-gray-600">Credit balances & contact availability</p>
                                        </div>
                                        <div className="text-xs text-blue-600 font-medium">
                                            Total Credits: {calculateTotalCreditsFromTenants()}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-2 text-gray-600 font-medium">Tenant</th>
                                                    <th className="text-left py-2 text-gray-600 font-medium">Phone</th>
                                                    <th className="text-left py-2 text-gray-600 font-medium">Paid</th>
                                                    <th className="text-left py-2 text-gray-600 font-medium">Credits</th>
                                                    <th className="text-left py-2 text-gray-600 font-medium">Contacts</th>
                                                    <th className="text-left py-2 text-gray-600 font-medium">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {adminData.tenantCreditStatus.map((tenant) => (
                                                    <tr key={tenant.id} className="border-b hover:bg-gray-50">
                                                        <td className="py-2">
                                                            <div className="font-medium text-gray-900">{tenant.name}</div>
                                                        </td>
                                                        <td className="py-2 text-gray-600">{tenant.phone}</td>
                                                        <td className="py-2">
                                                            <span className="font-medium text-green-600">
                                                                {formatCurrency(tenant.paymentAmount)}
                                                            </span>
                                                        </td>
                                                        <td className="py-2">
                                                            <div className="flex items-center gap-1">
                                                                <span className={`font-bold ${tenant.creditBalance > 0 ? 'text-purple-600' : 'text-gray-400'
                                                                    }`}>
                                                                    {tenant.creditBalance}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    ({tenant.paymentAmount === 99 ? '₹99 Plan' : '₹149 Plan'})
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-2">
                                                            <div className="flex items-center gap-2">
                                                                <Smartphone className={`w-3 h-3 ${tenant.contactsAvailable > 0 ? 'text-green-500' : 'text-gray-400'
                                                                    }`} />
                                                                <span className={`font-medium ${tenant.contactsAvailable > 0 ? 'text-green-600' : 'text-red-600'
                                                                    }`}>
                                                                    {tenant.contactsAvailable}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    /{tenant.creditBalance}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-2">
                                                            <span className={`px-2 py-1 rounded-full text-xs ${tenant.status === 'active' ? 'bg-green-100 text-green-800' :
                                                                    tenant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-red-100 text-red-800'
                                                                }`}>
                                                                {tenant.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button
                                        onClick={() => handleSectionChange("tenants")}
                                        className="w-full mt-3 text-xs text-center text-blue-600 hover:text-blue-700 py-2"
                                    >
                                        View All Tenants →
                                    </button>
                                </div>
                            </div>

                            {/* Recent Credit Purchases */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="text-base font-semibold text-gray-900">
                                        Recent Credit Purchases
                                    </h2>
                                    <p className="text-xs text-gray-600">Latest credit transactions</p>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-3">
                                        {adminData.recentCreditPurchases.map((purchase) => (
                                            <div key={purchase.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${purchase.amount === 99 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                                        }`}>
                                                        {purchase.amount === 99 ? (
                                                            <span className="text-sm font-bold">₹99</span>
                                                        ) : (
                                                            <span className="text-sm font-bold">₹149</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{purchase.tenant}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {purchase.creditsEarned} contact{purchase.creditsEarned !== 1 ? 's' : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-bold text-gray-900">
                                                        {purchase.creditsEarned} Credit{purchase.creditsEarned !== 1 ? 's' : ''}
                                                    </div>
                                                    <div className={`text-xs ${purchase.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                                                        }`}>
                                                        {formatDate(purchase.date)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Credit Conversion Rate:</span>
                                            <span className="font-bold text-green-600">{adminData.creditConversionRate}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {calculateTotalCreditsFromTenants()} total active credits from tenants
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Credit Summary Card */}
                        <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold">Credit Summary</h3>
                                    <p className="text-sm text-purple-100">Total contact numbers earned by company</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold">{adminData.totalCreditsEarned}</div>
                                    <div className="text-sm text-purple-200">Contact Numbers</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="text-center">
                                    <div className="text-xl font-bold">{getCreditBreakdown()["₹99"]}</div>
                                    <div className="text-sm text-purple-200">₹99 Purchases</div>
                                    <div className="text-xs text-purple-300">({getCreditBreakdown()["₹99"]} credits)</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">{getCreditBreakdown()["₹149"]}</div>
                                    <div className="text-sm text-purple-200">₹149 Purchases</div>
                                    <div className="text-xs text-purple-300">({getCreditBreakdown()["₹149"] * 3} credits)</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">{adminData.creditsThisMonth}</div>
                                    <div className="text-sm text-purple-200">This Month</div>
                                    <div className="text-xs text-purple-300">New credits</div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Approvals */}
                        <div className="mt-6 bg-white rounded-lg border border-gray-200">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-base font-semibold text-gray-900">Recent Approvals</h2>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {adminData.recentApprovals.map((approval) => (
                                        <div key={approval.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${approval.type === 'property' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                                        }`}>
                                                        {approval.type === 'property' ? <Building className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{approval.name}</span>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs ${approval.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        approval.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {approval.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600 mb-1">{approval.owner || approval.email}</p>
                                            <p className="text-xs text-gray-500">{formatDate(approval.date)}</p>
                                        </div>
                                    ))}
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
                                    Admin
                                </span>
                            </div>
                        </div>

                        <div className="hidden lg:block flex-1 max-w-md mx-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                                    placeholder="Search owners, tenants, properties..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Admin Quick Stats with Credits */}
                            <div className="hidden md:flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg">
                                    <PhoneCall className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {adminData.totalCreditsEarned} Credits
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {adminData.totalOwners} Owners
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
                                    <User className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {adminData.totalTenants} Tenants
                                    </span>
                                </div>
                            </div>

                            <button
                                ref={notificationBtnRef}
                                onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
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
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-purple-600" />
                                    </div>
                                </button>

                                {userDropdownOpen && (
                                    <div
                                        ref={userDropdownRef}
                                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                                    >
                                        <div className="p-3 border-b">
                                            <p className="text-sm font-medium">Admin User</p>
                                            <p className="text-xs text-gray-500">Super Admin</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-xs text-gray-600">Credits Managed:</span>
                                                <span className="text-xs font-bold text-purple-600">{adminData.totalCreditsEarned}</span>
                                            </div>
                                        </div>
                                        <div className="p-1">
                                            <button
                                                onClick={() => handleSectionChange("dashboard")}
                                                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Dashboard
                                            </button>
                                            <button
                                                onClick={() => handleSectionChange("payments")}
                                                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Credit Management
                                            </button>
                                            <button
                                                onClick={handleGenerateReport}
                                                className="block w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
                                            >
                                                Generate Report
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
                            Admin Control Panel
                        </span>
                    </div>

                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleSectionChange(item.id)}
                                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${item.active
                                        ? "bg-purple-50 text-purple-700"
                                        : "text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                <item.icon className="w-4 h-4 mr-3" />
                                {item.label}
                                {item.active && (
                                    <ChevronRight className="w-4 h-4 ml-auto text-purple-600" />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Credit Summary in Sidebar */}
                    <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-purple-900 to-blue-900 border border-white/10 shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <PhoneCall className="w-4 h-4 text-purple-300" />
                                <span className="text-xs font-medium tracking-wide text-gray-200">
                                    Credit System
                                </span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-300/30">
                                Active
                            </span>
                        </div>

                        <div className="text-sm text-white mb-2">
                            ₹99 = 1 Contact
                        </div>
                        <div className="text-sm text-white mb-2">
                            ₹149 = 3 Contacts
                        </div>

                        <div className="text-[11px] text-gray-300 mb-3">
                            Total Credits: {adminData.totalCreditsEarned}
                        </div>

                        <button
                            onClick={() => handleSectionChange("payments")}
                            className="w-full py-2 text-xs font-semibold rounded-lg bg-white text-purple-900 hover:bg-gray-100 transition-all shadow-md"
                        >
                            Manage Credits
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content with Breadcrumb */}
            <main className="lg:ml-56 pt-14 mt-2">
                {/* Breadcrumb Navigation */}
                <div className="bg-white border-b border-gray-200 px-4 py-2 hidden lg:block">
                    <div className="flex items-center text-sm text-gray-600">
                        <button
                            onClick={() => handleSectionChange("dashboard")}
                            className="hover:text-purple-600"
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
                                    ? "text-purple-600"
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

export default AdminDashboard;