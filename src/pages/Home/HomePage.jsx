import React from 'react';
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import TrustSection from './TrustSection';
import { Link } from 'react-router-dom';
import TrendingInPune from './Trendinginpune';
import Freshproperty from './Freshproperty';
import Realestateguide from './Realestateguide';
import Propertysnapshot from './Propertysnapshot';

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading properties...</p>
    </div>
  </div>
);

const HomePage = () => {
  // Use RTK Query to fetch public properties for homepage
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetPublicPropertiesQuery({
    limit: 8, // Show 8 properties for homepage
    sortBy: 'views',
    order: 'desc'
  });

  // Loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Properties</h2>
            <p className="text-red-600 mb-4">
              {error?.data?.message || error?.error || "Failed to load properties. Please try again."}
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
    );
  }

  // Extract properties from API response
  const properties = apiResponse?.success ? apiResponse.data || [] : [];
  
  // Calculate stats from properties
  const totalProperties = properties.length;
  const verifiedProperties = properties.filter(property => 
    property.verification_status === 'verified'
  ).length;
  const activeProperties = properties.filter(property => 
    property.status === 'approved' || property.status === 'active'
  ).length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section with real data */}
      <StatsSection 
        totalProperties={totalProperties}
        verifiedOwners={verifiedProperties}
        activeListings={activeProperties}
        averageResponseTime="1.2 days"
      />

      {/* Trust & Verification Section */}
      <TrustSection properties={properties.slice(0, 4)} />

      {/* How It Works Section */}
      <section className="py-10 bg-gradient-to-b from-yellow-50/20 via-white to-yellow-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-700 mb-4">
              How It Works
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Simple steps to find your perfect home directly from verified owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>

            {/* Step 1 */}
            <div className="relative text-center group">
              <div className="relative bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-200/50 hover:border-yellow-300 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-black text-white">1</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-700 transition-colors">
                    Browse Properties
                  </h3>
                  <p className="text-gray-600">
                    Search and filter through {totalProperties}+ verified owner listings
                  </p>
                </div>

                {/* Golden accent corners */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-300 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-300 rounded-bl-xl"></div>
              </div>

              {/* Arrow for mobile */}
              <div className="md:hidden flex justify-center mt-6">
                <div className="w-6 h-6 text-yellow-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group">
              <div className="relative bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-200/50 hover:border-yellow-300 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-black text-white">2</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-700 transition-colors">
                    Unlock Contact
                  </h3>
                  <p className="text-gray-600">
                    Use credits to unlock genuine owner contact details
                  </p>
                </div>

                {/* Golden accent corners */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-300 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-300 rounded-bl-xl"></div>
              </div>

              {/* Arrow for mobile */}
              <div className="md:hidden flex justify-center mt-6">
                <div className="w-6 h-6 text-yellow-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center group">
              <div className="relative bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-200/50 hover:border-yellow-300 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-black text-white">3</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-700 transition-colors">
                    Direct Deal
                  </h3>
                  <p className="text-gray-600">
                    Contact {verifiedProperties}+ verified owners directly, no brokers
                  </p>
                </div>

                {/* Golden accent corners */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-300 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-300 rounded-bl-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending in Pune Section */}
      <TrendingInPune properties={properties} />

      {/* Fresh Properties Section */}
      <Freshproperty properties={properties.slice(0, 6)} />

      {/* Real Estate Guide */}
      <Realestateguide />

      {/* Property Snapshot */}
      <Propertysnapshot 
        totalProperties={totalProperties}
        verifiedProperties={verifiedProperties}
        activeProperties={activeProperties}
        averagePrice={calculateAveragePrice(properties)}
      />
    </div>
  );
};

// Helper function to calculate average price
const calculateAveragePrice = (properties) => {
  if (properties.length === 0) return 0;
  
  const total = properties.reduce((sum, property) => {
    const price = parseFloat(property.price) || 0;
    return sum + price;
  }, 0);
  
  return Math.round(total / properties.length);
};

export default HomePage;