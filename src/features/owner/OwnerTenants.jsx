import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Users,
  Home,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Send,
  MessageSquare,
  DollarSign,
  CreditCard,
  FileText,
  Building,
  UserCheck,
  Shield,
  ChevronRight,
  ChevronDown,
  Star,
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  Bell,
  Wallet,
  Key,
  User,
  Home as HomeIcon,
  Building as BuildingIcon,
} from "lucide-react";

const OwnerTenants = () => {
  // State management
  const [activeTab, setActiveTab] = useState("properties"); // properties, tenants
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Current logged in owner data
  const currentOwner = {
    id: 1,
    name: "Rajesh Sharma",
    email: "rajesh.sharma@email.com",
    phone: "+91 9876543210",
    address: "Hinjewadi, Pune",
    joinedDate: "2023-01-15",
    status: "active",
    documents: 4,
    bankDetails: {
      accountName: "Rajesh Sharma",
      accountNumber: "XXXXXX1234",
      bankName: "HDFC Bank",
      ifsc: "HDFC0000123",
    },
  };

  // Owner's properties
  const ownerProperties = [
    {
      id: 1,
      name: "2 BHK Apartment",
      address: "Hinjewadi Phase 1, Pune",
      type: "Apartment",
      bhk: "2 BHK",
      rent: 25000,
      deposit: 100000,
      tenant: "Rahul Verma",
      tenantPhone: "+91 9876543220",
      status: "occupied", // occupied, vacant, maintenance
      area: "950 sq.ft",
      amenities: ["Parking", "Gym", "Swimming Pool"],
      listedDate: "2023-12-01",
      monthlyRent: 25000,
      lastPaymentDate: "2024-02-05",
      nextPaymentDate: "2024-03-05",
    },
    {
      id: 2,
      name: "1 BHK Studio",
      address: "Kharadi, Pune",
      type: "Studio",
      bhk: "1 BHK",
      rent: 18000,
      deposit: 72000,
      tenant: "Neha Kapoor",
      tenantPhone: "+91 9876543225",
      status: "occupied",
      area: "550 sq.ft",
      amenities: ["Furnished", "Parking"],
      listedDate: "2024-01-15",
      monthlyRent: 18000,
      lastPaymentDate: "2024-02-10",
      nextPaymentDate: "2024-03-10",
    },
    {
      id: 3,
      name: "3 BHK Apartment",
      address: "Wakad, Pune",
      type: "Apartment",
      bhk: "3 BHK",
      rent: 35000,
      deposit: 140000,
      tenant: null,
      tenantPhone: null,
      status: "vacant",
      area: "1200 sq.ft",
      amenities: ["Parking", "Lift", "Security"],
      listedDate: "2024-02-01",
      monthlyRent: 35000,
      lastPaymentDate: null,
      nextPaymentDate: null,
    },
  ];

  // Owner's tenants
  const ownerTenants = [
    {
      id: 1,
      name: "Rahul Verma",
      email: "rahul.verma@email.com",
      phone: "+91 9876543220",
      property: "2 BHK Apartment, Hinjewadi",
      propertyId: 1,
      rent: 25000,
      deposit: 100000,
      moveInDate: "2024-01-01",
      leaseEndDate: "2024-12-31",
      status: "active", // active, pending, overdue, vacated
      documents: 3,
      notes: "IT professional, single occupant. Pays rent on time.",
      tags: ["IT Professional", "Single", "Prompt Payer"],
      paymentHistory: [
        {
          month: "Jan 2024",
          amount: 25000,
          status: "paid",
          date: "2024-01-05",
        },
        {
          month: "Feb 2024",
          amount: 25000,
          status: "paid",
          date: "2024-02-03",
        },
        {
          month: "Mar 2024",
          amount: 25000,
          status: "pending",
          date: "2024-03-01",
        },
      ],
      emergencyContact: {
        name: "Rohan Verma",
        phone: "+91 9876543290",
        relationship: "Brother",
      },
    },
    {
      id: 2,
      name: "Neha Kapoor",
      email: "neha.kapoor@email.com",
      phone: "+91 9876543225",
      property: "1 BHK Studio, Kharadi",
      propertyId: 2,
      rent: 18000,
      deposit: 72000,
      moveInDate: "2024-01-15",
      leaseEndDate: "2025-01-14",
      status: "active",
      documents: 4,
      notes: "Working professional, regular with payments.",
      tags: ["Working", "Professional", "Regular"],
      paymentHistory: [
        {
          month: "Jan 2024",
          amount: 18000,
          status: "paid",
          date: "2024-01-12",
        },
        {
          month: "Feb 2024",
          amount: 18000,
          status: "paid",
          date: "2024-02-10",
        },
        {
          month: "Mar 2024",
          amount: 18000,
          status: "pending",
          date: "2024-03-10",
        },
      ],
      emergencyContact: {
        name: "Rahul Kapoor",
        phone: "+91 9876543291",
        relationship: "Husband",
      },
    },
  ];

  // Filter data based on search
  const filteredProperties = ownerProperties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.tenant &&
        property.tenant.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredTenants = ownerTenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistics for current owner
  const stats = {
    totalProperties: ownerProperties.length,
    occupiedProperties: ownerProperties.filter((p) => p.status === "occupied")
      .length,
    vacantProperties: ownerProperties.filter((p) => p.status === "vacant")
      .length,
    totalTenants: ownerTenants.length,
    activeTenants: ownerTenants.filter((t) => t.status === "active").length,
    monthlyRent: ownerProperties.reduce((sum, p) => sum + (p.rent || 0), 0),
    totalDeposit: ownerProperties.reduce((sum, p) => sum + (p.deposit || 0), 0),
    pendingRent: ownerTenants.reduce((sum, t) => {
      const pending =
        t.paymentHistory
          ?.filter((p) => p.status === "pending")
          .reduce((s, p) => s + p.amount, 0) || 0;
      return sum + pending;
    }, 0),
  };

  // Status configuration
  const tenantStatusConfig = {
    active: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
      label: "Active",
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
      label: "Pending",
    },
    overdue: {
      color: "bg-red-100 text-red-800",
      icon: AlertCircle,
      label: "Rent Overdue",
    },
    vacated: {
      color: "bg-gray-100 text-gray-800",
      icon: XCircle,
      label: "Vacated",
    },
  };

  const propertyStatusConfig = {
    occupied: {
      color: "bg-green-100 text-green-800",
      icon: UserCheck,
      label: "Occupied",
    },
    vacant: { color: "bg-blue-100 text-blue-800", icon: Home, label: "Vacant" },
    maintenance: {
      color: "bg-yellow-100 text-yellow-800",
      icon: AlertCircle,
      label: "Maintenance",
    },
  };

  const paymentStatusConfig = {
    paid: { color: "bg-green-100 text-green-800", label: "Paid" },
    pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    overdue: { color: "bg-red-100 text-red-800", label: "Overdue" },
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
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Render status badge
  const renderStatusBadge = (status, config) => {
    const statusConfig = config[status];
    if (!statusConfig) return null;
    const Icon = statusConfig.icon;
    return (
      <span
        className={`px-3 py-1.5 text-xs rounded-full flex items-center gap-1 ${statusConfig.color}`}
      >
        <Icon className="w-3 h-3" />
        {statusConfig.label}
      </span>
    );
  };

  // Render payment status badge
  const renderPaymentStatusBadge = (status) => {
    const config = paymentStatusConfig[status];
    if (!config) return null;
    return (
      <span className={`px-2 py-1 text-xs rounded ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Handle actions
  const handleSendMessage = (person) => {
    setShowMessageModal(true);
    alert(`Opening chat with ${person.name}`);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleViewDetails = (type, item) => {
    if (type === "tenant") setSelectedTenant(item);
    if (type === "property") setSelectedProperty(item);
  };

  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      alert(`${type} with ID ${id} deleted`);
    }
  };

  // Mobile header component
  const MobileHeader = () => (
    <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {selectedTenant || selectedProperty ? (
            <button
              onClick={() => {
                setSelectedTenant(null);
                setSelectedProperty(null);
              }}
              className="p-2"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          )}
          <div>
            <h1 className="font-bold text-gray-900">
              {selectedTenant
                ? "Tenant Details"
                : selectedProperty
                ? "Property Details"
                : "My Properties & Tenants"}
            </h1>
            <p className="text-xs text-gray-500">
              {selectedTenant
                ? selectedTenant.name
                : selectedProperty
                ? selectedProperty.name
                : `${currentOwner.name}'s Dashboard`}
            </p>
          </div>
        </div>

        {!selectedTenant && !selectedProperty && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-gray-100"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Stats */}
      {!selectedTenant && !selectedProperty && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-blue-50 p-2 rounded-lg">
            <div className="text-xs text-blue-600">Properties</div>
            <div className="font-bold text-sm">{stats.totalProperties}</div>
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <div className="text-xs text-green-600">Tenants</div>
            <div className="font-bold text-sm">{stats.totalTenants}</div>
          </div>
          <div className="bg-purple-50 p-2 rounded-lg">
            <div className="text-xs text-purple-600">Monthly Rent</div>
            <div className="font-bold text-sm">
              {formatCurrency(stats.monthlyRent)}
            </div>
          </div>
          <div className="bg-yellow-50 p-2 rounded-lg">
            <div className="text-xs text-yellow-600">Pending</div>
            <div className="font-bold text-sm">
              {formatCurrency(stats.pendingRent)}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Mobile filters
  const MobileFilters = () =>
    showFilters &&
    !selectedTenant &&
    !selectedProperty && (
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {["properties", "tenants"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    );

  // Owner Profile Card for Mobile
  const MobileOwnerProfile = () => (
    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">
            {currentOwner.name}
          </h3>
          <p className="text-sm text-gray-600">Property Owner</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => handleCall(currentOwner.phone)}
          className="flex items-center justify-center gap-2 p-2 bg-blue-50 text-blue-700 rounded-lg"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">Call</span>
        </button>
        <button
          onClick={() => handleEmail(currentOwner.email)}
          className="flex items-center justify-center gap-2 p-2 bg-gray-50 text-gray-700 rounded-lg"
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">Email</span>
        </button>
      </div>

      <div className="text-sm text-gray-600">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4" />
          {currentOwner.address}
        </div>
        <div>Joined: {formatDate(currentOwner.joinedDate)}</div>
      </div>
    </div>
  );

  // Tenant detail view for mobile
  const MobileTenantDetail = ({ tenant }) => (
    <div className="p-4">
      <button
        onClick={() => setSelectedTenant(null)}
        className="flex items-center gap-2 text-blue-600 mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Tenants
      </button>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        {/* Tenant Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{tenant.name}</h3>
              <div className="mt-1">
                {renderStatusBadge(tenant.status, tenantStatusConfig)}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => handleCall(tenant.phone)}
            className="flex items-center justify-center gap-2 p-2 bg-blue-50 text-blue-700 rounded-lg"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">Call</span>
          </button>
          <button
            onClick={() => handleEmail(tenant.email)}
            className="flex items-center justify-center gap-2 p-2 bg-gray-50 text-gray-700 rounded-lg"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Property Details</div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">
                {tenant.property}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500">Monthly Rent</div>
              <div className="text-lg font-bold text-gray-900">
                {formatCurrency(tenant.rent)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Security Deposit</div>
              <div className="text-lg font-bold text-gray-900">
                {formatCurrency(tenant.deposit)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Move-in Date</div>
              <div className="text-lg font-bold text-gray-900">
                {formatDate(tenant.moveInDate)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Lease End</div>
              <div className="text-lg font-bold text-gray-900">
                {formatDate(tenant.leaseEndDate)}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          {tenant.emergencyContact && (
            <div>
              <div className="text-xs text-gray-500 mb-1">
                Emergency Contact
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900">
                  {tenant.emergencyContact.name}
                </div>
                <div className="text-sm text-gray-600">
                  {tenant.emergencyContact.phone}
                </div>
                <div className="text-sm text-gray-600">
                  {tenant.emergencyContact.relationship}
                </div>
              </div>
            </div>
          )}

          {/* Payment History */}
          {tenant.paymentHistory && tenant.paymentHistory.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 mb-2">Payment History</div>
              <div className="space-y-2">
                {tenant.paymentHistory.map((payment, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div>
                      <div className="text-sm font-medium">{payment.month}</div>
                      <div className="text-xs text-gray-600">
                        {formatDate(payment.date)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">
                        {formatCurrency(payment.amount)}
                      </div>
                      {renderPaymentStatusBadge(payment.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => handleSendMessage(tenant)}
              className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Message
            </button>
            <button
              onClick={() => handleDelete("tenant", tenant.id)}
              className="px-4 py-2.5 bg-red-100 text-red-700 text-sm font-medium rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Property detail view for mobile
  const MobilePropertyDetail = ({ property }) => (
    <div className="p-4">
      <button
        onClick={() => setSelectedProperty(null)}
        className="flex items-center gap-2 text-blue-600 mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Properties
      </button>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        {/* Property Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                property.status === "occupied" ? "bg-green-100" : "bg-blue-100"
              }`}
            >
              <HomeIcon
                className={`w-6 h-6 ${
                  property.status === "occupied"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {property.name}
              </h3>
              <div className="mt-1">
                {renderStatusBadge(property.status, propertyStatusConfig)}
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Address</div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">{property.address}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500">Type</div>
              <div className="text-lg font-bold text-gray-900">
                {property.type}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Size</div>
              <div className="text-lg font-bold text-gray-900">
                {property.area}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Monthly Rent</div>
              <div className="text-lg font-bold text-gray-900">
                {formatCurrency(property.rent)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Deposit</div>
              <div className="text-lg font-bold text-gray-900">
                {formatCurrency(property.deposit)}
              </div>
            </div>
          </div>

          {/* Tenant Info */}
          {property.tenant && (
            <div>
              <div className="text-xs text-gray-500 mb-1">Current Tenant</div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900">
                  {property.tenant}
                </div>
                <div className="text-sm text-gray-600">
                  {property.tenantPhone}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Last Payment: {formatDate(property.lastPaymentDate)}
                </div>
                <div className="text-sm text-gray-600">
                  Next Payment: {formatDate(property.nextPaymentDate)}
                </div>
              </div>
            </div>
          )}

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 mb-2">Amenities</div>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200">
            {property.tenant ? (
              <button
                onClick={() =>
                  handleSendMessage({
                    name: property.tenant,
                    phone: property.tenantPhone,
                  })
                }
                className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Message Tenant
              </button>
            ) : (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg"
              >
                Add Tenant
              </button>
            )}
            <button className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
              Edit Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // List item components
  const PropertyListItem = ({ property }) => (
    <div
      onClick={() => handleViewDetails("property", property)}
      className="bg-white rounded-xl p-4 shadow-sm cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              property.status === "occupied" ? "bg-green-100" : "bg-blue-100"
            }`}
          >
            <HomeIcon
              className={`w-5 h-5 ${
                property.status === "occupied"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{property.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-600">
                {property.bhk} • {property.area}
              </span>
              {renderStatusBadge(property.status, propertyStatusConfig)}
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {property.tenant || "Vacant"}
        </div>
        <div className="text-sm font-bold text-gray-900">
          {formatCurrency(property.rent)}/month
        </div>
      </div>
    </div>
  );

  const TenantListItem = ({ tenant }) => (
    <div
      onClick={() => handleViewDetails("tenant", tenant)}
      className="bg-white rounded-xl p-4 shadow-sm cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{tenant.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-600">
                {tenant.property.split(",")[0]}
              </span>
              {renderStatusBadge(tenant.status, tenantStatusConfig)}
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Rent: {formatCurrency(tenant.rent)}
        </div>
        <div className="text-sm font-bold text-gray-900">
          {formatDate(tenant.leaseEndDate)}
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = ({ type }) => (
    <div className="text-center py-12 px-4">
      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
        {type === "properties" ? (
          <HomeIcon className="w-8 h-8 text-gray-400" />
        ) : (
          <User className="w-8 h-8 text-gray-400" />
        )}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No {type} found
      </h3>
      <p className="text-gray-600 text-sm">
        {searchTerm ? "Try adjusting your search" : `No ${type} added yet`}
      </p>
      {type === "properties" && (
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg"
        >
          Add Your First Property
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader />
      <MobileFilters />

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {selectedTenant ? (
          <MobileTenantDetail tenant={selectedTenant} />
        ) : selectedProperty ? (
          <MobilePropertyDetail property={selectedProperty} />
        ) : (
          <div className="p-2">
            {/* Owner Profile */}
            <MobileOwnerProfile />

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              {["properties", "tenants"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {tab === "properties" ? "My Properties" : "My Tenants"}
                </button>
              ))}
            </div>

            {/* Content */}
            {activeTab === "properties" && (
              <>
                {filteredProperties.length > 0 ? (
                  <div className="space-y-2">
                    {filteredProperties.map((property) => (
                      <PropertyListItem key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <EmptyState type="properties" />
                )}
              </>
            )}

            {activeTab === "tenants" && (
              <>
                {filteredTenants.length > 0 ? (
                  <div className="space-y-2">
                    {filteredTenants.map((tenant) => (
                      <TenantListItem key={tenant.id} tenant={tenant} />
                    ))}
                  </div>
                ) : (
                  <EmptyState type="tenants" />
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Property Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Welcome back, {currentOwner.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-gray-600">Account Status</div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.5 rounded">
                Active
              </span>
            </div>
            <button className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Property
            </button>
          </div>
        </div>

        {/* Owner Profile & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Owner Profile Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {currentOwner.name}
                </h3>
                <p className="text-sm text-gray-600">Property Owner</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Verified
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {currentOwner.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {currentOwner.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {currentOwner.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  Joined: {formatDate(currentOwner.joinedDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <HomeIcon className="w-8 h-8 text-blue-600" />
                  <BuildingIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.totalProperties}
                </div>
                <div className="text-sm text-gray-600">Total Properties</div>
                <div className="text-xs text-green-600 mt-2">
                  {stats.occupiedProperties} occupied
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <User className="w-8 h-8 text-green-600" />
                  <Key className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.totalTenants}
                </div>
                <div className="text-sm text-gray-600">Total Tenants</div>
                <div className="text-xs text-green-600 mt-2">
                  {stats.activeTenants} active
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                  <Wallet className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(stats.monthlyRent)}
                </div>
                <div className="text-sm text-gray-600">Monthly Income</div>
                <div className="text-xs text-red-600 mt-2">
                  {formatCurrency(stats.pendingRent)} pending
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <Shield className="w-8 h-8 text-yellow-600" />
                  <CreditCard className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(stats.totalDeposit)}
                </div>
                <div className="text-sm text-gray-600">Total Deposit</div>
                <div className="text-xs text-yellow-600 mt-2">
                  Security deposit held
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2">
              {["properties", "tenants"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab === "properties" ? "My Properties" : "My Tenants"}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${
                    activeTab === "properties" ? "properties..." : "tenants..."
                  }`}
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === "properties"
                      ? "Property Details"
                      : "Tenant Details"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === "properties"
                      ? "Tenant Info"
                      : "Property Info"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Financial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeTab === "properties"
                  ? // Properties Table
                    filteredProperties.map((property) => (
                      <tr
                        key={property.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                property.status === "occupied"
                                  ? "bg-green-100"
                                  : "bg-blue-100"
                              }`}
                            >
                              <HomeIcon
                                className={`w-5 h-5 ${
                                  property.status === "occupied"
                                    ? "text-green-600"
                                    : "text-blue-600"
                                }`}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {property.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {property.type} • {property.area}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {property.tenant ? (
                            <>
                              <div className="text-sm font-medium text-gray-900">
                                {property.tenant}
                              </div>
                              <div className="text-sm text-gray-500">
                                Since {formatDate(property.listedDate)}
                              </div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-500 italic">
                              Vacant
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {property.tenantPhone || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {property.address.split(",")[0]}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {renderStatusBadge(
                            property.status,
                            propertyStatusConfig
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-gray-900">
                            {formatCurrency(property.rent)}
                          </div>
                          <div className="text-sm text-gray-500">per month</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleViewDetails("property", property)
                              }
                              className="p-2 text-gray-400 hover:text-blue-600"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {property.tenant && (
                              <button
                                onClick={() => handleCall(property.tenantPhone)}
                                className="p-2 text-gray-400 hover:text-green-600"
                                title="Call Tenant"
                              >
                                <Phone className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              className="p-2 text-gray-400 hover:text-yellow-600"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : // Tenants Table
                    filteredTenants.map((tenant) => (
                      <tr
                        key={tenant.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {tenant.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Tenant
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {tenant.property.split(",")[0]}
                          </div>
                          <div className="text-sm text-gray-500">
                            Lease ends: {formatDate(tenant.leaseEndDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {tenant.phone}
                          </div>
                          <div className="text-sm text-gray-500">
                            {tenant.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {renderStatusBadge(tenant.status, tenantStatusConfig)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-gray-900">
                            {formatCurrency(tenant.rent)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Deposit: {formatCurrency(tenant.deposit)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleViewDetails("tenant", tenant)
                              }
                              className="p-2 text-gray-400 hover:text-blue-600"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCall(tenant.phone)}
                              className="p-2 text-gray-400 hover:text-green-600"
                              title="Call"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleSendMessage(tenant)}
                              className="p-2 text-gray-400 hover:text-yellow-600"
                              title="Send Message"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {(activeTab === "properties" && filteredProperties.length === 0) ||
          (activeTab === "tenants" && filteredTenants.length === 0) ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                {activeTab === "properties" ? (
                  <HomeIcon className="w-8 h-8 text-gray-400" />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab === "properties" ? "properties" : "tenants"} found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
                {searchTerm
                  ? "No results match your search. Try different keywords."
                  : `You haven't added any ${
                      activeTab === "properties" ? "properties" : "tenants"
                    } yet.`}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Your First{" "}
                {activeTab === "properties" ? "Property" : "Tenant"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OwnerTenants;
