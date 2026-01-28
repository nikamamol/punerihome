import React, { useState, useEffect } from "react";
import {
  MapPin,
  Home,
  Building,
  Bath,
  Star,
  Phone,
  Clock,
  Shield,
  Users,
  Heart,
  Filter,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Share2,
  Check,
  ChevronDown,
  Search,
  ArrowUpDown,
  Eye,
  MessageSquare,
  SquareParking,
  Dumbbell,
  Waves,
  Car,
  TreePine,
  ChevronUp,
  Menu,
  X,
  ArrowDown,
  Bed,
  Square,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";

function PropertiesPage() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [likedProperties, setLikedProperties] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [bedroomsFilter, setBedroomsFilter] = useState(null);

  // Use RTK Query to fetch public properties
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetPublicPropertiesQuery({
    limit: 20, // Show 20 properties initially
    sortBy: 'created_at',
    order: 'desc'
  });

  // Toggle like status
  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedProperties((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle property click to navigate to details page
  const handlePropertyClick = (id) => {
    navigate(`/properties/${id}`);
  };

  // Navigation for image carousel
  const navigateImage = (propertyId, direction, e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const current = prev[propertyId] || 0;
      const property = properties.find((p) => p.id === propertyId);
      if (!property || !property.images) return prev;

      const newIndex =
        direction === "next"
          ? (current + 1) % property.images.length
          : (current - 1 + property.images.length) % property.images.length;

      return {
        ...prev,
        [propertyId]: newIndex,
      };
    });
  };

  // Transform API data to match component format
  const transformProperties = (apiData) => {
    if (!apiData?.success || !apiData?.data) return [];

    return apiData.data.map((property, index) => {
      // Format price
      const formatPrice = (price) => {
        const priceNum = parseFloat(price);
        if (priceNum >= 10000000) return `₹${(priceNum / 10000000).toFixed(1)} Cr`;
        if (priceNum >= 100000) return `₹${(priceNum / 100000).toFixed(1)} L`;
        if (priceNum >= 1000) return `₹${(priceNum / 1000).toFixed(0)} K`;
        return `₹${Math.round(priceNum)}`;
      };

      // Format monthly price
      const formatMonthlyPrice = (price) => {
        const priceNum = parseFloat(price);
        return `₹${priceNum.toLocaleString('en-IN')}`;
      };

      // Format area
      const formatArea = (property) => {
        if (property.built_up_area) {
          return `${property.built_up_area} ${property.area_unit || 'sqft'}`;
        }
        return 'N/A';
      };

      // Get property status
      const getStatus = (property) => {
        if (property.status === 'approved') {
          return 'Available';
        }
        if (property.status === 'pending') {
          return 'Under Review';
        }
        return property.status || 'Available';
      };

      // Get images
      const getImages = (property, index) => {
        const images = [];
        if (property.image_url) {
          images.push(property.image_url);
        }
        // Add fallback Unsplash images based on property type
        const fallbackImages = [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
        ];

        // Add unique images for variety
        const imageIndex = index % fallbackImages.length;
        if (!images.includes(fallbackImages[imageIndex])) {
          images.push(fallbackImages[imageIndex]);
        }

        // Ensure we have at least 3 images
        while (images.length < 3) {
          const nextIndex = (imageIndex + images.length) % fallbackImages.length;
          images.push(fallbackImages[nextIndex]);
        }

        return images.slice(0, 3);
      };

      // Generate amenities based on property features
      const generateAmenities = (property) => {
        const amenities = [];

        // Check property features
        if (property.total_floors > 1) amenities.push("Lift");
        if (property.security_deposit > 0) amenities.push("Security");
        if (property.built_up_area > 1000) amenities.push("Spacious");
        if (property.property_type === 'villa' || property.property_type === 'independent') {
          amenities.push("Private Entrance");
        }
        if (property.balconies > 0) amenities.push("Balcony");

        // Default amenities
        const defaultAmenities = ["Water Supply", "Power Backup", "Parking"];
        amenities.push(...defaultAmenities.slice(0, 3 - amenities.length));

        return amenities;
      };

      // Determine if property is new (less than 7 days old)
      const isNewProperty = (createdAt) => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - createdDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      };

      // Determine if property is trending (based on views)
      const isTrendingProperty = (views) => {
        return views > 100;
      };

      // Determine if property is featured (based on API flag or verification)
      const isFeaturedProperty = (property) => {
        return property.is_featured === 1 || property.verification_status === 'verified';
      };

      return {
        id: property.id,
        property_id: property.property_id,
        isNew: isNewProperty(property.created_at),
        isFeatured: isFeaturedProperty(property),
        isTrending: isTrendingProperty(property.views || 0),
        title: `${property.bedrooms || 2} BHK ${property.property_type || 'Flat'} for ${property.property_for === 'Rent' ? 'Rent' : 'Sale'} in ${property.city || 'Pune'}`,
        location: property.locality || property.city || 'Pune',
        address: `${property.address}, ${property.city}, ${property.state} - ${property.pincode}`,
        price: formatPrice(property.price),
        monthlyPrice: formatMonthlyPrice(property.price),
        originalPrice: property.price_type === 'Monthly' ? null : `₹${(parseFloat(property.price) * 1.1).toLocaleString('en-IN')}`,
        area: formatArea(property),
        areaLabel: "Builtup area",
        bedrooms: property.bedrooms || 2,
        bathrooms: property.bathrooms || 2,
        furnished: property.furnishing_status || 'Semi furnished',
        furnishingsStatus: "Furnishing status",
        amenities: generateAmenities(property),
        images: getImages(property, index),
        updated: property.updated_at ? `${Math.floor((new Date() - new Date(property.updated_at)) / (1000 * 60 * 60 * 24))}d ago` : 'Recently',
        agent: property.owner_name || 'Puneri House Verified',
        agentType: property.verification_status === 'verified' ? 'Property Expert Pro' : 'Property Expert',
        views: property.views || 0,
        inquiries: property.inquiries || 0,
        isRecommended: property.verification_status === 'verified',
        status: getStatus(property),
        property_type: property.property_type,
        city: property.city,
        state: property.state,
        price_type: property.price_type,
        available_from: property.available_from,
        // Original API data for reference
        _original: property
      };
    });
  };

  // Get transformed properties
  const properties = transformProperties(apiResponse);

  // Filter properties based on selected filters
  const filteredProperties = properties.filter((property) => {
    // Apply active filter
    if (activeFilter === "featured" && !property.isFeatured) return false;
    if (activeFilter === "new" && !property.isNew) return false;

    // Apply property type filter
    if (selectedPropertyTypes.length > 0) {
      if (!selectedPropertyTypes.includes(property.property_type)) return false;
    }

    // Apply price range filter
    const propertyPrice = parseFloat(property._original?.price || 0);
    if (propertyPrice < priceRange.min || propertyPrice > priceRange.max) return false;

    // Apply bedrooms filter
    if (bedroomsFilter !== null) {
      if (bedroomsFilter === '4+' && property.bedrooms < 4) return false;
      if (bedroomsFilter !== '4+' && property.bedrooms !== parseInt(bedroomsFilter)) return false;
    }

    // Apply amenities filter
    if (selectedAmenities.length > 0) {
      const hasAllAmenities = selectedAmenities.every(amenity =>
        property.amenities.some(pAmenity =>
          pAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  // Sort properties based on sortBy
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = parseFloat(a._original?.price || 0);
    const priceB = parseFloat(b._original?.price || 0);

    switch (sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'newest':
        return new Date(b._original?.created_at) - new Date(a._original?.created_at);
      case 'popular':
        return b.views - a.views;
      default: // relevance
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  // Auto carousel effect
  useEffect(() => {
    const intervals = {};

    properties.forEach((property) => {
      if (property.images && property.images.length > 1) {
        intervals[property.id] = setInterval(() => {
          setCurrentImageIndex((prev) => ({
            ...prev,
            [property.id]:
              ((prev[property.id] || 0) + 1) % property.images.length,
          }));
        }, 4000);
      }
    });

    return () => {
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [properties]);

  // Handle filter changes
  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handlePropertyTypeToggle = (type) => {
    setSelectedPropertyTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleBedroomsFilter = (bhk) => {
    setBedroomsFilter(bhk === bedroomsFilter ? null : bhk);
  };

  const handleResetFilters = () => {
    setSelectedAmenities([]);
    setSelectedPropertyTypes([]);
    setPriceRange({ min: 0, max: 1000000 });
    setBedroomsFilter(null);
    setActiveFilter("all");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="lg:hidden sticky top-13 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-3">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Flats in Pune</h1>
              <p className="text-xs text-gray-600">Loading properties...</p>
            </div>
            <button className="p-2 bg-gray-200 rounded-lg text-gray-900 animate-pulse">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            {/* Skeleton properties */}
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="flex flex-col md:flex-row h-full animate-pulse">
                    <div className="relative group/image h-48 md:h-auto md:w-2/5 bg-gray-200"></div>
                    <div className="p-4 md:w-3/5">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="h-8 bg-gray-200 rounded"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Error Loading Properties
              </h3>
              <p className="text-red-600 mb-4">
                {error?.data?.message || "Failed to load properties. Please try again."}
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-13 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Properties in Pune</h1>
            <p className="text-xs text-gray-600">{properties.length} properties</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 bg-yellow-500 rounded-lg text-gray-900"
          >
            {showFilters ? <X size={20} /> : <Filter size={20} />}
          </button>
        </div>

        {/* Mobile Sort Bar */}
        <div className="px-3 pb-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">Sort by:</div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-48 bg-white border border-gray-300 rounded px-3 py-1.5 text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Properties for {properties[0]?._original?.property_for === 'Sale' ? 'Sale' : 'Rent'} in Pune
                </h1>
                <p className="text-gray-600 mt-1">
                  Showing {sortedProperties.length} of {properties.length} properties
                </p>
              </div>
              <div className="mt-3 md:mt-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded px-3 py-1.5 pr-8 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-200"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="popular">Most Popular</option>
                    </select>
                    <ArrowUpDown
                      size={14}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-3 md:p-4 mb-6">
              <p className="text-gray-700 text-sm">
                Looking for Properties in Pune?{" "}
                <span className="font-semibold">Puneri House</span> offers
                {properties.length}+ properties for {properties[0]?._original?.property_for === 'Sale' ? 'sale' : 'rent'} in prime locations.
                <span className="text-yellow-600 font-semibold cursor-pointer hover:text-yellow-700 ml-1">
                  Read more
                </span>
              </p>
            </div>
          </div>

          {/* Mobile Description Box */}
          <div className="lg:hidden mb-4">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-3">
              <p className="text-gray-700 text-xs">
                <span className="font-semibold">Puneri House</span> offers
                {properties.length}+ properties in Pune.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
            {/* Mobile Filters Overlay */}
            {showFilters && (
              <div
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setShowFilters(false)}
              >
                <div
                  className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        Filters ({selectedAmenities.length + selectedPropertyTypes.length})
                      </h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Mobile Filter Content */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Property Type
                        </h4>
                        <div className="space-y-2">
                          {['Flat', 'Apartment', 'Villa', 'Independent', 'Studio'].map((type) => (
                            <label
                              key={type}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedPropertyTypes.includes(type)}
                                  onChange={() => handlePropertyTypeToggle(type)}
                                  className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  {type}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          BHK Type
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map(
                            (bhk) => (
                              <button
                                key={bhk}
                                onClick={() => handleBedroomsFilter(bhk)}
                                className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${bedroomsFilter === bhk
                                  ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                                  : "border-gray-300 text-gray-700 hover:border-yellow-400"
                                  }`}
                              >
                                {bhk}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Price Range
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <input
                              type="range"
                              min="0"
                              max="1000000"
                              value={priceRange.min}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                              className="w-full"
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>₹{priceRange.min.toLocaleString('en-IN')}</span>
                            <span>₹{priceRange.max.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleResetFilters}
                          className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded hover:border-gray-400 transition-all text-sm"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => setShowFilters(false)}
                          className="flex-1 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Left Column - Properties List */}
            <div className="lg:col-span-8">
              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${activeFilter === "all"
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-yellow-400"
                    }`}
                >
                  All ({properties.length})
                </button>
                <button
                  onClick={() => setActiveFilter("featured")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${activeFilter === "featured"
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-yellow-400"
                    }`}
                >
                  Featured ({properties.filter(p => p.isFeatured).length})
                </button>
                <button
                  onClick={() => setActiveFilter("new")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${activeFilter === "new"
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-yellow-400"
                    }`}
                >
                  New ({properties.filter(p => p.isNew).length})
                </button>
              </div>

              {/* Properties Grid - Mobile Optimized */}
              {sortedProperties.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search criteria.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedProperties.map((property) => {
                    const currentIndex = currentImageIndex[property.id] || 0;

                    return (
                      <div
                        key={property.id}
                        onClick={() => handlePropertyClick(property.id)}
                        className={`bg-white rounded-lg shadow-sm overflow-hidden border transition-all duration-200 hover:shadow-md group cursor-pointer ${property.isFeatured
                          ? "border-yellow-300"
                          : "border-gray-200"
                          }`}
                      >
                        <div className="flex flex-col md:flex-row h-full">
                          {/* Image Section */}
                          <div className="relative group/image h-48 md:h-auto md:w-2/5">
                            <div className="h-full w-full relative overflow-hidden bg-gray-100">
                              <div className="relative h-full w-full">
                                <img
                                  src={property.images?.[currentIndex]}
                                  alt={property.title}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                                  onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
                                  }}
                                />

                                {/* Carousel Navigation Arrows */}
                                {property.images &&
                                  property.images.length > 1 && (
                                    <>
                                      <button
                                        onClick={(e) =>
                                          navigateImage(property.id, "prev", e)
                                        }
                                        className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
                                      >
                                        <ChevronLeft size={18} />
                                      </button>
                                      <button
                                        onClick={(e) =>
                                          navigateImage(property.id, "next", e)
                                        }
                                        className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
                                      >
                                        <ChevronRight size={18} />
                                      </button>
                                    </>
                                  )}

                                {/* Badges on Image */}
                                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                                  {property.isNew && (
                                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                                      New
                                    </span>
                                  )}
                                  {property.isTrending && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                      Trending
                                    </span>
                                  )}
                                  {property.isFeatured && (
                                    <span className="bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                                      Featured
                                    </span>
                                  )}
                                  {property._original?.verification_status === 'verified' && (
                                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                                      Verified
                                    </span>
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                                  <button
                                    onClick={(e) => toggleLike(property.id, e)}
                                    className={`p-2 rounded-full shadow-sm transition-all ${likedProperties[property.id]
                                      ? "bg-red-500 text-white"
                                      : "bg-white/90 hover:bg-white text-gray-600"
                                      }`}
                                  >
                                    <Heart
                                      size={16}
                                      fill={
                                        likedProperties[property.id]
                                          ? "currentColor"
                                          : "none"
                                      }
                                    />
                                  </button>
                                </div>

                                {/* View Count */}
                                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1 z-10">
                                  <Eye size={10} />
                                  <span>{property.views} views</span>
                                </div>

                                {/* Carousel Indicators */}
                                {property.images &&
                                  property.images.length > 1 && (
                                    <div className="absolute bottom-3 right-3 flex space-x-1.5 z-10">
                                      {property.images.map((_, idx) => (
                                        <button
                                          key={idx}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex((prev) => ({
                                              ...prev,
                                              [property.id]: idx,
                                            }));
                                          }}
                                          className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                                            ? "bg-yellow-400"
                                            : "bg-white/80"
                                            }`}
                                        />
                                      ))}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>

                          {/* Property Details Section */}
                          <div className="p-4 md:w-3/5 flex flex-col justify-between">
                            {/* Top Row - Title, Price, Features */}
                            <div>
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors line-clamp-2">
                                    {property.title}
                                  </h3>
                                  <div className="flex items-center text-gray-700 mb-1">
                                    <MapPin
                                      size={12}
                                      className="text-yellow-500 mr-1 flex-shrink-0"
                                    />
                                    <span className="font-medium text-xs md:text-sm truncate">
                                      {property.location}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 truncate">
                                    {property.address}
                                  </p>
                                </div>

                                <div className="text-right ml-2 flex-shrink-0">
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-lg md:text-xl font-bold text-gray-900">
                                      {property.monthlyPrice}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      /mo
                                    </span>
                                  </div>
                                  {property.originalPrice && (
                                    <div className="text-xs text-gray-500 line-through mt-0.5">
                                      {property.originalPrice}
                                    </div>
                                  )}
                                  <button
                                    className="mt-1 text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/properties/${property.id}/`);
                                    }}
                                  >
                                    price breakup
                                  </button>
                                </div>
                              </div>

                              {/* Property Features */}
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1">
                                  <Bed size={14} className="text-gray-500" />
                                  <span className="text-sm text-gray-700">{property.bedrooms} Beds</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Bath size={14} className="text-gray-500" />
                                  <span className="text-sm text-gray-700">{property.bathrooms} Baths</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Square size={14} className="text-gray-500" />
                                  <span className="text-sm text-gray-700">{property.area}</span>
                                </div>
                              </div>

                              {/* Amenities */}
                              <div className="mb-3">
                                <div className="flex flex-wrap gap-1">
                                  {property.amenities
                                    .slice(0, 3)
                                    .map((amenity, index) => (
                                      <span
                                        key={index}
                                        className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                                      >
                                        {amenity}
                                      </span>
                                    ))}
                                  {property.amenities.length > 3 && (
                                    <span className="text-xs text-yellow-600 font-medium">
                                      +{property.amenities.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Middle Row - Property Features */}
                            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3">
                              <div>
                                <div className="text-base md:text-lg font-bold text-gray-900">
                                  {property.area}
                                </div>
                                <div className="text-xs text-gray-500">Area</div>
                              </div>

                              <div>
                                <div className="text-base md:text-lg font-bold text-gray-900">
                                  {property.furnished}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Furnish
                                </div>
                              </div>

                              <div>
                                <div className="text-base md:text-lg font-bold text-gray-900">
                                  Updated
                                </div>
                                <div className="text-xs text-gray-500">
                                  {property.updated}
                                </div>
                              </div>
                            </div>

                            {/* Bottom Row - Agent Info and Buttons */}
                            <div className="pt-3 border-t border-gray-100">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Shield size={10} className="text-gray-900" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-semibold text-gray-900 text-xs md:text-sm truncate">
                                      {property.agent}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                      {property.agentType}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {property.isRecommended && (
                                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap">
                                      Recommended
                                    </span>
                                  )}

                                  <button
                                    className="px-2 py-1.5 md:px-3 md:py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 text-xs md:text-sm font-bold rounded hover:from-yellow-600 hover:to-yellow-500 transition-all whitespace-nowrap flex items-center gap-1"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Contact button action
                                      console.log(
                                        `Contact agent for property ${property.id}`
                                      );
                                    }}
                                  >
                                    <Phone size={12} />
                                    <span className="hidden sm:inline">
                                      Contact
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Load More Button */}
              {sortedProperties.length > 0 && (
                <div className="mt-6 text-center">
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 min-w-[180px] justify-center whitespace-nowrap hover:scale-105 transform mx-auto">
                    <Plus size={20} />
                    Load More Properties
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Showing {sortedProperties.length} of {properties.length} properties
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar (Desktop only) */}
            <div className="hidden lg:block lg:col-span-4">
              {/* Filters Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Filters ({selectedAmenities.length + selectedPropertyTypes.length})
                  </h3>
                  {(selectedAmenities.length > 0 || selectedPropertyTypes.length > 0) && (
                    <button
                      onClick={handleResetFilters}
                      className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Property Type */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Property Type
                    </h4>
                    <div className="space-y-2">
                      {['Flat', 'Apartment', 'Villa', 'Independent', 'Studio'].map((type) => (
                        <label
                          key={type}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedPropertyTypes.includes(type)}
                              onChange={() => handlePropertyTypeToggle(type)}
                              className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 h-4 w-4"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {type}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {properties.filter(p => p.property_type === type).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* BHK Type */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      BHK Type
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map(
                        (bhk) => (
                          <button
                            key={bhk}
                            onClick={() => handleBedroomsFilter(bhk)}
                            className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${bedroomsFilter === bhk
                              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                              : "border-gray-300 text-gray-700 hover:border-yellow-400"
                              }`}
                          >
                            {bhk}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Price Range
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 1000000 }))}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div className="pt-2">
                        <input
                          type="range"
                          min="0"
                          max="1000000"
                          step="10000"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Amenities
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["Lift", "Security", "Parking", "Water Supply", "Power Backup", "Balcony"].map((amenity) => (
                        <button
                          key={amenity}
                          onClick={() => handleAmenityToggle(amenity)}
                          className={`flex items-center justify-center gap-1 p-2 border rounded text-sm font-medium transition-colors ${selectedAmenities.includes(amenity)
                            ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                            : "border-gray-300 text-gray-700 hover:border-yellow-400"
                            }`}
                        >
                          {selectedAmenities.includes(amenity) && <Check size={12} />}
                          {amenity}
                        </button>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-4 mt-3">
                      Featured Properties
                    </h3>

                    <div className="space-y-4">
                      {properties
                        .filter(p => p.isFeatured)
                        .slice(0, 3)
                        .map((featured) => (
                          <div
                            key={featured.id}
                            onClick={() => handlePropertyClick(featured.id)}
                            className="border border-gray-200 rounded-lg hover:border-yellow-300 transition-colors cursor-pointer overflow-hidden group"
                          >
                            <div className="flex items-start h-28">
                              <div className="w-24 h-full flex-shrink-0 relative overflow-hidden">
                                <img
                                  src={featured.images[0]}
                                  alt={featured.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                              </div>
                              <div className="flex-1 p-3">
                                <div className="flex items-baseline gap-1 mb-1">
                                  <span className="text-lg font-bold text-gray-900">
                                    {featured.monthlyPrice}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    per month
                                  </span>
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                                  {featured.title}
                                </h4>
                                <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                                  {featured.location}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="text-xs text-gray-500 truncate">
                                    {featured.agent}
                                  </div>
                                  <span className="text-xs font-medium text-yellow-600 whitespace-nowrap">
                                    {featured.agentType}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-4 mt-3">
                      Property Statistics
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Total Properties</div>
                        <div className="text-xl font-bold text-gray-900">{properties.length}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Average Price</div>
                        <div className="text-xl font-bold text-gray-900">
                          ₹{Math.round(properties.reduce((sum, p) => sum + parseFloat(p._original?.price || 0), 0) / properties.length).toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Verified Properties</div>
                        <div className="text-xl font-bold text-gray-900">
                          {properties.filter(p => p._original?.verification_status === 'verified').length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesPage;