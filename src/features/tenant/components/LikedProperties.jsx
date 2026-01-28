import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Filter,
  Heart,
  Bookmark,
  MapPin,
  Building,
  DollarSign,
  Bed,
  Bath,
  Square,
  Eye,
  Phone,
  MessageSquare,
  X,
  MoreVertical,
  SortAsc,
  SortDesc,
  RefreshCw,
  Home,
  Star,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Unlock,
  Download,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useGetLikedPropertiesQuery, useUnlikePropertyMutation } from "../../../store/api/propertyApi";
import { Link } from "react-router-dom";

function LikedProperties() {
  // Get auth state
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  // RTK Query hooks
  const {
    data: likedPropertiesData,
    isLoading,
    isError,
    error,
    refetch: refetchLikedProperties,
  } = useGetLikedPropertiesQuery(undefined, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  // Unlike property mutation
  const [unlikeProperty, { isLoading: isUnliking }] = useUnlikePropertyMutation();

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Transform API data to component format
  const likedProperties = useMemo(() => {
    if (!likedPropertiesData?.success || !likedPropertiesData.data) {
      return [];
    }

    return likedPropertiesData.data.map((property) => {
      // Format price
      const formatPrice = (price) => {
        if (!price) return 'Price on Request';
        const priceNum = parseFloat(price);
        if (priceNum >= 10000000) return `₹${(priceNum / 10000000).toFixed(1)} Cr`;
        if (priceNum >= 100000) return `₹${(priceNum / 100000).toFixed(1)} L`;
        if (priceNum >= 1000) return `₹${Math.round(priceNum / 1000)}K`;
        return `₹${priceNum}`;
      };

      // Determine popularity based on likes and views
      const getPopularity = (views, likes) => {
        const ratio = likes / (views || 1);
        if (ratio > 0.5) return "hot";
        if (ratio > 0.3) return "trending";
        if (ratio > 0.2) return "popular";
        return "new";
      };

      // Get price trend (mock for now)
      const getPriceTrend = () => {
        const trends = ["increasing", "stable", "decreasing"];
        return trends[Math.floor(Math.random() * trends.length)];
      };

      // Get property type
      const getPropertyType = (type) => {
        const types = {
          'apartment': 'Apartment',
          'flat': 'Flat',
          'villa': 'Villa',
          'penthouse': 'Penthouse',
          'bungalow': 'Bungalow',
          'studio': 'Studio',
          'commercial': 'Commercial',
          'plot': 'Plot',
          'house': 'House'
        };
        return types[type?.toLowerCase()] || type || 'Property';
      };

      return {
        id: property.id || property.property_id,
        title: property.title || `${property.bedrooms || 2} BHK ${property.property_type || 'Flat'}`,
        location: property.locality || property.area || property.city || 'Location',
        price: formatPrice(property.price),
        originalPrice: property.price || 0,
        type: getPropertyType(property.property_type),
        bhk: `${property.bedrooms || 2} BHK`,
        area: property.built_up_area ? `${property.built_up_area} ${property.area_unit || 'sq ft'}` : 'Area not specified',
        likedDate: property.liked_at || property.created_at || new Date().toISOString(),
        views: property.views || 0,
        likes: property.likes || 0,
        popularity: getPopularity(property.views || 0, property.likes || 0),
        status: property.status === 'approved' ? 'Available' : 'Under Review',
        owner: property.owner_name || 'Owner',
        ownerPhone: property.owner_phone || '',
        features: property.amenities || [],
        images: property.url ? 1 : 0,
        description: property.description || 'No description available.',
        priceTrend: getPriceTrend(),
        daysOnMarket: Math.floor(Math.random() * 60) + 1, // Mock data
        similarProperties: Math.floor(Math.random() * 10) + 1, // Mock data
        isSaved: true, // Since it's in liked properties, it's saved by default
        contactUnlocked: false, // Default - implement contact unlock logic
        rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Mock rating between 3.5-5.0
      };
    });
  }, [likedPropertiesData]);

  // Filter and search properties
  useEffect(() => {
    let filtered = [...likedProperties];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((property) => property.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((property) => property.type === typeFilter);
    }

    // Apply price filter
    if (priceFilter !== "all") {
      const priceRanges = {
        "under-50": (price) => parseFloat(price.originalPrice) < 5000000,
        "50-100": (price) => parseFloat(price.originalPrice) >= 5000000 && parseFloat(price.originalPrice) < 10000000,
        "100-500": (price) => parseFloat(price.originalPrice) >= 10000000 && parseFloat(price.originalPrice) < 50000000,
        "500+": (price) => parseFloat(price.originalPrice) >= 50000000,
      };
      if (priceRanges[priceFilter]) {
        filtered = filtered.filter(priceRanges[priceFilter]);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.likedDate) - new Date(a.likedDate);
      } else if (sortBy === "oldest") {
        return new Date(a.likedDate) - new Date(b.likedDate);
      } else if (sortBy === "price-high") {
        return b.originalPrice - a.originalPrice;
      } else if (sortBy === "price-low") {
        return a.originalPrice - b.originalPrice;
      } else if (sortBy === "views-high") {
        return b.views - a.views;
      } else if (sortBy === "likes-high") {
        return b.likes - a.likes;
      } else if (sortBy === "rating-high") {
        return b.rating - a.rating;
      }
      return 0;
    });

    setFilteredProperties(filtered);
  }, [searchQuery, statusFilter, typeFilter, priceFilter, sortBy, likedProperties]);

  // Handle unlike property
  const handleUnlike = useCallback(async (propertyId) => {
    try {
      await unlikeProperty(propertyId).unwrap();
      // The data will automatically update due to RTK Query cache invalidation
    } catch (error) {
      console.error('Failed to unlike property:', error);
      alert('Failed to unlike property. Please try again.');
    }
  }, [unlikeProperty]);

  // Handle unlock contact
  const handleUnlockContact = useCallback((propertyId) => {
    // Implement contact unlock logic here
    // This would typically involve an API call to deduct credits
    alert('Contact unlock functionality would be implemented here');
  }, []);

  // Handle save property
  const handleSaveProperty = useCallback((propertyId) => {
    // Implement save property logic here
    alert('Save property functionality would be implemented here');
  }, []);

  // Format date
  const formatDate = useCallback((dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } catch {
      return 'Recent';
    }
  }, []);

  // Get status color
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Under Negotiation": return "bg-orange-100 text-orange-800";
      case "Sold Out": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }, []);

  // Get popularity color
  const getPopularityColor = useCallback((popularity) => {
    switch (popularity) {
      case "hot": return "bg-red-100 text-red-800";
      case "trending": return "bg-orange-100 text-orange-800";
      case "popular": return "bg-blue-100 text-blue-800";
      case "new": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }, []);

  // Get price trend icon
  const getPriceTrendIcon = useCallback((trend) => {
    switch (trend) {
      case "increasing": return <TrendingUp className="w-3 h-3 text-red-500" />;
      case "decreasing": return <TrendingDown className="w-3 h-3 text-green-500" />;
      default: return <TrendingUp className="w-3 h-3 text-gray-500" />;
    }
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = likedProperties.length;
    const available = likedProperties.filter(p => p.status === "Available").length;
    const unlocked = likedProperties.filter(p => p.contactUnlocked).length;
    const trending = likedProperties.filter(p => p.popularity === "trending").length;
    const totalLikes = likedProperties.reduce((sum, p) => sum + p.likes, 0);
    const avgRating = total > 0
      ? (likedProperties.reduce((sum, p) => sum + parseFloat(p.rating), 0) / total).toFixed(1)
      : 0;

    return {
      total,
      available,
      unlocked,
      trending,
      totalLikes,
      avgRating,
    };
  }, [likedProperties]);

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading liked properties...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Properties</h3>
          <p className="text-red-600 mb-4">
            {error?.data?.message || "Failed to load liked properties. Please try again."}
          </p>
          <button
            onClick={() => refetchLikedProperties()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No properties state
  if (!userId) {
    return (
      <div className="p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <Heart className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Login Required</h3>
          <p className="text-yellow-600 mb-4">
            Please login to view your liked properties.
          </p>
          <Link
            to="/login"
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Liked Properties</h1>
            <p className="text-sm text-gray-600 mt-1">
              {likedProperties.length} properties liked • Track properties you love
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetchLikedProperties()}
              className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-1"
              disabled={isLoading}
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <Link
              to="/properties"
              className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Discover More
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-600">Total Liked</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">{stats.available}</div>
          <div className="text-xs text-green-600">Available</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-700">{stats.unlocked}</div>
          <div className="text-xs text-blue-600">Unlocked</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-orange-200">
          <div className="text-xl font-bold text-orange-700">{stats.trending}</div>
          <div className="text-xs text-orange-600">Trending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="text-xl font-bold text-purple-700">{stats.totalLikes}</div>
          <div className="text-xs text-purple-600">Total Likes</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-yellow-200">
          <div className="text-xl font-bold text-yellow-700">{stats.avgRating}</div>
          <div className="text-xs text-yellow-600">Avg Rating</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                placeholder="Search liked properties..."
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
              <option value="Available">Available</option>
              <option value="Under Review">Under Review</option>
              <option value="Under Negotiation">Under Negotiation</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Flat">Flat</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Studio">Studio</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under-50">Under ₹50L</option>
              <option value="50-100">₹50L - ₹1Cr</option>
              <option value="100-500">₹1Cr - ₹5Cr</option>
              <option value="500+">₹5Cr+</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Recently Liked</option>
              <option value="oldest">Oldest Liked</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="views-high">Most Views</option>
              <option value="likes-high">Most Liked</option>
              <option value="rating-high">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {searchQuery && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Search: {searchQuery}
              <button onClick={() => setSearchQuery("")} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {statusFilter !== "all" && (
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Status: {statusFilter}
              <button onClick={() => setStatusFilter("all")} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {typeFilter !== "all" && (
            <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Type: {typeFilter}
              <button onClick={() => setTypeFilter("all")} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {priceFilter !== "all" && (
            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Price: {priceFilter === "under-50" ? "Under ₹50L" :
                priceFilter === "50-100" ? "₹50L-₹1Cr" :
                  priceFilter === "100-500" ? "₹1Cr-₹5Cr" : "₹5Cr+"}
              <button onClick={() => setPriceFilter("all")} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Liked Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
            {/* Property Header with Popularity Badge */}
            <div className="relative h-48 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPopularityColor(property.popularity)}`}>
                  {property.popularity}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleUnlike(property.id)}
                    disabled={isUnliking}
                    className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Unlike property"
                  >
                    <Heart className="w-4 h-4 fill-red-500" />
                  </button>
                  <button
                    onClick={() => handleSaveProperty(property.id)}
                    className="p-1.5 bg-white text-blue-500 rounded-full hover:bg-blue-50"
                    title="Save property"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <Building className="w-16 h-16 text-purple-400" />
            </div>

            {/* Property Details */}
            <div className="p-4">
              {/* Title and Price with Trend */}
              <div className="mb-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-gray-900 line-clamp-1 flex-1">{property.title}</h3>
                  <div className="flex items-center gap-1">
                    {getPriceTrendIcon(property.priceTrend)}
                    <div className="text-lg font-bold text-blue-700">{property.price}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>
              </div>

              {/* Property Specs */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-center gap-1 text-sm font-medium text-gray-900">
                    <Bed className="w-3 h-3" />
                    {property.bhk}
                  </div>
                  <div className="text-xs text-gray-500">Type</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-sm font-medium text-gray-900">{property.area}</div>
                  <div className="text-xs text-gray-500">Area</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                  </div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-sm font-medium text-gray-900">{property.images}</div>
                  <div className="text-xs text-gray-500">Photos</div>
                </div>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{property.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {property.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                    {property.likes} likes
                  </div>
                </div>
                <div className="text-right">
                  <div>Liked: {formatDate(property.likedDate)}</div>
                  <div className="text-gray-400">{property.daysOnMarket} days on market</div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-900">Owner: {property.owner}</div>
                  {property.contactUnlocked ? (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Phone className="w-3 h-3" />
                      Contact Unlocked
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Contact Locked</div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {property.contactUnlocked ? (
                    property.ownerPhone ? (
                      <a
                        href={`tel:${property.ownerPhone}`}
                        className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Call Owner
                      </a>
                    ) : (
                      <button className="flex-1 px-3 py-2 bg-gray-400 text-white text-sm rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                        <Phone className="w-4 h-4" />
                        No Contact
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => handleUnlockContact(property.id)}
                      className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                    >
                      <Unlock className="w-4 h-4" />
                      Unlock Contact
                    </button>
                  )}
                  <Link
                    to={`/property/${property.id}`}
                    className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            {likedProperties.length === 0 ? "No liked properties yet" : "No properties match your filters"}
          </h3>
          <p className="text-gray-600 mt-1 mb-4">
            {searchQuery || statusFilter !== "all" || typeFilter !== "all" || priceFilter !== "all"
              ? "Try changing your filters or search query"
              : "Like properties to see them here"}
          </p>
          {searchQuery || statusFilter !== "all" || typeFilter !== "all" || priceFilter !== "all" ? (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setTypeFilter("all");
                setPriceFilter("all");
                setSortBy("recent");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          ) : (
            <Link
              to="/properties"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Browse Properties to Like
            </Link>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/properties?sort=likes"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Heart className="w-4 h-4" />
          View Most Liked
        </Link>
        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          See Trending
        </button>
        <Link
          to="/properties?status=available"
          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Browse Available
        </Link>
      </div>
    </div>
  );
}

export default LikedProperties;