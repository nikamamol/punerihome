import React, { useState, useEffect, useMemo } from "react";
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
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";

function PropertiesPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Added to read URL parameters

  // Parse URL query parameters
  const urlParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      location: params.get('location') || '',
      type: params.get('type') || '',
      budget: params.get('budget') || ''
    };
  }, [location.search]);

  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [likedProperties, setLikedProperties] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedBHKTypes, setSelectedBHKTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [furnishingFilter, setFurnishingFilter] = useState(null);
  const [propertyForFilter, setPropertyForFilter] = useState(null);
  const [availabilityFilter, setAvailabilityFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize state from URL parameters
  useEffect(() => {
    if (urlParams.location) {
      setSearchTerm(urlParams.location);
    }
    if (urlParams.type) {
      setSelectedPropertyTypes([urlParams.type]);
    }
    if (urlParams.budget) {
      const [min, max] = urlParams.budget.split('-').map(Number);
      setPriceRange({
        min: min || 0,
        max: max === 0 ? 10000000 : max // Handle "Above" case
      });
    }
  }, [urlParams.location, urlParams.type, urlParams.budget]);

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
      const property = transformedProperties.find((p) => p.id === propertyId);
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
        return `${property.carpet_area || 0} ${property.area_unit || 'sqft'}`;
      };

      // Get BHK from title or bedrooms field
      const getBHKType = (property) => {
        // First check if bedrooms field exists
        if (property.bedrooms) {
          if (property.bedrooms >= 4) return "4+ BHK";
          return `${property.bedrooms} BHK`;
        }

        // Extract from title if bedrooms not available
        const title = property.title || "";
        const bhkMatch = title.match(/(\d+)\s*BHK/i);
        if (bhkMatch) {
          const bhk = parseInt(bhkMatch[1]);
          if (bhk >= 4) return "4+ BHK";
          return `${bhk} BHK`;
        }

        // Check description
        const description = property.description || "";
        const descMatch = description.match(/(\d+)\s*BHK/i);
        if (descMatch) {
          const bhk = parseInt(descMatch[1]);
          if (bhk >= 4) return "4+ BHK";
          return `${bhk} BHK`;
        }

        return "2 BHK"; // Default
      };

      // Get bedroom count
      const getBedroomCount = (property) => {
        if (property.bedrooms) return property.bedrooms;

        const title = property.title || "";
        const bhkMatch = title.match(/(\d+)\s*BHK/i);
        if (bhkMatch) return parseInt(bhkMatch[1]);

        const description = property.description || "";
        const descMatch = description.match(/(\d+)\s*BHK/i);
        if (descMatch) return parseInt(descMatch[1]);

        return 2; // Default
      };

      // Get property status
      const getStatus = (property) => {
        if (property.status === 'approved' || property.status === 'available') {
          return 'Available';
        }
        if (property.status === 'pending') {
          return 'Under Review';
        }
        if (property.status === 'sold' || property.status === 'rented') {
          return property.status === 'sold' ? 'Sold' : 'Rented';
        }
        return property.status || 'Available';
      };

      // Get images
      const getImages = (property) => {
        const images = [];

        // Add main image
        if (property.image_url) {
          images.push(property.image_url);
        }

        // Add additional images
        if (property.images && Array.isArray(property.images)) {
          property.images.forEach(img => {
            if (img && !images.includes(img)) {
              images.push(img);
            }
          });
        }

        // Add fallback images based on property type
        const fallbackImages = [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
          'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
        ];

        // Ensure at least one image
        if (images.length === 0) {
          const imageIndex = index % fallbackImages.length;
          images.push(fallbackImages[imageIndex]);
        }

        return images;
      };

      // Generate amenities based on property features
      const generateAmenities = (property) => {
        const amenities = [];

        // Extract amenities from property data
        if (property.amenities && Array.isArray(property.amenities)) {
          return property.amenities;
        }

        // Check from amenities_json
        if (property.amenities_json) {
          try {
            const amenitiesData = typeof property.amenities_json === 'string'
              ? JSON.parse(property.amenities_json)
              : property.amenities_json;

            if (Array.isArray(amenitiesData)) {
              return amenitiesData;
            }
          } catch (e) {
            console.error('Error parsing amenities_json:', e);
          }
        }

        // Generate based on features
        if (property.total_floors > 1) amenities.push("Lift");
        if (property.security_deposit > 0) amenities.push("Security");
        if (property.parking) amenities.push("Parking");
        if (property.furnished) amenities.push("Furnished");
        if (property.gym) amenities.push("Gym");
        if (property.swimming_pool) amenities.push("Swimming Pool");
        if (property.garden) amenities.push("Garden");
        if (property.power_backup) amenities.push("Power Backup");
        if (property.water_supply) amenities.push("Water Supply");
        if (property.balconies > 0) amenities.push("Balcony");

        return amenities.length > 0 ? amenities : ["Water Supply", "Power Backup", "Parking"];
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

      // Determine if property is trending (based on views)
      const isTrendingProperty = (views) => {
        return views > 50;
      };

      // Determine if property is featured
      const isFeaturedProperty = (property) => {
        return property.is_featured === 1 || property.verification_status === 'verified' || property.is_featured === true;
      };

      const bedroomCount = getBedroomCount(property);
      const bhkType = getBHKType(property);
      const propertyFor = property.property_for || (property.listing_type === 'rent' ? 'Rent' : 'Sale');

      return {
        id: property.id,
        property_id: property.property_id || property.id,
        isNew: isNewProperty(property.created_at),
        isFeatured: isFeaturedProperty(property),
        isTrending: isTrendingProperty(property.views || 0),
        title: property.title || `${bedroomCount} BHK ${property.property_type || 'Flat'} for ${propertyFor} in ${property.city || 'Pune'}`,
        location: `${property.locality || ''}, ${property.city || 'Pune'}`,
        address: property.full_address || property.address || `${property.address || ''}, ${property.city || ''}, ${property.state || ''} - ${property.pincode || ''}`,
        price: formatPrice(property.price),
        monthlyPrice: formatMonthlyPrice(property.price),
        originalPrice: property.original_price ? `₹${parseFloat(property.original_price).toLocaleString('en-IN')}` : null,
        area: formatArea(property),
        areaValue: property.built_up_area || property.carpet_area || 0,
        areaUnit: property.area_unit || 'sqft',
        bedrooms: bedroomCount,
        bhkType: bhkType,
        bathrooms: property.bathrooms || 2,
        furnished: property.furnishing_status || property.furnished || 'Semi Furnished',
        furnishingsStatus: property.furnishing_status || 'Furnishing status',
        amenities: generateAmenities(property),
        images: getImages(property),
        updated: property.updated_at ? `${Math.floor((new Date() - new Date(property.updated_at)) / (1000 * 60 * 60 * 24))}d ago` : 'Recently',
        agent: property.owner_name || property.agent_name || 'Puneri House Verified',
        agentType: property.verification_status === 'verified' ? 'Property Expert Pro' : 'Property Expert',
        views: property.views || Math.floor(Math.random() * 200) + 50,
        inquiries: property.inquiries || Math.floor(Math.random() * 30) + 10,
        isRecommended: property.verification_status === 'verified' || property.is_recommended === 1,
        status: getStatus(property),
        property_type: property.property_type || 'Flat',
        property_for: propertyFor,
        city: property.city || 'Pune',
        state: property.state || 'Maharashtra',
        price_type: property.price_type || 'Total',
        available_from: property.available_from,
        furnishing_status: property.furnishing_status || property.furnished || 'Semi Furnished',
        verification_status: property.verification_status || 'pending',
        floor: property.floor || '1',
        total_floors: property.total_floors || '1',
        transaction_type: property.transaction_type || 'New Property',
        ownership: property.ownership || 'Freehold',
        _original: property
      };
    });
  };

  // Get transformed properties
  const transformedProperties = transformProperties(apiResponse);

  // Extract unique values for filters from actual data
  const filterOptions = useMemo(() => {
    const propertyTypes = new Set();
    const bhkTypes = new Set();
    const furnishingStatuses = new Set();
    const propertyFors = new Set();
    const cities = new Set();
    const localities = new Set();
    const allAmenities = new Set();

    transformedProperties.forEach(property => {
      if (property.property_type) propertyTypes.add(property.property_type);
      if (property.bhkType) bhkTypes.add(property.bhkType);
      if (property.furnishing_status) furnishingStatuses.add(property.furnishing_status);
      if (property.furnished) furnishingStatuses.add(property.furnished);
      if (property.property_for) propertyFors.add(property.property_for);
      if (property.city) cities.add(property.city);
      if (property.location) {
        const loc = property.location.split(',')[0].trim();
        if (loc) localities.add(loc);
      }

      // Collect amenities
      if (property.amenities && Array.isArray(property.amenities)) {
        property.amenities.forEach(amenity => allAmenities.add(amenity));
      }
    });

    return {
      propertyTypes: Array.from(propertyTypes).sort(),
      bhkTypes: Array.from(bhkTypes).sort((a, b) => {
        const getNumber = (bhk) => {
          if (bhk === '4+ BHK') return 5;
          return parseInt(bhk) || 0;
        };
        return getNumber(a) - getNumber(b);
      }),
      furnishingStatuses: Array.from(furnishingStatuses).sort(),
      propertyFors: Array.from(propertyFors).sort(),
      cities: Array.from(cities).sort(),
      localities: Array.from(localities).sort(),
      amenities: Array.from(allAmenities).sort()
    };
  }, [transformedProperties]);

  // Filter properties based on selected filters AND URL parameters
  const filteredProperties = useMemo(() => {
    return transformedProperties.filter((property) => {
      // Apply URL location filter
      if (urlParams.location) {
        const searchLocation = urlParams.location.toLowerCase();
        const propertyLocation = property.location?.toLowerCase() || '';
        const propertyAddress = property.address?.toLowerCase() || '';
        const propertyCity = property.city?.toLowerCase() || '';
        const propertyLocality = property._original?.locality?.toLowerCase() || '';

        const matchesLocation =
          propertyLocation.includes(searchLocation) ||
          propertyAddress.includes(searchLocation) ||
          propertyCity.includes(searchLocation) ||
          propertyLocality.includes(searchLocation);

        if (!matchesLocation) return false;
      }

      // Apply URL property type filter
      if (urlParams.type) {
        if (property.property_type?.toLowerCase() !== urlParams.type.toLowerCase()) {
          return false;
        }
      }

      // Apply URL budget filter
      if (urlParams.budget) {
        const [minBudget, maxBudget] = urlParams.budget.split('-').map(Number);
        const propertyPrice = parseFloat(property._original?.price || 0);

        if (maxBudget === 0) {
          // Above budget case (200000-0)
          if (propertyPrice < minBudget) return false;
        } else {
          if (propertyPrice < minBudget || propertyPrice > maxBudget) return false;
        }
      }

      // Apply search term (from input)
      if (searchTerm && !urlParams.location) { // Don't double-apply location filter
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          property.title?.toLowerCase().includes(searchLower) ||
          property.location?.toLowerCase().includes(searchLower) ||
          property.address?.toLowerCase().includes(searchLower) ||
          property.city?.toLowerCase().includes(searchLower) ||
          property.property_type?.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Apply active filter (featured/new/all)
      if (activeFilter === "featured" && !property.isFeatured) return false;
      if (activeFilter === "new" && !property.isNew) return false;

      // Apply property type filter (from UI)
      if (selectedPropertyTypes.length > 0 && !urlParams.type) { // Don't double-apply type filter
        if (!selectedPropertyTypes.includes(property.property_type)) return false;
      }

      // Apply BHK type filter
      if (selectedBHKTypes.length > 0) {
        if (!selectedBHKTypes.includes(property.bhkType)) return false;
      }

      // Apply price range filter (from UI)
      const propertyPrice = parseFloat(property._original?.price || 0);
      if (!urlParams.budget) { // Don't double-apply budget filter
        if (propertyPrice < priceRange.min || propertyPrice > priceRange.max) return false;
      }

      // Apply furnishing filter
      if (furnishingFilter !== null) {
        const furnishing = property.furnishing_status?.toLowerCase() || property.furnished?.toLowerCase() || '';
        if (!furnishing.includes(furnishingFilter.toLowerCase())) return false;
      }

      // Apply property_for filter (Rent/Sale)
      if (propertyForFilter !== null) {
        if (property.property_for?.toLowerCase() !== propertyForFilter.toLowerCase()) return false;
      }

      // Apply availability filter
      if (availabilityFilter !== null) {
        if (property.status?.toLowerCase() !== availabilityFilter.toLowerCase()) return false;
      }

      // Apply amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity =>
          property.amenities?.some(pAmenity =>
            pAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [transformedProperties, urlParams, searchTerm, activeFilter, selectedPropertyTypes, selectedBHKTypes,
    priceRange, furnishingFilter, propertyForFilter, availabilityFilter, selectedAmenities]);

  // Sort properties based on sortBy
  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
      const priceA = parseFloat(a._original?.price || 0);
      const priceB = parseFloat(b._original?.price || 0);
      const dateA = new Date(a._original?.created_at || 0);
      const dateB = new Date(b._original?.created_at || 0);

      switch (sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'newest':
          return dateB - dateA;
        case 'popular':
          return b.views - a.views;
        default: // relevance
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [filteredProperties, sortBy]);

  // Auto carousel effect
  useEffect(() => {
    const intervals = {};

    transformedProperties.forEach((property) => {
      if (property.images && property.images.length > 1) {
        intervals[property.id] = setInterval(() => {
          setCurrentImageIndex((prev) => ({
            ...prev,
            [property.id]: ((prev[property.id] || 0) + 1) % property.images.length,
          }));
        }, 4000);
      }
    });

    return () => {
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [transformedProperties]);

  // Update document title based on URL parameters
  useEffect(() => {
    if (urlParams.location || urlParams.type || urlParams.budget) {
      const searchTerms = [];
      if (urlParams.location) searchTerms.push(`in ${urlParams.location}`);
      if (urlParams.type) searchTerms.push(urlParams.type);
      if (urlParams.budget) {
        const [min, max] = urlParams.budget.split('-');
        if (max === '0') {
          searchTerms.push(`above ₹${parseInt(min).toLocaleString()}`);
        } else {
          searchTerms.push(`₹${parseInt(min).toLocaleString()} - ₹${parseInt(max).toLocaleString()}`);
        }
      }
      document.title = `Properties ${searchTerms.join(' ')} - Puneri House`;
    }
  }, [urlParams]);

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

  const handleBHKTypeToggle = (bhk) => {
    setSelectedBHKTypes(prev =>
      prev.includes(bhk)
        ? prev.filter(b => b !== bhk)
        : [...prev, bhk]
    );
  };

  const handleFurnishingFilter = (status) => {
    setFurnishingFilter(status === furnishingFilter ? null : status);
  };

  const handlePropertyForFilter = (type) => {
    setPropertyForFilter(type === propertyForFilter ? null : type);
  };

  const handleAvailabilityFilter = (status) => {
    setAvailabilityFilter(status === availabilityFilter ? null : status);
  };

  const handleResetFilters = () => {
    setSelectedAmenities([]);
    setSelectedPropertyTypes([]);
    setSelectedBHKTypes([]);
    setPriceRange({ min: 0, max: 10000000 });
    setFurnishingFilter(null);
    setPropertyForFilter(null);
    setAvailabilityFilter(null);
    setActiveFilter("all");
    setSearchTerm("");

    // Navigate to properties page without query params
    navigate('/properties');
  };

  // Calculate price range from actual data
  const priceRangeStats = useMemo(() => {
    const prices = transformedProperties.map(p => parseFloat(p._original?.price || 0)).filter(p => p > 0);
    return {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 10000000,
      avg: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0
    };
  }, [transformedProperties]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="lg:hidden sticky top-13 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-3">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Properties in Pune</h1>
              <p className="text-xs text-gray-600">Loading properties...</p>
            </div>
            <button className="p-2 bg-gray-200 rounded-lg text-gray-900 animate-pulse">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
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
            <h1 className="text-lg font-bold text-gray-900">
              {urlParams.location ? `Properties in ${urlParams.location}` : 'Properties in Pune'}
            </h1>
            <p className="text-xs text-gray-600">{filteredProperties.length} properties</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 bg-yellow-500 rounded-lg text-gray-900"
          >
            {showFilters ? <X size={20} /> : <Filter size={20} />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by location, property type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>
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
                  {urlParams.location
                    ? `Properties in ${urlParams.location}`
                    : `Properties for ${propertyForFilter || 'Sale & Rent'} in Pune`}
                </h1>
                <p className="text-gray-600 mt-1">
                  Showing {sortedProperties.length} of {filteredProperties.length} properties
                </p>
              </div>
              <div className="mt-3 md:mt-0 flex items-center gap-4">
                {/* Desktop Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-10 pr-4 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-yellow-400"
                  />
                </div>
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
                Looking for Properties in {urlParams.location || 'Pune'}?{" "}
                <span className="font-semibold">Puneri House</span> offers
                {filteredProperties.length}+ properties for{" "}
                {propertyForFilter?.toLowerCase() || 'sale & rent'} in prime locations.
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
                {filteredProperties.length}+ properties in {urlParams.location || 'Pune'}.
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
                        Filters ({selectedAmenities.length + selectedPropertyTypes.length + selectedBHKTypes.length})
                      </h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Mobile Filter Content */}
                    <div className="space-y-5">
                      {/* Property For (Rent/Sale) */}
                      {filterOptions.propertyFors.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            Looking For
                          </h4>
                          <div className="flex gap-2">
                            {filterOptions.propertyFors.map((type) => (
                              <button
                                key={type}
                                onClick={() => handlePropertyForFilter(type)}
                                className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors flex-1 ${propertyForFilter === type
                                  ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                                  : "border-gray-300 text-gray-700 hover:border-yellow-400"
                                  }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Property Type */}
                      {filterOptions.propertyTypes.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            Property Type
                          </h4>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {filterOptions.propertyTypes.map((type) => (
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
                                  {transformedProperties.filter(p => p.property_type === type).length}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* BHK Type - Using title data */}
                      {filterOptions.bhkTypes.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            BHK Type
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {filterOptions.bhkTypes.map((bhk) => (
                              <button
                                key={bhk}
                                onClick={() => handleBHKTypeToggle(bhk)}
                                className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${selectedBHKTypes.includes(bhk)
                                  ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                                  : "border-gray-300 text-gray-700 hover:border-yellow-400"
                                  }`}
                              >
                                {bhk}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Furnishing Status */}
                      {filterOptions.furnishingStatuses.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            Furnishing
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {filterOptions.furnishingStatuses.map((status) => (
                              <button
                                key={status}
                                onClick={() => handleFurnishingFilter(status)}
                                className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${furnishingFilter === status
                                  ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                                  : "border-gray-300 text-gray-700 hover:border-yellow-400"
                                  }`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Price Range */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Price Range (₹)
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              placeholder={`Min: ${priceRangeStats.min.toLocaleString()}`}
                              value={priceRange.min || ''}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="number"
                              placeholder={`Max: ${priceRangeStats.max.toLocaleString()}`}
                              value={priceRange.max || ''}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || priceRangeStats.max }))}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                            />
                          </div>
                          <div className="pt-2">
                            <input
                              type="range"
                              min={priceRangeStats.min}
                              max={priceRangeStats.max}
                              step="100000"
                              value={priceRange.max}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-600 mt-1">
                              <span>₹{priceRangeStats.min.toLocaleString()}</span>
                              <span>₹{priceRange.max.toLocaleString()}</span>
                              <span>₹{priceRangeStats.max.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      {filterOptions.amenities.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            Amenities
                          </h4>
                          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                            {filterOptions.amenities.slice(0, 10).map((amenity) => (
                              <button
                                key={amenity}
                                onClick={() => handleAmenityToggle(amenity)}
                                className={`flex items-center justify-center gap-1 p-2 border rounded text-xs font-medium transition-colors ${selectedAmenities.includes(amenity)
                                  ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                                  : "border-gray-300 text-gray-700 hover:border-yellow-400"
                                  }`}
                              >
                                {selectedAmenities.includes(amenity) && <Check size={12} />}
                                {amenity}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Availability Status */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Availability
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {["Available", "Sold", "Rented"].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleAvailabilityFilter(status)}
                              className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${availabilityFilter === status
                                ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                                : "border-gray-300 text-gray-700 hover:border-yellow-400"
                                }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={handleResetFilters}
                          className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded hover:border-gray-400 transition-all text-sm"
                        >
                          Reset All
                        </button>
                        <button
                          onClick={() => setShowFilters(false)}
                          className="flex-1 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm"
                        >
                          Show {sortedProperties.length} Properties
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
                  All ({filteredProperties.length})
                </button>
                <button
                  onClick={() => setActiveFilter("featured")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${activeFilter === "featured"
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-yellow-400"
                    }`}
                >
                  Featured ({filteredProperties.filter(p => p.isFeatured).length})
                </button>
                <button
                  onClick={() => setActiveFilter("new")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${activeFilter === "new"
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-yellow-400"
                    }`}
                >
                  New ({filteredProperties.filter(p => p.isNew).length})
                </button>
              </div>

              {/* Properties Grid */}
              {sortedProperties.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {urlParams.location
                      ? `No properties found in ${urlParams.location}. Try adjusting your filters or search criteria.`
                      : 'Try adjusting your filters or search criteria.'}
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
                                {property.images && property.images.length > 1 && (
                                  <>
                                    <button
                                      onClick={(e) => navigateImage(property.id, "prev", e)}
                                      className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
                                    >
                                      <ChevronLeft size={18} />
                                    </button>
                                    <button
                                      onClick={(e) => navigateImage(property.id, "next", e)}
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
                                  {property.verification_status === 'verified' && (
                                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                                      Verified
                                    </span>
                                  )}
                                  {property.property_for && (
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${property.property_for === 'Rent'
                                      ? 'bg-purple-500 text-white'
                                      : 'bg-orange-500 text-white'
                                      }`}>
                                      For {property.property_for}
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
                                      fill={likedProperties[property.id] ? "currentColor" : "none"}
                                    />
                                  </button>
                                </div>

                                {/* View Count */}
                                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1 z-10">
                                  <Eye size={10} />
                                  <span>{property.views} views</span>
                                </div>

                                {/* Carousel Indicators */}
                                {property.images && property.images.length > 1 && (
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
                                      /{property.price_type === 'Monthly' ? 'mo' : 'total'}
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
                                    {/* price breakup */}
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

                              {/* BHK Type Badge */}
                              <div className="mb-2">
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                                  {property.bhkType}
                                </span>
                              </div>

                              {/* Amenities */}
                              {property.amenities && property.amenities.length > 0 && (
                                <div className="mb-3">
                                  <div className="flex flex-wrap gap-1">
                                    {property.amenities.slice(0, 4).map((amenity, index) => (
                                      <span
                                        key={index}
                                        className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                                      >
                                        {amenity}
                                      </span>
                                    ))}
                                    {property.amenities.length > 4 && (
                                      <span className="text-xs text-yellow-600 font-medium">
                                        +{property.amenities.length - 4}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Property Features Grid */}
                            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3">
                              <div>
                                <div className="text-base md:text-lg font-bold text-gray-900">
                                  {property.areaValue}
                                </div>
                                <div className="text-xs text-gray-500">{property.areaUnit}</div>
                              </div>

                              <div>
                                <div className="text-base md:text-lg font-bold text-gray-900">
                                  {property.furnished}
                                </div>
                                <div className="text-xs text-gray-500">Furnish</div>
                              </div>

                              {/* <div>
                                <div className="text-base md:text-lg font-bold text-gray-900">
                                  {property.updated}
                                </div>
                                <div className="text-xs text-gray-500">Updated</div>
                              </div> */}
                            </div>

                            {/* Bottom Row - Agent Info and Buttons */}
                            {/* <div className="pt-3 border-t border-gray-100">
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
                                      console.log(`Contact agent for property ${property.id}`);
                                    }}
                                  >
                                    <Phone size={12} />
                                    <span className="hidden sm:inline">Contact</span>
                                  </button>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Load More Button */}
              {sortedProperties.length > 0 && sortedProperties.length < filteredProperties.length && (
                <div className="mt-6 text-center">
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 min-w-[180px] justify-center whitespace-nowrap hover:scale-105 transform mx-auto">
                    <Plus size={20} />
                    Load More Properties
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Showing {sortedProperties.length} of {filteredProperties.length} properties
                  </p>
                </div>
              )}
            </div>


            {/* Right Column - Sidebar (Desktop only) */}
            <div className="hidden lg:block lg:col-span-4">
              {/* Filters Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Filters ({selectedAmenities.length + selectedPropertyTypes.length + selectedBHKTypes.length})
                  </h3>
                  {(selectedAmenities.length > 0 || selectedPropertyTypes.length > 0 || selectedBHKTypes.length > 0 || urlParams.location || urlParams.type || urlParams.budget) && (
                    <button
                      onClick={handleResetFilters}
                      className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  {/* Search Box */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Search
                    </h4>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Search by location, property type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                  </div>

                  {/* Property For (Rent/Sale) */}
                  {filterOptions.propertyFors.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Looking For
                      </h4>
                      <div className="flex gap-2">
                        {filterOptions.propertyFors.map((type) => (
                          <button
                            key={type}
                            onClick={() => handlePropertyForFilter(type)}
                            className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors flex-1 ${propertyForFilter === type
                              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                              : "border-gray-300 text-gray-700 hover:border-yellow-400"
                              }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Property Type */}
                  {filterOptions.propertyTypes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Property Type
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {filterOptions.propertyTypes.map((type) => (
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
                              {transformedProperties.filter(p => p.property_type === type).length}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BHK Type - From Title/Bedrooms */}
                  {filterOptions.bhkTypes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        BHK Type
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.bhkTypes.map((bhk) => (
                          <button
                            key={bhk}
                            onClick={() => handleBHKTypeToggle(bhk)}
                            className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${selectedBHKTypes.includes(bhk)
                              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                              : "border-gray-300 text-gray-700 hover:border-yellow-400"
                              }`}
                          >
                            {bhk}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Furnishing Status */}
                  {filterOptions.furnishingStatuses.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Furnishing
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.furnishingStatuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => handleFurnishingFilter(status)}
                            className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${furnishingFilter === status
                              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                              : "border-gray-300 text-gray-700 hover:border-yellow-400"
                              }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Price Range (₹)
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder={`Min: ${priceRangeStats.min.toLocaleString()}`}
                          value={priceRange.min || ''}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number"
                          placeholder={`Max: ${priceRangeStats.max.toLocaleString()}`}
                          value={priceRange.max || ''}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || priceRangeStats.max }))}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div className="pt-2">
                        <input
                          type="range"
                          min={priceRangeStats.min}
                          max={priceRangeStats.max}
                          step="100000"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>Min: ₹{priceRangeStats.min.toLocaleString()}</span>
                          <span>Max: ₹{priceRange.max.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  {filterOptions.amenities.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Amenities
                      </h4>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {filterOptions.amenities.slice(0, 12).map((amenity) => (
                          <button
                            key={amenity}
                            onClick={() => handleAmenityToggle(amenity)}
                            className={`flex items-center justify-center gap-1 p-2 border rounded text-xs font-medium transition-colors ${selectedAmenities.includes(amenity)
                              ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                              : "border-gray-300 text-gray-700 hover:border-yellow-400"
                              }`}
                          >
                            {selectedAmenities.includes(amenity) && <Check size={12} />}
                            <span className="truncate">{amenity}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Availability Status */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Availability
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Available", "Sold", "Rented"].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleAvailabilityFilter(status)}
                          className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${availabilityFilter === status
                            ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                            : "border-gray-300 text-gray-700 hover:border-yellow-400"
                            }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Filters Summary */}
                  {(selectedAmenities.length > 0 || selectedPropertyTypes.length > 0 || selectedBHKTypes.length > 0 || furnishingFilter || propertyForFilter || availabilityFilter || activeFilter !== 'all' || searchTerm || urlParams.location || urlParams.type || urlParams.budget) && (
                    <div className="pt-3 border-t border-gray-200">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2">
                        Active Filters:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {urlParams.location && (
                          <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                            Location: {urlParams.location}
                            <button
                              onClick={() => {
                                navigate('/properties');
                                setSearchTerm('');
                              }}
                              className="ml-1 hover:text-gray-900"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        )}
                        {urlParams.type && (
                          <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                            Type: {urlParams.type}
                            <button
                              onClick={() => {
                                navigate('/properties');
                                setSelectedPropertyTypes([]);
                              }}
                              className="ml-1 hover:text-gray-900"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        )}
                        {urlParams.budget && (
                          <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                            Budget: {urlParams.budget.replace('-', ' - ')}
                            <button
                              onClick={() => {
                                navigate('/properties');
                                setPriceRange({ min: 0, max: 10000000 });
                              }}
                              className="ml-1 hover:text-gray-900"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        )}
                        {activeFilter !== 'all' && (
                          <span className="inline-flex items-center px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                            {activeFilter}
                            <button
                              onClick={() => setActiveFilter('all')}
                              className="ml-1 hover:text-yellow-900"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        )}
                        {propertyForFilter && (
                          <span className="inline-flex items-center px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                            For {propertyForFilter}
                            <button
                              onClick={() => setPropertyForFilter(null)}
                              className="ml-1 hover:text-purple-900"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        )}
                        {selectedBHKTypes.map(bhk => (
                          <span key={bhk} className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                            {bhk}
                            <button
                              onClick={() => handleBHKTypeToggle(bhk)}
                              className="ml-1 hover:text-blue-900"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Show Properties Button */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => {
                      // Apply filters and close if mobile
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm"
                  >
                    Show {sortedProperties.length} Properties
                  </button>
                </div>
              </div>

              {/* Featured Properties Widget */}
              {transformedProperties.filter(p => p.isFeatured).length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    ✨ Featured Properties
                  </h3>
                  <div className="space-y-4">
                    {transformedProperties
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
                                src={featured.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'}
                                alt={featured.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                              {featured.verification_status === 'verified' && (
                                <div className="absolute top-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                                  ✓ Verified
                                </div>
                              )}
                            </div>
                            <div className="flex-1 p-3">
                              <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-lg font-bold text-gray-900">
                                  {featured.monthlyPrice}
                                </span>
                                <span className="text-xs text-gray-500">
                                  /{featured.price_type === 'Monthly' ? 'mo' : 'total'}
                                </span>
                              </div>
                              <h4 className="font-semibold text-gray-900 text-sm mb-0.5 truncate">
                                {featured.bhkType} {featured.property_type}
                              </h4>
                              <p className="text-xs text-gray-600 mb-1 truncate">
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

                  {transformedProperties.filter(p => p.isFeatured).length > 3 && (
                    <button
                      onClick={() => setActiveFilter("featured")}
                      className="mt-3 w-full text-center text-sm text-yellow-600 hover:text-yellow-700 font-medium py-2 border-t border-gray-100"
                    >
                      View all {transformedProperties.filter(p => p.isFeatured).length} featured properties →
                    </button>
                  )}
                </div>
              )}

              {/* Property Statistics Widget */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Property Statistics
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Total Properties</div>
                      <div className="text-2xl font-bold text-gray-900">{transformedProperties.length}</div>
                      <div className="text-xs text-green-600 mt-1">
                        +{transformedProperties.filter(p => p.isNew).length} new
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Average Price</div>
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{(priceRangeStats.avg / 100000).toFixed(1)}L
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {priceRangeStats.avg.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Verified Properties</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {transformedProperties.filter(p => p.verification_status === 'verified').length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(transformedProperties.filter(p => p.verification_status === 'verified').length / transformedProperties.length) * 100}%`
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-gray-600">Featured Properties</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {transformedProperties.filter(p => p.isFeatured).length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{
                          width: `${(transformedProperties.filter(p => p.isFeatured).length / transformedProperties.length) * 100}%`
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-gray-600">For Rent</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {transformedProperties.filter(p => p.property_for === 'Rent').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">For Sale</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {transformedProperties.filter(p => p.property_for === 'Sale').length}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Popular BHK Types</h4>
                    <div className="space-y-1">
                      {filterOptions.bhkTypes.slice(0, 4).map(bhk => {
                        const count = transformedProperties.filter(p => p.bhkType === bhk).length;
                        const percentage = (count / transformedProperties.length) * 100;
                        return (
                          <div key={bhk} className="flex items-center gap-2">
                            <span className="text-xs text-gray-600 w-12">{bhk}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600">{count}</span>
                          </div>
                        );
                      })}
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