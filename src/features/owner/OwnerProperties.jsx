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
  RefreshCw,
} from "lucide-react";
import { useGetOwnerPropertiesQuery } from "../../store/api/ownerApi";

const OwnerProperties = () => {
  // RTK Query API call
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetOwnerPropertiesQuery();

  // Local states
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Transform API data to match component format
  useEffect(() => {
    if (apiResponse?.success && apiResponse?.data) {
      const transformedData = apiResponse.data.map(property => {
        // Map API status to component status
        const mapStatus = (apiStatus) => {
          switch (apiStatus) {
            case 'active':
            case 'approved': return 'approved';
            case 'pending': return 'pending';
            case 'rejected': return 'rejected';
            default: return apiStatus;
          }
        };

        // Map verification status
        const mapVerification = (verificationStatus) => {
          switch (verificationStatus) {
            case 'verified': return 'verified';
            case 'pending': return 'pending';
            default: return 'unverified';
          }
        };

        // Generate property tags
        const generateTags = (property) => {
          const tags = [];
          if (property.is_featured === 1) tags.push("Featured");
          if (property.property_type) {
            const type = property.property_type.charAt(0).toUpperCase() +
              property.property_type.slice(1);
            tags.push(type);
          }
          if (property.furnishing_status && property.furnishing_status.trim() !== "") {
            tags.push(property.furnishing_status);
          }
          if (property.property_for === "Rent") tags.push("For Rent");
          if (property.property_for === "Sale") tags.push("For Sale");
          if (property.preferred_tenant_type) {
            tags.push(property.preferred_tenant_type.charAt(0).toUpperCase() +
              property.preferred_tenant_type.slice(1));
          }
          return tags;
        };

        // Calculate property score
        const calculateScore = (property) => {
          let score = 0;
          if (property.primary_image) score += 20;
          if (property.description && property.description.length > 50) score += 15;
          if (property.bedrooms && property.bathrooms) score += 15;
          if (property.built_up_area) score += 10;
          if (property.contact_person_name && property.contact_person_phone) score += 20;
          if (property.show_contact_info === 1) score += 10;
          if (property.verification_agreement === 1) score += 10;
          return Math.min(score, 100);
        };

        return {
          id: property.id,
          property_id: property.property_id,
          title: property.title,
          address: `${property.address}, ${property.city}, ${property.state} - ${property.pincode}`,
          type: property.property_type ?
            property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1) :
            'Property',
          price: parseFloat(property.price) || 0,
          status: mapStatus(property.status),
          verification: mapVerification(property.verification_status),
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          area: property.built_up_area || 0,
          area_unit: property.area_unit || 'sq ft',
          postedDate: property.created_at || new Date().toISOString(),
          approvedDate: property.updated_at,
          lastUpdated: property.updated_at || property.created_at,
          views: property.views || 0,
          inquiries: property.inquiry_count || property.inquiries || 0,
          score: calculateScore(property),
          images: property.primary_image ? [property.primary_image] : [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&auto=format&fit=crop"
          ],
          tags: generateTags(property),
          featured: property.is_featured === 1,
          is_active: property.is_active === 1,
          description: property.description,
          property_for: property.property_for,
          furnishing_status: property.furnishing_status,
          contact_person_name: property.contact_person_name,
          contact_person_phone: property.contact_person_phone,
          rejectionReason: property.rejection_reason,
          city: property.city,
          state: property.state,
          pincode: property.pincode,
          locality: property.locality,
          landmark: property.landmark,
          price_type: property.price_type,
          maintenance_charge: property.maintenance_charge,
          security_deposit: property.security_deposit,
          available_from: property.available_from,
          expiry_date: property.expiry_date,
          image_count: property.image_count || 0,
          verification_status: property.verification_status,
          // Original API data for reference
          _original: property
        };
      });

      setProperties(transformedData);
      setFilteredProperties(transformedData);
    }
  }, [apiResponse]);

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
          prop.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prop.locality?.toLowerCase().includes(searchTerm.toLowerCase())
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
    } else if (sortBy === "inquiries") {
      result = [...result].sort((a, b) => b.inquiries - a.inquiries);
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
    if (price >= 10000000) return "₹" + (price / 10000000).toFixed(1) + " Cr";
    if (price >= 100000) return "₹" + (price / 100000).toFixed(1) + " L";
    if (price >= 1000) return "₹" + (price / 1000).toFixed(0) + " K";
    return "₹" + price;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-IN", options);
    } catch (error) {
      return "Invalid Date";
    }
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
    window.location.href = `/edit-property/${id}`;
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      // Note: You need to implement delete API call here
      // Example: useDeletePropertyMutation from ownerApi
      alert(`Delete property ${id} - API integration needed`);
      // After successful delete, refetch the data
      // refetch();
    }
  };

  const handleViewProperty = (id) => {
    window.location.href = `/property/${id}`;
  };

  const handleViewAnalytics = (id) => {
    window.location.href = `/property/${id}/analytics`;
  };

  const handleExport = () => {
    // Export functionality
    const dataStr = JSON.stringify(properties, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'properties.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleBulkAction = (action) => {
    alert(`Bulk ${action} selected properties - Implement bulk actions with API`);
  };

  const handleRetry = () => {
    refetch();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your properties...</p>
            <p className="text-sm text-gray-500">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Properties</h3>
              <p className="text-red-600">
                {error?.data?.message || error?.error || "Failed to load properties. Please try again."}
              </p>
              <p className="text-sm text-red-500 mt-1">
                Status: {error?.status} {error?.originalStatus ? `(${error.originalStatus})` : ''}
              </p>
            </div>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state when no properties from API
  if (!isLoading && !isError && properties.length === 0) {
    return (
      <div className="p-4">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">My Properties</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage all your listed properties in one place
              </p>
            </div>
            <button
              onClick={handleAddProperty}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Property
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg border border-gray-200 text-center py-16">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Building className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Properties Listed</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't listed any properties yet. Start by adding your first property to reach potential tenants or buyers.
          </p>
          <button
            onClick={handleAddProperty}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto text-sm"
          >
            <Plus className="w-5 h-5" />
            Add Your First Property
          </button>
        </div>
      </div>
    );
  }

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
            <p className="text-xs text-gray-500 mt-1">
              Total Properties: {properties.length} | Last Updated: {new Date().toLocaleTimeString()}
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
            <button
              onClick={handleRetry}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
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
            <div className="text-xs text-gray-500 mt-1">From API</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-600">Live Properties</span>
            </div>
            <div className="text-xl font-bold text-green-600">
              {properties.filter((p) => p.status === "approved").length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Active listings</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-600">Total Views</span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              {properties.reduce((sum, prop) => sum + prop.views, 0)}
            </div>
            <div className="text-xs text-gray-500 mt-1">All time</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-gray-600">Total Inquiries</span>
            </div>
            <div className="text-xl font-bold text-purple-600">
              {properties.reduce((sum, prop) => sum + prop.inquiries, 0)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Potential leads</div>
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
                className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition-all ${statusFilter === item.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {getStatusIcon(item.id)}
                <span>{item.label}</span>
                <span className={`text-xs px-2 py-1 rounded ${statusFilter === item.id
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800 text-white"
                  }`}>
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
                placeholder="Search properties by title, location, city..."
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
              <option value="inquiries">Most Inquiries</option>
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
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredProperties.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="p-4 hover:bg-gray-50 transition-colors"
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
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&auto=format&fit=crop";
                        }}
                      />
                      {property.image_count > 0 && (
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                          +{property.image_count}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-base font-semibold text-gray-900">
                                {property.title}
                              </h3>
                              <span className="text-xs text-gray-500">
                                ({property.property_id})
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mb-3">
                              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{property.address}</span>
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
                            {property.featured && (
                              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                                <Star className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Property Features */}
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bath className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {property.area} {property.area_unit}
                            </span>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {formatPrice(property.price)}
                            <span className="text-sm font-normal text-gray-600">
                              {property.price_type === 'Monthly' ? '/month' :
                                property.price_type === 'Yearly' ? '/year' : ''}
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
                              Property views
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
                              Total inquiries
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

                        {/* Tags and Additional Info */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {property.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100"
                            >
                              {tag}
                            </span>
                          ))}
                          {property.property_for && (
                            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-100">
                              {property.property_for}
                            </span>
                          )}
                          {property.furnishing_status && property.furnishing_status.trim() !== "" && (
                            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">
                              {property.furnishing_status}
                            </span>
                          )}
                        </div>

                        {/* Additional Information */}
                        <div className="text-xs text-gray-500">
                          <div className="flex flex-wrap gap-2">
                            <span>City: {property.city}</span>
                            <span>•</span>
                            <span>Locality: {property.locality || 'N/A'}</span>
                            <span>•</span>
                            <span>Contact: {property.contact_person_name}</span>
                          </div>
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
          // Empty State when filtered results are empty
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
              {searchTerm || statusFilter !== "all"
                ? "No properties match your filters. Try adjusting your search criteria."
                : "No properties available."}
            </p>
            {(searchTerm || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 mx-auto text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredProperties.length > 0 && apiResponse?.pagination && (
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Page <span className="font-medium">{apiResponse.pagination.page}</span> of{" "}
              <span className="font-medium">{apiResponse.pagination.pages}</span>{" "}
              • Showing {filteredProperties.length} of {apiResponse.pagination.total} properties
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={apiResponse.pagination.page <= 1}
              >
                Previous
              </button>
              {[...Array(Math.min(3, apiResponse.pagination.pages))].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1.5 text-sm rounded-lg ${apiResponse.pagination.page === i + 1
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              {apiResponse.pagination.pages > 3 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={apiResponse.pagination.page >= apiResponse.pagination.pages}
              >
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