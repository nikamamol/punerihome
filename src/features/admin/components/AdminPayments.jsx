import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Send,
  CreditCard,
  Banknote,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  Users,
  Home,
  MoreVertical,
  Eye,
  Receipt,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Plus,
  Mail,
  Phone,
  X,
  Edit,
  Trash2,
  FileText,
  Calculator,
  Wallet,
  TrendingUp,
  BanknoteArrowDown,
  User,
  Building,
  Shield,
  Crown,
  Zap,
  CreditCard as Card,
  CalendarDays,
  BellRing,
  AlertTriangle,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { useNavigate } from "react-router-dom";

const AdminPayments = () => {
  const navigate = useNavigate();

  // Tenant Payment Data
  const [tenantPayments, setTenantPayments] = useState([
    {
      id: 1,
      tenantName: "Rahul Verma",
      tenantId: "TEN001",
      tenantEmail: "rahul.verma@email.com",
      tenantPhone: "+91 9876543210",
      property: "2 BHK Apartment, Hinjewadi",
      propertyId: "PROP001",
      ownerName: "Rajesh Sharma",
      ownerId: "OWN001",
      amount: 45000,
      creditBalance: 25000,
      totalCreditLimit: 100000,
      creditUtilization: 25,
      planType: "Premium",
      planExpiryDate: "2024-06-30",
      daysToExpiry: 120,
      paymentDate: "2024-02-15",
      dueDate: "2024-02-10",
      status: "completed",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN789012",
      cycle: "Monthly",
      rentMonth: "February 2024",
      notes: "Rent payment for February",
      attachments: 2,
      isCreditAllowed: true,
      maxCreditDays: 30,
      usedCreditDays: 15,
    },
    {
      id: 2,
      tenantName: "Priya Singh",
      tenantId: "TEN002",
      tenantEmail: "priya.singh@email.com",
      tenantPhone: "+91 9876543211",
      property: "3 BHK Villa, Wakad",
      propertyId: "PROP002",
      ownerName: "Rajesh Sharma",
      ownerId: "OWN001",
      amount: 75000,
      creditBalance: 50000,
      totalCreditLimit: 150000,
      creditUtilization: 33,
      planType: "Enterprise",
      planExpiryDate: "2024-12-31",
      daysToExpiry: 300,
      paymentDate: "2024-02-14",
      dueDate: "2024-02-10",
      status: "pending",
      paymentMethod: "UPI",
      transactionId: "TXN789013",
      cycle: "Monthly",
      rentMonth: "February 2024",
      notes: "Awaiting payment confirmation",
      attachments: 1,
      isCreditAllowed: true,
      maxCreditDays: 45,
      usedCreditDays: 10,
    },
    {
      id: 3,
      tenantName: "Amit Kumar",
      tenantId: "TEN003",
      tenantEmail: "amit.kumar@email.com",
      tenantPhone: "+91 9876543212",
      property: "4 BHK Penthouse, Baner",
      propertyId: "PROP003",
      ownerName: "Rajesh Sharma",
      ownerId: "OWN001",
      amount: 125000,
      creditBalance: 0,
      totalCreditLimit: 200000,
      creditUtilization: 0,
      planType: "Basic",
      planExpiryDate: "2024-03-31",
      daysToExpiry: 30,
      paymentDate: "2024-02-12",
      dueDate: "2024-02-05",
      status: "overdue",
      paymentMethod: "Cheque",
      transactionId: "TXN789014",
      cycle: "Monthly",
      rentMonth: "February 2024",
      notes: "Payment delay, follow up required",
      attachments: 0,
      isCreditAllowed: false,
      maxCreditDays: 0,
      usedCreditDays: 0,
    },
    {
      id: 4,
      tenantName: "Sneha Reddy",
      tenantId: "TEN004",
      tenantEmail: "sneha.reddy@email.com",
      tenantPhone: "+91 9876543213",
      property: "2 BHK Apartment, Hinjewadi",
      propertyId: "PROP004",
      ownerName: "Rajesh Sharma",
      ownerId: "OWN001",
      amount: 42000,
      creditBalance: 80000,
      totalCreditLimit: 120000,
      creditUtilization: 66,
      planType: "Premium",
      planExpiryDate: "2024-05-15",
      daysToExpiry: 75,
      paymentDate: "2024-02-10",
      dueDate: "2024-02-10",
      status: "completed",
      paymentMethod: "Cash",
      transactionId: "TXN789015",
      cycle: "Monthly",
      rentMonth: "February 2024",
      notes: "Rent collected in cash",
      attachments: 3,
      isCreditAllowed: true,
      maxCreditDays: 30,
      usedCreditDays: 25,
    },
    {
      id: 5,
      tenantName: "Vikram Patel",
      tenantId: "TEN005",
      tenantEmail: "vikram.patel@email.com",
      tenantPhone: "+91 9876543214",
      property: "1 BHK Studio, Kothrud",
      propertyId: "PROP005",
      ownerName: "Rajesh Sharma",
      ownerId: "OWN001",
      amount: 28000,
      creditBalance: 15000,
      totalCreditLimit: 50000,
      creditUtilization: 30,
      planType: "Basic",
      planExpiryDate: "2024-03-15",
      daysToExpiry: 15,
      paymentDate: "2024-02-08",
      dueDate: "2024-02-05",
      status: "processing",
      paymentMethod: "Online",
      transactionId: "TXN789016",
      cycle: "Monthly",
      rentMonth: "February 2024",
      notes: "Online payment in process",
      attachments: 1,
      isCreditAllowed: true,
      maxCreditDays: 20,
      usedCreditDays: 5,
    },
  ]);

  // Owner Payment Data
  const [ownerPayments, setOwnerPayments] = useState([
    {
      id: 1,
      ownerName: "Rajesh Sharma",
      ownerId: "OWN001",
      ownerEmail: "rajesh.sharma@email.com",
      ownerPhone: "+91 9876543200",
      propertiesCount: 6,
      totalRentCollection: 385000,
      platformFee: 19250,
      netAmount: 365750,
      planType: "Business",
      planExpiryDate: "2024-04-30",
      daysToExpiry: 60,
      subscriptionAmount: 15000,
      paymentDate: "2024-02-01",
      dueDate: "2024-02-01",
      status: "completed",
      paymentMethod: "Bank Transfer",
      transactionId: "OWN_TXN001",
      cycle: "Monthly",
      notes: "Platform subscription fee",
    },
    {
      id: 2,
      ownerName: "Priya Patel",
      ownerId: "OWN002",
      ownerEmail: "priya.patel@email.com",
      ownerPhone: "+91 9876543201",
      propertiesCount: 3,
      totalRentCollection: 185000,
      platformFee: 9250,
      netAmount: 175750,
      planType: "Premium",
      planExpiryDate: "2024-03-15",
      daysToExpiry: 15,
      subscriptionAmount: 8000,
      paymentDate: "2024-02-01",
      dueDate: "2024-02-01",
      status: "pending",
      paymentMethod: "UPI",
      transactionId: "OWN_TXN002",
      cycle: "Monthly",
      notes: "Awaiting payment confirmation",
    },
    {
      id: 3,
      ownerName: "Amit Verma",
      ownerId: "OWN003",
      ownerEmail: "amit.verma@email.com",
      ownerPhone: "+91 9876543202",
      propertiesCount: 8,
      totalRentCollection: 650000,
      platformFee: 32500,
      netAmount: 617500,
      planType: "Enterprise",
      planExpiryDate: "2024-12-31",
      daysToExpiry: 300,
      subscriptionAmount: 25000,
      paymentDate: "2024-02-01",
      dueDate: "2024-02-01",
      status: "completed",
      paymentMethod: "Online",
      transactionId: "OWN_TXN003",
      cycle: "Monthly",
      notes: "Platform subscription fee",
    },
    {
      id: 4,
      ownerName: "Neha Gupta",
      ownerId: "OWN004",
      ownerEmail: "neha.gupta@email.com",
      ownerPhone: "+91 9876543203",
      propertiesCount: 2,
      totalRentCollection: 85000,
      platformFee: 4250,
      netAmount: 80750,
      planType: "Basic",
      planExpiryDate: "2024-03-31",
      daysToExpiry: 30,
      subscriptionAmount: 5000,
      paymentDate: "2024-02-01",
      dueDate: "2024-02-01",
      status: "overdue",
      paymentMethod: "Cheque",
      transactionId: "OWN_TXN004",
      cycle: "Monthly",
      notes: "Payment overdue, send reminder",
    },
  ]);

  const [filteredTenantPayments, setFilteredTenantPayments] =
    useState(tenantPayments);
  const [filteredOwnerPayments, setFilteredOwnerPayments] =
    useState(ownerPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [activeTab, setActiveTab] = useState("tenants"); // "tenants" or "owners"
  const [showExpiringSoon, setShowExpiringSoon] = useState(true);

  // Chart data
  const revenueTrendData = [
    {
      month: "Jan",
      tenantRevenue: 420000,
      ownerRevenue: 125000,
      platformFee: 25000,
    },
    {
      month: "Feb",
      tenantRevenue: 385000,
      ownerRevenue: 115000,
      platformFee: 23000,
    },
    {
      month: "Mar",
      tenantRevenue: 510000,
      ownerRevenue: 150000,
      platformFee: 30000,
    },
    {
      month: "Apr",
      tenantRevenue: 465000,
      ownerRevenue: 140000,
      platformFee: 28000,
    },
    {
      month: "May",
      tenantRevenue: 490000,
      ownerRevenue: 145000,
      platformFee: 29000,
    },
    {
      month: "Jun",
      tenantRevenue: 520000,
      ownerRevenue: 155000,
      platformFee: 31000,
    },
  ];

  const planDistributionData = [
    { name: "Basic", value: 40, color: "#6B7280" },
    { name: "Premium", value: 35, color: "#3B82F6" },
    { name: "Business", value: 20, color: "#10B981" },
    { name: "Enterprise", value: 5, color: "#8B5CF6" },
  ];

  // Filter and search functions
  useEffect(() => {
    let tenantResult = [...tenantPayments];
    let ownerResult = [...ownerPayments];

    // Filter by status
    if (statusFilter !== "all") {
      tenantResult = tenantResult.filter(
        (payment) => payment.status === statusFilter
      );
      ownerResult = ownerResult.filter(
        (payment) => payment.status === statusFilter
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      tenantResult = tenantResult.filter(
        (payment) =>
          payment.tenantName.toLowerCase().includes(term) ||
          payment.property.toLowerCase().includes(term) ||
          payment.tenantId.toLowerCase().includes(term)
      );
      ownerResult = ownerResult.filter(
        (payment) =>
          payment.ownerName.toLowerCase().includes(term) ||
          payment.ownerId.toLowerCase().includes(term)
      );
    }

    // Show expiring soon
    if (showExpiringSoon) {
      tenantResult = tenantResult.filter(
        (payment) => payment.daysToExpiry <= 30
      );
      ownerResult = ownerResult.filter((payment) => payment.daysToExpiry <= 30);
    }

    setFilteredTenantPayments(tenantResult);
    setFilteredOwnerPayments(ownerResult);
  }, [
    tenantPayments,
    ownerPayments,
    statusFilter,
    searchTerm,
    showExpiringSoon,
  ]);

  // Statistics
  const stats = {
    totalTenants: tenantPayments.length,
    totalOwners: ownerPayments.length,
    totalRevenue: tenantPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    ),
    totalPlatformFee: ownerPayments.reduce(
      (sum, payment) => sum + payment.platformFee,
      0
    ),
    expiringTenants: tenantPayments.filter((p) => p.daysToExpiry <= 30).length,
    expiringOwners: ownerPayments.filter((p) => p.daysToExpiry <= 30).length,
    totalCreditUtilization:
      tenantPayments.reduce(
        (sum, payment) => sum + payment.creditUtilization,
        0
      ) / tenantPayments.length,
  };

  // Status configuration
  const statusConfig = {
    completed: {
      color: "bg-green-100 text-green-800 border border-green-200",
      icon: CheckCircle,
      label: "Completed",
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      icon: Clock,
      label: "Pending",
    },
    overdue: {
      color: "bg-red-100 text-red-800 border border-red-200",
      icon: AlertCircle,
      label: "Overdue",
    },
    processing: {
      color: "bg-blue-100 text-blue-800 border border-blue-200",
      icon: Clock,
      label: "Processing",
    },
  };

  // Plan type configuration
  const planConfig = {
    Basic: {
      color: "bg-gray-100 text-gray-800 border border-gray-200",
      icon: Shield,
      level: 1,
    },
    Premium: {
      color: "bg-blue-100 text-blue-800 border border-blue-200",
      icon: Zap,
      level: 2,
    },
    Business: {
      color: "bg-green-100 text-green-800 border border-green-200",
      icon: Building,
      level: 3,
    },
    Enterprise: {
      color: "bg-purple-100 text-purple-800 border border-purple-200",
      icon: Crown,
      level: 4,
    },
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Render status badge
  const renderStatusBadge = (status) => {
    const config = statusConfig[status];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <span
        className={`px-3 py-1.5 text-xs rounded-full flex items-center gap-1 ${config.color}`}
      >
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  // Render plan badge
  const renderPlanBadge = (planType) => {
    const config = planConfig[planType];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <span
        className={`px-3 py-1.5 text-xs rounded-full flex items-center gap-1 ${config.color}`}
      >
        <Icon className="w-3 h-3" />
        {planType}
      </span>
    );
  };

  // Calculate expiry status
  const getExpiryStatus = (daysToExpiry) => {
    if (daysToExpiry <= 7)
      return { color: "text-red-600 bg-red-50", label: "Expiring Soon" };
    if (daysToExpiry <= 30)
      return { color: "text-yellow-600 bg-yellow-50", label: "Expiring Soon" };
    return { color: "text-green-600 bg-green-50", label: "Active" };
  };

  // Credit utilization bar
  const CreditUtilizationBar = ({ utilization, creditBalance, totalLimit }) => {
    const getColor = (util) => {
      if (util > 80) return "bg-red-500";
      if (util > 60) return "bg-yellow-500";
      return "bg-green-500";
    };

    return (
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Credit Used: {utilization}%</span>
          <span className="font-medium">
            {formatCurrency(creditBalance)} / {formatCurrency(totalLimit)}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${getColor(utilization)}`}
            style={{ width: `${Math.min(utilization, 100)}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Custom Tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Payments Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage tenant payments, owner subscriptions, and credit systems
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <BellRing className="w-4 h-4" />
              Send Reminders
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  stats.expiringTenants > 0
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {stats.expiringTenants} expiring
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.totalTenants}
            </div>
            <div className="text-sm text-gray-600">Active Tenants</div>
            <div className="text-xs text-blue-600 mt-2">
              Avg. Credit: {stats.totalCreditUtilization.toFixed(1)}% used
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Building className="w-8 h-8 text-purple-600" />
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  stats.expiringOwners > 0
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {stats.expiringOwners} expiring
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.totalOwners}
            </div>
            <div className="text-sm text-gray-600">Registered Owners</div>
            <div className="text-xs text-purple-600 mt-2">
              Platform fee collected
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Wallet className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <div className="text-sm text-gray-600">Total Rent Collection</div>
            <div className="text-xs text-green-600 mt-2">
              +15.5% from last month
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Calculator className="w-8 h-8 text-yellow-600" />
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(stats.totalPlatformFee)}
            </div>
            <div className="text-sm text-gray-600">Platform Revenue</div>
            <div className="text-xs text-yellow-600 mt-2">
              5% of total collection
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Overview
              </h3>
              <p className="text-sm text-gray-600">
                Monthly rent collection vs platform fees
              </p>
            </div>
            <LineChart className="w-5 h-5 text-gray-400" />
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="tenantRevenue"
                  name="Rent Collection"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="ownerRevenue"
                  name="Owner Payout"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="platformFee"
                  name="Platform Fee"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "tenants"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("tenants")}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Tenant Payments ({filteredTenantPayments.length})
                </div>
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "owners"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("owners")}
              >
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Owner Subscriptions ({filteredOwnerPayments.length})
                </div>
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="processing">Processing</option>
                </select>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    activeTab === "tenants"
                      ? "Search tenant..."
                      : "Search owner..."
                  }
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={showExpiringSoon}
                  onChange={(e) => setShowExpiringSoon(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Show Expiring Soon
                </span>
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Tenants Tab Content */}
        {activeTab === "tenants" && (
          <>
            {/* Tenant Payments Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tenant Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credit Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan & Expiry
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTenantPayments.map((payment) => {
                      const expiryStatus = getExpiryStatus(
                        payment.daysToExpiry
                      );
                      return (
                        <tr
                          key={payment.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {payment.tenantName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {payment.tenantId}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {payment.property}
                                </div>
                                <div className="text-xs text-gray-400">
                                  Owner: {payment.ownerName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <CreditUtilizationBar
                                utilization={payment.creditUtilization}
                                creditBalance={payment.creditBalance}
                                totalLimit={payment.totalCreditLimit}
                              />
                              <div className="text-xs text-gray-600">
                                {payment.isCreditAllowed ? (
                                  <span className="text-green-600">
                                    ✓ Credit Enabled ({payment.usedCreditDays}/
                                    {payment.maxCreditDays} days)
                                  </span>
                                ) : (
                                  <span className="text-red-600">
                                    ✗ Credit Disabled
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              {renderPlanBadge(payment.planType)}
                              <div
                                className={`px-3 py-1.5 text-xs rounded-full ${expiryStatus.color}`}
                              >
                                <CalendarDays className="w-3 h-3 inline mr-1" />
                                Expires: {formatDate(payment.planExpiryDate)}
                              </div>
                              <div className="text-xs text-gray-600">
                                {payment.daysToExpiry <= 30 && (
                                  <span className="text-yellow-600">
                                    ⚠️ {payment.daysToExpiry} days remaining
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="font-bold text-gray-900">
                                {formatCurrency(payment.amount)}
                              </div>
                              <div className="text-sm text-gray-600">
                                {payment.rentMonth}
                              </div>
                              <div className="text-xs text-gray-500">
                                Due: {formatDate(payment.dueDate)}
                              </div>
                              <div className="mt-2">
                                {renderStatusBadge(payment.status)}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedTenant(payment)}
                                className="p-2 text-gray-400 hover:text-blue-600"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleSendReminder(payment)}
                                className="p-2 text-gray-400 hover:text-yellow-600"
                                title="Send Reminder"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleAdjustCredit(payment)}
                                className="p-2 text-gray-400 hover:text-green-600"
                                title="Adjust Credit"
                              >
                                <CreditCard className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleExtendPlan(payment)}
                                className="p-2 text-gray-400 hover:text-purple-600"
                                title="Extend Plan"
                              >
                                <Calendar className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredTenantPayments.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No tenant payments found
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
                    {searchTerm || statusFilter !== "all" || showExpiringSoon
                      ? "No tenants match your filters. Try adjusting your search criteria."
                      : "No tenant payments recorded yet."}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Owners Tab Content */}
        {activeTab === "owners" && (
          <>
            {/* Owner Payments Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Owner Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscription Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Summary
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expiry Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOwnerPayments.map((payment) => {
                      const expiryStatus = getExpiryStatus(
                        payment.daysToExpiry
                      );
                      return (
                        <tr
                          key={payment.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Building className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {payment.ownerName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {payment.ownerId}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {payment.propertiesCount} Properties
                                </div>
                                <div className="text-xs text-gray-400">
                                  {payment.ownerPhone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              {renderPlanBadge(payment.planType)}
                              <div className="text-sm font-bold text-gray-900">
                                {formatCurrency(payment.subscriptionAmount)}
                                /month
                              </div>
                              <div className="text-xs text-gray-600">
                                Billed {payment.cycle}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="font-bold text-gray-900">
                                {formatCurrency(payment.totalRentCollection)}
                              </div>
                              <div className="text-sm text-gray-600">
                                Platform Fee:{" "}
                                {formatCurrency(payment.platformFee)}
                              </div>
                              <div className="text-sm text-green-600 font-medium">
                                Net: {formatCurrency(payment.netAmount)}
                              </div>
                              {renderStatusBadge(payment.status)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div
                                className={`px-3 py-1.5 text-xs rounded-full ${expiryStatus.color}`}
                              >
                                <CalendarDays className="w-3 h-3 inline mr-1" />
                                {formatDate(payment.planExpiryDate)}
                              </div>
                              <div className="text-xs text-gray-600">
                                {payment.daysToExpiry <= 30 ? (
                                  <span className="text-red-600">
                                    ⚠️ Expires in {payment.daysToExpiry} days
                                  </span>
                                ) : (
                                  <span className="text-green-600">
                                    ✓ {payment.daysToExpiry} days remaining
                                  </span>
                                )}
                              </div>
                              {payment.daysToExpiry <= 7 && (
                                <div className="text-xs bg-red-50 text-red-700 p-2 rounded">
                                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                                  Urgent: Plan expiring soon!
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedOwner(payment)}
                                className="p-2 text-gray-400 hover:text-blue-600"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleSendOwnerReminder(payment)}
                                className="p-2 text-gray-400 hover:text-yellow-600"
                                title="Send Payment Reminder"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleUpgradePlan(payment)}
                                className="p-2 text-gray-400 hover:text-green-600"
                                title="Upgrade Plan"
                              >
                                <TrendingUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRenewPlan(payment)}
                                className="p-2 text-gray-400 hover:text-purple-600"
                                title="Renew Plan"
                              >
                                <Calendar className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredOwnerPayments.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Building className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No owner subscriptions found
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
                    {searchTerm || statusFilter !== "all" || showExpiringSoon
                      ? "No owners match your filters. Try adjusting your search criteria."
                      : "No owner subscriptions recorded yet."}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Plan Distribution Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Plan Distribution
              </h3>
              <p className="text-sm text-gray-600">
                Current plan usage across all users
              </p>
            </div>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {planDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {planDistributionData.map((plan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: plan.color }}
                    ></div>
                    <span className="font-medium text-gray-900">
                      {plan.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {plan.value}%
                    </div>
                    <div className="text-xs text-gray-600">of total users</div>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">
                      Attention Required
                    </div>
                    <div className="text-sm text-blue-700">
                      {stats.expiringTenants + stats.expiringOwners} plans
                      expiring within 30 days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Detail Modal */}
      {selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Tenant Payment Details
                </h3>
                <button
                  onClick={() => setSelectedTenant(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Tenant Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {selectedTenant.tenantName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        ID: {selectedTenant.tenantId}
                      </p>
                      <p className="text-sm text-gray-600">
                        Property: {selectedTenant.property}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="text-sm font-medium">
                        {selectedTenant.tenantPhone}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-sm font-medium">
                        {selectedTenant.tenantEmail}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Owner</div>
                      <div className="text-sm font-medium">
                        {selectedTenant.ownerName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Owner ID</div>
                      <div className="text-sm font-medium">
                        {selectedTenant.ownerId}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Details */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Credit Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">
                        Credit Balance
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        {formatCurrency(selectedTenant.creditBalance)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Credit Limit</div>
                      <div className="text-xl font-bold text-gray-900">
                        {formatCurrency(selectedTenant.totalCreditLimit)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Utilization</div>
                      <div className="text-lg font-bold text-gray-900">
                        {selectedTenant.creditUtilization}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Credit Status</div>
                      <div
                        className={`px-3 py-1 text-xs rounded-full inline-block ${
                          selectedTenant.isCreditAllowed
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedTenant.isCreditAllowed
                          ? "Enabled"
                          : "Disabled"}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <CreditUtilizationBar
                      utilization={selectedTenant.creditUtilization}
                      creditBalance={selectedTenant.creditBalance}
                      totalLimit={selectedTenant.totalCreditLimit}
                    />
                  </div>
                </div>

                {/* Plan & Payment Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-4">
                      Plan Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Plan Type</span>
                        {renderPlanBadge(selectedTenant.planType)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Expiry Date
                        </span>
                        <span className="font-medium">
                          {formatDate(selectedTenant.planExpiryDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Days Remaining
                        </span>
                        <span
                          className={`font-bold ${
                            selectedTenant.daysToExpiry <= 30
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedTenant.daysToExpiry} days
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-4">
                      Payment Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Amount</span>
                        <span className="text-lg font-bold">
                          {formatCurrency(selectedTenant.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Payment Date
                        </span>
                        <span className="font-medium">
                          {formatDate(selectedTenant.paymentDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Due Date</span>
                        <span className="font-medium">
                          {formatDate(selectedTenant.dueDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        {renderStatusBadge(selectedTenant.status)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-4 gap-2 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleAdjustCredit(selectedTenant)}
                    className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg"
                  >
                    Adjust Credit
                  </button>
                  <button
                    onClick={() => handleExtendPlan(selectedTenant)}
                    className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg"
                  >
                    Extend Plan
                  </button>
                  <button
                    onClick={() => handleSendReminder(selectedTenant)}
                    className="px-4 py-2.5 bg-yellow-600 text-white text-sm font-medium rounded-lg"
                  >
                    Send Reminder
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateTenantStatus(selectedTenant.id);
                      setSelectedTenant(null);
                    }}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Owner Detail Modal */}
      {selectedOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Owner Subscription Details
                </h3>
                <button
                  onClick={() => setSelectedOwner(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Owner Info */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <Building className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {selectedOwner.ownerName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        ID: {selectedOwner.ownerId}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedOwner.propertiesCount} Properties
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="text-sm font-medium">
                        {selectedOwner.ownerPhone}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-sm font-medium">
                        {selectedOwner.ownerEmail}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-600">
                      Total Collection
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(selectedOwner.totalRentCollection)}
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-xs text-yellow-600">Platform Fee</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(selectedOwner.platformFee)}
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-xs text-green-600">Net Amount</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(selectedOwner.netAmount)}
                    </div>
                  </div>
                </div>

                {/* Plan & Expiry Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-4">
                      Subscription Plan
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Plan Type</span>
                        {renderPlanBadge(selectedOwner.planType)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Subscription Fee
                        </span>
                        <span className="font-bold">
                          {formatCurrency(selectedOwner.subscriptionAmount)}
                          /month
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Billing Cycle
                        </span>
                        <span className="font-medium">
                          {selectedOwner.cycle}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-4">
                      Expiry Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Expiry Date
                        </span>
                        <span className="font-medium">
                          {formatDate(selectedOwner.planExpiryDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Days Remaining
                        </span>
                        <span
                          className={`font-bold ${
                            selectedOwner.daysToExpiry <= 30
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedOwner.daysToExpiry} days
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        {renderStatusBadge(selectedOwner.status)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Urgent Warning if Expiring Soon */}
                {selectedOwner.daysToExpiry <= 7 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                      <div>
                        <div className="font-bold text-red-900">
                          Urgent Action Required!
                        </div>
                        <div className="text-sm text-red-700">
                          This plan expires in {selectedOwner.daysToExpiry}{" "}
                          days. Contact the owner immediately to renew.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleRenewPlan(selectedOwner)}
                    className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg"
                  >
                    Renew Plan
                  </button>
                  <button
                    onClick={() => handleUpgradePlan(selectedOwner)}
                    className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg"
                  >
                    Upgrade Plan
                  </button>
                  <button
                    onClick={() => handleSendOwnerReminder(selectedOwner)}
                    className="px-4 py-2.5 bg-yellow-600 text-white text-sm font-medium rounded-lg"
                  >
                    Send Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Placeholder functions for actions
const handleSendReminder = (payment) => {
  alert(`Reminder sent to ${payment.tenantName}`);
};

const handleAdjustCredit = (tenant) => {
  alert(`Adjust credit for ${tenant.tenantName}`);
};

const handleExtendPlan = (tenant) => {
  alert(`Extend plan for ${tenant.tenantName}`);
};

const handleUpdateTenantStatus = (id) => {
  alert(`Update status for tenant ${id}`);
};

const handleSendOwnerReminder = (owner) => {
  alert(`Reminder sent to ${owner.ownerName}`);
};

const handleRenewPlan = (owner) => {
  alert(`Renew plan for ${owner.ownerName}`);
};

const handleUpgradePlan = (owner) => {
  alert(`Upgrade plan for ${owner.ownerName}`);
};

export default AdminPayments;
