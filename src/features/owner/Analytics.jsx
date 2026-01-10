import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Home,
  DollarSign,
  Clock,
  Calendar,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Phone,
  MessageSquare,
  Receipt,
  CreditCard,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const Analytics = () => {
  // Tenant payment data for owner perspective
  const tenantPaymentsData = [
    { month: "Jan", paid: 85000, pending: 25000, totalTenants: 12 },
    { month: "Feb", paid: 92000, pending: 18000, totalTenants: 13 },
    { month: "Mar", paid: 78000, pending: 32000, totalTenants: 12 },
    { month: "Apr", paid: 105000, pending: 15000, totalTenants: 15 },
    { month: "May", paid: 95000, pending: 25000, totalTenants: 14 },
    { month: "Jun", paid: 115000, pending: 12000, totalTenants: 16 },
    { month: "Jul", paid: 98000, pending: 22000, totalTenants: 15 },
  ];

  const tenantStatusData = [
    { name: "Paid on Time", value: 65, color: "#10B981" },
    { name: "Pending", value: 20, color: "#F59E0B" },
    { name: "Overdue", value: 10, color: "#EF4444" },
    { name: "Processing", value: 5, color: "#3B82F6" },
  ];

  const paymentMethodsData = [
    { method: "UPI", count: 45, percentage: "42%" },
    { method: "Bank Transfer", count: 32, percentage: "30%" },
    { method: "Cash", count: 18, percentage: "17%" },
    { method: "Cheque", count: 12, percentage: "11%" },
  ];

  const topPayingTenants = [
    {
      id: 1,
      name: "Rahul Verma",
      property: "3 BHK, Hinjewadi",
      amount: "₹75,000",
      status: "paid",
      lastPayment: "15 Jul 2024",
    },
    {
      id: 2,
      name: "Priya Singh",
      property: "2 BHK, Wakad",
      amount: "₹55,000",
      status: "paid",
      lastPayment: "12 Jul 2024",
    },
    {
      id: 3,
      name: "Amit Kumar",
      property: "4 BHK, Baner",
      amount: "₹1,25,000",
      status: "overdue",
      lastPayment: "05 Jul 2024",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      property: "2 BHK, Hinjewadi",
      amount: "₹42,000",
      status: "pending",
      lastPayment: "10 Jul 2024",
    },
    {
      id: 5,
      name: "Vikram Patel",
      property: "1 BHK, Kothrud",
      amount: "₹28,000",
      status: "paid",
      lastPayment: "14 Jul 2024",
    },
  ];

  const performanceMetrics = [
    {
      id: 1,
      name: "Total Tenants",
      value: "15",
      change: "+2",
      icon: Users,
      color: "blue",
      trend: "up",
    },
    {
      id: 2,
      name: "Rent Collected",
      value: "₹9.8L",
      change: "+12%",
      icon: DollarSign,
      color: "green",
      trend: "up",
    },
    {
      id: 3,
      name: "Pending Amount",
      value: "₹2.2L",
      change: "-8%",
      icon: AlertCircle,
      color: "orange",
      trend: "down",
    },
    {
      id: 4,
      name: "On-Time Payments",
      value: "78%",
      change: "+5%",
      icon: CheckCircle,
      color: "purple",
      trend: "up",
    },
    {
      id: 5,
      name: "Avg. Rent",
      value: "₹65K",
      change: "+8%",
      icon: Home,
      color: "indigo",
      trend: "up",
    },
    {
      id: 6,
      name: "Vacancy Rate",
      value: "12%",
      change: "-3%",
      icon: Clock,
      color: "pink",
      trend: "down",
    },
  ];

  const propertyWiseData = [
    {
      property: "Hinjewadi Apt",
      tenants: 4,
      rent: "₹2.8L",
      occupancy: "100%",
      status: "full",
    },
    {
      property: "Wakad Villa",
      tenants: 3,
      rent: "₹2.1L",
      occupancy: "75%",
      status: "partial",
    },
    {
      property: "Baner Penthouse",
      tenants: 1,
      rent: "₹1.25L",
      occupancy: "100%",
      status: "full",
    },
    {
      property: "Kothrud Studio",
      tenants: 2,
      rent: "₹56K",
      occupancy: "100%",
      status: "full",
    },
    {
      property: "Viman Nagar Flat",
      tenants: 3,
      rent: "₹1.95L",
      occupancy: "60%",
      status: "partial",
    },
  ];

  const [timeRange, setTimeRange] = useState("month");
  const [activeView, setActiveView] = useState("overview");
  const [selectedTenant, setSelectedTenant] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.name.includes("Amount") ||
              entry.name === "Paid" ||
              entry.name === "Pending"
                ? formatCurrency(entry.value)
                : `${entry.value} tenants`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "overdue":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Tenant Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Track rent payments, tenant performance, and property occupancy
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="week">Last 7 Days</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {["overview", "payments", "tenants", "properties"].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                activeView === view
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {performanceMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-${metric.color}-50`}>
                    <Icon className={`w-5 h-5 text-${metric.color}-600`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">{metric.name}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Rent Collection Chart */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Rent Collection Overview
                </h3>
                <p className="text-sm text-gray-600">
                  Monthly paid vs pending amounts
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Paid</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
              </div>
            </div>

            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tenantPaymentsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="paid"
                    name="Paid Amount"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="pending"
                    name="Pending Amount"
                    fill="#F59E0B"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Status Distribution */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Tenant Payment Status
                </h3>
                <p className="text-sm text-gray-600">
                  Current month distribution
                </p>
              </div>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={tenantStatusData}
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
                    {tenantStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {tenantStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Paying Tenants */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Top Paying Tenants
                </h3>
                <p className="text-sm text-gray-600">
                  Tenant performance this month
                </p>
              </div>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {topPayingTenants.map((tenant) => (
                <div
                  key={tenant.id}
                  onClick={() => setSelectedTenant(tenant)}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100 hover:border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {tenant.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {tenant.property}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      {tenant.amount}
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                        tenant.status
                      )} inline-flex items-center gap-1`}
                    >
                      {getStatusIcon(tenant.status)}
                      {tenant.status.charAt(0).toUpperCase() +
                        tenant.status.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Methods
                </h3>
                <p className="text-sm text-gray-600">Preferred by tenants</p>
              </div>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {paymentMethodsData.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        index === 0
                          ? "bg-purple-100"
                          : index === 1
                          ? "bg-blue-100"
                          : index === 2
                          ? "bg-yellow-100"
                          : "bg-green-100"
                      }`}
                    >
                      <CreditCard
                        className={`w-5 h-5 ${
                          index === 0
                            ? "text-purple-600"
                            : index === 1
                            ? "text-blue-600"
                            : index === 2
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {method.method}
                      </div>
                      <div className="text-sm text-gray-600">
                        {method.count} transactions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {method.percentage}
                    </div>
                    <div className="text-sm text-gray-600">Usage</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2.5 text-sm text-yellow-600 font-bold border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors flex items-center justify-center gap-2">
              View Payment History
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Property Wise Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Property Occupancy Chart */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Property Performance
                </h3>
                <p className="text-sm text-gray-600">
                  Tenants and rent per property
                </p>
              </div>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={propertyWiseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="property"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="tenants"
                    name="No. of Tenants"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="occupancy"
                    name="Occupancy %"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rent Trend Chart */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Rent Collection Trend
                </h3>
                <p className="text-sm text-gray-600">
                  Monthly collection growth
                </p>
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tenantPaymentsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="paid"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.1}
                    name="Paid Amount"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl p-5 text-gray-900">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold mb-1">₹9.8L</div>
            <div className="text-sm font-medium">Total Collected</div>
            <div className="text-xs mt-2">+12% from last month</div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold mb-1">15</div>
            <div className="text-sm opacity-90">Active Tenants</div>
            <div className="text-xs opacity-80 mt-2">+2 new tenants</div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <Home className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold mb-1">88%</div>
            <div className="text-sm opacity-90">Occupancy Rate</div>
            <div className="text-xs opacity-80 mt-2">+5% from last quarter</div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold mb-1">78%</div>
            <div className="text-sm opacity-90">On-Time Payments</div>
            <div className="text-xs opacity-80 mt-2">Industry avg: 65%</div>
          </div>
        </div>
      </div>

      {/* Tenant Detail Modal */}
      {selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Tenant Details
                </h3>
                <button
                  onClick={() => setSelectedTenant(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {selectedTenant.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedTenant.property}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Monthly Rent</div>
                    <div className="text-lg font-bold text-gray-900">
                      {selectedTenant.amount}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Status</div>
                    <div
                      className={`text-sm px-3 py-1.5 rounded-full border ${getStatusColor(
                        selectedTenant.status
                      )} inline-flex items-center gap-2`}
                    >
                      {getStatusIcon(selectedTenant.status)}
                      {selectedTenant.status.charAt(0).toUpperCase() +
                        selectedTenant.status.slice(1)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Last Payment</div>
                    <div className="text-sm font-medium">
                      {selectedTenant.lastPayment}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Payment Due</div>
                    <div className="text-sm font-medium">01 Aug 2024</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all">
                    Send Payment Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-colors">
          <Filter className="w-6 h-6 text-gray-900" />
        </button>
      </div>
    </div>
  );
};

export default Analytics;
