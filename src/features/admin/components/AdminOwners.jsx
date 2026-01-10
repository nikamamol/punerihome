import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  User,
  Building,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Shield,
  Clock,
  AlertCircle,
  Download,
  RefreshCw,
  ChevronDown,
  CreditCard,
  Package,
  Star,
  BarChart,
  FileText,
  MessageSquare,
  MapPin,
  Check,
  X,
  CalendarDays,
  Navigation,
  Target,
  Home,
} from "lucide-react";

function AdminOwners() {
  // Sample owners data
  const [owners, setOwners] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@email.com",
      phone: "+91 9876543210",
      joinDate: "2023-05-15",
      status: "active",
      verification: "verified",
      totalProperties: 15,
      activeProperties: 12,
      pendingProperties: 2,
      rejectedProperties: 1,
      totalEarnings: 450000,
      subscriptionPlan: "Premium",
      subscriptionEnds: "2024-06-30",
      subscriptionAmount: 4999,
      rating: 4.8,
      inquiries: 45,
      lastActive: "2024-02-22",
      address: "123 Main St, Pune",
      documents: ["Aadhar", "PAN", "Property Tax"],
      paymentMethod: "UPI",
      visitStatus: "visited",
      visitDate: "2024-02-15",
      nextVisitDate: "2024-03-15",
      visitNotes: "Property inspection completed, all documents verified",
      visitRating: 4.5,
      visitorName: "John Doe",
      visitorContact: "+91 9876543210",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@email.com",
      phone: "+91 9876543211",
      joinDate: "2023-07-20",
      status: "active",
      verification: "verified",
      totalProperties: 12,
      activeProperties: 10,
      pendingProperties: 1,
      rejectedProperties: 1,
      totalEarnings: 380000,
      subscriptionPlan: "Premium",
      subscriptionEnds: "2024-07-15",
      subscriptionAmount: 4999,
      rating: 4.7,
      inquiries: 38,
      lastActive: "2024-02-21",
      address: "456 Oak Ave, Pune",
      documents: ["Aadhar", "PAN"],
      paymentMethod: "Bank Transfer",
      visitStatus: "not_visited",
      visitDate: null,
      nextVisitDate: "2024-03-10",
      visitNotes: "",
      visitRating: null,
      visitorName: null,
      visitorContact: null,
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@email.com",
      phone: "+91 9876543212",
      joinDate: "2023-09-10",
      status: "active",
      verification: "pending",
      totalProperties: 10,
      activeProperties: 8,
      pendingProperties: 1,
      rejectedProperties: 1,
      totalEarnings: 320000,
      subscriptionPlan: "Basic",
      subscriptionEnds: "2024-03-25",
      subscriptionAmount: 1999,
      rating: 4.5,
      inquiries: 28,
      lastActive: "2024-02-20",
      address: "789 Pine Rd, Pune",
      documents: ["Aadhar"],
      paymentMethod: "UPI",
      visitStatus: "scheduled",
      visitDate: null,
      nextVisitDate: "2024-02-28",
      visitNotes: "Meeting scheduled for property verification",
      visitRating: null,
      visitorName: "Jane Smith",
      visitorContact: "+91 9876543211",
    },
    {
      id: 4,
      name: "Neha Gupta",
      email: "neha@email.com",
      phone: "+91 9876543213",
      joinDate: "2023-11-05",
      status: "inactive",
      verification: "verified",
      totalProperties: 8,
      activeProperties: 5,
      pendingProperties: 0,
      rejectedProperties: 3,
      totalEarnings: 210000,
      subscriptionPlan: "Basic",
      subscriptionEnds: "2024-02-28",
      subscriptionAmount: 1999,
      rating: 4.2,
      inquiries: 22,
      lastActive: "2024-01-15",
      address: "321 Elm St, Pune",
      documents: ["Aadhar", "PAN"],
      paymentMethod: "Bank Transfer",
      visitStatus: "visited",
      visitDate: "2024-01-10",
      nextVisitDate: "2024-04-10",
      visitNotes: "Owner needs to submit updated property documents",
      visitRating: 3.8,
      visitorName: "Robert Wilson",
      visitorContact: "+91 9876543212",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@email.com",
      phone: "+91 9876543214",
      joinDate: "2024-01-12",
      status: "active",
      verification: "verified",
      totalProperties: 6,
      activeProperties: 5,
      pendingProperties: 1,
      rejectedProperties: 0,
      totalEarnings: 180000,
      subscriptionPlan: "Premium",
      subscriptionEnds: "2024-08-10",
      subscriptionAmount: 4999,
      rating: 4.6,
      inquiries: 18,
      lastActive: "2024-02-22",
      address: "654 Maple Dr, Pune",
      documents: ["Aadhar", "PAN", "Electricity Bill"],
      paymentMethod: "UPI",
      visitStatus: "pending",
      visitDate: null,
      nextVisitDate: null,
      visitNotes: "",
      visitRating: null,
      visitorName: null,
      visitorContact: null,
    },
  ]);

  const [filteredOwners, setFilteredOwners] = useState(owners);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [visitFilter, setVisitFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [visitFormData, setVisitFormData] = useState({
    visitStatus: "visited",
    visitDate: new Date().toISOString().split('T')[0],
    nextVisitDate: "",
    visitNotes: "",
    visitRating: 5,
    visitorName: "",
    visitorContact: "",
  });

  // Filter and search owners
  useEffect(() => {
    let filtered = [...owners];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (owner) =>
          owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          owner.phone.includes(searchQuery)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((owner) => owner.status === statusFilter);
    }

    // Apply verification filter
    if (verificationFilter !== "all") {
      filtered = filtered.filter(
        (owner) => owner.verification === verificationFilter
      );
    }

    // Apply plan filter
    if (planFilter !== "all") {
      filtered = filtered.filter(
        (owner) => owner.subscriptionPlan === planFilter
      );
    }

    // Apply visit filter
    if (visitFilter !== "all") {
      filtered = filtered.filter((owner) => owner.visitStatus === visitFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.joinDate) - new Date(a.joinDate);
      } else if (sortBy === "oldest") {
        return new Date(a.joinDate) - new Date(b.joinDate);
      } else if (sortBy === "properties-high") {
        return b.totalProperties - a.totalProperties;
      } else if (sortBy === "properties-low") {
        return a.totalProperties - b.totalProperties;
      } else if (sortBy === "earnings-high") {
        return b.totalEarnings - a.totalEarnings;
      } else if (sortBy === "earnings-low") {
        return a.totalEarnings - b.totalEarnings;
      } else if (sortBy === "visit-newest") {
        return new Date(b.visitDate || 0) - new Date(a.visitDate || 0);
      } else if (sortBy === "visit-oldest") {
        return new Date(a.visitDate || 0) - new Date(b.visitDate || 0);
      }
      return 0;
    });

    setFilteredOwners(filtered);
  }, [
    searchQuery,
    statusFilter,
    verificationFilter,
    planFilter,
    visitFilter,
    sortBy,
    owners,
  ]);

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
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
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
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPlanBadge = (plan) => {
    const styles = {
      Premium: "bg-purple-100 text-purple-800",
      Basic: "bg-blue-100 text-blue-800",
      Free: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[plan]}`}
      >
        {plan}
      </span>
    );
  };

  // Updated Visit Status Badge with better design
  const getVisitStatusBadge = (status) => {
    const config = {
      visited: {
        bg: "bg-gradient-to-r from-green-100 to-emerald-100",
        text: "text-green-800",
        border: "border border-green-200",
        icon: CheckCircle,
        label: "Visited",
      },
      scheduled: {
        bg: "bg-gradient-to-r from-blue-100 to-cyan-100",
        text: "text-blue-800",
        border: "border border-blue-200",
        icon: CalendarDays,
        label: "Scheduled",
      },
      pending: {
        bg: "bg-gradient-to-r from-yellow-100 to-amber-100",
        text: "text-yellow-800",
        border: "border border-yellow-200",
        icon: Clock,
        label: "Pending",
      },
      not_visited: {
        bg: "bg-gradient-to-r from-gray-100 to-slate-100",
        text: "text-gray-800",
        border: "border border-gray-200",
        icon: XCircle,
        label: "Not Visited",
      },
    };

    const { bg, text, border, icon: Icon, label } = config[status] || config.not_visited;

    return (
      <div className={`${bg} ${text} ${border} px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    );
  };

  const handleViewOwner = (owner) => {
    setSelectedOwner(owner);
    setShowModal(true);
    setActiveTab("overview");
  };

  const handleEditOwner = (owner) => {
    setSelectedOwner(owner);
    setShowModal(true);
    setActiveTab("overview");
  };

  const handleToggleStatus = (ownerId) => {
    setOwners(
      owners.map((owner) =>
        owner.id === ownerId
          ? {
              ...owner,
              status: owner.status === "active" ? "inactive" : "active",
            }
          : owner
      )
    );
  };

  const handleToggleVerification = (ownerId) => {
    setOwners(
      owners.map((owner) =>
        owner.id === ownerId
          ? {
              ...owner,
              verification:
                owner.verification === "verified" ? "pending" : "verified",
            }
          : owner
      )
    );
  };

  const handleOpenVisitModal = (owner) => {
    setSelectedOwner(owner);
    setVisitFormData({
      visitStatus: owner.visitStatus,
      visitDate: owner.visitDate || new Date().toISOString().split('T')[0],
      nextVisitDate: owner.nextVisitDate || "",
      visitNotes: owner.visitNotes || "",
      visitRating: owner.visitRating || 5,
      visitorName: owner.visitorName || "",
      visitorContact: owner.visitorContact || "",
    });
    setShowVisitModal(true);
  };

  const handleUpdateVisitStatus = () => {
    if (!selectedOwner) return;

    setOwners(
      owners.map((owner) =>
        owner.id === selectedOwner.id
          ? {
              ...owner,
              ...visitFormData,
              lastActive: new Date().toISOString().split('T')[0],
            }
          : owner
      )
    );
    setShowVisitModal(false);
    setSelectedOwner(null);
  };

  const handleUpdateSubscription = (ownerId, newPlan, newEndDate) => {
    setOwners(
      owners.map((owner) =>
        owner.id === ownerId
          ? {
              ...owner,
              subscriptionPlan: newPlan,
              subscriptionEnds: newEndDate,
              subscriptionAmount: newPlan === "Premium" ? 4999 : 1999,
            }
          : owner
      )
    );
    setShowModal(false);
  };

  const stats = {
    total: owners.length,
    active: owners.filter((o) => o.status === "active").length,
    verified: owners.filter((o) => o.verification === "verified").length,
    premium: owners.filter((o) => o.subscriptionPlan === "Premium").length,
    basic: owners.filter((o) => o.subscriptionPlan === "Basic").length,
    totalProperties: owners.reduce(
      (sum, owner) => sum + owner.totalProperties,
      0
    ),
    totalEarnings: owners.reduce((sum, owner) => sum + owner.totalEarnings, 0),
    avgRating: (
      owners.reduce((sum, owner) => sum + owner.rating, 0) / owners.length
    ).toFixed(1),
    // Visit stats
    visited: owners.filter((o) => o.visitStatus === "visited").length,
    scheduled: owners.filter((o) => o.visitStatus === "scheduled").length,
    pending: owners.filter((o) => o.visitStatus === "pending").length,
    notVisited: owners.filter((o) => o.visitStatus === "not_visited").length,
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Owner Management</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage all property owners, subscriptions, and property visits
        </p>
      </div>

      {/* Stats Cards - Updated with visit stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-600">Total Owners</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">{stats.active}</div>
          <div className="text-xs text-green-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-700">
            {stats.verified}
          </div>
          <div className="text-xs text-blue-600">Verified</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="text-xl font-bold text-purple-700">
            {stats.premium}
          </div>
          <div className="text-xs text-purple-600">Premium</div>
        </div>
        
        {/* Visit Stats Cards */}
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">{stats.visited}</div>
          <div className="text-xs text-green-600">Visited</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-700">{stats.scheduled}</div>
          <div className="text-xs text-blue-600">Scheduled</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-yellow-200">
          <div className="text-xl font-bold text-yellow-700">{stats.pending}</div>
          <div className="text-xs text-yellow-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xl font-bold text-gray-700">{stats.notVisited}</div>
          <div className="text-xs text-gray-600">Not Visited</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-orange-200">
          <div className="text-xl font-bold text-orange-700">
            {stats.totalProperties}
          </div>
          <div className="text-xs text-orange-600">Properties</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-pink-200">
          <div className="text-xl font-bold text-pink-700">
            {stats.avgRating}
          </div>
          <div className="text-xs text-pink-600">Avg Rating</div>
        </div>
      </div>

      {/* Filters and Search - Updated with visit filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
            </select>
          </div>

          {/* Plan Filter */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
            >
              <option value="all">All Plans</option>
              <option value="Premium">Premium</option>
              <option value="Basic">Basic</option>
            </select>
          </div>

          {/* Visit Filter */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={visitFilter}
              onChange={(e) => setVisitFilter(e.target.value)}
            >
              <option value="all">All Visit Status</option>
              <option value="visited">Visited</option>
              <option value="scheduled">Scheduled</option>
              <option value="pending">Pending</option>
              <option value="not_visited">Not Visited</option>
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
              <option value="properties-high">Properties: High to Low</option>
              <option value="properties-low">Properties: Low to High</option>
              <option value="earnings-high">Earnings: High to Low</option>
              <option value="earnings-low">Earnings: Low to High</option>
              <option value="visit-newest">Visit: Newest First</option>
              <option value="visit-oldest">Visit: Oldest First</option>
            </select>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>

          <button className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:text-green-700">
            <Download className="w-4 h-4" />
            Export Owners
          </button>

          <button className="flex items-center gap-1 px-3 py-1 text-sm text-purple-600 hover:text-purple-700">
            <BarChart className="w-4 h-4" />
            Analytics
          </button>
        </div>
      </div>

      {/* Owners Table - Updated with better visit status design */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Owner
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Properties
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Earnings
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Subscription
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Visit Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOwners.map((owner) => (
                <tr key={owner.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {owner.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {owner.email}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {owner.phone}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-900">
                          {owner.totalProperties}
                        </span>
                        <span className="text-xs text-gray-500">
                          properties
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="text-green-600">
                          {owner.activeProperties} active
                        </span>
                        <span className="mx-1">•</span>
                        <span className="text-yellow-600">
                          {owner.pendingProperties} pending
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">
                      {formatCurrency(owner.totalEarnings)}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {owner.rating} rating
                    </div>
                    <div className="text-xs text-gray-500">
                      {owner.inquiries} inquiries
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div>
                      {getPlanBadge(owner.subscriptionPlan)}
                      <div className="text-xs text-gray-600 mt-1">
                        ₹{owner.subscriptionAmount}
                      </div>
                      <div className="text-xs text-gray-500">
                        Ends:{" "}
                        {new Date(owner.subscriptionEnds).toLocaleDateString()}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      {getStatusBadge(owner.status)}
                      {getVerificationBadge(owner.verification)}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      <div onClick={() => handleOpenVisitModal(owner)} className="cursor-pointer">
                        {getVisitStatusBadge(owner.visitStatus)}
                      </div>
                      
                      {/* Visit Details */}
                      <div className="text-xs text-gray-600">
                        {owner.visitStatus === "visited" && owner.visitDate && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-green-600" />
                              <span>{new Date(owner.visitDate).toLocaleDateString()}</span>
                            </div>
                            {owner.visitRating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span>{owner.visitRating}/5</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {owner.visitStatus === "scheduled" && owner.nextVisitDate && (
                          <div className="flex items-center gap-1 text-blue-600">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(owner.nextVisitDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        
                        {owner.visitStatus === "pending" && (
                          <div className="text-yellow-600">
                            <Clock className="w-3 h-3 inline mr-1" />
                            Action Required
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewOwner(owner)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOpenVisitModal(owner)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                        title="Update Visit"
                      >
                        <Navigation className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleToggleStatus(owner.id)}
                        className={`p-1.5 rounded ${
                          owner.status === "active"
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                        title={
                          owner.status === "active" ? "Deactivate" : "Activate"
                        }
                      >
                        {owner.status === "active" ? (
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

          {filteredOwners.length === 0 && (
            <div className="py-12 text-center">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No owners found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try changing your filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Owner Details Modal */}
      {showModal && selectedOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {selectedOwner.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedOwner.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedOwner.status)}
                  {getVerificationBadge(selectedOwner.verification)}
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedOwner(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-4 overflow-x-auto">
                  {["overview", "visit-details", "properties", "payments", "documents"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.replace("-", " ").charAt(0).toUpperCase() + tab.replace("-", " ").slice(1)}
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
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Contact Information
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">
                              {selectedOwner.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">
                              {selectedOwner.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">
                              {selectedOwner.address}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Subscription Details
                        </h4>
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-bold text-gray-900">
                                {selectedOwner.subscriptionPlan} Plan
                              </div>
                              <div className="text-sm text-gray-600">
                                ₹{selectedOwner.subscriptionAmount} per month
                              </div>
                            </div>
                            <Package className="w-8 h-8 text-purple-600" />
                          </div>
                          <div className="mt-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Next Billing:
                              </span>
                              <span className="font-medium">
                                {new Date(
                                  selectedOwner.subscriptionEnds
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-gray-600">
                                Payment Method:
                              </span>
                              <span className="font-medium">
                                {selectedOwner.paymentMethod}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Performance Metrics
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xl font-bold text-gray-900">
                              {selectedOwner.totalProperties}
                            </div>
                            <div className="text-xs text-gray-600">
                              Total Properties
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xl font-bold text-gray-900">
                              {formatCurrency(selectedOwner.totalEarnings)}
                            </div>
                            <div className="text-xs text-gray-600">
                              Total Earnings
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xl font-bold text-gray-900">
                              {selectedOwner.rating}
                            </div>
                            <div className="text-xs text-gray-600">Rating</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xl font-bold text-gray-900">
                              {selectedOwner.inquiries}
                            </div>
                            <div className="text-xs text-gray-600">
                              Inquiries
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Activity
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Joined Date:</span>
                            <span className="font-medium">
                              {new Date(
                                selectedOwner.joinDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Last Active:</span>
                            <span className="font-medium">
                              {new Date(
                                selectedOwner.lastActive
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visit Details Tab */}
                {activeTab === "visit-details" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-sm font-medium text-gray-700">
                        Property Visit Details
                      </h4>
                      <button
                        onClick={() => handleOpenVisitModal(selectedOwner)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                      >
                        Update Visit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                          <h5 className="font-bold text-gray-900 mb-3">Current Visit Status</h5>
                          <div className="flex items-center justify-between">
                            {getVisitStatusBadge(selectedOwner.visitStatus)}
                            <div className="text-right">
                              <div className="text-xs text-gray-600">Last Updated</div>
                              <div className="text-sm font-medium">
                                {selectedOwner.lastActive ? 
                                  new Date(selectedOwner.lastActive).toLocaleDateString() : 
                                  "N/A"}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs text-gray-600">Visit Date</div>
                              <div className="font-medium">
                                {selectedOwner.visitDate ? 
                                  new Date(selectedOwner.visitDate).toLocaleDateString() : 
                                  "Not visited yet"}
                              </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-xs text-gray-600">Next Visit Date</div>
                              <div className="font-medium">
                                {selectedOwner.nextVisitDate ? 
                                  new Date(selectedOwner.nextVisitDate).toLocaleDateString() : 
                                  "Not scheduled"}
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Visitor Information</div>
                            <div className="font-medium">
                              {selectedOwner.visitorName || "Not specified"}
                            </div>
                            {selectedOwner.visitorContact && (
                              <div className="text-sm text-gray-600">
                                {selectedOwner.visitorContact}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-bold text-gray-900 mb-3">Visit Rating</h5>
                          <div className="flex items-center gap-2">
                            {selectedOwner.visitRating ? (
                              <>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-5 h-5 ${
                                        star <= selectedOwner.visitRating
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-lg font-bold text-gray-900">
                                  {selectedOwner.visitRating}/5
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-500">No rating yet</span>
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-bold text-gray-900 mb-3">Visit Notes</h5>
                          <div className="text-gray-700">
                            {selectedOwner.visitNotes ? (
                              <p>{selectedOwner.visitNotes}</p>
                            ) : (
                              <p className="text-gray-500 italic">No notes available</p>
                            )}
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                          <h5 className="font-bold text-gray-900 mb-2">Quick Actions</h5>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                setVisitFormData({
                                  ...visitFormData,
                                  visitStatus: "visited",
                                  visitDate: new Date().toISOString().split('T')[0]
                                });
                                handleUpdateVisitStatus();
                              }}
                              className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                            >
                              Mark as Visited
                            </button>
                            <button
                              onClick={() => {
                                setVisitFormData({
                                  ...visitFormData,
                                  visitStatus: "scheduled",
                                  nextVisitDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                                });
                                handleUpdateVisitStatus();
                              }}
                              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                              Schedule Visit
                            </button>
                            <button
                              onClick={() => {
                                setVisitFormData({
                                  ...visitFormData,
                                  visitStatus: "pending"
                                });
                                handleUpdateVisitStatus();
                              }}
                              className="px-3 py-1.5 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                            >
                              Mark Pending
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Properties Tab */}
                {activeTab === "properties" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-700">
                        Owner Properties
                      </h4>
                      <button className="text-xs text-blue-600 hover:text-blue-700">
                        View All Properties →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-lg font-bold text-blue-900">
                          {selectedOwner.activeProperties}
                        </div>
                        <div className="text-sm text-blue-700">
                          Active Properties
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="text-lg font-bold text-yellow-900">
                          {selectedOwner.pendingProperties}
                        </div>
                        <div className="text-sm text-yellow-700">
                          Pending Approval
                        </div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-lg font-bold text-red-900">
                          {selectedOwner.rejectedProperties}
                        </div>
                        <div className="text-sm text-red-700">Rejected</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-lg font-bold text-green-900">
                          {selectedOwner.totalProperties}
                        </div>
                        <div className="text-sm text-green-700">
                          Total Listed
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payments Tab */}
                {activeTab === "payments" && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                      Payment History
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">
                            Subscription Renewal
                          </div>
                          <div className="text-xs text-gray-500">Feb 2024</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">
                            ₹{selectedOwner.subscriptionAmount}
                          </div>
                          <div className="text-xs text-green-600">Paid</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">
                            Earnings Payout
                          </div>
                          <div className="text-xs text-gray-500">Jan 2024</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">
                            ₹{formatCurrency(selectedOwner.totalEarnings * 0.8)}
                          </div>
                          <div className="text-xs text-green-600">Paid</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === "documents" && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                      Submitted Documents
                    </h4>
                    <div className="space-y-3">
                      {selectedOwner.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {doc}
                              </div>
                              <div className="text-xs text-gray-500">
                                Uploaded on{" "}
                                {new Date(
                                  selectedOwner.joinDate
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-700 text-sm">
                              Verify
                            </button>
                          </div>
                        </div>
                      ))}
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
                  onClick={() => handleToggleStatus(selectedOwner.id)}
                  className={`px-4 py-2 text-sm text-white rounded-lg ${
                    selectedOwner.status === "active"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {selectedOwner.status === "active"
                    ? "Deactivate Owner"
                    : "Activate Owner"}
                </button>
                <button
                  onClick={() =>
                    handleUpdateSubscription(
                      selectedOwner.id,
                      selectedOwner.subscriptionPlan === "Premium"
                        ? "Basic"
                        : "Premium",
                      "2024-12-31"
                    )
                  }
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visit Update Modal */}
      {showVisitModal && selectedOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Update Visit Status
                  </h3>
                  <p className="text-sm text-gray-600">{selectedOwner.name}</p>
                </div>
                <button
                  onClick={() => {
                    setShowVisitModal(false);
                    setSelectedOwner(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Visit Status Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Visit Status
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "visited", label: "Visited", icon: CheckCircle, color: "green" },
                      { value: "scheduled", label: "Scheduled", icon: CalendarDays, color: "blue" },
                      { value: "pending", label: "Pending", icon: Clock, color: "yellow" },
                      { value: "not_visited", label: "Not Visited", icon: XCircle, color: "gray" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setVisitFormData({ ...visitFormData, visitStatus: option.value })}
                        className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 ${
                          visitFormData.visitStatus === option.value
                            ? `border-${option.color}-500 bg-${option.color}-50`
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <option.icon className={`w-5 h-5 text-${option.color}-600`} />
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visit Date */}
                {visitFormData.visitStatus === "visited" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visit Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                      value={visitFormData.visitDate}
                      onChange={(e) => setVisitFormData({ ...visitFormData, visitDate: e.target.value })}
                    />
                  </div>
                )}

                {/* Next Visit Date */}
                {visitFormData.visitStatus === "scheduled" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Scheduled Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                      value={visitFormData.nextVisitDate}
                      onChange={(e) => setVisitFormData({ ...visitFormData, nextVisitDate: e.target.value })}
                    />
                  </div>
                )}

                {/* Visitor Information */}
                {(visitFormData.visitStatus === "visited" || visitFormData.visitStatus === "scheduled") && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Visitor Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Enter visitor name"
                        value={visitFormData.visitorName}
                        onChange={(e) => setVisitFormData({ ...visitFormData, visitorName: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Visitor Contact
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Enter contact number"
                        value={visitFormData.visitorContact}
                        onChange={(e) => setVisitFormData({ ...visitFormData, visitorContact: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* Visit Rating */}
                {visitFormData.visitStatus === "visited" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visit Rating
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setVisitFormData({ ...visitFormData, visitRating: star })}
                            className={`p-1 ${
                              star <= visitFormData.visitRating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            <Star className="w-6 h-6" />
                          </button>
                        ))}
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {visitFormData.visitRating}/5
                      </span>
                    </div>
                  </div>
                )}

                {/* Visit Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visit Notes
                  </label>
                  <textarea
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                    rows="3"
                    placeholder="Enter visit observations, feedback, etc."
                    value={visitFormData.visitNotes}
                    onChange={(e) => setVisitFormData({ ...visitFormData, visitNotes: e.target.value })}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowVisitModal(false);
                    setSelectedOwner(null);
                  }}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateVisitStatus}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Visit Status
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
          Add New Owner
        </button>
        <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Navigation className="w-4 h-4" />
          Schedule Visit
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Manage Subscriptions
        </button>
        <button className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </div>
  );
}

export default AdminOwners;