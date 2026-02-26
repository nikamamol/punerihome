import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Home, IndianRupee, ChevronDown } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";

const HeroSection = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    budget: ""
  });

  // Fetch properties data from API
  const {
    data: apiResponse,
    isLoading: propertiesLoading,
    isError: propertiesError
  } = useGetPublicPropertiesQuery({
    limit: 100,
    sortBy: 'created_at',
    order: 'desc'
  });

  // Extract filter options from API response
  const filterOptions = useMemo(() => {
    if (!apiResponse?.data) return null;

    const properties = Array.isArray(apiResponse.data)
      ? apiResponse.data
      : (apiResponse.data.properties || apiResponse.data.items || []);

    if (!properties || properties.length === 0) {
      return {
        localities: [],
        propertyTypes: [],
        priceRanges: []
      };
    }

    // Get unique localities
    const localities = [...new Set(
      properties
        .map(property => {
          // Check for different possible property names for location
          const loc = property.locality ||
            property.location ||
            property.area ||
            property.city ||
            property.locality_name;
          return loc && loc.trim();
        })
        .filter(Boolean)
    )].sort();

    // Get unique property types
    const propertyTypes = [...new Set(
      properties
        .map(property => {
          const type = property.property_type ||
            property.type ||
            property.propertyType ||
            property.category;
          return type && type.trim();
        })
        .filter(Boolean)
    )].sort();

    // Create price ranges
    const priceRanges = [
      { value: "0-7000", label: "Under ₹7,000" },
      { value: "7000-12000", label: "₹7,000 - ₹12,000" },
      { value: "12000-18000", label: "₹12,000 - ₹18,000" },
      { value: "18000-25000", label: "₹18,000 - ₹25,000" },
      { value: "25000-35000", label: "₹25,000 - ₹35,000" },
      { value: "35000-50000", label: "₹35,000 - ₹50,000" },
      { value: "50000-75000", label: "₹50,000 - ₹75,000" },
      { value: "75000-150000", label: "₹75,000 - ₹1,50,000" },
      { value: "150000-200000", label: "₹1,50,000 - ₹2,00,000" },
      { value: "200000-0", label: "Above ₹2,00,000" }
    ];

    return {
      localities,
      propertyTypes,
      priceRanges
    };
  }, [apiResponse]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search button click
  const handleSearch = () => {
    // Create query parameters object
    const queryParams = {};

    // Only add filters that have values
    if (filters.location) queryParams.location = filters.location;
    if (filters.propertyType) queryParams.type = filters.propertyType;
    if (filters.budget) queryParams.budget = filters.budget;

    // Create query string
    const queryString = new URLSearchParams(queryParams).toString();

    // Navigate to properties page with filters
    navigate(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  // Handle Enter key press in selects
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-15">
      {/* Golden Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>

      {/* Silver Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Section */}
          <div className="mb-8">
            <img
              src={logo}
              alt="Puneri Homes Logo"
              className="mx-auto max-h-25"
            />
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Find Your Perfect <span className="text-yellow-300">Home</span> in{" "}
            <span className="text-gray-300">Pune</span>
          </h2>

          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Connect directly with verified owners. No brokers, no hidden
            charges.
            <span className="block text-yellow-300 font-semibold mt-2">
              Ghar jo aapko aap jaisa lage
            </span>
          </p>

          {/* Trust Badges with Silver/Gold Theme */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 px-5 py-3 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>✓ 100% Owner Verified</span>
            </span>
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 px-5 py-3 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>🔒 Secure Contact System</span>
            </span>
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 px-5 py-3 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>🛡️ No Brokers Allowed</span>
            </span>
          </div>

          {/* Search Bar with Location, Flat, Budget */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl blur-sm opacity-30"></div>
              <div className="relative bg-gray-900 border border-yellow-500/30 rounded-xl p-1 shadow-2xl">
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Location Field */}
                  <div className="flex-1 border-r border-yellow-500/20 relative">
                    <div className="flex items-center px-4 py-3">
                      <MapPin className="w-5 h-5 text-yellow-400 mr-3" />
                      <div className="flex-1 relative">
                        <label className="block text-xs text-gray-400 mb-1">
                          Location
                        </label>
                        <div className="relative">
                          <select
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            onKeyPress={handleKeyPress}
                            className="w-full bg-black border border-yellow-500/40 rounded-lg px-3 py-2 text-white focus:outline-none text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 appearance-none pr-10 cursor-pointer hover:border-yellow-400 transition-colors"
                          >
                            <option value="">Select Location</option>

                            {/* Show loading or error states */}
                            {propertiesLoading ? (
                              <option value="" disabled>Loading locations...</option>
                            ) : propertiesError ? (
                              <option value="" disabled>Error loading locations</option>
                            ) : filterOptions?.localities?.length > 0 ? (
                              filterOptions.localities.map((locality, index) => (
                                <option key={index} value={locality}>
                                  {locality}
                                </option>
                              ))
                            ) : (
                              // Fallback to hardcoded options if API returns no data
                              <>
                                <option value="Koregaon Park">Koregaon Park</option>
                                <option value="Viman Nagar">Viman Nagar</option>
                                <option value="Kalyani Nagar">Kalyani Nagar</option>
                                <option value="Aundh">Aundh</option>
                                <option value="Baner">Baner</option>
                                <option value="Balewadi">Balewadi</option>
                                <option value="Wakad">Wakad</option>
                                <option value="Pashan">Pashan</option>
                              </>
                            )}
                          </select>

                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ChevronDown className="w-4 h-4 text-yellow-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flat Type Field */}
                  <div className="flex-1 border-r border-yellow-500/20 relative">
                    <div className="flex items-center px-4 py-3">
                      <Home className="w-5 h-5 text-yellow-400 mr-3" />
                      <div className="flex-1 relative">
                        <label className="block text-xs text-gray-400 mb-1">
                          Property Type
                        </label>

                        <div className="relative">
                          <select
                            name="propertyType"
                            value={filters.propertyType}
                            onChange={handleFilterChange}
                            onKeyPress={handleKeyPress}
                            className="w-full bg-black border border-yellow-500/40 rounded-lg px-3 py-2 text-white focus:outline-none text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 appearance-none pr-10 cursor-pointer hover:border-yellow-400 transition-colors"
                          >
                            <option value="">Select Property Type</option>

                            {/* Show loading or error states */}
                            {propertiesLoading ? (
                              <option value="" disabled>Loading property types...</option>
                            ) : propertiesError ? (
                              <option value="" disabled>Error loading property types</option>
                            ) : filterOptions?.propertyTypes?.length > 0 ? (
                              filterOptions.propertyTypes.map((type, index) => (
                                <option key={index} value={type}>
                                  {type}
                                </option>
                              ))
                            ) : (
                              // Fallback to hardcoded options if API returns no data
                              <>
                                <option value="1 BHK">1 BHK</option>
                                <option value="2 BHK">2 BHK</option>
                                <option value="3 BHK">3 BHK</option>
                                <option value="4 BHK">4 BHK</option>
                                <option value="Studio">Studio</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Villa">Villa</option>
                              </>
                            )}
                          </select>

                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ChevronDown className="w-4 h-4 text-yellow-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Budget Field */}
                  <div className="flex-1 border-r border-yellow-500/20 relative">
                    <div className="flex items-center px-4 py-3">
                      <IndianRupee className="w-5 h-5 text-yellow-400 mr-3" />
                      <div className="flex-1 relative">
                        <label className="block text-xs text-gray-400 mb-1">
                          Monthly Budget
                        </label>

                        <div className="relative">
                          <select
                            name="budget"
                            value={filters.budget}
                            onChange={handleFilterChange}
                            onKeyPress={handleKeyPress}
                            className="w-full bg-black border border-yellow-500/40 rounded-lg px-3 py-2 text-white focus:outline-none text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 appearance-none pr-10 cursor-pointer hover:border-yellow-400 transition-colors"
                          >
                            <option value="">Select Budget</option>

                            {/* Show loading or error states */}
                            {propertiesLoading ? (
                              <option value="" disabled>Loading budgets...</option>
                            ) : propertiesError ? (
                              <option value="" disabled>Error loading budgets</option>
                            ) : filterOptions?.priceRanges?.length > 0 ? (
                              filterOptions.priceRanges.map((range, index) => (
                                <option key={index} value={range.value}>
                                  {range.label}
                                </option>
                              ))
                            ) : (
                              // Fallback to hardcoded options if API returns no data
                              <>
                                <option value="7000">₹7,000</option>
                                <option value="12000">₹12,000</option>
                                <option value="18000">₹18,000</option>
                                <option value="25000">₹25,000</option>
                                <option value="35000">₹35,000</option>
                                <option value="50000">₹50,000</option>
                                <option value="75000">₹75,000</option>
                                <option value="150000">₹1,50,000</option>
                                <option value="200000">₹2,00,000+</option>
                              </>
                            )}
                          </select>

                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ChevronDown className="w-4 h-4 text-yellow-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="w-full md:w-auto flex items-center justify-center">
                    <button
                      onClick={handleSearch}
                      className="w-full md:w-auto bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-gray-900 font-semibold px-6 py-4 rounded-md transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg min-h-[40px] md:min-h-[80px] hover:scale-[1.02] active:scale-[0.98]"
                      disabled={!filters.location && !filters.propertyType && !filters.budget}
                    >
                      <Search className="w-5 h-5 mr-2" />
                      <span className="hidden md:inline">Search</span>
                    </button>
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(filters.location || filters.propertyType || filters.budget) && (
                  <div className="px-4 py-2 flex justify-center">
                    <button
                      onClick={() => setFilters({ location: '', propertyType: '', budget: '' })}
                      className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors flex items-center"
                    >
                      <span className="mr-1">Clear filters</span>
                      <span>✕</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/properties"
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-gray-900 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-200 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>Browse All Properties</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Link>

            <Link
              to="/login"
              className="group relative overflow-hidden bg-transparent border-2 border-yellow-500 hover:border-yellow-400 hover:bg-yellow-500/10 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>List Your Property</span>
                <span className="text-yellow-300 group-hover:text-yellow-200">
                  🏠
                </span>
              </span>
            </Link>
          </div>

          {/* Stats Counter */}
          <div className="mt-16 " style={{display:"none"}}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { number: "500+", label: "Properties Listed" },
                { number: "98%", label: "Verified Owners" },
                { number: "₹49", label: "Contact Unlock" },
                { number: "0%", label: "Broker Fee" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  {/* Background with subtle gold accent */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-500/10 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-yellow-500/10 hover:border-yellow-500/20 transition-all duration-300">
                    {/* Golden accent corner */}
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/30 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/30 rounded-bl-xl"></div>

                    {/* Number with gold gradient */}
                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>

                    {/* Label with subtle styling */}
                    <div className="text-sm text-gray-300 font-medium tracking-wide">
                      {stat.label}
                    </div>

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;