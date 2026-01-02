import React from 'react';
import { useAppSelector } from '../../app/hooks';

const StatsSection = () => {
  const { stats } = useAppSelector((state) => state.properties);

  const defaultStats = {
    totalProperties: 1250,
    verifiedOwners: 980,
    happyTenants: 3200,
    cities: 15
  };

  const displayStats = stats || defaultStats;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              {displayStats.totalProperties}+
            </div>
            <p className="text-gray-600">Properties Listed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
              {displayStats.verifiedOwners}+
            </div>
            <p className="text-gray-600">Verified Owners</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              {displayStats.happyTenants}+
            </div>
            <p className="text-gray-600">Happy Tenants</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
              {displayStats.cities}+
            </div>
            <p className="text-gray-600">Cities in Pune</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;