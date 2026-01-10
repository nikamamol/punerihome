import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  User,
  Eye,
  Heart,
  Building,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Shield,
  Clock,
  AlertCircle,
  Download,
  RefreshCw,
  CreditCard,
  Star,
  BarChart,
  FileText,
  MessageSquare,
  MapPin,
  Bed,
  Bath,
  Home,
  Smartphone,
  PhoneCall,
  Target,
  Zap,
} from "lucide-react";

function AdminTenants() {
  // Sample tenants data with credit and property interaction details
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "Rohan Mehta",
      email: "rohan@email.com",
      phone: "+91 9876543210",
      joinDate: "2024-01-15",
      status: "active",
      verification: "verified",
      totalCredits: 5,
      availableCredits: 3,
      usedCredits: 2,
      creditHistory: [
        { date: "2024-02-20", amount: 99, creditsEarned: 1, type: "purchase" },
        { date: "2024-02-10", amount: 149, creditsEarned: 3, type: "purchase" },
        { date: "2024-02-05", amount: 0, creditsEarned: -1, type: "used" },
        { date: "2024-02-01", amount: 0, creditsEarned: -1, type: "used" },
      ],
      propertiesViewed: 24,
      propertiesLiked: 8,
      propertiesContacted: 5,
      favoriteProperties: [
        { id: 101, title: "Luxury 3BHK in Koregaon Park", views: 12, likes: 3 },
        { id: 102, title: "Premium 2BHK in Hinjewadi", views: 8, likes: 2 },
      ],
      recentActivity: [
        { date: "2024-02-22", action: "viewed", property: "3BHK Apartment" },
        { date: "2024-02-21", action: "liked", property: "Premium Villa" },
        { date: "2024-02-20", action: "contacted", property: "Studio Apartment" },
      ],
      preferences: {
        location: ["Koregaon Park", "Hinjewadi"],
        budget: "₹20,000 - ₹40,000",
        propertyType: ["Apartment", "Flat"],
        bhk: ["2 BHK", "3 BHK"],
      },
      lastActive: "2024-02-22",
      paymentMethod: "UPI",
    },
    {
      id: 2,
      name: "Sneha Reddy",
      email: "sneha@email.com",
      phone: "+91 9876543211",
      joinDate: "2024-01-20",
      status: "active",
      verification: "pending",
      totalCredits: 9,
      availableCredits: 6,
      usedCredits: 3,
      creditHistory: [
        { date: "2024-02-18", amount: 149, creditsEarned: 3, type: "purchase" },
        { date: "2024-02-12", amount: 298, creditsEarned: 6, type: "purchase" },
        { date: "2024-02-08", amount: 0, creditsEarned: -1, type: "used" },
        { date: "2024-02-05", amount: 0, creditsEarned: -2, type: "used" },
      ],
      propertiesViewed: 42,
      propertiesLiked: 15,
      propertiesContacted: 8,
      favoriteProperties: [
        { id: 103, title: "Independent Villa in Baner", views: 18, likes: 5 },
        { id: 104, title: "Commercial Space FC Road", views: 6, likes: 1 },
      ],
      recentActivity: [
        { date: "2024-02-21", action: "viewed", property: "Commercial Space" },
        { date: "2024-02-20", action: "contacted", property: "2BHK Flat" },
        { date: "2024-02-19", action: "liked", property: "Luxury Apartment" },
      ],
      preferences: {
        location: ["Baner", "Kothrud"],
        budget: "₹30,000 - ₹60,000",
        propertyType: ["Villa", "Apartment"],
        bhk: ["3 BHK", "4 BHK"],
      },
      lastActive: "2024-02-21",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 3,
      name: "Vikram Singh",
      email: "vikram@email.com",
      phone: "+91 9876543212",
      joinDate: "2024-02-01",
      status: "active",
      verification: "verified",
      totalCredits: 3,
      availableCredits: 1,
      usedCredits: 2,
      creditHistory: [
        { date: "2024-02-15", amount: 99, creditsEarned: 1, type: "purchase" },
        { date: "2024-02-12", amount: 149, creditsEarned: 3, type: "purchase" },
        { date: "2024-02-08", amount: 0, creditsEarned: -1, type: "used" },
        { date: "2024-02-03", amount: 0, creditsEarned: -2, type: "used" },
      ],
      propertiesViewed: 18,
      propertiesLiked: 6,
      propertiesContacted: 3,
      favoriteProperties: [
        { id: 105, title: "Studio Apartment Kothrud", views: 9, likes: 2 },
      ],
      recentActivity: [
        { date: "2024-02-20", action: "viewed", property: "Studio Apartment" },
        { date: "2024-02-19", action: "liked", property: "1BHK Flat" },
      ],
      preferences: {
        location: ["Kothrud", "FC Road"],
        budget: "₹15,000 - ₹25,000",
        propertyType: ["Studio", "Flat"],
        bhk: ["1 BHK"],
      },
      lastActive: "2024-02-20",
      paymentMethod: "UPI",
    },
    {
      id: 4,
      name: "Priya Desai",
      email: "priya@email.com",
      phone: "+91 9876543213",
      joinDate: "2023-12-10",
      status: "inactive",
      verification: "verified",
      totalCredits: 12,
      availableCredits: 8,
      usedCredits: 4,
      creditHistory: [
        { date: "2024-02-19", amount: 447, creditsEarned: 9, type: "purchase" },
        { date: "2024-01-15", amount: 149, creditsEarned: 3, type: "purchase" },
        { date: "2024-01-10", amount: 0, creditsEarned: -4, type: "used" },
      ],
      propertiesViewed: 56,
      propertiesLiked: 22,
      propertiesContacted: 12,
      favoriteProperties: [
        { id: 106, title: "Premium 4BHK Villa", views: 24, likes: 8 },
        { id: 107, title: "Luxury Penthouse", views: 18, likes: 6 },
        { id: 108, title: "Garden View Apartment", views: 14, likes: 4 },
      ],
      recentActivity: [
        { date: "2024-01-20", action: "viewed", property: "Penthouse" },
        { date: "2024-01-18", action: "contacted", property: "Villa" },
      ],
      preferences: {
        location: ["Koregaon Park", "Baner"],
        budget: "₹50,000 - ₹1,00,000",
        propertyType: ["Villa", "Penthouse"],
        bhk: ["3 BHK", "4 BHK"],
      },
      lastActive: "2024-01-20",
      paymentMethod: "Credit Card",
    },
    {
      id: 5,
      name: "Amit Verma",
      email: "amit@email.com",
      phone: "+91 9876543214",
      joinDate: "2024-02-05",
      status: "active",
      verification: "rejected",
      totalCredits: 1,
      availableCredits: 0,
      usedCredits: 1,
      creditHistory: [
        { date: "2024-02-21", amount: 99, creditsEarned: 1, type: "purchase" },
        { date: "2024-02-19", amount: 0, creditsEarned: -1, type: "used" },
      ],
      propertiesViewed: 12,
      propertiesLiked: 3,
      propertiesContacted: 1,
      favoriteProperties: [],
      recentActivity: [
        { date: "2024-02-21", action: "viewed", property: "2BHK Flat" },
        { date: "2024-02-19", action: "contacted", property: "1BHK Apartment" },
      ],
      preferences: {
        location: ["Hinjewadi"],
        budget: "₹20,000 - ₹30,000",
        propertyType: ["Flat"],
        bhk: ["2 BHK"],
      },
      lastActive: "2024-02-21",
      paymentMethod: "UPI",
    },
  ]);

  const [filteredTenants, setFilteredTenants] = useState(tenants);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [creditFilter, setCreditFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // view, edit, credits, activity
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate credit statistics
  const creditStats = {
    totalCreditsPurchased: tenants.reduce((sum, tenant) => sum + tenant.totalCredits, 0),
    totalCreditsUsed: tenants.reduce((sum, tenant) => sum + tenant.usedCredits, 0),
    totalCreditsAvailable: tenants.reduce((sum, tenant) => sum + tenant.availableCredits, 0),
    totalRevenue: tenants.reduce((sum, tenant) =>
      sum + tenant.creditHistory
        .filter(item => item.type === "purchase")
        .reduce((subSum, item) => subSum + item.amount, 0)
      , 0),
  };

  // Filter and search tenants
  useEffect(() => {
    let filtered = [...tenants];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (tenant) =>
          tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tenant.phone.includes(searchQuery)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((tenant) => tenant.status === statusFilter);
    }

    // Apply verification filter
    if (verificationFilter !== "all") {
      filtered = filtered.filter((tenant) => tenant.verification === verificationFilter);
    }

    // Apply credit filter
    if (creditFilter !== "all") {
      if (creditFilter === "has-credits") {
        filtered = filtered.filter((tenant) => tenant.availableCredits > 0);
      } else if (creditFilter === "no-credits") {
        filtered = filtered.filter((tenant) => tenant.availableCredits === 0);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.joinDate) - new Date(a.joinDate);
      } else if (sortBy === "oldest") {
        return new Date(a.joinDate) - new Date(b.joinDate);
      } else if (sortBy === "credits-high") {
        return b.totalCredits - a.totalCredits;
      } else if (sortBy === "credits-low") {
        return a.totalCredits - b.totalCredits;
      } else if (sortBy === "views-high") {
        return b.propertiesViewed - a.propertiesViewed;
      } else if (sortBy === "views-low") {
        return a.propertiesViewed - b.propertiesViewed;
      }
      return 0;
    });

    setFilteredTenants(filtered);
  }, [searchQuery, statusFilter, verificationFilter, creditFilter, sortBy, tenants]);

  const formatCurrency = (amount) => {
    if (amount >= 100000) return "₹" + (amount / 100000).toFixed(1) + "L";
    if (amount >= 1000) return "₹" + (amount / 1000).toFixed(0) + "K";
    return "₹" + amount;
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      suspended: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getVerificationBadge = (status) => {
    const styles = {
      verified: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCreditBadge = (credits) => {
    if (credits > 5) return "bg-purple-100 text-purple-800";
    if (credits > 0) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  const handleViewTenant = (tenant) => {
    setSelectedTenant(tenant);
    setModalType("view");
    setShowModal(true);
    setActiveTab("overview");
  };

  const handleEditTenant = (tenant) => {
    setSelectedTenant(tenant);
    setModalType("edit");
    setShowModal(true);
  };

  const handleToggleStatus = (tenantId) => {
    setTenants(tenants.map(tenant =>
      tenant.id === tenantId
        ? { ...tenant, status: tenant.status === "active" ? "inactive" : "active" }
        : tenant
    ));
  };

  const handleToggleVerification = (tenantId) => {
    setTenants(tenants.map(tenant =>
      tenant.id === tenantId
        ? { ...tenant, verification: tenant.verification === "verified" ? "pending" : "verified" }
        : tenant
    ));
  };

  const handleAddCredits = (tenantId, amount) => {
    const creditsEarned = amount >= 149 ? 3 : amount >= 99 ? 1 : 0;
    setTenants(tenants.map(tenant =>
      tenant.id === tenantId
        ? {
          ...tenant,
          totalCredits: tenant.totalCredits + creditsEarned,
          availableCredits: tenant.availableCredits + creditsEarned,
          creditHistory: [
            ...tenant.creditHistory,
            {
              date: new Date().toISOString().split('T')[0],
              amount,
              creditsEarned,
              type: "purchase"
            }
          ]
        }
        : tenant
    ));
  };

  const stats = {
    total: tenants.length,
    active: tenants.filter(t => t.status === "active").length,
    verified: tenants.filter(t => t.verification === "verified").length,
    totalPropertiesViewed: tenants.reduce((sum, tenant) => sum + tenant.propertiesViewed, 0),
    totalPropertiesLiked: tenants.reduce((sum, tenant) => sum + tenant.propertiesLiked, 0),
    avgCreditsPerTenant: (creditStats.totalCreditsPurchased / tenants.length).toFixed(1),
    engagementRate: ((tenants.filter(t => t.recentActivity.length > 0).length / tenants.length) * 100).toFixed(0) + "%",
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Tenant Management</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage tenant credits, property interactions, and preferences
        </p>
      </div>

      {/* Credit Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-blue-900">Credit System Overview</h3>
            <p className="text-sm text-blue-700">₹99 = 1 Contact • ₹149 = 3 Contacts</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-900">{creditStats.totalCreditsPurchased}</div>
              <div className="text-xs text-blue-700">Total Credits</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-900">{creditStats.totalCreditsAvailable}</div>
              <div className="text-xs text-green-700">Available</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-900">{creditStats.totalCreditsUsed}</div>
              <div className="text-xs text-purple-700">Used</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-900">{formatCurrency(creditStats.totalRevenue)}</div>
              <div className="text-xs text-orange-700">Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-600">Total Tenants</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">{stats.active}</div>
          <div className="text-xs text-green-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-700">{stats.verified}</div>
          <div className="text-xs text-blue-600">Verified</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="text-xl font-bold text-purple-700">{stats.totalPropertiesViewed}</div>
          <div className="text-xs text-purple-600">Views</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-pink-200">
          <div className="text-xl font-bold text-pink-700">{stats.totalPropertiesLiked}</div>
          <div className="text-xs text-pink-600">Likes</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-yellow-200">
          <div className="text-xl font-bold text-yellow-700">{stats.avgCreditsPerTenant}</div>
          <div className="text-xs text-yellow-600">Avg Credits</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-orange-200">
          <div className="text-xl font-bold text-orange-700">{stats.engagementRate}</div>
          <div className="text-xs text-orange-600">Engagement</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-indigo-200">
          <div className="text-xl font-bold text-indigo-700">{tenants.filter(t => t.availableCredits > 0).length}</div>
          <div className="text-xs text-indigo-600">With Credits</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                placeholder="Search by name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Verification Filter */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
            >
              <option value="all">All Verification</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Credit Filter */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={creditFilter}
              onChange={(e) => setCreditFilter(e.target.value)}
            >
              <option value="all">All Credits</option>
              <option value="has-credits">Has Credits</option>
              <option value="no-credits">No Credits</option>
            </select>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="credits-high">Credits: High to Low</option>
              <option value="credits-low">Credits: Low to High</option>
              <option value="views-high">Views: High to Low</option>
              <option value="views-low">Views: Low to High</option>
              <option value="likes-high">Likes: High to Low</option>
              <option value="likes-low">Likes: Low to High</option>
            </select>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>

          <button className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:text-green-700">
            <Download className="w-4 h-4" />
            Export Data
          </button>

          <button className="flex items-center gap-1 px-3 py-1 text-sm text-purple-600 hover:text-purple-700">
            <BarChart className="w-4 h-4" />
            Analytics
          </button>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Tenant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Credits</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Property Activity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Preferences</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Verification</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{tenant.name}</div>
                        <div className="text-xs text-gray-500">{tenant.email}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {tenant.phone}
                        </div>
                        <div className="text-xs text-gray-500">
                          Joined: {new Date(tenant.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-purple-500" />
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getCreditBadge(tenant.availableCredits)}`}>
                          {tenant.availableCredits} Available
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Total: {tenant.totalCredits} • Used: {tenant.usedCredits}
                      </div>
                      <div className="text-xs text-gray-500">
                        Last purchase: {tenant.creditHistory[0]?.date ? new Date(tenant.creditHistory[0].date).toLocaleDateString() : "Never"}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="text-center">
                          <div className="font-bold text-gray-900">{tenant.propertiesViewed}</div>
                          <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                            <Eye className="w-3 h-3" /> Views
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900">{tenant.propertiesLiked}</div>
                          <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                            <Heart className="w-3 h-3" /> Likes
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900">{tenant.propertiesContacted}</div>
                          <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                            <PhoneCall className="w-3 h-3" /> Contacted
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Favorites: {tenant.favoriteProperties.length} properties
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-900">
                        Budget: {tenant.preferences.budget}
                      </div>
                      <div className="text-xs text-gray-600">
                        {tenant.preferences.location.slice(0, 2).map((loc, idx) => (
                          <span key={idx} className="inline-block bg-gray-100 px-1 rounded mr-1">
                            {loc}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        {tenant.preferences.bhk.join(", ")}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      {getStatusBadge(tenant.status)}
                      <div className="text-xs text-gray-500">
                        Last active: {new Date(tenant.lastActive).toLocaleDateString()}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {getVerificationBadge(tenant.verification)}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewTenant(tenant)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleEditTenant(tenant)}
                        className="p-1.5 text-gray-600 hover:bg-gray-50 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleAddCredits(tenant.id, 149)}
                        className="p-1.5 text-purple-600 hover:bg-purple-50 rounded"
                        title="Add Credits"
                      >
                        <CreditCard className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleToggleStatus(tenant.id)}
                        className={`p-1.5 rounded ${tenant.status === "active"
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                          }`}
                        title={tenant.status === "active" ? "Deactivate" : "Activate"}
                      >
                        {tenant.status === "active" ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTenants.length === 0 && (
            <div className="py-12 text-center">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No tenants found</p>
              <p className="text-sm text-gray-400 mt-1">Try changing your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Tenant Details Modal */}
      {showModal && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedTenant.name}</h3>
                    <p className="text-sm text-gray-600">{selectedTenant.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${getCreditBadge(selectedTenant.availableCredits)}`}>
                    {selectedTenant.availableCredits} Credits Available
                  </div>
                  {getStatusBadge(selectedTenant.status)}
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedTenant(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-4">
                  {["overview", "credits", "activity", "favorites", "preferences"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-1 text-sm font-medium border-b-2 ${activeTab === tab
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{selectedTenant.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{selectedTenant.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">
                              Joined: {new Date(selectedTenant.joinDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Credit Summary</h4>
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold text-purple-700">{selectedTenant.totalCredits}</div>
                              <div className="text-xs text-purple-600">Total</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-green-700">{selectedTenant.availableCredits}</div>
                              <div className="text-xs text-green-600">Available</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-blue-700">{selectedTenant.usedCredits}</div>
                              <div className="text-xs text-blue-600">Used</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Property Engagement</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-lg font-bold text-gray-900">{selectedTenant.propertiesViewed}</div>
                            <div className="text-xs text-gray-600">Views</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-lg font-bold text-gray-900">{selectedTenant.propertiesLiked}</div>
                            <div className="text-xs text-gray-600">Likes</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-lg font-bold text-gray-900">{selectedTenant.propertiesContacted}</div>
                            <div className="text-xs text-gray-600">Contacted</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Activity</h4>
                        <div className="space-y-2">
                          {selectedTenant.recentActivity.slice(0, 3).map((activity, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <div>
                                <span className="font-medium">{activity.action}</span>
                                <span className="text-gray-600 ml-2">{activity.property}</span>
                              </div>
                              <span className="text-gray-500 text-xs">
                                {new Date(activity.date).toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Credits Tab */}
                {activeTab === "credits" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-700">Credit History</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddCredits(selectedTenant.id, 99)}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                          Add ₹99 (1 Credit)
                        </button>
                        <button
                          onClick={() => handleAddCredits(selectedTenant.id, 149)}
                          className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                        >
                          Add ₹149 (3 Credits)
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {selectedTenant.creditHistory.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.type === "purchase" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                              }`}>
                              {item.type === "purchase" ? (
                                <CreditCard className="w-4 h-4" />
                              ) : (
                                <PhoneCall className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.type === "purchase" ? "Credit Purchase" : "Credit Used"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(item.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${item.type === "purchase" ? "text-green-600" : "text-blue-600"
                              }`}>
                              {item.type === "purchase" ? "+" : "-"}{Math.abs(item.creditsEarned)} Credits
                            </div>
                            {item.amount > 0 && (
                              <div className="text-xs text-gray-600">₹{item.amount}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === "activity" && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Recent Activity Timeline</h4>
                    <div className="space-y-4">
                      {selectedTenant.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            {activity.action === "viewed" && <Eye className="w-4 h-4 text-blue-600" />}
                            {activity.action === "liked" && <Heart className="w-4 h-4 text-red-600" />}
                            {activity.action === "contacted" && <PhoneCall className="w-4 h-4 text-green-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 capitalize">{activity.action}</div>
                            <div className="text-sm text-gray-600">{activity.property}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(activity.date).toLocaleDateString()} • {new Date(activity.date).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Favorites Tab */}
                {activeTab === "favorites" && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Favorite Properties</h4>
                    {selectedTenant.favoriteProperties.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedTenant.favoriteProperties.map((property, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium text-gray-900 line-clamp-1">{property.title}</div>
                                <div className="flex items-center gap-4 mt-2">
                                  <div className="flex items-center gap-1 text-xs text-gray-600">
                                    <Eye className="w-3 h-3" /> {property.views} views
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-gray-600">
                                    <Heart className="w-3 h-3" /> {property.likes} likes
                                  </div>
                                </div>
                              </div>
                              <Star className="w-5 h-5 text-yellow-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No favorite properties yet</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === "preferences" && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Search Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-gray-700 mb-2">Budget Range</div>
                        <div className="text-lg font-bold text-gray-900">{selectedTenant.preferences.budget}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-gray-700 mb-2">Property Type</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedTenant.preferences.propertyType.map((type, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-gray-700 mb-2">Preferred Locations</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedTenant.preferences.location.map((loc, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                              {loc}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-gray-700 mb-2">BHK Preference</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedTenant.preferences.bhk.map((bhk, idx) => (
                            <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                              {bhk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleToggleStatus(selectedTenant.id)}
                  className={`px-4 py-2 text-sm text-white rounded-lg ${selectedTenant.status === "active"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {selectedTenant.status === "active" ? "Deactivate Tenant" : "Activate Tenant"}
                </button>
                <button
                  onClick={() => handleAddCredits(selectedTenant.id, 149)}
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add Credits
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Bar */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <User className="w-4 h-4" />
          Add New Tenant
        </button>
        <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Send Bulk Message
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Credit Management
        </button>
        <button className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 flex items-center gap-2">
          <BarChart className="w-4 h-4" />
          Engagement Analytics
        </button>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </div>
  );
}

export default AdminTenants;