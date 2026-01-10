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
  Verified,
  Award,
  BadgeCheck,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function VerifiedProperties() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [likedProperties, setLikedProperties] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [verificationFilter, setVerificationFilter] = useState("all-verified");

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
    navigate(`/verified-properties/${id}`);
  };

  // Navigation for image carousel
  const navigateImage = (propertyId, direction, e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const current = prev[propertyId] || 0;
      const property = verifiedProperties.find((p) => p.id === propertyId);
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

  const verifiedProperties = [
    {
      id: 1,
      isNew: true,
      isFeatured: true,
      title: "1.5 BHK Verified Flat in Hinjawadi",
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
      verificationLevel: "premium",
      verificationBadge: "Document Verified",
      verificationScore: 98,
      verificationFeatures: [
        "Legal Check",
        "Document Verification",
        "Physical Inspection",
        "Owner Verification",
      ],
    },
    {
      id: 2,
      isNew: false,
      isFeatured: true,
      title: "3 BHK Certified Flat in Mundhwa",
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
      verificationLevel: "gold",
      verificationBadge: "Premium Verified",
      verificationScore: 95,
      verificationFeatures: [
        "Document Verification",
        "Physical Inspection",
        "Owner Verification",
      ],
    },
    {
      id: 3,
      isFeatured: true,
      title: "3 BHK Luxury Verified Apartment",
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
      verificationLevel: "premium",
      verificationBadge: "Document Verified",
      verificationScore: 97,
      verificationFeatures: [
        "Legal Check",
        "Document Verification",
        "Physical Inspection",
        "Owner Verification",
        "Amenity Verification",
      ],
    },
    {
      id: 4,
      isFeatured: true,
      title: "1 BHK Certified Modern Apartment",
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
      verificationLevel: "basic",
      verificationBadge: "Basic Verified",
      verificationScore: 85,
      verificationFeatures: ["Document Verification", "Owner Verification"],
    },
    {
      id: 5,
      isFeatured: true,
      title: "4.5 BHK Premium Verified Villa",
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
      verificationLevel: "platinum",
      verificationBadge: "Platinum Verified",
      verificationScore: 99,
      verificationFeatures: [
        "Legal Check",
        "Document Verification",
        "Physical Inspection",
        "Owner Verification",
        "Amenity Verification",
        "Neighborhood Check",
      ],
    },
    {
      id: 6,
      isNew: true,
      isFeatured: false,
      title: "2 BHK Verified Flat in Wakad",
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
      verificationLevel: "gold",
      verificationBadge: "Premium Verified",
      verificationScore: 92,
      verificationFeatures: [
        "Document Verification",
        "Physical Inspection",
        "Owner Verification",
      ],
    },
  ];

  // Filter properties based on verification
  const filteredProperties = verifiedProperties.filter((property) => {
    if (verificationFilter === "all-verified") return true;
    if (verificationFilter === "premium")
      return property.verificationLevel === "premium";
    if (verificationFilter === "platinum")
      return property.verificationLevel === "platinum";
    if (verificationFilter === "gold")
      return property.verificationLevel === "gold";
    if (verificationFilter === "basic")
      return property.verificationLevel === "basic";
    return true;
  });

  // Auto carousel effect
  useEffect(() => {
    const intervals = {};

    verifiedProperties.forEach((property) => {
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
      <div className="lg:hidden sticky top-13 z-40 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-yellow-500/20 shadow-sm">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-yellow-500/20 rounded-lg">
              <Verified className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                Verified Properties
              </h1>
              <p className="text-xs text-gray-300">100% Trusted Properties</p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400"
          >
            {showFilters ? <X size={20} /> : <Filter size={20} />}
          </button>
        </div>

        {/* Mobile Verification Filter */}
        <div className="px-3 pb-3">
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {[
                { id: "all-verified", label: "All Verified", count: "68" },
                { id: "platinum", label: "Platinum", count: "12" },
                { id: "premium", label: "Premium", count: "25" },
                { id: "gold", label: "Gold", count: "18" },
                { id: "basic", label: "Basic", count: "13" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setVerificationFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    verificationFilter === filter.id
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-6">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 mb-6 border border-yellow-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-xl">
                    <Verified className="h-8 w-8 text-gray-900" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      Verified Properties
                    </h1>
                    <p className="text-gray-300">
                      100% Trusted & Document Verified Properties in Pune
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">68</div>
                    <div className="text-xs text-gray-300">
                      Verified Properties
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Level Filter */}
              <div className="mt-6 flex space-x-2">
                {[
                  {
                    id: "all-verified",
                    label: "All Verified",
                    count: "68",
                    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
                  },
                  {
                    id: "platinum",
                    label: "Platinum Verified",
                    count: "12",
                    color: "bg-gray-800 text-gray-300 border-gray-700",
                  },
                  {
                    id: "premium",
                    label: "Premium Verified",
                    count: "25",
                    color:
                      "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
                  },
                  {
                    id: "gold",
                    label: "Gold Verified",
                    count: "18",
                    color:
                      "bg-yellow-500/10 text-yellow-200 border-yellow-500/20",
                  },
                  {
                    id: "basic",
                    label: "Basic Verified",
                    count: "13",
                    color: "bg-green-500/10 text-green-300 border-green-500/20",
                  },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setVerificationFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 border transition-all ${
                      verificationFilter === filter.id
                        ? "bg-yellow-500 text-gray-900 border-yellow-500"
                        : `${filter.color} hover:border-yellow-500/50`
                    }`}
                  >
                    <Verified size={16} />
                    {filter.label}
                    <span
                      className={`px-1.5 py-0.5 text-xs rounded ${
                        verificationFilter === filter.id
                          ? "bg-gray-900/20"
                          : "bg-gray-900/50"
                      }`}
                    >
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Verification Benefits */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-yellow-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Why Choose Verified Properties?
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">
                    Document Verified
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Owner Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">
                    Physical Inspection
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Legal Clearance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Verification Benefits */}
          <div className="lg:hidden mb-4">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-yellow-600" />
                <h3 className="text-sm font-bold text-gray-900">
                  Verified Properties Benefits
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-gray-700">Document Check</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-gray-700">Owner Verified</span>
                </div>
              </div>
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
                  className="absolute right-0 top-0 h-full w-80 bg-gray-900 shadow-lg overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">Filters</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2 text-gray-300"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Mobile Filter Content */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">
                          Verification Level
                        </h4>
                        <div className="space-y-2">
                          {[
                            { label: "Platinum Verified", count: "12" },
                            { label: "Premium Verified", count: "25" },
                            { label: "Gold Verified", count: "18" },
                            { label: "Basic Verified", count: "13" },
                          ].map((type, idx) => (
                            <label
                              key={idx}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-600 bg-gray-800 text-yellow-500 focus:ring-yellow-400 h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-300">
                                  {type.label}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {type.count}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">
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
                                  className="rounded border-gray-600 bg-gray-800 text-yellow-500 focus:ring-yellow-400 h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-300">
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
              {/* Properties Grid */}
              <div className="space-y-3">
                {filteredProperties.map((property) => {
                  const currentIndex = currentImageIndex[property.id] || 0;

                  return (
                    <div
                      key={property.id}
                      onClick={() => handlePropertyClick(property.id)}
                      className={`bg-white rounded-lg shadow-sm overflow-hidden border transition-all duration-200 hover:shadow-md group cursor-pointer ${
                        property.verificationLevel === "platinum"
                          ? "border-yellow-500 shadow-md"
                          : property.verificationLevel === "premium"
                          ? "border-yellow-400"
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
                              />

                              {/* Verification Badge */}
                              <div className="absolute top-3 left-3 z-10">
                                <div
                                  className={`px-2 py-1 rounded flex items-center gap-1 text-xs font-bold ${
                                    property.verificationLevel === "platinum"
                                      ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
                                      : property.verificationLevel === "premium"
                                      ? "bg-yellow-500 text-gray-900"
                                      : property.verificationLevel === "gold"
                                      ? "bg-yellow-600 text-white"
                                      : "bg-green-500 text-white"
                                  }`}
                                >
                                  <Verified size={10} />
                                  {property.verificationBadge}
                                </div>
                              </div>

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

                              {/* Verification Score */}
                              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1 z-10">
                                <Award size={10} />
                                <span>
                                  {property.verificationScore}% Verified
                                </span>
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
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-base md:text-lg text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-2">
                                    {property.title}
                                  </h3>
                                </div>
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
                                    navigate(
                                      `/verified-properties/${property.id}/price-breakup`
                                    );
                                  }}
                                >
                                  price breakup
                                </button>
                              </div>
                            </div>

                            {/* Verification Features */}
                            <div className="mb-3">
                              <div className="flex flex-wrap gap-1">
                                {property.verificationFeatures
                                  .slice(0, 3)
                                  .map((feature, index) => (
                                    <span
                                      key={index}
                                      className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1"
                                    >
                                      <Check
                                        size={10}
                                        className="text-green-500"
                                      />
                                      {feature}
                                    </span>
                                  ))}
                                {property.verificationFeatures.length > 3 && (
                                  <span className="text-xs text-yellow-600 font-medium">
                                    +{property.verificationFeatures.length - 3}
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
                                <Link
                                  to={`/verified-properties/${property.id}/contact`}
                                  className="px-2 py-1.5 md:px-3 md:py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 text-xs md:text-sm font-bold rounded hover:from-yellow-600 hover:to-yellow-500 transition-all whitespace-nowrap flex items-center gap-1"
                                >
                                  <Phone size={12} />
                                  <span className="hidden sm:inline">
                                    Contact
                                  </span>
                                </Link>
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
                  <ChevronDown size={20} />
                  Load More Properties
                </button>
              </div>
            </div>

            {/* Right Column - Sidebar (Desktop only) */}
            <div className="hidden lg:block lg:col-span-4">
              {/* Verification Benefits Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-yellow-500/20 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Verified className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-lg font-bold text-white">
                    Verification Benefits
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      icon: <Lock size={14} />,
                      title: "Legal Clearance",
                      desc: "All legal documents verified",
                    },
                    {
                      icon: <Shield size={14} />,
                      title: "Owner Verified",
                      desc: "Owner identity confirmed",
                    },
                    {
                      icon: <BadgeCheck size={14} />,
                      title: "Property Inspection",
                      desc: "Physical inspection done",
                    },
                    {
                      icon: <Award size={14} />,
                      title: "Amenity Check",
                      desc: "All amenities verified",
                    },
                  ].map((benefit, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800/50 rounded p-3 border border-gray-700"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-yellow-400">{benefit.icon}</div>
                        <div className="font-medium text-white text-sm">
                          {benefit.title}
                        </div>
                      </div>
                      <p className="text-xs text-gray-300">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Verified Properties */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Premium Verified
                  </h3>
                </div>

                <div className="space-y-3">
                  {verifiedProperties
                    .filter(
                      (p) =>
                        p.verificationLevel === "premium" ||
                        p.verificationLevel === "platinum"
                    )
                    .slice(0, 3)
                    .map((property) => (
                      <Link
                        key={property.id}
                        to={`/verified-properties/${property.id}`}
                        className="border border-gray-200 rounded-lg hover:border-yellow-400 transition-colors cursor-pointer overflow-hidden group"
                      >
                        <div className="flex items-start h-24">
                          <div className="w-20 h-full flex-shrink-0 relative overflow-hidden">
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-1 left-1">
                              <div
                                className={`px-1 py-0.5 text-xs font-bold rounded ${
                                  property.verificationLevel === "platinum"
                                    ? "bg-gray-800 text-white"
                                    : "bg-yellow-500 text-gray-900"
                                }`}
                              >
                                {property.verificationLevel === "platinum"
                                  ? "Platinum"
                                  : "Premium"}
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 p-2">
                            <div className="flex items-baseline gap-1 mb-0.5">
                              <span className="text-sm font-bold text-gray-900">
                                {property.price}
                              </span>
                              <span className="text-xs text-gray-500">/mo</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-xs mb-0.5 truncate">
                              {property.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {property.location}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Verification Process */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-yellow-500/20 p-4">
                <h3 className="text-lg font-bold text-white mb-4">
                  Verification Process
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      step: "1",
                      title: "Document Submission",
                      desc: "Owner submits all legal documents",
                    },
                    {
                      step: "2",
                      title: "Verification Check",
                      desc: "Our team verifies all documents",
                    },
                    {
                      step: "3",
                      title: "Property Inspection",
                      desc: "Physical visit and inspection",
                    },
                    {
                      step: "4",
                      title: "Verification Complete",
                      desc: "Property gets verified badge",
                    },
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-yellow-500 text-gray-900 font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">
                          {step.title}
                        </div>
                        <div className="text-xs text-gray-300">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/how-verification-works"
                  className="mt-4 inline-block text-sm text-yellow-400 hover:text-yellow-300 font-medium"
                >
                  Learn more about verification →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifiedProperties;
