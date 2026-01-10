import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Building,
  Eye,
  MessageSquare,
  MapPin,
  Bed,
  Bath,
  Square,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  ExternalLink,
  Star,
  TrendingUp,
  Download,
  MoreVertical,
} from "lucide-react";

const OwnerProperties = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "2 BHK Apartment in Hinjewadi",
      address: "Hinjewadi Phase 1, Pune",
      type: "Apartment",
      price: 25000,
      status: "approved",
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      postedDate: "2024-01-15",
      approvedDate: "2024-01-17",
      views: 245,
      inquiries: 12,
      score: 85,
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&auto=format&fit=crop",
      ],
      tags: ["Premium", "Furnished"],
      lastUpdated: "2024-01-20",
      verification: "verified",
      featured: true,
    },
    {
      id: 2,
      title: "3 BHK Villa in Wakad",
      address: "Wakad, Pune",
      type: "Villa",
      price: 45000,
      status: "pending",
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      postedDate: "2024-01-20",
      views: 89,
      inquiries: 3,
      score: 60,
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop",
      ],
      tags: ["Luxury", "Garden"],
      lastUpdated: "2024-01-22",
      verification: "pending",
      featured: false,
    },
    {
      id: 3,
      title: "1 BHK Studio in Kothrud",
      address: "Kothrud, Pune",
      type: "Studio",
      price: 18000,
      status: "rejected",
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      postedDate: "2024-01-10",
      rejectionReason: "Incomplete documents",
      views: 45,
      inquiries: 0,
      score: 40,
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&auto=format&fit=crop",
      ],
      tags: ["Budget"],
      lastUpdated: "2024-01-12",
      verification: "unverified",
      featured: false,
    },
    {
      id: 4,
      title: "4 BHK Penthouse in Baner",
      address: "Baner, Pune",
      type: "Penthouse",
      price: 75000,
      status: "approved",
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      postedDate: "2024-01-05",
      approvedDate: "2024-01-08",
      views: 320,
      inquiries: 18,
      score: 92,
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&auto=format&fit=crop",
      ],
      tags: ["Luxury", "Premium"],
      lastUpdated: "2024-01-18",
      verification: "verified",
      featured: true,
    },
  ]);

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and search properties
  useEffect(() => {
    let result = properties;

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((prop) => prop.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (prop) =>
          prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prop.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort properties
    if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "views") {
      result = [...result].sort((a, b) => b.views - a.views);
    } else if (sortBy === "score") {
      result = [...result].sort((a, b) => b.score - a.score);
    }

    setFilteredProperties(result);
  }, [properties, statusFilter, searchTerm, sortBy]);

  const statusItems = [
    { id: "all", label: "All Properties", count: properties.length },
    {
      id: "approved",
      label: "Live",
      count: properties.filter((p) => p.status === "approved").length,
    },
    {
      id: "pending",
      label: "In Review",
      count: properties.filter((p) => p.status === "pending").length,
    },
    {
      id: "rejected",
      label: "Rejected",
      count: properties.filter((p) => p.status === "rejected").length,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  const formatPrice = (price) => {
    if (price >= 100000) return "₹" + (price / 100000).toFixed(1) + "L";
    if (price >= 1000) return "₹" + (price / 1000).toFixed(0) + "K";
    return "₹" + price;
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getScoreProgressColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleAddProperty = () => {
    window.location.href = "/addownerproperty";
  };

  const handleEditProperty = (id) => {
    alert(`Edit property ${id}`);
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((prop) => prop.id !== id));
    }
  };

  const handleViewProperty = (id) => {
    alert(`View property ${id}`);
  };

  const handleViewAnalytics = (id) => {
    alert(`View analytics for property ${id}`);
  };

  const handleExport = () => {
    alert("Export properties data");
  };

  const handleBulkAction = (action) => {
    alert(`Bulk ${action} selected properties`);
  };

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Properties</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage all your listed properties in one place
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={handleAddProperty}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Property
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Building className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-600">Total Properties</span>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {properties.length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-600">Live Properties</span>
            </div>
            <div className="text-xl font-bold text-green-600">
              {properties.filter((p) => p.status === "approved").length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-600">Total Views</span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              {properties.reduce((sum, prop) => sum + prop.views, 0)}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-gray-600">Total Inquiries</span>
            </div>
            <div className="text-xl font-bold text-purple-600">
              {properties.reduce((sum, prop) => sum + prop.inquiries, 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {statusItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setStatusFilter(item.id)}
                className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition-all ${
                  statusFilter === item.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {getStatusIcon(item.id)}
                <span>{item.label}</span>
                <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  {item.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties by title, location..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="views">Most Viewed</option>
              <option value="score">Highest Score</option>
            </select>

            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">More Filters</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Select all ({filteredProperties.length})
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("delete")}
                className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded border border-red-200"
              >
                Delete
              </button>
              <button
                onClick={() => handleBulkAction("feature")}
                className="px-3 py-1.5 text-xs text-yellow-600 hover:bg-yellow-50 rounded border border-yellow-200"
              >
                Feature
              </button>
              <button
                onClick={() => handleBulkAction("renew")}
                className="px-3 py-1.5 text-xs text-green-600 hover:bg-green-50 rounded border border-green-200"
              >
                Renew
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredProperties.length} of {properties.length}{" "}
            properties
          </div>
        </div>
      </div>

      {/* Properties List - Vertical Format */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden ">
        {filteredProperties.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="p-4 hover:bg-gray-50 transition-colors "
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Property Image and Checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded mt-2"
                    />
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                              {property.title}
                              {property.featured && (
                                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                                  <Star className="w-3 h-3" />
                                  Featured
                                </span>
                              )}
                            </h3>
                            <div className="flex items-center text-gray-600 text-sm mb-3">
                              <MapPin className="w-4 h-4 mr-1" />
                              {property.address}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 text-xs rounded flex items-center gap-1 ${getStatusColor(
                                property.status
                              )}`}
                            >
                              {getStatusIcon(property.status)}
                              {property.status === "approved"
                                ? "Live"
                                : property.status === "pending"
                                ? "In Review"
                                : "Rejected"}
                            </span>
                            {property.verification === "verified" && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Property Features */}
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {property.bedrooms} Beds
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bath className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {property.bathrooms} Baths
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {property.area} sq ft
                            </span>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {formatPrice(property.price)}
                            <span className="text-sm font-normal text-gray-600">
                              /month
                            </span>
                          </div>
                        </div>

                        {/* Performance Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1 text-gray-600 text-sm">
                                <Eye className="w-4 h-4" />
                                Views
                              </div>
                              <span className="font-semibold text-gray-900">
                                {property.views}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Last 30 days
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1 text-gray-600 text-sm">
                                <MessageSquare className="w-4 h-4" />
                                Inquiries
                              </div>
                              <span className="font-semibold text-gray-900">
                                {property.inquiries}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Active inquiries
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1 text-gray-600 text-sm">
                                <TrendingUp className="w-4 h-4" />
                                Score
                              </div>
                              <span
                                className={`font-semibold ${getScoreColor(
                                  property.score
                                ).replace("bg-", "text-")}`}
                              >
                                {property.score}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className={`h-full rounded-full ${getScoreProgressColor(
                                  property.score
                                )}`}
                                style={{ width: `${property.score}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-gray-600 text-sm mb-1">
                              Last Updated
                            </div>
                            <div className="font-semibold text-gray-900">
                              {formatDate(property.lastUpdated)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Posted: {formatDate(property.postedDate)}
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {property.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                        <button
                          onClick={() => handleViewProperty(property.id)}
                          className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleEditProperty(property.id)}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleViewAnalytics(property.id)}
                          className="px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <TrendingUp className="w-4 h-4" />
                          Analytics
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Building className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
              {searchTerm || statusFilter !== "all"
                ? "No properties match your filters. Try adjusting your search criteria."
                : "You haven't listed any properties yet. Start by adding your first property!"}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddProperty}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Your First Property
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredProperties.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredProperties.length}</span>{" "}
              of <span className="font-medium">{properties.length}</span>{" "}
              results
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700">
                2
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700">
                3
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerProperties;
