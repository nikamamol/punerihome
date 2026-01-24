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
  FileCheck,
  Home as HomeIcon,
  UserCheck,
  Search as SearchIcon,
  AlertCircle,
  TrendingUp,
  Percent,
  Timer,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";

function VerifiedProperties() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [likedProperties, setLikedProperties] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [verificationFilter, setVerificationFilter] = useState("all-verified");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

  // Use RTK Query to fetch public properties
  const { 
    data: apiResponse, 
    isLoading, 
    isError,
    error,
    refetch 
  } = useGetPublicPropertiesQuery({
    limit: 20,
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

  // Transform API data to match verified properties format
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

      // Determine verification level based on verification_status and features
      const getVerificationLevel = (property) => {
        if (property.verification_status === 'verified') {
          // Check for premium features
          if (property.is_featured === 1 && property.image_count >= 5) {
            return 'platinum';
          }
          if (property.is_featured === 1) {
            return 'premium';
          }
          if (property.verification_agreement === 1 && property.terms_agreement === 1 && property.accuracy_agreement === 1) {
            return 'gold';
          }
          return 'basic';
        }
        return property.verification_status === 'pending' ? 'pending' : 'unverified';
      };

      // Get verification badge
      const getVerificationBadge = (level) => {
        switch(level) {
          case 'platinum': return 'Platinum Verified';
          case 'premium': return 'Premium Verified';
          case 'gold': return 'Gold Verified';
          case 'basic': return 'Basic Verified';
          case 'pending': return 'Under Verification';
          default: return 'Not Verified';
        }
      };

      // Get verification score based on completeness
      const getVerificationScore = (property) => {
        let score = 0;
        if (property.primary_image) score += 20;
        if (property.description && property.description.length > 50) score += 15;
        if (property.contact_person_name && property.contact_person_phone) score += 15;
        if (property.verification_agreement === 1) score += 20;
        if (property.terms_agreement === 1) score += 10;
        if (property.accuracy_agreement === 1) score += 10;
        if (property.image_count >= 3) score += 10;
        return Math.min(score, 100);
      };

      // Get verification features
      const getVerificationFeatures = (property) => {
        const features = [];
        
        if (property.verification_agreement === 1) {
          features.push("Document Verification");
        }
        if (property.terms_agreement === 1) {
          features.push("Terms Agreement");
        }
        if (property.accuracy_agreement === 1) {
          features.push("Accuracy Verified");
        }
        if (property.show_contact_info === 1) {
          features.push("Contact Verified");
        }
        if (property.image_count >= 3) {
          features.push("Photos Verified");
        }
        
        // Default features
        if (features.length < 3) {
          const defaultFeatures = ["Owner Verification", "Property Details", "Location Accuracy"];
          features.push(...defaultFeatures.slice(0, 3 - features.length));
        }
        
        return features;
      };

      // Get images
      const getImages = (property) => {
        const images = [];
        if (property.image_url) {
          images.push(property.image_url);
        }
        // Add fallback Unsplash images
        const fallbackImages = [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
        ];
        
        images.push(...fallbackImages.slice(0, 3 - images.length));
        return images;
      };

      // Generate amenities
      const generateAmenities = (property) => {
        const amenities = [];
        if (property.total_floors > 1) amenities.push("Lift");
        if (property.security_deposit > 0) amenities.push("Security");
        if (property.balconies > 0) amenities.push("Balcony");
        if (property.maintenance_charge > 0) amenities.push("Maintenance");
        
        const defaultAmenities = ["Water Supply", "Power Backup", "Parking"];
        amenities.push(...defaultAmenities.slice(0, 4 - amenities.length));
        
        return amenities;
      };

      // Determine if property is new (less than 7 days old)
      const isNewProperty = (createdAt) => {
        if (!createdAt) return false;
        const createdDate = new Date(createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - createdDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      };

      // Determine if trending (based on views)
      const isTrendingProperty = (views) => {
        return views > 100;
      };

      const verificationLevel = getVerificationLevel(property);

      return {
        id: property.id,
        property_id: property.property_id,
        isNew: isNewProperty(property.created_at),
        isFeatured: property.is_featured === 1,
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
        images: getImages(property),
        updated: property.updated_at ? `${Math.floor((new Date() - new Date(property.updated_at)) / (1000 * 60 * 60 * 24))}d ago` : 'Recently',
        agent: property.owner_name || 'Puneri House Verified',
        agentType: property.verification_status === 'verified' ? 'Property Expert Pro' : 'Property Expert',
        views: property.views || 0,
        inquiries: property.inquiries || 0,
        isRecommended: property.verification_status === 'verified',
        verificationLevel: verificationLevel,
        verificationBadge: getVerificationBadge(verificationLevel),
        verificationScore: getVerificationScore(property),
        verificationFeatures: getVerificationFeatures(property),
        verification_status: property.verification_status,
        is_featured: property.is_featured,
        image_count: property.image_count,
        // Original API data
        _original: property
      };
    });
  };

  // Get only verified properties
  const allProperties = transformProperties(apiResponse);
  const verifiedProperties = allProperties.filter(
    property => property.verification_status === 'verified' || property._original?.verification_status === 'verified'
  );

  // Filter properties based on verification level
  const filteredProperties = verifiedProperties.filter((property) => {
    // Apply verification filter
    if (verificationFilter === "all-verified") return true;
    if (verificationFilter === "platinum") return property.verificationLevel === "platinum";
    if (verificationFilter === "premium") return property.verificationLevel === "premium";
    if (verificationFilter === "gold") return property.verificationLevel === "gold";
    if (verificationFilter === "basic") return property.verificationLevel === "basic";
    
    // Apply price range filter
    const propertyPrice = parseFloat(property._original?.price || 0);
    if (propertyPrice < priceRange.min || propertyPrice > priceRange.max) return false;
    
    // Apply features filter
    if (selectedFeatures.length > 0) {
      const hasAllFeatures = selectedFeatures.every(feature => 
        property.verificationFeatures.some(pFeature => 
          pFeature.toLowerCase().includes(feature.toLowerCase())
        )
      );
      if (!hasAllFeatures) return false;
    }
    
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
  }, [verifiedProperties]);

  // Handle feature toggle
  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  // Get verification stats
  const getVerificationStats = () => {
    const stats = {
      platinum: verifiedProperties.filter(p => p.verificationLevel === "platinum").length,
      premium: verifiedProperties.filter(p => p.verificationLevel === "premium").length,
      gold: verifiedProperties.filter(p => p.verificationLevel === "gold").length,
      basic: verifiedProperties.filter(p => p.verificationLevel === "basic").length,
      total: verifiedProperties.length
    };
    return stats;
  };

  const verificationStats = getVerificationStats();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header Skeleton */}
        <div className="lg:hidden sticky top-13 z-40 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-yellow-500/20 shadow-sm">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-yellow-500/20 rounded-lg animate-pulse">
                <Verified className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-700 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
            <button className="p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 animate-pulse">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            {/* Skeleton properties */}
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                  <div className="flex flex-col md:flex-row h-full">
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
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Error Loading Verified Properties
              </h3>
              <p className="text-red-600 mb-4">
                {error?.data?.message || "Failed to load verified properties. Please try again."}
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

  // No verified properties
  if (!isLoading && !isError && verifiedProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white border border-yellow-200 rounded-lg p-8 text-center">
              <Verified className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Verified Properties Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any verified properties at the moment. 
                All properties go through our verification process before being listed here.
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
              <p className="text-xs text-gray-300">
                {verifiedProperties.length} Trusted Properties
              </p>
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
                { id: "all-verified", label: "All Verified", count: verificationStats.total },
                { id: "platinum", label: "Platinum", count: verificationStats.platinum },
                { id: "premium", label: "Premium", count: verificationStats.premium },
                { id: "gold", label: "Gold", count: verificationStats.gold },
                { id: "basic", label: "Basic", count: verificationStats.basic },
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
                      {verifiedProperties.length} 100% Trusted & Document Verified Properties in Pune
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {verifiedProperties.length}
                    </div>
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
                    count: verificationStats.total,
                    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
                  },
                  {
                    id: "platinum",
                    label: "Platinum Verified",
                    count: verificationStats.platinum,
                    color: "bg-gray-800 text-gray-300 border-gray-700",
                  },
                  {
                    id: "premium",
                    label: "Premium Verified",
                    count: verificationStats.premium,
                    color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
                  },
                  {
                    id: "gold",
                    label: "Gold Verified",
                    count: verificationStats.gold,
                    color: "bg-yellow-500/10 text-yellow-200 border-yellow-500/20",
                  },
                  {
                    id: "basic",
                    label: "Basic Verified",
                    count: verificationStats.basic,
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
                <span className="ml-auto text-sm text-gray-600">
                  Avg. Verification Score: {Math.round(verifiedProperties.reduce((sum, p) => sum + p.verificationScore, 0) / verifiedProperties.length)}%
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">
                    Document Verified ({verifiedProperties.filter(p => p.verificationFeatures.includes("Document Verification")).length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">
                    Owner Verified ({verifiedProperties.filter(p => p.verificationFeatures.includes("Owner Verification") || p.verificationFeatures.includes("Contact Verified")).length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">
                    Property Details Verified
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">
                    Photos Verified ({verifiedProperties.filter(p => p.verificationFeatures.includes("Photos Verified")).length})
                  </span>
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
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-gray-700">Photos Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-gray-700">Details Verified</span>
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
                          Verification Features
                        </h4>
                        <div className="space-y-2">
                          {["Document Verification", "Owner Verification", "Photos Verified", "Accuracy Verified"].map((feature) => (
                            <label
                              key={feature}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedFeatures.includes(feature)}
                                  onChange={() => handleFeatureToggle(feature)}
                                  className="rounded border-gray-600 bg-gray-800 text-yellow-500 focus:ring-yellow-400 h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-gray-300">
                                  {feature}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {verifiedProperties.filter(p => p.verificationFeatures.includes(feature)).length}
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
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              placeholder="Min"
                              value={priceRange.min}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                              className="w-full px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                            />
                            <span className="text-gray-300">to</span>
                            <input
                              type="number"
                              placeholder="Max"
                              value={priceRange.max}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 1000000 }))}
                              className="w-full px-2 py-1 border border-gray-600 bg-gray-800 text-white rounded text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedFeatures([]);
                            setPriceRange({ min: 0, max: 1000000 });
                          }}
                          className="flex-1 py-2.5 border border-gray-600 text-gray-300 font-medium rounded hover:border-gray-500 transition-all text-sm"
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
              {filteredProperties.length === 0 ? (
                <div className="bg-white rounded-lg border border-yellow-200 p-8 text-center">
                  <SearchIcon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Verified Properties Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No properties match your current filters. Try adjusting your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setVerificationFilter("all-verified");
                      setSelectedFeatures([]);
                      setPriceRange({ min: 0, max: 1000000 });
                    }}
                    className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
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
                                  onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
                                  }}
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
                                    {property.isNew && (
                                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                                        New
                                      </span>
                                    )}
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
              )}

              {/* Load More Button */}
              {filteredProperties.length > 0 && (
                <div className="mt-6 text-center">
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 min-w-[180px] justify-center whitespace-nowrap hover:scale-105 transform mx-auto">
                    <ChevronDown size={20} />
                    Load More Properties
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Showing {filteredProperties.length} of {verifiedProperties.length} verified properties
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar (Desktop only) */}
            <div className="hidden lg:block lg:col-span-4">
              {/* Verification Benefits Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-yellow-500/20 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Verified className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-lg font-bold text-white">
                    Verification Stats
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      level: "Platinum Verified",
                      count: verificationStats.platinum,
                      icon: <Award className="h-4 w-4 text-yellow-300" />,
                      desc: "Full verification with all features",
                    },
                    {
                      level: "Premium Verified",
                      count: verificationStats.premium,
                      icon: <Star className="h-4 w-4 text-yellow-400" />,
                      desc: "Most features verified",
                    },
                    {
                      level: "Gold Verified",
                      count: verificationStats.gold,
                      icon: <BadgeCheck className="h-4 w-4 text-yellow-500" />,
                      desc: "Essential features verified",
                    },
                    {
                      level: "Basic Verified",
                      count: verificationStats.basic,
                      icon: <Check className="h-4 w-4 text-green-400" />,
                      desc: "Basic verification complete",
                    },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800/50 rounded p-3 border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {stat.icon}
                          <div className="font-medium text-white text-sm">
                            {stat.level}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-yellow-400">
                          {stat.count}
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">{stat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Verified Properties */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-yellow-500" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Top Verified Properties
                  </h3>
                </div>

                <div className="space-y-3">
                  {verifiedProperties
                    .filter(p => p.verificationLevel === "platinum" || p.verificationLevel === "premium")
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
                                {property.monthlyPrice}
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

              {/* Verification Features Filter */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-yellow-500/20 p-4">
                <h3 className="text-lg font-bold text-white mb-4">
                  Filter by Features
                </h3>

                <div className="space-y-2">
                  {["Document Verification", "Owner Verification", "Photos Verified", "Accuracy Verified"].map((feature) => (
                    <button
                      key={feature}
                      onClick={() => handleFeatureToggle(feature)}
                      className={`w-full flex items-center justify-between p-2 rounded text-sm font-medium transition-colors ${
                        selectedFeatures.includes(feature)
                          ? "bg-yellow-500/20 border-yellow-500 text-yellow-300 border"
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {selectedFeatures.includes(feature) ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <div className="w-3 h-3 border border-gray-500 rounded"></div>
                        )}
                        {feature}
                      </div>
                      <span className="text-xs text-gray-400">
                        {verifiedProperties.filter(p => p.verificationFeatures.includes(feature)).length}
                      </span>
                    </button>
                  ))}
                </div>

                {selectedFeatures.length > 0 && (
                  <button
                    onClick={() => setSelectedFeatures([])}
                    className="w-full mt-3 py-2 text-sm text-yellow-400 hover:text-yellow-300 font-medium border border-yellow-500/30 rounded hover:border-yellow-500/50 transition-colors"
                  >
                    Clear Features Filter
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifiedProperties;