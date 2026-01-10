import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Building,
  Home,
  MapPin,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  Send,
  Archive,
  RefreshCw,
  Plus,
  MoreVertical,
  Star,
  TrendingUp,
  FileText,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const AdminInquiries = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [replyText, setReplyText] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Inquiries Data
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: "Rahul Verma",
      email: "rahul.verma@email.com",
      phone: "+91 9876543210",
      type: "property_viewing",
      propertyId: "PROP001",
      propertyName: "2 BHK Apartment, Hinjewadi",
      propertyType: "Apartment",
      budget: "₹45,000/month",
      message:
        "I'm interested in viewing this property. Can you schedule a visit for this weekend?",
      status: "pending",
      priority: "high",
      source: "website",
      assignedTo: "Agent 1",
      createdAt: "2024-02-28 10:30:00",
      updatedAt: "2024-02-28 10:30:00",
      followUpDate: "2024-03-01",
      notes: "Interested in 2BHK, needs parking space",
      attachments: 2,
      responseTime: "2 hours", // Time to first response
      satisfactionRating: null,
      tags: ["urgent", "new-customer"],
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya.singh@email.com",
      phone: "+91 9876543211",
      type: "rental_info",
      propertyId: "PROP002",
      propertyName: "3 BHK Villa, Wakad",
      propertyType: "Villa",
      budget: "₹75,000/month",
      message:
        "Looking for villa with garden. Need information about maintenance charges and security deposit.",
      status: "in_progress",
      priority: "medium",
      source: "mobile_app",
      assignedTo: "Agent 2",
      createdAt: "2024-02-27 14:20:00",
      updatedAt: "2024-02-28 09:15:00",
      followUpDate: "2024-02-29",
      notes: "Wants garden, flexible on budget",
      attachments: 0,
      responseTime: "1 hour",
      satisfactionRating: 4,
      tags: ["premium", "long-term"],
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@email.com",
      phone: "+91 9876543212",
      type: "property_listing",
      propertyId: null,
      propertyName: "Want to list property",
      propertyType: "Commercial",
      budget: "₹1,20,000/month",
      message:
        "I have a commercial space in Baner that I want to list on your platform. Need information about commission rates.",
      status: "resolved",
      priority: "low",
      source: "phone_call",
      assignedTo: "Agent 3",
      createdAt: "2024-02-26 11:45:00",
      updatedAt: "2024-02-27 16:30:00",
      followUpDate: null,
      notes: "Commercial property owner, wants to list",
      attachments: 3,
      responseTime: "30 minutes",
      satisfactionRating: 5,
      tags: ["property-owner", "commercial"],
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 9876543213",
      type: "maintenance",
      propertyId: "PROP004",
      propertyName: "2 BHK Apartment, Hinjewadi",
      propertyType: "Apartment",
      budget: "₹42,000/month",
      message:
        "Facing issue with water supply in the apartment. Need urgent maintenance support.",
      status: "urgent",
      priority: "high",
      source: "website",
      assignedTo: "Support",
      createdAt: "2024-02-28 08:15:00",
      updatedAt: "2024-02-28 08:15:00",
      followUpDate: "2024-02-28",
      notes: "Water supply issue, needs immediate attention",
      attachments: 1,
      responseTime: "15 minutes",
      satisfactionRating: null,
      tags: ["maintenance", "urgent"],
    },
    {
      id: 5,
      name: "Vikram Patel",
      email: "vikram.patel@email.com",
      phone: "+91 9876543214",
      type: "general_query",
      propertyId: null,
      propertyName: "General Platform Query",
      propertyType: "General",
      budget: "N/A",
      message:
        "How does your platform verification process work? Need details about tenant screening.",
      status: "pending",
      priority: "medium",
      source: "email",
      assignedTo: "Unassigned",
      createdAt: "2024-02-25 16:40:00",
      updatedAt: "2024-02-25 16:40:00",
      followUpDate: "2024-02-27",
      notes: "Platform query about verification",
      attachments: 0,
      responseTime: "4 hours",
      satisfactionRating: null,
      tags: ["platform", "verification"],
    },
    {
      id: 6,
      name: "Neha Sharma",
      email: "neha.sharma@email.com",
      phone: "+91 9876543215",
      type: "payment_issue",
      propertyId: "PROP006",
      propertyName: "3 BHK Flat, Viman Nagar",
      propertyType: "Apartment",
      budget: "₹65,000/month",
      message:
        "Payment got deducted but showing pending in my account. Need immediate resolution.",
      status: "in_progress",
      priority: "high",
      source: "mobile_app",
      assignedTo: "Finance",
      createdAt: "2024-02-24 12:30:00",
      updatedAt: "2024-02-25 10:20:00",
      followUpDate: "2024-02-26",
      notes: "Payment issue, needs finance team",
      attachments: 2,
      responseTime: "45 minutes",
      satisfactionRating: 3,
      tags: ["payment", "urgent"],
    },
    {
      id: 7,
      name: "Rajesh Mehta",
      email: "rajesh.mehta@email.com",
      phone: "+91 9876543216",
      type: "property_viewing",
      propertyId: "PROP007",
      propertyName: "4 BHK Penthouse, Baner",
      propertyType: "Penthouse",
      budget: "₹1,25,000/month",
      message:
        "Interested in premium penthouse. Can you share more photos and schedule virtual tour?",
      status: "resolved",
      priority: "medium",
      source: "website",
      assignedTo: "Agent 1",
      createdAt: "2024-02-23 09:15:00",
      updatedAt: "2024-02-24 14:45:00",
      followUpDate: null,
      notes: "Premium client, virtual tour scheduled",
      attachments: 0,
      responseTime: "1 hour",
      satisfactionRating: 5,
      tags: ["premium", "virtual-tour"],
    },
    {
      id: 8,
      name: "Anjali Gupta",
      email: "anjali.gupta@email.com",
      phone: "+91 9876543217",
      type: "document_verification",
      propertyId: "PROP008",
      propertyName: "1 BHK Studio, Kothrud",
      propertyType: "Studio",
      budget: "₹28,000/month",
      message:
        "Documents submitted for verification. When can I expect approval?",
      status: "pending",
      priority: "low",
      source: "email",
      assignedTo: "Verification",
      createdAt: "2024-02-22 15:20:00",
      updatedAt: "2024-02-22 15:20:00",
      followUpDate: "2024-02-24",
      notes: "Document verification pending",
      attachments: 5,
      responseTime: "3 hours",
      satisfactionRating: null,
      tags: ["documents", "verification"],
    },
  ]);

  const [filteredInquiries, setFilteredInquiries] = useState(inquiries);

  // Stats
  const stats = {
    total: inquiries.length,
    pending: inquiries.filter((i) => i.status === "pending").length,
    in_progress: inquiries.filter((i) => i.status === "in_progress").length,
    resolved: inquiries.filter((i) => i.status === "resolved").length,
    urgent: inquiries.filter((i) => i.status === "urgent").length,
    highPriority: inquiries.filter((i) => i.priority === "high").length,
    averageResponseTime: "1.2 hours",
    satisfactionRate: "82%",
  };

  // Filter and sort inquiries
  useEffect(() => {
    let filtered = [...inquiries];

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((inquiry) => inquiry.status === activeTab);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inquiry.propertyName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          inquiry.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (inquiry) => inquiry.priority === priorityFilter
      );
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const today = new Date();
      const lastWeek = new Date(today.setDate(today.getDate() - 7));
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

      filtered = filtered.filter((inquiry) => {
        const inquiryDate = new Date(inquiry.createdAt);
        switch (dateFilter) {
          case "today":
            return inquiryDate.toDateString() === new Date().toDateString();
          case "week":
            return inquiryDate >= lastWeek;
          case "month":
            return inquiryDate >= lastMonth;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortBy === "response") {
        return parseInt(a.responseTime) - parseInt(b.responseTime);
      }
      return 0;
    });

    setFilteredInquiries(filtered);
  }, [
    activeTab,
    searchQuery,
    statusFilter,
    priorityFilter,
    dateFilter,
    sortBy,
    inquiries,
  ]);

  // Format date
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format time ago
  const timeAgo = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const config = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
        label: "Pending",
      },
      in_progress: {
        color: "bg-blue-100 text-blue-800",
        icon: MessageCircle,
        label: "In Progress",
      },
      resolved: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        label: "Resolved",
      },
      urgent: {
        color: "bg-red-100 text-red-800",
        icon: AlertCircle,
        label: "Urgent",
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

  // Get priority badge
  const getPriorityBadge = (priority) => {
    const config = {
      high: {
        color: "bg-red-100 text-red-800",
        label: "High",
        dot: "bg-red-500",
      },
      medium: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Medium",
        dot: "bg-yellow-500",
      },
      low: {
        color: "bg-green-100 text-green-800",
        label: "Low",
        dot: "bg-green-500",
      },
    };

    const { color, label, dot } = config[priority] || config.medium;
    return (
      <span
        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${color}`}
      >
        <div className={`w-2 h-2 rounded-full ${dot}`}></div>
        {label}
      </span>
    );
  };

  // Get type badge
  const getTypeBadge = (type) => {
    const types = {
      property_viewing: {
        label: "Property Viewing",
        color: "bg-blue-100 text-blue-800",
      },
      rental_info: {
        label: "Rental Info",
        color: "bg-purple-100 text-purple-800",
      },
      property_listing: {
        label: "Property Listing",
        color: "bg-green-100 text-green-800",
      },
      maintenance: { label: "Maintenance", color: "bg-red-100 text-red-800" },
      general_query: {
        label: "General Query",
        color: "bg-gray-100 text-gray-800",
      },
      payment_issue: {
        label: "Payment Issue",
        color: "bg-orange-100 text-orange-800",
      },
      document_verification: {
        label: "Document Verification",
        color: "bg-indigo-100 text-indigo-800",
      },
    };

    const { label, color } = types[type] || {
      label: type,
      color: "bg-gray-100 text-gray-800",
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  // Handle status update
  const handleUpdateStatus = (inquiryId, newStatus) => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === inquiryId
          ? {
              ...inquiry,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : inquiry
      )
    );
  };

  // Handle assign inquiry
  const handleAssignInquiry = (inquiryId, assignTo) => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === inquiryId
          ? { ...inquiry, assignedTo: assignTo }
          : inquiry
      )
    );
  };

  // Handle send reply
  const handleSendReply = (inquiryId) => {
    if (!replyText.trim()) return;

    // In a real app, this would send the reply via API
    alert(`Reply sent to inquiry #${inquiryId}`);
    setReplyText("");

    // Update inquiry status
    handleUpdateStatus(inquiryId, "in_progress");
  };

  // Handle add note
  const handleAddNote = (inquiryId, note) => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === inquiryId ? { ...inquiry, notes: note } : inquiry
      )
    );
  };

  // Handle delete inquiry
  const handleDeleteInquiry = (inquiryId) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      setInquiries(inquiries.filter((inquiry) => inquiry.id !== inquiryId));
      setSelectedInquiry(null);
    }
  };

  // Tabs configuration
  const tabs = [
    { id: "all", label: "All Inquiries", count: stats.total },
    { id: "pending", label: "Pending", count: stats.pending },
    { id: "in_progress", label: "In Progress", count: stats.in_progress },
    { id: "resolved", label: "Resolved", count: stats.resolved },
    { id: "urgent", label: "Urgent", count: stats.urgent },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Inquiries Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage customer inquiries, support requests, and property queries
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Inquiry
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-600">Total Inquiries</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-yellow-200">
            <div className="text-xl font-bold text-yellow-700">
              {stats.pending}
            </div>
            <div className="text-xs text-yellow-600">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="text-xl font-bold text-blue-700">
              {stats.in_progress}
            </div>
            <div className="text-xs text-blue-600">In Progress</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="text-xl font-bold text-green-700">
              {stats.resolved}
            </div>
            <div className="text-xs text-green-600">Resolved</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <div className="text-xl font-bold text-red-700">{stats.urgent}</div>
            <div className="text-xs text-red-600">Urgent</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <div className="text-xl font-bold text-red-700">
              {stats.highPriority}
            </div>
            <div className="text-xs text-red-600">High Priority</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <div className="text-xl font-bold text-purple-700">
              {stats.averageResponseTime}
            </div>
            <div className="text-xs text-purple-600">Avg Response Time</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-teal-200">
            <div className="text-xl font-bold text-teal-700">
              {stats.satisfactionRate}
            </div>
            <div className="text-xs text-teal-600">Satisfaction Rate</div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Filter Inquiries
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
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priority">Priority</option>
                  <option value="response">Response Time</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setPriorityFilter("all");
                  setDateFilter("all");
                  setSortBy("newest");
                }}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                placeholder="Search by name, email, property, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:text-green-700">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-1 px-3 py-1 text-sm text-purple-600 hover:text-purple-700">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <div className="flex space-x-4 overflow-x-auto px-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 mt-2 px-1 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-2 ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
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
                  ))}
                </div>
              </div>

              {/* Inquiries List */}
              <div className="p-4">
                <div className="space-y-4">
                  {filteredInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h4 className="font-bold text-gray-900">
                                  {inquiry.name}
                                </h4>
                                {getStatusBadge(inquiry.status)}
                                {getPriorityBadge(inquiry.priority)}
                                {getTypeBadge(inquiry.type)}
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-4 flex-wrap">
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {inquiry.email}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {inquiry.phone}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Building className="w-3 h-3" />
                                    {inquiry.propertyName}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 line-clamp-2">
                                {inquiry.message}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDateTime(inquiry.createdAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {timeAgo(inquiry.createdAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {inquiry.assignedTo}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              Response: {inquiry.responseTime}
                            </div>
                            {inquiry.attachments > 0 && (
                              <div className="flex items-center gap-1">
                                <FileText className="w-4 h-4" />
                                {inquiry.attachments} files
                              </div>
                            )}
                            {inquiry.satisfactionRating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                {inquiry.satisfactionRating}/5
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            {inquiry.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateStatus(inquiry.id, "in_progress");
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                              title="Start Progress"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateStatus(inquiry.id, "resolved");
                              }}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                              title="Mark Resolved"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateStatus(inquiry.id, "urgent");
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                              title="Mark Urgent"
                            >
                              <AlertCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredInquiries.length === 0 && (
                    <div className="text-center py-12">
                      <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No inquiries found
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {searchQuery ||
                        statusFilter !== "all" ||
                        priorityFilter !== "all"
                          ? "No inquiries match your filters. Try adjusting your search criteria."
                          : "No inquiries available. All inquiries have been processed."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quick Actions
                  </h3>
                  <p className="text-sm text-gray-600">
                    Common inquiry management tasks
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() =>
                    handleAssignInquiry(filteredInquiries[0]?.id, "Agent 1")
                  }
                  className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center"
                >
                  <div className="text-blue-600 mb-2">
                    <User className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="font-medium text-gray-900">
                    Assign to Agent
                  </div>
                  <div className="text-xs text-gray-600">
                    Assign selected inquiries
                  </div>
                </button>

                <button
                  onClick={() => {
                    const pendingInquiries = inquiries.filter(
                      (i) => i.status === "pending"
                    );
                    pendingInquiries.forEach((inq) =>
                      handleUpdateStatus(inq.id, "in_progress")
                    );
                  }}
                  className="p-4 border border-green-200 rounded-lg hover:bg-green-50 text-center"
                >
                  <div className="text-green-600 mb-2">
                    <MessageCircle className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="font-medium text-gray-900">
                    Start All Pending
                  </div>
                  <div className="text-xs text-gray-600">
                    Move pending to in progress
                  </div>
                </button>

                <button
                  onClick={() => {
                    const oldInquiries = inquiries.filter(
                      (i) =>
                        new Date() - new Date(i.createdAt) >
                        7 * 24 * 60 * 60 * 1000
                    );
                    // In real app, this would archive instead of delete
                    alert(`Would archive ${oldInquiries.length} old inquiries`);
                  }}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                >
                  <div className="text-gray-600 mb-2">
                    <Archive className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="font-medium text-gray-900">Archive Old</div>
                  <div className="text-xs text-gray-600">
                    Archive resolved inquiries
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Inquiry Details Sidebar */}
            {selectedInquiry ? (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Inquiry Details
                    </h3>
                    <p className="text-sm text-gray-600">
                      ID: #{selectedInquiry.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Customer Information
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            {selectedInquiry.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {selectedInquiry.email}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-gray-600">Phone</div>
                          <div className="font-medium">
                            {selectedInquiry.phone}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Source</div>
                          <div className="font-medium">
                            {selectedInquiry.source}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Property Info */}
                  {selectedInquiry.propertyId && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Property Information
                      </h4>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Home className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">
                              {selectedInquiry.propertyName}
                            </div>
                            <div className="text-sm text-gray-600">
                              ID: {selectedInquiry.propertyId}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-600">Type</div>
                            <div className="font-medium">
                              {selectedInquiry.propertyType}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Budget</div>
                            <div className="font-medium">
                              {selectedInquiry.budget}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Inquiry Details */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Inquiry Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        {getStatusBadge(selectedInquiry.status)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        {getPriorityBadge(selectedInquiry.priority)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        {getTypeBadge(selectedInquiry.type)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assigned To:</span>
                        <span className="font-medium">
                          {selectedInquiry.assignedTo}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium">
                          {formatDateTime(selectedInquiry.createdAt)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Follow-up:</span>
                        <span className="font-medium">
                          {selectedInquiry.followUpDate
                            ? new Date(
                                selectedInquiry.followUpDate
                              ).toLocaleDateString()
                            : "Not scheduled"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Message
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedInquiry.message}</p>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Notes
                    </h4>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        {selectedInquiry.notes || "No notes added"}
                      </p>
                    </div>
                  </div>

                  {/* Quick Reply */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Quick Reply
                    </h4>
                    <div className="space-y-3">
                      <textarea
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        rows="3"
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSendReply(selectedInquiry.id)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Send Reply
                        </button>
                        <button
                          onClick={() => setReplyText("")}
                          className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedInquiry.id, "resolved")
                      }
                      className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Resolved
                    </button>
                    <button
                      onClick={() =>
                        handleAssignInquiry(selectedInquiry.id, "Agent 1")
                      }
                      className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Assign
                    </button>
                    <button
                      onClick={() => {
                        const note = prompt(
                          "Add a note:",
                          selectedInquiry.notes || ""
                        );
                        if (note !== null)
                          handleAddNote(selectedInquiry.id, note);
                      }}
                      className="px-4 py-2.5 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Add Note
                    </button>
                    <button
                      onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                      className="px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Inquiry Selected
                  </h3>
                  <p className="text-gray-600">
                    Select an inquiry from the list to view details and take
                    action
                  </p>
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Inquiry Statistics
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">By Status</span>
                    <span className="font-medium">{stats.total} total</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-yellow-600">Pending</span>
                        <span>{stats.pending}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{
                            width: `${(stats.pending / stats.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-blue-600">In Progress</span>
                        <span>{stats.in_progress}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: `${
                              (stats.in_progress / stats.total) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-green-600">Resolved</span>
                        <span>{stats.resolved}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${(stats.resolved / stats.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">By Priority</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 bg-red-50 rounded-lg">
                      <div className="text-lg font-bold text-red-700">
                        {stats.highPriority}
                      </div>
                      <div className="text-xs text-red-600">High</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-700">
                        {
                          inquiries.filter((i) => i.priority === "medium")
                            .length
                        }
                      </div>
                      <div className="text-xs text-yellow-600">Medium</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-700">
                        {inquiries.filter((i) => i.priority === "low").length}
                      </div>
                      <div className="text-xs text-green-600">Low</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Performance Metrics</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Response Time</span>
                      <span className="font-medium">
                        {stats.averageResponseTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Satisfaction Rate</span>
                      <span className="font-medium">
                        {stats.satisfactionRate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resolution Rate</span>
                      <span className="font-medium">
                        {Math.round((stats.resolved / stats.total) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Responses */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Common Responses
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() =>
                    setReplyText(
                      "Thank you for your inquiry. We'll get back to you shortly."
                    )
                  }
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">
                    Quick Acknowledgment
                  </div>
                  <div className="text-xs text-gray-600">
                    Generic thank you response
                  </div>
                </button>
                <button
                  onClick={() =>
                    setReplyText(
                      "We've scheduled a property viewing for you. Please confirm your availability."
                    )
                  }
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">
                    Viewing Scheduled
                  </div>
                  <div className="text-xs text-gray-600">
                    Property viewing confirmation
                  </div>
                </button>
                <button
                  onClick={() =>
                    setReplyText(
                      "We need some additional documents for verification. Please upload them in your dashboard."
                    )
                  }
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">
                    Document Request
                  </div>
                  <div className="text-xs text-gray-600">
                    Asking for additional documents
                  </div>
                </button>
                <button
                  onClick={() =>
                    setReplyText(
                      "Your issue has been forwarded to our technical team. They will contact you shortly."
                    )
                  }
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">
                    Technical Support
                  </div>
                  <div className="text-xs text-gray-600">
                    Forwarding to technical team
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
