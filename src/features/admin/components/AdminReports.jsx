import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Printer,
  FileText,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  Share2,
  Mail,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Building,
  Home,
  CreditCard,
  RefreshCw,
  Plus,
  MoreVertical,
  FileBarChart,
  FileSpreadsheet,
  FilePieChart,
  FileLineChart,
} from "lucide-react";

const AdminReports = () => {
  const [activeTab, setActiveTab] = useState("financial");
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState("month");
  const [showFilters, setShowFilters] = useState(false);

  // Reports Data
  const reportsData = {
    financial: [
      {
        id: 1,
        title: "Revenue Report",
        description: "Monthly revenue breakdown by source",
        type: "financial",
        frequency: "Monthly",
        lastGenerated: "2024-02-28",
        size: "2.4 MB",
        format: "PDF",
        status: "generated",
        views: 145,
        downloads: 89,
      },
      {
        id: 2,
        title: "Platform Fee Analysis",
        description: "Platform fee collection and trends",
        type: "financial",
        frequency: "Quarterly",
        lastGenerated: "2024-01-31",
        size: "1.8 MB",
        format: "Excel",
        status: "generated",
        views: 98,
        downloads: 56,
      },
      {
        id: 3,
        title: "Owner Payout Summary",
        description: "Detailed owner payout statements",
        type: "financial",
        frequency: "Monthly",
        lastGenerated: "2024-02-28",
        size: "3.2 MB",
        format: "PDF",
        status: "generated",
        views: 112,
        downloads: 74,
      },
      {
        id: 4,
        title: "Tax Compliance Report",
        description: "GST and tax compliance documentation",
        type: "financial",
        frequency: "Quarterly",
        lastGenerated: "2023-12-31",
        size: "4.1 MB",
        format: "PDF",
        status: "pending",
        views: 67,
        downloads: 42,
      },
    ],
    user: [
      {
        id: 5,
        title: "User Growth Report",
        description: "New user acquisition and growth trends",
        type: "user",
        frequency: "Monthly",
        lastGenerated: "2024-02-28",
        size: "1.5 MB",
        format: "Excel",
        status: "generated",
        views: 89,
        downloads: 61,
      },
      {
        id: 6,
        title: "User Activity Analysis",
        description: "User engagement and activity patterns",
        type: "user",
        frequency: "Weekly",
        lastGenerated: "2024-02-25",
        size: "2.1 MB",
        format: "Excel",
        status: "generated",
        views: 76,
        downloads: 48,
      },
      {
        id: 7,
        title: "Churn Rate Analysis",
        description: "User retention and churn statistics",
        type: "user",
        frequency: "Quarterly",
        lastGenerated: "2024-01-31",
        size: "1.9 MB",
        format: "PDF",
        status: "generated",
        views: 54,
        downloads: 32,
      },
    ],
    property: [
      {
        id: 8,
        title: "Property Inventory",
        description: "Complete property listing and status",
        type: "property",
        frequency: "Monthly",
        lastGenerated: "2024-02-28",
        size: "3.8 MB",
        format: "Excel",
        status: "generated",
        views: 132,
        downloads: 91,
      },
      {
        id: 9,
        title: "Occupancy Report",
        description: "Property occupancy rates and trends",
        type: "property",
        frequency: "Weekly",
        lastGenerated: "2024-02-25",
        size: "1.7 MB",
        format: "PDF",
        status: "generated",
        views: 87,
        downloads: 59,
      },
      {
        id: 10,
        title: "Rent Price Analysis",
        description: "Average rent prices by location",
        type: "property",
        frequency: "Monthly",
        lastGenerated: "2024-02-28",
        size: "2.3 MB",
        format: "Excel",
        status: "generated",
        views: 104,
        downloads: 68,
      },
    ],
    performance: [
      {
        id: 11,
        title: "Platform Performance",
        description: "System uptime and performance metrics",
        type: "performance",
        frequency: "Daily",
        lastGenerated: "2024-02-27",
        size: "1.2 MB",
        format: "PDF",
        status: "generated",
        views: 45,
        downloads: 28,
      },
      {
        id: 12,
        title: "Transaction Success Rate",
        description: "Payment success and failure analysis",
        type: "performance",
        frequency: "Weekly",
        lastGenerated: "2024-02-26",
        size: "1.6 MB",
        format: "Excel",
        status: "generated",
        views: 78,
        downloads: 52,
      },
      {
        id: 13,
        title: "Support Ticket Analysis",
        description: "Customer support performance metrics",
        type: "performance",
        frequency: "Monthly",
        lastGenerated: "2024-02-28",
        size: "2.0 MB",
        format: "PDF",
        status: "pending",
        views: 63,
        downloads: 41,
      },
    ],
  };

  // Quick Stats
  const quickStats = {
    totalReports: 42,
    generatedThisMonth: 8,
    pendingReports: 3,
    totalDownloads: 1256,
    popularReport: "Revenue Report",
    averageSize: "2.3 MB",
  };

  // Recent Activity
  const recentActivity = [
    {
      id: 1,
      user: "Admin User",
      action: "generated",
      report: "Monthly Revenue Report",
      time: "2 hours ago",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: 2,
      user: "Finance Team",
      action: "downloaded",
      report: "Tax Compliance Report",
      time: "5 hours ago",
      icon: Download,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      id: 3,
      user: "Operations",
      action: "viewed",
      report: "Property Occupancy Report",
      time: "1 day ago",
      icon: Eye,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      id: 4,
      user: "Admin User",
      action: "scheduled",
      report: "Weekly Performance Report",
      time: "2 days ago",
      icon: Calendar,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
  ];

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const config = {
      generated: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        label: "Generated",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
        label: "Pending",
      },
      processing: {
        color: "bg-blue-100 text-blue-800",
        icon: Clock,
        label: "Processing",
      },
      failed: {
        color: "bg-red-100 text-red-800",
        icon: AlertCircle,
        label: "Failed",
      },
    };

    const { color, icon: Icon, label } = config[status] || config.pending;
    return (
      <span
        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${color}`}
      >
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  // Get format badge
  const getFormatBadge = (format) => {
    const colors = {
      PDF: "bg-red-100 text-red-800",
      Excel: "bg-green-100 text-green-800",
      CSV: "bg-blue-100 text-blue-800",
      JSON: "bg-purple-100 text-purple-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          colors[format] || "bg-gray-100 text-gray-800"
        }`}
      >
        {format}
      </span>
    );
  };

  // Tab configuration
  const tabs = [
    { id: "financial", label: "Financial Reports", icon: DollarSign, count: 8 },
    { id: "user", label: "User Reports", icon: Users, count: 6 },
    { id: "property", label: "Property Reports", icon: Building, count: 7 },
    {
      id: "performance",
      label: "Performance Reports",
      icon: BarChart3,
      count: 5,
    },
    { id: "custom", label: "Custom Reports", icon: FileBarChart, count: 3 },
  ];

  // Handle report generation
  const handleGenerateReport = (reportId) => {
    alert(`Generating report ${reportId}...`);
  };

  // Handle download report
  const handleDownloadReport = (report) => {
    alert(`Downloading ${report.title} (${report.format})...`);
  };

  // Handle share report
  const handleShareReport = (report) => {
    alert(`Sharing ${report.title} via email...`);
  };

  // Handle view report
  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Reports Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Generate, view, and analyze platform reports
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <button className="px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              New +
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {quickStats.totalReports}
            </div>
            <div className="text-sm text-gray-600">Total Reports</div>
            <div className="text-xs text-green-600 mt-2">+12 this month</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-8 h-8 text-green-600" />
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {quickStats.generatedThisMonth}
            </div>
            <div className="text-sm text-gray-600">This Month</div>
            <div className="text-xs text-green-600 mt-2">
              85% completion rate
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {quickStats.pendingReports}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
            <div className="text-xs text-yellow-600 mt-2">
              Requires attention
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Download className="w-8 h-8 text-purple-600" />
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {quickStats.totalDownloads}
            </div>
            <div className="text-sm text-gray-600">Total Downloads</div>
            <div className="text-xs text-purple-600 mt-2">From all teams</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <BarChart3 className="w-8 h-8 text-pink-600" />
              <TrendingUp className="w-5 h-5 text-pink-600" />
            </div>
            <div className="text-lg font-bold text-gray-900 mb-1">
              {quickStats.popularReport}
            </div>
            <div className="text-sm text-gray-600">Most Popular</div>
            <div className="text-xs text-pink-600 mt-2">
              145 views this month
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-8 h-8 text-orange-600" />
              <FileSpreadsheet className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {quickStats.averageSize}
            </div>
            <div className="text-sm text-gray-600">Avg Report Size</div>
            <div className="text-xs text-orange-600 mt-2">
              Across all formats
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Report Filters
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm">
                  <option value="">All Types</option>
                  <option value="financial">Financial</option>
                  <option value="user">User</option>
                  <option value="property">Property</option>
                  <option value="performance">Performance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm">
                  <option value="">All Status</option>
                  <option value="generated">Generated</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm">
                  <option value="">All Formats</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm">
                  <option value="">All Frequencies</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Reset Filters
              </button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <div className="flex space-x-4 overflow-x-auto px-4 mt-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 px-1 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-2 ${
                          activeTab === tab.id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            activeTab === tab.id
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reports List */}
              <div className="p-4">
                <div className="space-y-4">
                  {reportsData[activeTab]?.map((report) => (
                    <div
                      key={report.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`p-2 rounded-lg ${
                                report.format === "PDF"
                                  ? "bg-red-50"
                                  : report.format === "Excel"
                                  ? "bg-green-50"
                                  : "bg-blue-50"
                              }`}
                            >
                              {report.format === "PDF" ? (
                                <FileText className="w-5 h-5 text-red-600" />
                              ) : report.format === "Excel" ? (
                                <FileSpreadsheet className="w-5 h-5 text-green-600" />
                              ) : (
                                <FileLineChart className="w-5 h-5 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">
                                {report.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {report.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {report.frequency}
                            </div>
                            <div>Last: {formatDate(report.lastGenerated)}</div>
                            <div>{report.size}</div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {report.views} views
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              {report.downloads} downloads
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(report.status)}
                            {getFormatBadge(report.format)}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewReport(report)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View Report"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDownloadReport(report)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                              title="Download Report"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleShareReport(report)}
                              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                              title="Share Report"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            {report.status === "pending" && (
                              <button
                                onClick={() => handleGenerateReport(report.id)}
                                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                              >
                                Generate
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!reportsData[activeTab] ||
                    reportsData[activeTab].length === 0) && (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No reports found
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        No reports available for this category. Try changing
                        filters or generate a new report.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Report Generation Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quick Report Generation
                  </h3>
                  <p className="text-sm text-gray-600">
                    Generate standard reports instantly
                  </p>
                </div>
                <RefreshCw className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Daily Revenue Summary
                      </h4>
                      <p className="text-sm text-gray-600">
                        Today's revenue snapshot
                      </p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    Generate Now
                  </button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Weekly User Activity
                      </h4>
                      <p className="text-sm text-gray-600">
                        Last 7 days user metrics
                      </p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                    Generate Now
                  </button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Property Status Report
                      </h4>
                      <p className="text-sm text-gray-600">
                        Current property inventory
                      </p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700">
                    Generate Now
                  </button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Platform Performance
                      </h4>
                      <p className="text-sm text-gray-600">
                        System performance metrics
                      </p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700">
                    Generate Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${activity.bg}`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action} {activity.report}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scheduled Reports */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Scheduled Reports
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Manage
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-blue-900">
                      Monthly Financial Report
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Auto-generated
                    </span>
                  </div>
                  <div className="text-sm text-blue-700">
                    Next: March 31, 2024
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    Sends to: finance@company.com
                  </div>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-green-900">
                      Weekly User Growth
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Every Monday
                    </span>
                  </div>
                  <div className="text-sm text-green-700">
                    Next: March 4, 2024
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    Sends to: growth@company.com
                  </div>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-purple-900">
                      Daily Performance
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      Daily at 9 AM
                    </span>
                  </div>
                  <div className="text-sm text-purple-700">
                    Next: Tomorrow, 9:00 AM
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    Sends to: ops@company.com
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Export Options
              </h3>

              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Export All Reports (ZIP)
                </button>

                <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print Summary
                </button>

                <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedReport.title}
                  </h3>
                  <p className="text-sm text-gray-600">``
                    {selectedReport.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Report Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600">Report Type</div>
                    <div className="font-medium">
                      {selectedReport.type.charAt(0).toUpperCase() +
                        selectedReport.type.slice(1)}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600">Frequency</div>
                    <div className="font-medium">
                      {selectedReport.frequency}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600">Format</div>
                    <div>{getFormatBadge(selectedReport.format)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600">File Size</div>
                    <div className="font-medium">{selectedReport.size}</div>
                  </div>
                </div>

                {/* Usage Statistics */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Usage Statistics
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900">
                        {selectedReport.views}
                      </div>
                      <div className="text-xs text-blue-700">Total Views</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-900">
                        {selectedReport.downloads}
                      </div>
                      <div className="text-xs text-green-700">Downloads</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-900">
                        {Math.round(
                          (selectedReport.downloads / selectedReport.views) *
                            100
                        )}
                        %
                      </div>
                      <div className="text-xs text-purple-700">
                        Conversion Rate
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last Generated */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Generation History
                  </h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Last Generated</div>
                        <div className="text-sm text-gray-600">
                          {formatDate(selectedReport.lastGenerated)}
                        </div>
                      </div>
                      {getStatusBadge(selectedReport.status)}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleDownloadReport(selectedReport)}
                    className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button
                    onClick={() => handleShareReport(selectedReport)}
                    className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Report
                  </button>
                  {selectedReport.status === "pending" && (
                    <button
                      onClick={() => {
                        handleGenerateReport(selectedReport.id);
                        setSelectedReport(null);
                      }}
                      className="col-span-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-600"
                    >
                      Generate Report Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
