import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFeaturedProperties } from '../../features/properties/propertiesSlice';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
// import FeaturedProperties from './FeaturedProperties';
import TrustSection from './TrustSection';


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
      
      {/* Featured Properties */}
   
      
      {/* Trust & Verification Section */}
      <TrustSection />
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Properties</h3>
              <p className="text-gray-600">
                Search and filter through verified owner listings
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Unlock Contact</h3>
              <p className="text-gray-600">
                Use credits to unlock genuine owner contact details
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Deal</h3>
              <p className="text-gray-600">
                Contact owner directly, no brokers or commissions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;