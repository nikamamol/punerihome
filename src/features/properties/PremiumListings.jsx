import React, { useState, useEffect } from "react";
import {
  MapPin,
  Heart,
  Filter,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Crown,
  Award,
  Sparkles,
  Zap,
  Shield,
  Star,
  Phone,
  X,
  Search,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";

function PremiumListings() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [likedProperties, setLikedProperties] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

  // Use RTK Query to fetch public properties
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetPublicPropertiesQuery({
    limit: 50,
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
      const property = premiumProperties.find((p) => p.id === propertyId);
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

  // Transform API data to match premium properties format
  const transformProperties = (apiData) => {
    if (!apiData?.success || !apiData?.data) return [];

    return apiData.data.map((property) => {
      // Check if property qualifies as premium
      // Premium = verified + featured + good image count
      const isPremiumProperty =
        property.verification_status === 'verified' &&
        property.is_featured === 1 &&
        property.status === 'approved' &&
        property.is_active === 1 &&
        (property.image_count >= 3 || property.image_url);

      if (!isPremiumProperty) return null;

      // Format price
      const formatPrice = (price) => {
        if (!price) return '₹0';
        const priceNum = parseFloat(price);
        if (isNaN(priceNum)) return '₹0';
        if (priceNum >= 10000000) return `₹${(priceNum / 10000000).toFixed(1)} Cr`;
        if (priceNum >= 100000) return `₹${(priceNum / 100000).toFixed(1)} L`;
        if (priceNum >= 1000) return `₹${(priceNum / 1000).toFixed(0)} K`;
        return `₹${Math.round(priceNum)}`;
      };

      // Format monthly price for rent
      const formatMonthlyPrice = (price, priceType) => {
        if (!price) return '₹0';
        const priceNum = parseFloat(price);
        if (isNaN(priceNum)) return '₹0';

        // If price is monthly, show as is
        if (priceType === 'Monthly') {
          return `₹${priceNum.toLocaleString('en-IN')}`;
        }
        // If price is yearly, divide by 12 for monthly equivalent
        if (priceType === 'Yearly') {
          return `₹${Math.round(priceNum / 12).toLocaleString('en-IN')}`;
        }
        return `₹${priceNum.toLocaleString('en-IN')}`;
      };

      // Get price suffix based on price_type
      const getPriceSuffix = (priceType) => {
        switch (priceType) {
          case 'Monthly': return '/mo';
          case 'Yearly': return '/yr';
          case 'One Time': return '';
          default: return '';
        }
      };

      // Format area
      const formatArea = (property) => {
        if (property.built_up_area && property.area_unit) {
          return `${property.built_up_area} ${property.area_unit}`;
        }
        if (property.built_up_area) {
          return `${property.built_up_area} sq ft`;
        }
        return 'N/A';
      };

      // Determine premium level based on features
      const getPremiumLevel = (property) => {
        const verificationScore = calculateVerificationScore(property);

        if (property.image_count >= 5 &&
          verificationScore >= 80 &&
          property.views > 100) {
          return 'platinum';
        }
        if (verificationScore >= 60) {
          return 'premium';
        }
        return 'standard';
      };

      // Calculate verification score
      const calculateVerificationScore = (property) => {
        let score = 0;

        // Document verification (40%)
        if (property.verification_agreement === 1) score += 20;
        if (property.terms_agreement === 1) score += 10;
        if (property.accuracy_agreement === 1) score += 10;

        // Property details (30%)
        if (property.image_url) score += 10;
        if (property.image_count >= 3) score += 10;
        if (property.description && property.description.length > 50) score += 10;

        // Contact info (20%)
        if (property.contact_person_name) score += 10;
        if (property.contact_person_phone) score += 10;

        // Additional features (10%)
        if (property.is_featured === 1) score += 5;
        if (property.views > 50) score += 5;

        return Math.min(score, 100);
      };

      // Get premium badge
      const getPremiumBadge = (level) => {
        switch (level) {
          case 'platinum': return 'Platinum Premium';
          case 'premium': return 'Premium Featured';
          default: return 'Premium Verified';
        }
      };

      // Get premium features based on property data
      const getPremiumFeatures = (property) => {
        const features = [];

        // Based on verification agreements
        if (property.verification_agreement === 1) {
          features.push("Document Verified");
        }
        if (property.terms_agreement === 1) {
          features.push("Terms Verified");
        }
        if (property.accuracy_agreement === 1) {
          features.push("Accuracy Verified");
        }

        // Based on images
        if (property.image_count >= 5) {
          features.push("Professional Photos");
        } else if (property.image_count >= 3) {
          features.push("Multiple Photos");
        }

        // Based on views
        if (property.views > 100) {
          features.push("High Demand");
        }

        // Default features if not enough
        if (features.length < 3) {
          const defaultFeatures = ["Premium Listing", "Priority Support", "Verified Property"];
          features.unshift(...defaultFeatures.slice(0, 3 - features.length));
        }

        return features.slice(0, 4); // Max 4 features
      };

      // Get images
      const getImages = (property) => {
        const images = [];

        // Try to get images from API
        if (property.image_url) {
          images.push(property.image_url);
        }

        // Add property images if available
        if (property.images && Array.isArray(property.images)) {
          property.images.forEach(img => {
            if (img.url) images.push(img.url);
          });
        }

        // Fallback Unsplash images for premium look
        const fallbackImages = [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        ];

        // Add fallbacks only if we don't have enough images
        if (images.length < 3) {
          images.push(...fallbackImages.slice(0, 3 - images.length));
        }

        return images.slice(0, 5); // Max 5 images
      };

      // Generate amenities for premium properties
      const generateAmenities = (property) => {
        const amenities = [];

        // Basic amenities from property data
        if (property.total_floors > 1) amenities.push("Lift/Elevator");
        if (property.balconies > 0) amenities.push("Balcony");
        if (property.furnishing_status !== 'Unfurnished') amenities.push("Furnished");

        // Premium amenities (always show some premium ones)
        const premiumAmenities = ["Swimming Pool", "Gym", "Security", "Parking", "Power Backup"];
        amenities.push(...premiumAmenities.slice(0, 5 - amenities.length));

        return amenities;
      };

      // Determine if property is new (less than 7 days old)
      const isNewProperty = (createdAt) => {
        if (!createdAt) return false;
        try {
          const createdDate = new Date(createdAt);
          const now = new Date();
          const diffTime = Math.abs(now - createdDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7;
        } catch (e) {
          return false;
        }
      };

      // Determine if trending (based on views)
      const isTrendingProperty = (views) => {
        return views > 50;
      };

      // Get property title
      const getTitle = (property) => {
        const parts = [];
        if (property.bedrooms) parts.push(`${property.bedrooms} BHK`);
        if (property.property_type) parts.push(property.property_type);
        if (property.property_for) parts.push(`for ${property.property_for}`);
        if (property.city) parts.push(`in ${property.city}`);

        return parts.join(' ') || 'Premium Property';
      };

      // Get location/address
      const getLocation = (property) => {
        if (property.locality) return property.locality;
        if (property.city) return property.city;
        return 'Premium Location';
      };

      const premiumLevel = getPremiumLevel(property);
      const verificationScore = calculateVerificationScore(property);

      return {
        id: property.id || property.property_id,
        property_id: property.property_id,
        isNew: isNewProperty(property.created_at),
        isFeatured: property.is_featured === 1,
        isPremium: true,
        isTrending: isTrendingProperty(property.views || 0),
        title: getTitle(property),
        location: getLocation(property),
        address: `${property.address || ''}, ${property.city || ''}, ${property.state || ''} - ${property.pincode || ''}`,
        price: formatPrice(property.price),
        monthlyPrice: formatMonthlyPrice(property.price, property.price_type),
        priceSuffix: getPriceSuffix(property.price_type),
        area: formatArea(property),
        areaLabel: "Builtup area",
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        furnished: property.furnishing_status || 'Fully furnished',
        furnishingsStatus: "Furnishing status",
        amenities: generateAmenities(property),
        images: getImages(property),
        updated: property.updated_at ?
          `${Math.floor((new Date() - new Date(property.updated_at)) / (1000 * 60 * 60 * 24))}d ago` :
          'Recently',
        agent: property.owner_name || property.contact_person_name || 'Puneri House Premium',
        agentType: 'Premium Property Expert',
        views: property.views || 0,
        inquiries: property.inquiries || 0,
        isRecommended: property.verification_status === 'verified',
        premiumLevel: premiumLevel,
        premiumBadge: getPremiumBadge(premiumLevel),
        premiumFeatures: getPremiumFeatures(property),
        verification_status: property.verification_status,
        verification_score: verificationScore,
        is_featured: property.is_featured,
        image_count: property.image_count || 0,
        verification_agreement: property.verification_agreement,
        terms_agreement: property.terms_agreement,
        accuracy_agreement: property.accuracy_agreement,
        // Original API data
        _original: property
      };
    }).filter(property => property !== null); // Filter out non-premium properties
  };

  // Get premium properties from API data
  const premiumProperties = transformProperties(apiResponse);

  // Filter properties
  const filteredProperties = premiumProperties.filter((property) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return property.isFeatured;
    if (activeFilter === "new") return property.isNew;
    if (activeFilter === "platinum") return property.premiumLevel === "platinum";
    if (activeFilter === "premium") return property.premiumLevel === "premium";

    // Apply price range filter
    const propertyPrice = parseFloat(property._original?.price || 0);
    if (propertyPrice < priceRange.min || propertyPrice > priceRange.max) return false;

    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a._original?.price || 0) - parseFloat(b._original?.price || 0);
      case "price-high":
        return parseFloat(b._original?.price || 0) - parseFloat(a._original?.price || 0);
      case "newest":
        return new Date(b._original?.created_at || 0) - new Date(a._original?.created_at || 0);
      case "popular":
        return (b.views || 0) - (a.views || 0);
      case "verification":
        return (b.verification_score || 0) - (a.verification_score || 0);
      default:
        return 0;
    }
  });

  // Auto carousel effect
  useEffect(() => {
    const intervals = {};

    premiumProperties.forEach((property) => {
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
  }, [premiumProperties]);

  // Get premium stats
  const getPremiumStats = () => {
    const stats = {
      platinum: premiumProperties.filter(p => p.premiumLevel === "platinum").length,
      premium: premiumProperties.filter(p => p.premiumLevel === "premium").length,
      standard: premiumProperties.filter(p => p.premiumLevel === "standard").length,
      verified: premiumProperties.filter(p => p.verification_status === 'verified').length,
      total: premiumProperties.length
    };
    return stats;
  };

  const premiumStats = getPremiumStats();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header Skeleton */}
        <div className="lg:hidden sticky top-13 z-40 bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-sm">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gray-900/20 rounded-lg animate-pulse">
                <Crown className="h-5 w-5 text-gray-900" />
              </div>
              <div>
                <div className="h-6 w-32 bg-yellow-600/30 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-24 bg-yellow-600/30 rounded animate-pulse"></div>
              </div>
            </div>
            <button className="p-2 bg-gray-900/20 rounded-lg text-gray-900 animate-pulse">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-sm border border-yellow-200 overflow-hidden animate-pulse">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative group/image h-48 md:h-auto md:w-2/5 bg-yellow-100"></div>
                    <div className="p-4 md:w-3/5">
                      <div className="h-4 bg-yellow-100 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-yellow-100 rounded w-1/2 mb-4"></div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="h-8 bg-yellow-100 rounded"></div>
                        <div className="h-8 bg-yellow-100 rounded"></div>
                        <div className="h-8 bg-yellow-100 rounded"></div>
                      </div>
                      <div className="h-10 bg-yellow-100 rounded"></div>
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
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Error Loading Premium Properties
              </h3>
              <p className="text-red-600 mb-4">
                {error?.data?.message || "Failed to load premium properties. Please try again."}
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No premium properties
  if (!isLoading && !isError && premiumProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white border border-yellow-200 rounded-lg p-8 text-center">
              <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Premium Properties Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Premium listings are verified properties with featured status.
                Check back soon or view all properties.
              </p>
              <Link
                to="/properties"
                className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                View All Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-13 z-40 bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-sm">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gray-900/20 rounded-lg">
              <Crown className="h-5 w-5 text-gray-900" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Premium Listings
              </h1>
              <p className="text-xs text-gray-900/80">
                {premiumProperties.length} Exclusive Properties
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 bg-gray-900/20 rounded-lg text-gray-900"
          >
            {showFilters ? <X size={20} /> : <Filter size={20} />}
          </button>
        </div>

        {/* Mobile Sort Bar */}
        <div className="px-3 pb-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-900 font-medium">Sort by:</div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-48 bg-white/90 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-900"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="verification">Verification Score</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-xl">
                  <Crown className="h-8 w-8 text-gray-900" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Premium Listings
                  </h1>
                  <p className="text-gray-600">
                    {premiumProperties.length} Exclusive & High-End Properties
                  </p>
                </div>
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
                      <option value="verification">Verification Score</option>
                    </select>
                    <ArrowUpDown
                      size={14}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Level Filter */}
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeFilter === "all"
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                All Premium ({premiumStats.total})
              </button>
              <button
                onClick={() => setActiveFilter("platinum")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeFilter === "platinum"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Platinum ({premiumStats.platinum})
              </button>
              <button
                onClick={() => setActiveFilter("premium")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeFilter === "premium"
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Premium ({premiumStats.premium})
              </button>
              <button
                onClick={() => setActiveFilter("new")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeFilter === "new"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                New ({premiumProperties.filter(p => p.isNew).length})
              </button>
            </div>

            {/* Description Box */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-3 md:p-4 mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-yellow-600" />
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Premium Listings</span>{" "}
                  feature exclusive verified properties with professional photography,
                  priority support, and enhanced visibility. These listings receive
                  {premiumProperties.length > 0 ? ` ${Math.round(premiumProperties.reduce((sum, p) => sum + p.views, 0) / Math.max(premiumProperties.length, 1))}x ` : " 10x "}
                  more views and inquiries than regular listings.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Description Box */}
          <div className="lg:hidden mb-4">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-600" />
                <p className="text-gray-700 text-xs">
                  {premiumProperties.length} Exclusive properties with premium features
                </p>
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
                          Premium Level
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { id: "all", label: "All", count: premiumStats.total },
                            { id: "platinum", label: "Platinum", count: premiumStats.platinum },
                            { id: "premium", label: "Premium", count: premiumStats.premium },
                          ].map((level) => (
                            <button
                              key={level.id}
                              onClick={() => setActiveFilter(level.id)}
                              className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${activeFilter === level.id
                                  ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                                  : "border-gray-300 text-gray-700 hover:border-yellow-400"
                                }`}
                            >
                              {level.label} ({level.count})
                            </button>
                          ))}
                        </div>
                      </div>

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
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="number"
                              placeholder="Max"
                              value={priceRange.max}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 1000000 }))}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setActiveFilter("all");
                            setPriceRange({ min: 0, max: 1000000 });
                          }}
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
              {/* Properties Grid */}
              {sortedProperties.length === 0 ? (
                <div className="bg-white rounded-lg border border-yellow-200 p-8 text-center">
                  <Search className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Premium Properties Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No properties match your current filters. Try adjusting your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setActiveFilter("all");
                      setPriceRange({ min: 0, max: 1000000 });
                    }}
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
                        className={`bg-white rounded-lg shadow-sm overflow-hidden border transition-all duration-200 hover:shadow-md group cursor-pointer ${property.premiumLevel === "platinum"
                            ? "border-yellow-600 shadow-lg"
                            : property.premiumLevel === "premium"
                              ? "border-yellow-400 shadow-md"
                              : "border-yellow-300 shadow-sm"
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
                                    e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
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

                                {/* Premium Badge */}
                                <div className="absolute top-3 left-3 z-10">
                                  <div
                                    className={`px-2 py-1 rounded flex items-center gap-1 text-xs font-bold ${property.premiumLevel === "platinum"
                                        ? "bg-gradient-to-r from-yellow-700 to-yellow-600 text-white"
                                        : property.premiumLevel === "premium"
                                          ? "bg-yellow-500 text-gray-900"
                                          : "bg-yellow-400 text-gray-900"
                                      }`}
                                  >
                                    <Crown size={10} />
                                    {property.premiumBadge}
                                  </div>
                                </div>

                                {/* Verification Status Badge */}
                                <div className="absolute top-3 right-3 z-10">
                                  <div className={`px-2 py-1 rounded text-xs font-bold ${property.verification_status === 'verified'
                                      ? 'bg-green-500 text-white'
                                      : property.verification_status === 'pending'
                                        ? 'bg-yellow-500 text-gray-900'
                                        : 'bg-red-500 text-white'
                                    }`}>
                                    {property.verification_status === 'verified' ? '✓ Verified' :
                                      property.verification_status === 'pending' ? '⏳ Pending' :
                                        '✗ Unverified'}
                                  </div>
                                </div>

                                {/* Badges on Image */}
                                <div className="absolute top-10 left-3 flex flex-col gap-1 z-10">
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
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute top-12 right-3 flex flex-col gap-2 z-10">
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

                                {/* Verification Score */}
                                <div className="absolute bottom-3 left-24 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1 z-10">
                                  <Shield size={10} />
                                  <span>{property.verification_score}% score</span>
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
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors line-clamp-2">
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
                                      {property.monthlyPrice}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {property.priceSuffix}
                                    </span>
                                  </div>
                                  {property._original?.price_type === 'One Time' && (
                                    <div className="text-xs text-gray-500">
                                      One Time
                                    </div>
                                  )}
                                  <Link
                                    to={`/properties/${property.id}/price-breakup`}
                                    className="mt-1 text-xs text-yellow-600 hover:text-yellow-700 font-medium block"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    price breakup
                                  </Link>
                                </div>
                              </div>

                              {/* Premium Features */}
                              <div className="mb-3">
                                <div className="flex flex-wrap gap-1">
                                  {property.premiumFeatures
                                    .slice(0, 4)
                                    .map((feature, index) => (
                                      <span
                                        key={index}
                                        className="text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded flex items-center gap-1"
                                      >
                                        <Star
                                          size={10}
                                          className="text-yellow-600"
                                        />
                                        {feature}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            </div>

                            {/* Middle Row - Property Features */}
                            <div className="grid grid-cols-4 gap-2 md:gap-3 mb-3">
                              <div>
                                <div className="text-sm md:text-base font-bold text-gray-900">
                                  {property.area}
                                </div>
                                <div className="text-xs text-gray-500">Area</div>
                              </div>

                              <div>
                                <div className="text-sm md:text-base font-bold text-gray-900">
                                  {property.bedrooms} BHK
                                </div>
                                <div className="text-xs text-gray-500">Type</div>
                              </div>

                              <div>
                                <div className="text-sm md:text-base font-bold text-gray-900">
                                  {property.furnished}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Furnish
                                </div>
                              </div>

                              <div>
                                <div className="text-sm md:text-base font-bold text-gray-900">
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
                                    <Award size={10} className="text-gray-900" />
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

                                  <Link
                                    to={`/properties/${property.id}/contact`}
                                    className="px-2 py-1.5 md:px-3 md:py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 text-xs md:text-sm font-bold rounded hover:from-yellow-600 hover:to-yellow-500 transition-all whitespace-nowrap flex items-center gap-1"
                                    onClick={(e) => e.stopPropagation()}
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
              )}

              {/* Load More Button */}
              {sortedProperties.length > 0 && (
                <div className="mt-6 text-center">
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 min-w-[180px] justify-center whitespace-nowrap hover:scale-105 transform mx-auto">
                    <ChevronDown size={20} />
                    Load More Properties
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Showing {sortedProperties.length} of {premiumProperties.length} premium properties
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar (Desktop only) */}
            <div className="hidden lg:block lg:col-span-4">
              {/* Premium Benefits */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-lg border border-yellow-200 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Premium Benefits
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      icon: <Zap size={14} />,
                      title: "Average Views",
                      desc: "Premium properties get",
                      count: premiumProperties.length > 0
                        ? `${Math.round(premiumProperties.reduce((sum, p) => sum + p.views, 0) / premiumProperties.length)} views`
                        : "10x More"
                    },
                    {
                      icon: <Award size={14} />,
                      title: "Platinum Tier",
                      desc: "Highest verification score",
                      count: `${premiumStats.platinum} properties`
                    },
                    {
                      icon: <Sparkles size={14} />,
                      title: "Professional Photos",
                      desc: "High-quality images",
                      count: `${premiumProperties.filter(p => p.image_count >= 5).length} properties`
                    },
                    {
                      icon: <Shield size={14} />,
                      title: "Verified Properties",
                      desc: "Document verified listings",
                      count: `${premiumStats.verified} of ${premiumStats.total}`
                    },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="p-1.5 bg-yellow-100 rounded-lg mt-0.5">
                        <div className="text-yellow-600">{benefit.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">
                          {benefit.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {benefit.desc}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-yellow-600">
                        {benefit.count}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-yellow-200">
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold">Premium Criteria:</span> Verified + Featured + Good Images
                  </div>
                </div>
              </div>

              {/* Featured Premium Properties */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Top Premium
                </h3>

                <div className="space-y-4">
                  {premiumProperties
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 3)
                    .map((property) => (
                      <div
                        key={property.id}
                        onClick={() => handlePropertyClick(property.id)}
                        className="border border-gray-200 rounded-lg hover:border-yellow-400 transition-colors cursor-pointer overflow-hidden group"
                      >
                        <div className="flex items-start h-28">
                          <div className="w-24 h-full flex-shrink-0 relative overflow-hidden">
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
                              }}
                            />
                            <div className="absolute top-1 left-1">
                              <div className={`px-1 py-0.5 text-xs font-bold rounded ${property.premiumLevel === 'platinum'
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-yellow-500 text-gray-900'
                                }`}>
                                {property.premiumLevel === 'platinum' ? 'PLATINUM' : 'PREMIUM'}
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 p-3">
                            <div className="flex items-baseline gap-1 mb-0.5">
                              <span className="text-sm font-bold text-gray-900">
                                {property.monthlyPrice}
                              </span>
                              <span className="text-xs text-gray-500">{property.priceSuffix}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-xs mb-0.5 truncate">
                              {property.title}
                            </h4>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-600 truncate">
                                {property.location}
                              </p>
                              <div className="text-xs">
                                <span className="bg-gray-100 text-gray-600 px-1 py-0.5 rounded">
                                  {property.views} views
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Premium Stats */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-yellow-500/20 p-4">
                <h3 className="text-lg font-bold text-white mb-4">
                  Premium Stats
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Total Premium</span>
                    <span className="text-yellow-400 font-bold">
                      {premiumStats.total} properties
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Platinum Tier</span>
                    <span className="text-yellow-300 font-bold">
                      {premiumStats.platinum} properties
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Avg. Score</span>
                    <span className="text-yellow-400 font-bold">
                      {premiumProperties.length > 0
                        ? `${Math.round(premiumProperties.reduce((sum, p) => sum + p.verification_score, 0) / premiumProperties.length)}%`
                        : "85%"
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">
                      Verified Rate
                    </span>
                    <span className="text-green-400 font-bold">
                      {premiumStats.verified}/{premiumStats.total}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <Link
                    to="/upgrade-to-premium"
                    className="w-full py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm text-center block"
                  >
                    Upgrade Your Listing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumListings;