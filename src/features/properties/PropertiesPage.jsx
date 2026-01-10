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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function PropertiesPage() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [likedProperties, setLikedProperties] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

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
    // अगर React Router use नहीं कर रहे हैं, तो window.location का use करें:
    // window.location.href = `/property/${id}`;
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

  const properties = [
    {
      id: 1,
      isNew: true,
      isFeatured: false,
      title: "1.5 BHK Flat for rent in Hinjawadi",
      location: "Paranjape Blue Ridge",
      address: "Phase 2, Hinjawadi, Pune",
      price: "₹29,999",
      originalPrice: "₹32,000",
      area: "750 sq.ft",
      areaLabel: "Builtup area",
      bedrooms: 1,
      bathrooms: 1,
      furnished: "Fully furnished",
      furnishingsStatus: "Furnishing status",
      amenities: ["Pool", "Gym", "Lift", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      ],
      updated: "2w ago",
      agent: "Puneri House Verified",
      agentType: "Property Expert Pro",
      views: 128,
      isRecommended: true,
      isTrending: false,
    },
    {
      id: 2,
      isNew: false,
      isFeatured: true,
      title: "3 BHK Flat for rent in Mundhwa",
      location: "Mantra Mesmer Phase 3",
      address: "Mundhwa, Pune",
      price: "₹36,000",
      area: "1305 sq.ft",
      areaLabel: "Builtup area",
      bedrooms: 3,
      bathrooms: 2,
      furnished: "Semi furnished",
      furnishingsStatus: "Furnishing status",
      amenities: ["Club House", "Garden", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1560448205-97abe7378152?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      ],
      updated: "1w ago",
      agent: "Puneri House Premium",
      agentType: "Property Expert Pro",
      views: 245,
      isRecommended: true,
      isTrending: true,
    },
    {
      id: 3,
      isFeatured: true,
      title: "3 BHK Luxury Apartment",
      location: "Phadnis Sahil Serene",
      address: "Koregaon Park, Pune",
      price: "₹47,000",
      area: "1450 sq.ft",
      areaLabel: "Builtup area",
      bedrooms: 3,
      bathrooms: 3,
      furnished: "Fully furnished",
      furnishingsStatus: "Furnishing status",
      amenities: ["Pool", "Gym", "Concierge"],
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      ],
      updated: "3d ago",
      agent: "Puneri House Elite",
      agentType: "Property Expert Pro",
      views: 189,
      isRecommended: false,
      isTrending: true,
    },
    {
      id: 4,
      isFeatured: true,
      title: "1 BHK Modern Apartment",
      location: "Parmar Square, Rasta Peth",
      address: "Rasta Peth, Pune",
      price: "₹27,000",
      area: "650 sq.ft",
      areaLabel: "Builtup area",
      bedrooms: 1,
      bathrooms: 1,
      furnished: "Semi furnished",
      furnishingsStatus: "Furnishing status",
      amenities: ["Lift", "Security", "Power Backup"],
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      ],
      updated: "5d ago",
      agent: "Puneri House Verified",
      agentType: "Property Expert Pro",
      views: 156,
      isRecommended: true,
      isTrending: false,
    },
    {
      id: 5,
      isFeatured: true,
      title: "4.5 BHK Luxury Villa",
      location: "Stratford Verde Residency",
      address: "Baner, Pune",
      price: "₹3,00,000",
      area: "3200 sq.ft",
      areaLabel: "Builtup area",
      bedrooms: 4,
      bathrooms: 5,
      furnished: "Fully furnished",
      furnishingsStatus: "Furnishing status",
      amenities: ["Private Pool", "Garden", "3 Car Parking"],
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1600585154340-963ed7476c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      ],
      updated: "1d ago",
      agent: "Puneri House Elite",
      agentType: "Property Expert Premium",
      views: 89,
      isRecommended: false,
      isTrending: true,
    },
    {
      id: 6,
      isNew: true,
      isFeatured: false,
      title: "2 BHK Flat for rent in Wakad",
      location: "Sky Vista Towers",
      address: "Wakad, Pune",
      price: "₹22,500",
      originalPrice: "₹25,000",
      area: "950 sq.ft",
      areaLabel: "Builtup area",
      bedrooms: 2,
      bathrooms: 2,
      furnished: "Semi furnished",
      furnishingsStatus: "Furnishing status",
      amenities: ["Gym", "Parking", "Play Area"],
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      ],
      updated: "4h ago",
      agent: "Puneri House Verified",
      agentType: "Property Expert Basic",
      views: 42,
      isRecommended: true,
      isTrending: false,
    },
  ];

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return property.isFeatured;
    if (activeFilter === "new") return property.isNew;
    return true;
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
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-13 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Flats in Pune</h1>
            <p className="text-xs text-gray-600">21046+ properties</p>
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
                  Flats for Rent in Pune
                </h1>
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
                Looking for Rental Property in Pune?{" "}
                <span className="font-semibold">Puneri House</span> offers
                21138+ Flats for rent & 845+ Houses for rent. Search from 15157+
                2 & 3 BHK Flats in prime locations.
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
                21138+ Flats for rent in Pune.
                <span className="text-yellow-600 font-semibold cursor-pointer hover:text-yellow-700 ml-1">
                  Read more
                </span>
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
                        Filters
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
                          Price Range
                        </h4>
                        <div className="space-y-2">
                          {[
                            "Under ₹20,000",
                            "₹20,000 - ₹30,000",
                            "₹30,000 - ₹50,000",
                            "Above ₹50,000",
                          ].map((price, idx) => (
                            <label
                              key={idx}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  {price}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                1,234
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Property Type
                        </h4>
                        <div className="space-y-2">
                          {["Flat", "House", "Villa", "PG"].map((type, idx) => (
                            <label
                              key={idx}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  {type}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                1,234
                              </span>
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
                            (bhk, idx) => (
                              <button
                                key={idx}
                                className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${
                                  activeFilter === bhk
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

                      <button className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm">
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Left Column - Properties List */}
            <div className="lg:col-span-8">
              {/* Properties Grid - Mobile Optimized */}
              <div className="space-y-3">
                {filteredProperties.map((property) => {
                  const currentIndex = currentImageIndex[property.id] || 0;

                  return (
                    <div
                      key={property.id}
                      onClick={() => handlePropertyClick(property.id)}
                      className={`bg-white rounded-lg shadow-sm overflow-hidden border transition-all duration-200 hover:shadow-md group cursor-pointer ${
                        property.isFeatured
                          ? "border-yellow-300"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row h-full">
                        {/* Image Section - Mobile: Full width, Desktop: 2/5 */}
                        <div className="relative group/image h-48 md:h-auto md:w-2/5">
                          <div className="h-full w-full relative overflow-hidden bg-gray-100">
                            <div className="relative h-full w-full">
                              <img
                                src={property.images?.[currentIndex]}
                                alt={property.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                              />

                              {/* Carousel Navigation Arrows - Show on hover */}
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
                              </div>

                              {/* Action Buttons */}
                              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                                <button
                                  onClick={(e) => toggleLike(property.id, e)}
                                  className={`p-2 rounded-full shadow-sm transition-all ${
                                    likedProperties[property.id]
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
                                        className={`w-2 h-2 rounded-full transition-all ${
                                          idx === currentIndex
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
                                    {property.price}
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

                            {/* Amenities - Mobile: Show less */}
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

              {/* Load More Button */}
              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 min-w-[180px] justify-center whitespace-nowrap hover:scale-105 transform mx-auto">
                  <ChevronDown size={20} />{" "}
                  {/* or use: <Plus size={20} /> or <ArrowDown size={20} /> */}
                  Load More Properties
                </button>
              </div>
            </div>

            {/* Right Column - Sidebar (Desktop only) */}
            <div className="hidden lg:block lg:col-span-4">
              {/* Featured Properties Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Featured Properties
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      id: 3,
                      price: "₹47,000",
                      title: "3 BHK Apartment",
                      location: "Phadnis Sahil Serene, Koregaon Park",
                      agent: "Rental Dharagar",
                      agentType: "Property Expert Pro",
                      icon: <Building size={16} className="text-yellow-500" />,
                      images: [
                        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
                      ],
                    },
                    {
                      id: 4,
                      price: "₹27,000",
                      title: "1 BHK Apartment",
                      location: "Parmar Square, Rasta Peth",
                      agent: "Tajas Yevanie",
                      agentType: "Property Expert Pro",
                      icon: <Home size={16} className="text-yellow-500" />,
                      images: [
                        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
                      ],
                    },
                    {
                      id: 5,
                      price: "₹3,00,000",
                      title: "4.5 BHK Apartment",
                      location: "Stratford Verde Residency, Baner",
                      agent: "Puneri House Elite",
                      agentType: "Property Expert Premium",
                      icon: <Building size={16} className="text-yellow-500" />,
                      images: [
                        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
                      ],
                    },
                  ].map((featured, idx) => (
                    <div
                      key={idx}
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
                              {featured.price}
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
              </div>

              {/* Filters Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Filters
                </h3>

                <div className="space-y-4">
                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Price Range
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Under ₹20,000", count: "1,234" },
                        { label: "₹20,000 - ₹30,000", count: "4,567" },
                        { label: "₹30,000 - ₹50,000", count: "2,345" },
                        { label: "Above ₹50,000", count: "890" },
                      ].map((price, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 h-4 w-4"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {price.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {price.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Property Type
                    </h4>
                    <div className="space-y-2">
                      {["Flat", "House", "Villa", "PG"].map((type, idx) => (
                        <label
                          key={idx}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400 h-4 w-4"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {type}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">1,234</span>
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
                        (bhk, idx) => (
                          <button
                            key={idx}
                            className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${
                              activeFilter === bhk
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

                  <button className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm">
                    Apply Filters
                  </button>
                </div>
              </div>

              {/* Popular Amenities */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Popular Amenities
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: <Waves size={16} />, label: "Pool" },
                    { icon: <Dumbbell size={16} />, label: "Gym" },
                    { icon: <SquareParking size={16} />, label: "Parking" },
                    { icon: <TreePine size={16} />, label: "Garden" },
                    { icon: <Car size={16} />, label: "Car Park" },
                    { icon: <Shield size={16} />, label: "Security" },
                  ].map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:border-yellow-300 cursor-pointer transition-colors"
                    >
                      <div className="text-yellow-500">{amenity.icon}</div>
                      <span className="text-sm text-gray-700">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
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
