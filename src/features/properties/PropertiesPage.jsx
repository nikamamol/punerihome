import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProperties, setFilters } from '../../features/properties/propertiesSlice';
// import PropertyCard from '../../features/properties/components/PropertyCard';
// import FilterSidebar from '../../components/shared/FilterSidebar';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Filter } from 'lucide-react';

const PropertiesPage = () => {
  const dispatch = useAppDispatch();
  const { allProperties, loading, error, filters } = useAppSelector((state) => state.properties);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProperties(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  if (loading) {
    return <LoadingSpinner />;
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Find Your Perfect Property
          </h1>
          <p className="text-gray-600">
            Browse through {allProperties.length} verified owner listings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Mobile Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow-sm w-full justify-center"
            >
              <Filter className="w-5 h-5" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            
            {showFilters && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
               <p></p>
              </div>
            )}
          </div>

          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:w-3/4">
            {allProperties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or check back later</p>
                <button
                  onClick={() => dispatch(setFilters({}))}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Property Count */}
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing {allProperties.length} properties
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Sort by:</span>
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-2">
                      <option>Latest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProperties.map((property) => (
                    <div>Hello</div>
                  ))}
                </div>

                {/* Load More Button */}
                {allProperties.length >= 12 && (
                  <div className="mt-12 text-center">
                    <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition">
                      Load More Properties
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;