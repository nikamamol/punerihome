import React from 'react';
import { useAppSelector } from '../../app/hooks';

const StatsSection = () => {
  const { stats } = useAppSelector((state) => state.properties);

  const defaultStats = {
    totalProperties: 20,
    biggerHomes: 100,
    exclusiveProperties: 50,
    verifiedOwners: 45
  };

  const displayStats = stats || defaultStats;

  return (
    <section className="relative bg-white py-12">
      {/* Removed top and bottom golden accent lines */}

      <div className="container mx-auto px-4 relative z-10">
        {/* First Row - Search Context */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-700">
                Because you searched <span className="font-bold text-yellow-600">Pune</span>
              </h2>
            </div>
            <a
              href="#"
              className="text-yellow-600 font-medium hover:text-yellow-700 transition-colors text-sm flex items-center gap-1"
            >
              Continue last search
              <span className="text-yellow-600">→</span>
            </a>
          </div>
        </div>

        {/* Second Row - Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Properties Listed */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-yellow-200 rounded-xl shadow-lg p-5 hover:shadow-2xl hover:shadow-yellow-200/50 hover:border-yellow-300 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-black bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                {displayStats.totalProperties}+
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-yellow-600 text-lg">🏠</span>
              </div>
            </div>
            <p className="text-gray-700 font-medium text-sm">Properties listed for you</p>

            {/* Golden accent corners */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-300 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-yellow-300 rounded-bl-lg"></div>
          </div>

          {/* Share Story Card */}
          <div className="bg-gradient-to-r from-yellow-50 via-white to-yellow-50 border-2 border-yellow-400 rounded-xl p-5 text-gray-800 hover:shadow-2xl hover:shadow-yellow-300/50 transition-all duration-300 group">
            <div className="mb-3">
              <h3 className="text-base font-bold mb-1 text-yellow-700">Share your story and WIN</h3>
              <p className="text-xl font-black text-gray-900 group-hover:text-yellow-700 transition-colors">
                vouchers worth 15000
              </p>
            </div>
            <div className="text-center mb-3">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
              Sukoon ka naya address
              </span>
            </div>
            <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white font-bold py-2 text-sm rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
              Click Here
            </button>
          </div>

          {/* Bigger Homes */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-yellow-200 rounded-xl shadow-lg p-5 hover:shadow-2xl hover:shadow-yellow-200/50 hover:border-yellow-300 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-black bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                {displayStats.biggerHomes}+
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-yellow-600 text-lg">🏡</span>
              </div>
            </div>
            <p className="text-gray-700 font-medium text-sm mb-1">bigger homes & Villas in your budget</p>
            <a href="#" className="text-yellow-600 font-medium text-xs hover:text-yellow-700 flex items-center gap-1">
              See all <span className="text-yellow-600">→</span>
            </a>

            {/* Golden accent corners */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-300 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-yellow-300 rounded-bl-lg"></div>
          </div>

          {/* Exclusive Properties */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-yellow-200 rounded-xl shadow-lg p-5 hover:shadow-2xl hover:shadow-yellow-200/50 hover:border-yellow-300 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-black bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                {displayStats.exclusiveProperties}+
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-yellow-600 text-lg">⭐</span>
              </div>
            </div>
            <p className="text-gray-700 font-medium text-sm mb-1">Top Exclusive Owner Properties</p>
            <a href="#" className="text-yellow-600 font-medium text-xs hover:text-yellow-700 flex items-center gap-1">
              See all <span className="text-yellow-600">→</span>
            </a>

            {/* Golden accent corners */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-300 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-yellow-300 rounded-bl-lg"></div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default StatsSection;