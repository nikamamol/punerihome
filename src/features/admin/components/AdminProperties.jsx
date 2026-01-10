import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Clock,
  Building,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Calendar,
  User,
  Phone,
  Mail,
  Download,
  RefreshCw,
  ChevronDown,
  AlertCircle,
  Star,
  Home,
  CheckSquare,
  XSquare,
  MoreVertical,
  ExternalLink,
} from "lucide-react";

function AdminProperties() {
  // Sample properties data
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Luxury 3BHK Apartment in Koregaon Park",
      owner: "Rajesh Kumar",
      ownerPhone: "+91 9876543210",
      ownerEmail: "rajesh@email.com",
      location: "Koregaon Park, Pune",
      price: "₹45,000/month",
      type: "Apartment",
      bhk: "3 BHK",
      area: "1800 sq ft",
      status: "pending", // pending, approved, rejected, live
      postedDate: "2024-02-20",
      verificationStatus: "unverified",
      images: 5,
      views: 124,
      inquiries: 12,
      documents: ["Aadhar", "Property Tax"],
      features: ["Parking", "Swimming Pool", "Gym"],
      reasonForRejection: "",
      adminNotes: "",
    },
    {
      id: 2,
      title: "Premium 2BHK Flat in Hinjewadi",
      owner: "Priya Sharma",
      ownerPhone: "+91 9876543211",
      ownerEmail: "priya@email.com",
      location: "Hinjewadi, Pune",
      price: "₹32,000/month",
      type: "Flat",
      bhk: "2 BHK",
      area: "1200 sq ft",
      status: "approved",
      postedDate: "2024-02-18",
      verificationStatus: "verified",
      images: 8,
      views: 89,
      inquiries: 8,
      documents: ["Aadhar", "Property Tax", "Electricity Bill"],
      features: ["Parking", "Power Backup", "Security"],
      reasonForRejection: "",
      adminNotes: "All documents verified. Good property.",
    },
    {
      id: 3,
      title: "Independent Villa in Baner",
      owner: "Amit Patel",
      ownerPhone: "+91 9876543212",
      ownerEmail: "amit@email.com",
      location: "Baner, Pune",
      price: "₹85,000/month",
      type: "Villa",
      bhk: "4 BHK",
      area: "2800 sq ft",
      status: "rejected",
      postedDate: "2024-02-15",
      verificationStatus: "unverified",
      images: 3,
      views: 45,
      inquiries: 3,
      documents: ["Aadhar"],
      features: ["Garden", "Parking", "Swimming Pool"],
      reasonForRejection: "Incomplete documents",
      adminNotes: "Missing property tax documents.",
    },
    {
      id: 4,
      title: "Studio Apartment in Kothrud",
      owner: "Neha Gupta",
      ownerPhone: "+91 9876543213",
      ownerEmail: "neha@email.com",
      location: "Kothrud, Pune",
      price: "₹18,000/month",
      type: "Studio",
      bhk: "1 BHK",
      area: "600 sq ft",
      status: "live",
      postedDate: "2024-02-10",
      verificationStatus: "verified",
      images: 6,
      views: 210,
      inquiries: 25,
      documents: ["Aadhar", "Property Tax", "Electricity Bill"],
      features: ["Furnished", "Parking"],
      reasonForRejection: "",
      adminNotes: "Quick approval. Good photos.",
    },
    {
      id: 5,
      title: "Commercial Space in FC Road",
      owner: "Vikram Singh",
      ownerPhone: "+91 9876543214",
      ownerEmail: "vikram@email.com",
      location: "FC Road, Pune",
      price: "₹1,20,000/month",
      type: "Commercial",
      bhk: "Office Space",
      area: "3500 sq ft",
      status: "pending",
      postedDate: "2024-02-22",
      verificationStatus: "unverified",
      images: 4,
      views: 67,
      inquiries: 7,
      documents: ["Aadhar", "GST Certificate"],
      features: ["Parking", "AC", "WiFi"],
      reasonForRejection: "",
      adminNotes: "",
    },
  ]);

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(""); // approve, reject, verify
  const [rejectionReason, setRejectionReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and search properties
  useEffect(() => {
    let filtered = [...properties];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((property) => property.status === statusFilter);
    }

    // Apply verification filter
    if (verificationFilter !== "all") {
      filtered = filtered.filter(
        (property) => property.verificationStatus === verificationFilter
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.postedDate) - new Date(a.postedDate);
      } else if (sortBy === "oldest") {
        return new Date(a.postedDate) - new Date(b.postedDate);
      } else if (sortBy === "price-high") {
        return parsePrice(b.price) - parsePrice(a.price);
      } else if (sortBy === "price-low") {
        return parsePrice(a.price) - parsePrice(b.price);
      }
      return 0;
    });

    setFilteredProperties(filtered);
  }, [searchQuery, statusFilter, verificationFilter, sortBy, properties]);

  const parsePrice = (priceString) => {
    return parseInt(priceString.replace(/[^0-9]/g, ""));
  };

  const handleApprove = (propertyId) => {
    setSelectedProperty(properties.find(p => p.id === propertyId));
    setActionType("approve");
    setShowModal(true);
  };

  const handleReject = (propertyId) => {
    setSelectedProperty(properties.find(p => p.id === propertyId));
    setActionType("reject");
    setShowModal(true);
  };

  const handleVerify = (propertyId) => {
    setSelectedProperty(properties.find(p => p.id === propertyId));
    setActionType("verify");
    setShowModal(true);
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setActionType("view");
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedProperty) return;

    const updatedProperties = [...properties];
    const index = updatedProperties.findIndex(p => p.id === selectedProperty.id);

    if (actionType === "approve") {
      updatedProperties[index].status = "approved";
      updatedProperties[index].adminNotes = adminNotes || "Approved by admin";
    } else if (actionType === "reject") {
      updatedProperties[index].status = "rejected";
      updatedProperties[index].reasonForRejection = rejectionReason;
      updatedProperties[index].adminNotes = adminNotes || `Rejected: ${rejectionReason}`;
    } else if (actionType === "verify") {
      updatedProperties[index].verificationStatus = "verified";
      updatedProperties[index].adminNotes = adminNotes || "Verified by admin";
    }

    setProperties(updatedProperties);
    setShowModal(false);
    setRejectionReason("");
    setAdminNotes("");
    setSelectedProperty(null);
    setActionType("");
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
      live: "bg-green-100 text-green-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getVerificationBadge = (status) => {
    const styles = {
      verified: "bg-green-100 text-green-800",
      unverified: "bg-gray-100 text-gray-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const stats = {
    total: properties.length,
    pending: properties.filter(p => p.status === "pending").length,
    approved: properties.filter(p => p.status === "approved").length,
    rejected: properties.filter(p => p.status === "rejected").length,
    live: properties.filter(p => p.status === "live").length,
    verified: properties.filter(p => p.verificationStatus === "verified").length,
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Property Management</h1>
        <p className="text-sm text-gray-600 mt-1">
          Review and approve properties submitted by owners
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-600">Total Properties</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-yellow-200">
          <div className="text-xl font-bold text-yellow-700">{stats.pending}</div>
          <div className="text-xs text-yellow-600">Pending Review</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-700">{stats.approved}</div>
          <div className="text-xs text-blue-600">Approved</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-red-200">
          <div className="text-xl font-bold text-red-700">{stats.rejected}</div>
          <div className="text-xs text-red-600">Rejected</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">{stats.live}</div>
          <div className="text-xs text-green-600">Live</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">{stats.verified}</div>
          <div className="text-xs text-green-600">Verified</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                placeholder="Search by property title, owner, location..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="live">Live</option>
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
              <option value="unverified">Unverified</option>
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
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>

          <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>

          <button className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:text-green-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Property</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Owner</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Verification</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Posted Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 line-clamp-1">
                          {property.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {property.location}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-600 flex items-center gap-1">
                            <Bed className="w-3 h-3" /> {property.bhk}
                          </span>
                          <span className="text-xs text-gray-600 flex items-center gap-1">
                            <Square className="w-3 h-3" /> {property.area}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{property.owner}</div>
                      <div className="text-xs text-gray-500">{property.ownerPhone}</div>
                      <div className="text-xs text-gray-500">{property.ownerEmail}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{property.price}</div>
                    <div className="text-xs text-gray-500">{property.type}</div>
                  </td>

                  <td className="py-3 px-4">{getStatusBadge(property.status)}</td>

                  <td className="py-3 px-4">
                    {getVerificationBadge(property.verificationStatus)}
                  </td>

                  <td className="py-3 px-4">
                    <div className="text-gray-900">{new Date(property.postedDate).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {property.views} views
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(property)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {property.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(property.id)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(property.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {property.verificationStatus === "unverified" && (
                        <button
                          onClick={() => handleVerify(property.id)}
                          className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded"
                          title="Verify"
                        >
                          <CheckSquare className="w-4 h-4" />
                        </button>
                      )}

                      {property.status === "approved" && (
                        <button
                          onClick={() => {
                            const updated = [...properties];
                            const index = updated.findIndex(p => p.id === property.id);
                            updated[index].status = "live";
                            setProperties(updated);
                          }}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded"
                          title="Make Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProperties.length === 0 && (
            <div className="py-12 text-center">
              <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No properties found</p>
              <p className="text-sm text-gray-400 mt-1">Try changing your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {actionType === "approve" && "Approve Property"}
                    {actionType === "reject" && "Reject Property"}
                    {actionType === "verify" && "Verify Property"}
                    {actionType === "view" && "Property Details"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedProperty.title}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedProperty(null);
                    setRejectionReason("");
                    setAdminNotes("");
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Property Details */}
              <div className="mb-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Owner</label>
                    <div className="font-medium text-gray-900">{selectedProperty.owner}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone</label>
                    <div className="font-medium text-gray-900">{selectedProperty.ownerPhone}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Location</label>
                  <div className="font-medium text-gray-900">{selectedProperty.location}</div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Type</label>
                    <div className="font-medium text-gray-900">{selectedProperty.type}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">BHK</label>
                    <div className="font-medium text-gray-900">{selectedProperty.bhk}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Area</label>
                    <div className="font-medium text-gray-900">{selectedProperty.area}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Documents Submitted</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProperty.documents.map((doc, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Features</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProperty.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Form */}
              {(actionType === "approve" || actionType === "reject" || actionType === "verify") && (
                <div className="space-y-4">
                  {actionType === "reject" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Rejection *
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
                        rows="3"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Enter reason for rejection..."
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Notes
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      rows="3"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add notes for this action..."
                    />
                  </div>
                </div>
              )}

              {/* View Mode Details */}
              {actionType === "view" && (
                <div className="space-y-4">
                  {selectedProperty.adminNotes && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Admin Notes</label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-900">{selectedProperty.adminNotes}</p>
                      </div>
                    </div>
                  )}

                  {selectedProperty.reasonForRejection && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Rejection Reason</label>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-700">{selectedProperty.reasonForRejection}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedProperty(null);
                    setRejectionReason("");
                    setAdminNotes("");
                  }}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                {actionType !== "view" && (
                  <button
                    onClick={confirmAction}
                    disabled={actionType === "reject" && !rejectionReason}
                    className={`px-4 py-2 text-sm text-white rounded-lg ${actionType === "approve" || actionType === "verify"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {actionType === "approve" && "Approve Property"}
                    {actionType === "reject" && "Reject Property"}
                    {actionType === "verify" && "Verify Property"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-blue-900">Property Approval Process</h3>
            <p className="text-sm text-blue-700">
              1. Property submitted by owner → 2. Admin reviews → 3. Approve/Reject → 4. Make Live
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-900">{stats.pending} pending review</div>
            <button
              onClick={() => setStatusFilter("pending")}
              className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              Review Pending Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProperties;