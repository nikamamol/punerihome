import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  DollarSign,
  Home,
  Calendar,
  CreditCard,
  Wallet,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Download,
  Filter,
  Eye,
  RefreshCw,
  Target,
  Percent,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Banknote,
  Receipt,
  UserPlus,
  Home as HomeIcon,
  CreditCard as CreditCardIcon,
  Shield,
  Zap,
  Crown,
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const AdminAnalytics = () => {
  // State for filters
  const [timeRange, setTimeRange] = useState("monthly");
  const [propertyType, setPropertyType] = useState("all");
  const [showDetailedView, setShowDetailedView] = useState(false);

  // Analytics Data
  const [analyticsData, setAnalyticsData] = useState({
    // Revenue Statistics
    revenue: {
      totalRevenue: 3850000,
      ownerRevenue: 3657500,
      platformRevenue: 192500,
      growthRate: 15.5,
      lastMonthRevenue: 3325000,
    },
    
    // User Statistics
    users: {
      totalTenants: 156,
      newTenants: 24,
      totalOwners: 42,
      newOwners: 8,
      activeUsers: 185,
      inactiveUsers: 13,
      growthRate: 12.3,
    },
    
    // Property Statistics
    properties: {
      totalProperties: 89,
      occupied: 72,
      vacant: 17,
      occupancyRate: 80.9,
      newListings: 12,
      premiumProperties: 23,
      averageRent: 45200,
    },
    
    // Payment Statistics
    payments: {
      totalTransactions: 845,
      successfulPayments: 812,
      failedPayments: 33,
      successRate: 96.1,
      averageTransactionValue: 4560,
      pendingPayments: 28,
      totalAmountProcessed: 3850000,
    },
    
    // Growth Metrics
    growth: {
      revenueGrowth: 15.5,
      userGrowth: 12.3,
      propertyGrowth: 8.7,
      transactionGrowth: 18.2,
    },
  });

  // Monthly Revenue Data
  const monthlyRevenueData = [
    { month: "Jan", revenue: 3250000, platformFee: 162500, ownerPayout: 3087500 },
    { month: "Feb", revenue: 3850000, platformFee: 192500, ownerPayout: 3657500 },
    { month: "Mar", revenue: 4120000, platformFee: 206000, ownerPayout: 3914000 },
    { month: "Apr", revenue: 3980000, platformFee: 199000, ownerPayout: 3781000 },
    { month: "May", revenue: 4250000, platformFee: 212500, ownerPayout: 4037500 },
    { month: "Jun", revenue: 4680000, platformFee: 234000, ownerPayout: 4446000 },
    { month: "Jul", revenue: 5120000, platformFee: 256000, ownerPayout: 4864000 },
  ];

  // Revenue by Property Type
  const propertyTypeRevenue = [
    { type: "Apartments", revenue: 2850000, count: 45, color: "#3B82F6" },
    { type: "Villas", revenue: 1850000, count: 18, color: "#10B981" },
    { type: "PG/Hostels", revenue: 850000, count: 32, color: "#F59E0B" },
    { type: "Commercial", revenue: 1250000, count: 9, color: "#8B5CF6" },
    { type: "Farmhouses", revenue: 450000, count: 5, color: "#EF4444" },
  ];

  // User Growth Data
  const userGrowthData = [
    { month: "Jan", tenants: 120, owners: 32, total: 152 },
    { month: "Feb", tenants: 132, owners: 34, total: 166 },
    { month: "Mar", tenants: 145, owners: 37, total: 182 },
    { month: "Apr", tenants: 142, owners: 38, total: 180 },
    { month: "May", tenants: 156, owners: 42, total: 198 },
    { month: "Jun", tenants: 168, owners: 45, total: 213 },
    { month: "Jul", tenants: 182, owners: 48, total: 230 },
  ];

  // Payment Method Distribution
  const paymentMethodData = [
    { method: "UPI", count: 425, percentage: 50.3, color: "#8B5CF6" },
    { method: "Bank Transfer", count: 285, percentage: 33.7, color: "#3B82F6" },
    { method: "Credit Card", count: 98, percentage: 11.6, color: "#10B981" },
    { method: "Wallet", count: 37, percentage: 4.4, color: "#F59E0B" },
  ];

  // Plan Distribution
  const planDistributionData = [
    { plan: "Basic", users: 85, revenue: 425000, color: "#6B7280" },
    { plan: "Premium", users: 64, revenue: 1920000, color: "#3B82F6" },
    { plan: "Business", users: 28, revenue: 1120000, color: "#10B981" },
    { plan: "Enterprise", users: 9, revenue: 385000, color: "#8B5CF6" },
  ];

  // Top Performing Owners
  const topOwnersData = [
    { name: "Rajesh Sharma", properties: 12, revenue: 856000, growth: 25.5 },
    { name: "Priya Patel", properties: 8, revenue: 645000, growth: 18.3 },
    { name: "Amit Verma", properties: 15, revenue: 1250000, growth: 32.7 },
    { name: "Neha Gupta", properties: 6, revenue: 385000, growth: 12.4 },
    { name: "Vikram Singh", properties: 10, revenue: 725000, growth: 22.1 },
  ];

  // Location-wise Performance
  const locationPerformance = [
    { location: "Hinjewadi", revenue: 1250000, properties: 28, avgRent: 52000 },
    { location: "Wakad", revenue: 980000, properties: 22, avgRent: 45000 },
    { location: "Baner", revenue: 1560000, properties: 18, avgRent: 68000 },
    { location: "Kothrud", revenue: 650000, properties: 15, avgRent: 38000 },
    { location: "Viman Nagar", revenue: 1120000, properties: 20, avgRent: 56000 },
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // Custom Tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('revenue') || entry.name.includes('Revenue') ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Get growth indicator
  const getGrowthIndicator = (value) => {
    if (value > 0) {
      return (
        <div className="flex items-center text-green-600 text-sm">
          <ArrowUp className="w-3 h-3 mr-1" />
          {value}%
        </div>
      );
    } else if (value < 0) {
      return (
        <div className="flex items-center text-red-600 text-sm">
          <ArrowDown className="w-3 h-3 mr-1" />
          {Math.abs(value)}%
        </div>
      );
    }
    return <div className="text-gray-500 text-sm">0%</div>;
  };

  // Calculate metrics based on filters
  const calculateFilteredMetrics = () => {
    // In a real app, this would filter data based on timeRange and propertyType
    return analyticsData;
  };

  const filteredMetrics = calculateFilteredMetrics();

  // Quick Stats Cards
  const statsCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(filteredMetrics.revenue.totalRevenue),
      change: filteredMetrics.revenue.growthRate,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Revenue from all sources",
      details: {
        ownerRevenue: formatCurrency(filteredMetrics.revenue.ownerRevenue),
        platformRevenue: formatCurrency(filteredMetrics.revenue.platformRevenue),
        lastMonth: formatCurrency(filteredMetrics.revenue.lastMonthRevenue),
      }
    },
    {
      title: "Active Users",
      value: filteredMetrics.users.activeUsers,
      change: filteredMetrics.users.growthRate,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Tenants + Owners",
      details: {
        tenants: filteredMetrics.users.totalTenants,
        owners: filteredMetrics.users.totalOwners,
        newThisMonth: filteredMetrics.users.newTenants + filteredMetrics.users.newOwners,
      }
    },
    {
      title: "Properties Listed",
      value: filteredMetrics.properties.totalProperties,
      change: filteredMetrics.growth.propertyGrowth,
      icon: Home,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Total properties on platform",
      details: {
        occupied: filteredMetrics.properties.occupied,
        vacant: filteredMetrics.properties.vacant,
        occupancyRate: `${filteredMetrics.properties.occupancyRate}%`,
      }
    },
    {
      title: "Success Rate",
      value: `${filteredMetrics.payments.successRate}%`,
      change: 2.5,
      icon: Percent,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Payment success rate",
      details: {
        successful: filteredMetrics.payments.successfulPayments,
        failed: filteredMetrics.payments.failedPayments,
        pending: filteredMetrics.payments.pendingPayments,
      }
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">
              Real-time insights and performance metrics
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filters */}
            <div className="flex gap-2">
              <select
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>

              <select
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="all">All Properties</option>
                <option value="apartment">Apartments</option>
                <option value="villa">Villas</option>
                <option value="commercial">Commercial</option>
              </select>

              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  {getGrowthIndicator(stat.change)}
                </div>
                
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {stat.title}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.description}
                </div>

                {/* Details on hover/click */}
                <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
                  {Object.entries(stat.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between mb-1">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue Overview Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Revenue Growth</h3>
                <p className="text-sm text-gray-600">Monthly revenue trend</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-xs">Total Revenue</span>
                </div>
                <div className="flex items-center ml-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs">Platform Fee</span>
                </div>
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="platformFee" name="Platform Fee" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="ownerPayout" name="Owner Payout" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-600">Current Month</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatCurrency(monthlyRevenueData[monthlyRevenueData.length - 1].revenue)}
                </div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xs text-green-600">Growth</div>
                <div className="text-lg font-bold text-gray-900">
                  {analyticsData.revenue.growthRate}%
                </div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xs text-purple-600">Avg Monthly</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatCurrency(
                    monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0) / monthlyRevenueData.length
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
                <p className="text-sm text-gray-600">New users per month</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-xs">Tenants</span>
                </div>
                <div className="flex items-center ml-4">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-xs">Owners</span>
                </div>
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="tenants" name="Tenants" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="owners" name="Owners" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-600">New Tenants</div>
                <div className="text-lg font-bold text-gray-900">
                  +{analyticsData.users.newTenants}
                </div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xs text-purple-600">New Owners</div>
                <div className="text-lg font-bold text-gray-900">
                  +{analyticsData.users.newOwners}
                </div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xs text-green-600">Growth Rate</div>
                <div className="text-lg font-bold text-gray-900">
                  {analyticsData.users.growthRate}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue by Property Type */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Revenue by Property Type</h3>
                <p className="text-sm text-gray-600">Distribution across property categories</p>
              </div>
              <PieChartIcon className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeRevenue}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                  >
                    {propertyTypeRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              {propertyTypeRevenue.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(item.revenue)}</div>
                    <div className="text-xs text-gray-500">{item.count} properties</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                <p className="text-sm text-gray-600">Transaction distribution by payment type</p>
              </div>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {paymentMethodData.map((method, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${method.color}20` }}>
                        <CreditCardIcon className="w-4 h-4" style={{ color: method.color }} />
                      </div>
                      <div>
                        <div className="font-medium">{method.method}</div>
                        <div className="text-xs text-gray-500">{formatNumber(method.count)} transactions</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{method.percentage}%</div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ 
                        width: `${method.percentage}%`,
                        backgroundColor: method.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Total Transactions</div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{formatNumber(analyticsData.payments.totalTransactions)}</div>
                    <div className={`text-xs ${analyticsData.growth.transactionGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {analyticsData.growth.transactionGrowth > 0 ? '+' : ''}{analyticsData.growth.transactionGrowth}% from last month
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Distribution & Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Plan Distribution */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Plan Distribution</h3>
                <p className="text-sm text-gray-600">User distribution across subscription plans</p>
              </div>
              <Shield className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {planDistributionData.map((plan, index) => {
                const Icon = plan.plan === "Basic" ? Shield : 
                           plan.plan === "Premium" ? Zap : 
                           plan.plan === "Business" ? Building : Crown;
                return (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${plan.color}20` }}>
                        <Icon className="w-5 h-5" style={{ color: plan.color }} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{plan.plan}</div>
                        <div className="text-sm text-gray-500">{plan.users} users</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{formatCurrency(plan.revenue)}</div>
                      <div className="text-xs text-gray-500">
                        Avg: {formatCurrency(plan.revenue / plan.users)}/user
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600">Total Plan Revenue</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(planDistributionData.reduce((sum, plan) => sum + plan.revenue, 0))}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600">Total Users</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatNumber(planDistributionData.reduce((sum, plan) => sum + plan.users, 0))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performing Owners */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Top Performing Owners</h3>
                <p className="text-sm text-gray-600">Highest revenue generating owners</p>
              </div>
              <TrendingUpIcon className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {topOwnersData.map((owner, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{owner.name}</div>
                      <div className="text-sm text-gray-500">{owner.properties} properties</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{formatCurrency(owner.revenue)}</div>
                    <div className={`text-xs ${owner.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {owner.growth > 0 ? '+' : ''}{owner.growth}% growth
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Total Top 5 Revenue</div>
                    <div className="text-xs text-gray-500">Combined revenue from top owners</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {formatCurrency(topOwnersData.reduce((sum, owner) => sum + owner.revenue, 0))}
                    </div>
                    <div className="text-xs text-gray-500">
                      {((topOwnersData.reduce((sum, owner) => sum + owner.revenue, 0) / analyticsData.revenue.totalRevenue) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Performance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Location Performance</h3>
              <p className="text-sm text-gray-600">Revenue distribution by area</p>
            </div>
            <Map className="w-5 h-5 text-gray-400" />
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={locationPerformance}>
                <PolarGrid />
                <PolarAngleAxis dataKey="location" />
                <PolarRadiusAxis />
                <Radar
                  name="Revenue"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Properties"
                  dataKey="properties"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                />
                <Legend />
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {locationPerformance.map((location, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900">{location.location}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {formatCurrency(location.revenue)}
                </div>
                <div className="text-xs text-gray-500">
                  {location.properties} properties
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Avg rent: {formatCurrency(location.avgRent)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Performance Summary */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Monthly Performance Summary</h3>
              <p className="text-sm text-gray-600">Key metrics for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
            </div>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-xs text-blue-600">New Registrations</div>
              <div className="text-xl font-bold text-gray-900">
                {analyticsData.users.newTenants + analyticsData.users.newOwners}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {analyticsData.users.newTenants} tenants, {analyticsData.users.newOwners} owners
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-xs text-green-600">Properties Added</div>
              <div className="text-xl font-bold text-gray-900">
                {analyticsData.properties.newListings}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {analyticsData.properties.occupied} occupied, {analyticsData.properties.vacant} vacant
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-xs text-yellow-600">Avg Transaction Value</div>
              <div className="text-xl font-bold text-gray-900">
                {formatCurrency(analyticsData.payments.averageTransactionValue)}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {analyticsData.payments.successRate}% success rate
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-xs text-purple-600">Platform Revenue</div>
              <div className="text-xl font-bold text-gray-900">
                {formatCurrency(analyticsData.revenue.platformRevenue)}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {((analyticsData.revenue.platformRevenue / analyticsData.revenue.totalRevenue) * 100).toFixed(1)}% of total
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-gray-900">Performance Insights</div>
                <div className="text-sm text-gray-600">
                  {analyticsData.growth.revenueGrowth > 10 ? 
                    "Excellent performance this month with strong growth across all metrics." :
                    "Steady performance with opportunities for growth in user acquisition."
                  }
                </div>
              </div>
              <button
                onClick={() => setShowDetailedView(!showDetailedView)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
              >
                {showDetailedView ? 'Show Less' : 'View Detailed Report'}
                {showDetailedView ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {showDetailedView && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">Conversion Rate</div>
                  <div className="text-lg font-bold text-gray-900">68.5%</div>
                  <div className="text-xs text-green-600">+5.2% from last month</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">Customer Retention</div>
                  <div className="text-lg font-bold text-gray-900">92.3%</div>
                  <div className="text-xs text-green-600">+2.1% from last month</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">Avg Response Time</div>
                  <div className="text-lg font-bold text-gray-900">2.4 hours</div>
                  <div className="text-xs text-green-600">-0.8 hours from last month</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">User Satisfaction</div>
                  <div className="text-lg font-bold text-gray-900">4.7/5</div>
                  <div className="text-xs text-green-600">+0.3 from last month</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">Payment Processing Time</div>
                  <div className="text-lg font-bold text-gray-900">1.2 hours</div>
                  <div className="text-xs text-green-600">-0.5 hours from last month</div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600">Platform Uptime</div>
                  <div className="text-lg font-bold text-gray-900">99.8%</div>
                  <div className="text-xs text-green-600">99.9% target</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder Map icon component
const Map = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

export default AdminAnalytics;