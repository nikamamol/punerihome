import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFeaturedProperties } from '../../features/properties/propertiesSlice';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
// import FeaturedProperties from './FeaturedProperties';
import TrustSection from './TrustSection';
import { Link } from 'react-router-dom';
import TrendingInPune from './Trendinginpune';
import Freshproperty from './Freshproperty';
import Realestateguide from './Realestateguide';
import Propertysnapshot from './Propertysnapshot';


const HomePage = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state) => state.properties
  );

  useEffect(() => {
    dispatch(fetchFeaturedProperties());
  }, [dispatch]);

  if (loading) {

  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold">Error Loading Properties</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Trust & Verification Section */}
      <TrustSection />

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
                    Search and filter through verified owner listings
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
                    Contact owner directly, no brokers or commissions
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
      {/*  */}
      <TrendingInPune />

      <Freshproperty/>

      <Realestateguide/>

      <Propertysnapshot/>
    </div>
  );
};

export default HomePage;