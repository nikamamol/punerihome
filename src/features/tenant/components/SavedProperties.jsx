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
  SortAsc,
  SortDesc,
  RefreshCw,
  Star,
  Calendar,
  TrendingUp,
  TrendingDown,
  Unlock,
  Download,
  Loader,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  Car,
  Users,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useGetSavedPropertiesQuery, useUnsavePropertyMutation } from "../../../store/api/propertyApi";
import { Link } from "react-router-dom";

function SavedProperties() {
  // Get auth state
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  // RTK Query hooks
  const {
    data: savedPropertiesData,
    isLoading,
    isError,
    error,
    refetch: refetchSavedProperties,
  } = useGetSavedPropertiesQuery(undefined, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  // Unsave property mutation
  const [unsaveProperty, { isLoading: isUnsaving }] = useUnsavePropertyMutation();

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Image carousel state for each property
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  // Fallback images array
  const fallbackImages = [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop',
  ];

  // Transform API data to component format
  const savedProperties = useMemo(() => {
    if (!savedPropertiesData?.success || !savedPropertiesData.data) {
      console.log('No saved properties data:', savedPropertiesData);
      return [];
    }

    console.log('Raw API Response for Saved Properties:', savedPropertiesData.data[0]);

    return savedPropertiesData.data.map((property, index) => {
      // Format price
      const formatPrice = (price) => {
        if (!price) return 'Price on Request';
        const priceNum = parseFloat(price);
        if (priceNum >= 10000000) return `₹${(priceNum / 10000000).toFixed(1)} Cr`;
        if (priceNum >= 100000) return `₹${(priceNum / 100000).toFixed(1)} L`;
        if (priceNum >= 1000) return `₹${Math.round(priceNum / 1000)}K`;
        return `₹${priceNum}`;
      };

      // Get images from property
      const getImages = (property) => {
        const images = [];
        console.log('Processing saved property images:', property.images);

        // If property has images array
        if (property.images && Array.isArray(property.images)) {
          property.images.forEach(img => {
            if (typeof img === 'string') {
              images.push(img);
            } else if (img.url) {
              images.push(img.url);
            } else if (img.image_url) {
              images.push(img.image_url);
            }
          });
        }

        // If property has image_url directly
        if (property.image_url && !images.includes(property.image_url)) {
          images.unshift(property.image_url);
        }

        // If no images found, use fallback
        if (images.length === 0) {
          const propertyType = property.property_type?.toLowerCase() || 'apartment';
          const typeImages = {
            'apartment': fallbackImages[0],
            'flat': fallbackImages[1],
            'villa': fallbackImages[2],
            'penthouse': fallbackImages[0],
            'independent': fallbackImages[1],
            'studio': fallbackImages[2],
          };
          images.push(typeImages[propertyType] || fallbackImages[index % fallbackImages.length]);
        }

        console.log('Final images for property:', images);
        return images;
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
          'house': 'House',
          'independent': 'Independent House'
        };
        return types[type?.toLowerCase()] || type || 'Property';
      };

      // Format date
      const formatDate = (dateString) => {
        if (!dateString) return 'Recently';
        try {
          const date = new Date(dateString);
          const now = new Date();
          const diffTime = Math.abs(now - date);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 0) return 'Today';
          if (diffDays === 1) return 'Yesterday';
          if (diffDays < 7) return `${diffDays} days ago`;
          if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
          if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
          return `${Math.floor(diffDays / 365)} years ago`;
        } catch {
          return 'Recently';
        }
      };

      // Get status
      const getStatus = (status) => {
        const statusMap = {
          'approved': 'Available',
          'pending': 'Under Review',
          'rejected': 'Rejected',
          'sold': 'Sold',
          'rented': 'Rented',
          'negotiation': 'Under Negotiation'
        };
        return statusMap[status] || 'Available';
      };

      // Get amenities
      const getAmenities = (property) => {
        if (property.amenities && Array.isArray(property.amenities)) {
          return property.amenities.slice(0, 5);
        }

        const amenities = [];
        if (property.parking) amenities.push('Parking');
        if (property.lift) amenities.push('Lift');
        if (property.power_backup) amenities.push('Power Backup');
        if (property.water_supply) amenities.push('24x7 Water');
        if (property.security) amenities.push('Security');
        if (property.gym) amenities.push('Gym');
        if (property.swimming_pool) amenities.push('Swimming Pool');
        if (property.club_house) amenities.push('Club House');

        if (amenities.length === 0) {
          return ['Parking', 'Power Backup', 'Water Supply', 'Security'];
        }

        return amenities.slice(0, 5);
      };

      return {
        id: property.id || property.property_id,
        title: property.title || `${property.bedrooms || 2} BHK ${getPropertyType(property.property_type)}`,
        location: property.locality || property.area || property.city || 'Location not specified',
        price: formatPrice(property.price),
        originalPrice: property.price || 0,
        type: getPropertyType(property.property_type),
        bhk: property.bedrooms ? `${property.bedrooms} BHK` : 'N/A',
        area: property.built_up_area ? `${property.built_up_area} ${property.area_unit || 'sq ft'}` : 'Area not specified',
        savedDate: property.saved_at || property.created_at || new Date().toISOString(),
        formattedSavedDate: formatDate(property.saved_at || property.created_at),
        lastViewed: property.last_viewed || new Date().toISOString(),
        formattedLastViewed: formatDate(property.last_viewed),
        views: property.views || 0,
        likes: property.likes || 0,
        status: getStatus(property.status),
        owner: property.owner_name || 'Owner',
        ownerPhone: property.owner_phone || '',
        amenities: getAmenities(property),
        images: getImages(property),
        description: property.description || 'No description available.',
        isSaved: true,
        contactUnlocked: false,
        rating: (property.rating || (Math.random() * 1.5 + 3.5)).toFixed(1),
        bedrooms: property.bedrooms || 2,
        bathrooms: property.bathrooms || 2,
        furnishing: property.furnishing_status || property.furnishing_type || 'Semi-Furnished',
        facing: property.facing || 'North-East',
        floor: property.floor_number ? `${property.floor_number} Floor` : 'Ground Floor',
        propertyFor: property.property_for || 'Sale',
        city: property.city || '',
        locality: property.locality || '',
        // Original API data for reference
        _original: property
      };
    });
  }, [savedPropertiesData]);

  // Initialize image indices
  useEffect(() => {
    const initialIndices = {};
    savedProperties.forEach(property => {
      if (property.id && !(property.id in initialIndices)) {
        initialIndices[property.id] = 0;
      }
    });
    setCurrentImageIndices(initialIndices);
  }, [savedProperties]);

  // Filter and search properties
  useEffect(() => {
    let filtered = [...savedProperties];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.locality?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.city?.toLowerCase().includes(searchQuery.toLowerCase())
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
        "under-50": (property) => parseFloat(property.originalPrice) < 5000000,
        "50-100": (property) => parseFloat(property.originalPrice) >= 5000000 && parseFloat(property.originalPrice) < 10000000,
        "100-500": (property) => parseFloat(property.originalPrice) >= 10000000 && parseFloat(property.originalPrice) < 50000000,
        "500+": (property) => parseFloat(property.originalPrice) >= 50000000,
      };
      if (priceRanges[priceFilter]) {
        filtered = filtered.filter(priceRanges[priceFilter]);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.savedDate) - new Date(a.savedDate);
      } else if (sortBy === "oldest") {
        return new Date(a.savedDate) - new Date(b.savedDate);
      } else if (sortBy === "price-high") {
        return b.originalPrice - a.originalPrice;
      } else if (sortBy === "price-low") {
        return a.originalPrice - b.originalPrice;
      } else if (sortBy === "views-high") {
        return b.views - a.views;
      } else if (sortBy === "rating-high") {
        return b.rating - a.rating;
      }
      return 0;
    });

    setFilteredProperties(filtered);
  }, [searchQuery, statusFilter, typeFilter, priceFilter, sortBy, savedProperties]);

  // Handle image navigation
  const handleImageNavigation = useCallback((propertyId, direction) => {
    setCurrentImageIndices(prev => {
      const currentIndex = prev[propertyId] || 0;
      const property = savedProperties.find(p => p.id === propertyId);
      if (!property || !property.images || property.images.length <= 1) return prev;

      let newIndex;
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % property.images.length;
      } else {
        newIndex = (currentIndex - 1 + property.images.length) % property.images.length;
      }

      return {
        ...prev,
        [propertyId]: newIndex
      };
    });
  }, [savedProperties]);

  // Handle unsave property
  const handleUnsave = useCallback(async (propertyId) => {
    try {
      await unsaveProperty(propertyId).unwrap();
      // The data will automatically update due to RTK Query cache invalidation
    } catch (error) {
      console.error('Failed to unsave property:', error);
      alert('Failed to unsave property. Please try again.');
    }
  }, [unsaveProperty]);

  // Handle unlock contact
  const handleUnlockContact = useCallback((propertyId) => {
    // Implement contact unlock logic here
    alert('Contact unlock functionality would be implemented here');
  }, []);

  // Get status color
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Under Negotiation": return "bg-orange-100 text-orange-800";
      case "Sold": return "bg-red-100 text-red-800";
      case "Rented": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = savedProperties.length;
    const available = savedProperties.filter(p => p.status === "Available").length;
    const unlocked = savedProperties.filter(p => p.contactUnlocked).length;
    const trending = savedProperties.filter(p => p.views > 100).length;
    const totalViews = savedProperties.reduce((sum, p) => sum + p.views, 0);
    const avgRating = total > 0
      ? (savedProperties.reduce((sum, p) => sum + parseFloat(p.rating), 0) / total).toFixed(1)
      : 0;

    return {
      total,
      available,
      unlocked,
      trending,
      totalViews,
      avgRating,
    };
  }, [savedProperties]);

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } catch {
      return 'N/A';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading saved properties...</p>
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
            {error?.data?.message || "Failed to load saved properties. Please try again."}
          </p>
          <button
            onClick={() => refetchSavedProperties()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No user state
  if (!userId) {
    return (
      <div className="p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <Bookmark className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Login Required</h3>
          <p className="text-yellow-600 mb-4">
            Please login to view your saved properties.
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

  // No saved properties state
  if (savedProperties.length === 0 && !isLoading) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved properties yet</h3>
          <p className="text-gray-600 mb-4">
            Properties you save will appear here. Start exploring and save properties you're interested in!
          </p>
          <Link
            to="/properties"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-500 inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Browse Properties
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
            <h1 className="text-xl font-bold text-gray-900">Saved Properties</h1>
            <p className="text-sm text-gray-600 mt-1">
              {savedProperties.length} properties saved • Manage your favorite listings
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetchSavedProperties()}
              className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-1"
              disabled={isLoading}
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <Link
              to="/properties"
              className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
            >
              <Home className="w-3 h-3" />
              Browse More
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-600">Total Saved</div>
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
          <div className="text-xl font-bold text-purple-700">{stats.totalViews}</div>
          <div className="text-xs text-purple-600">Total Views</div>
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
                placeholder="Search saved properties..."
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
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
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
              <option value="Independent House">Independent House</option>
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
              <option value="recent">Recently Saved</option>
              <option value="oldest">Oldest Saved</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="views-high">Most Views</option>
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

      {/* Saved Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => {
          const currentImageIndex = currentImageIndices[property.id] || 0;
          const currentImage = property.images?.[currentImageIndex] || fallbackImages[0];

          return (
            <div key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={currentImage}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                  }}
                />

                {/* Navigation buttons for image carousel */}
                {property.images && property.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageNavigation(property.id, 'prev');
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageNavigation(property.id, 'next');
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Image indicators */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {property.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndices(prev => ({
                              ...prev,
                              [property.id]: idx
                            }));
                          }}
                          className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-blue-500" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Property badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                    {property.status}
                  </span>
                  {property._original?.is_featured && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">
                      Featured
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnsave(property.id);
                    }}
                    disabled={isUnsaving}
                    className="p-1.5 bg-white text-blue-500 rounded-full hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    title="Unsave property"
                  >
                    <Bookmark className="w-4 h-4 fill-blue-500" />
                  </button>
                </div>

                {/* View count */}
                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{property.views} views</span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-4">
                {/* Title and Location */}
                <div className="mb-3">
                  <h3 className="font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-xl font-bold text-blue-700">{property.price}</div>
                  {property.propertyFor === 'Rent' && (
                    <div className="text-xs text-gray-500">{property.propertyFor}</div>
                  )}
                </div>

                {/* Property Specifications */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-center gap-1 text-sm font-medium text-gray-900">
                      <Bed className="w-3 h-3" />
                      {property.bhk}
                    </div>
                    <div className="text-xs text-gray-500">Bedrooms</div>
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
                </div>

                {/* Amenities */}
                {property.amenities && property.amenities.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                      {property.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{property.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Saved: {property.formattedSavedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      Viewed: {property.formattedLastViewed}
                    </div>
                  </div>
                  <div className="text-right">
                    <div>{property._original?.days_on_market || Math.floor(Math.random() * 60) + 1} days on market</div>
                  </div>
                </div>

                {/* Owner and Contact */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium text-gray-900">
                      Owner: {property.owner}
                    </div>
                    {property.contactUnlocked ? (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <Shield className="w-3 h-3" />
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
                          className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-colors"
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
                        className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 transition-colors"
                      >
                        <Unlock className="w-4 h-4" />
                        Unlock Contact
                      </button>
                    )}
                    <Link
                      to={`/property/${property.id}`}
                      className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State after filtering */}
      {filteredProperties.length === 0 && savedProperties.length > 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties match your filters</h3>
          <p className="text-gray-600 mt-1 mb-4">
            Try changing your filters or search query
          </p>
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
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-blue-900">Save Properties for Later</h3>
            <p className="text-sm text-blue-700">
              Saved properties help you keep track of listings you're interested in
            </p>
          </div>
          <div className="text-sm text-blue-900">
            <div className="font-bold">{savedProperties.length} properties saved</div>
            <div className="text-xs">Last saved: {formatDisplayDate(savedProperties[0]?.savedDate)}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/properties?sort=popular"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Popular Properties
        </Link>
        <Link
          to="/properties"
          className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Browse Properties
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Bookmark className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default SavedProperties;