// Freshproperty.jsx - Updated version with API integration
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";

// Fallback images
const fallbackImages = [
  [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop'
  ],
  [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop'
  ],
  [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop'
  ],
  [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop'
  ]
];

// Carousel Component for each property
const PropertyCarousel = ({ images, price, status, title }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  return (
    <div className="relative mb-4 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>

      <div className="relative h-40 overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
              }`}
          >
            <img
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop';
              }}
            />
          </div>
        ))}

        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg z-10">
          {price}
        </div>

        <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-md z-10">
          {status}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex justify-center items-center pt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-yellow-500 w-6'
                  : 'bg-gray-300 hover:bg-yellow-400'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Loading skeleton
const PropertySkeleton = () => (
  <div className="group cursor-pointer bg-gradient-to-br from-yellow-50/30 via-white to-yellow-50/20 border border-yellow-100 rounded-xl p-2 animate-pulse">
    <div className="relative h-40 overflow-hidden rounded-lg bg-gray-200 mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="flex items-center justify-between mt-2 mb-3">
      <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

const Freshproperty = () => {
  const navigate = useNavigate();

  // Use RTK Query to fetch public properties
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetPublicPropertiesQuery({
    limit: 4,
    sortBy: 'createdAt',
    order: 'desc'
  });

  // Transform API data to match component format
  const properties = useMemo(() => {
    if (!apiResponse?.success || !apiResponse?.data) return [];

    return apiResponse.data.slice(0, 4).map((property, index) => {
      // Format price
      const formatPrice = (price) => {
        if (!price) return 'Price on Request';
        const priceNum = parseFloat(price);
        if (priceNum >= 10000000) return `₹${(priceNum / 10000000).toFixed(1)} Cr`;
        if (priceNum >= 100000) return `₹${(priceNum / 100000).toFixed(1)} L`;
        if (priceNum >= 1000) return `₹${Math.round(priceNum / 1000)}K`;
        return `₹${priceNum}`;
      };

      // Get images from API or fallback
      const getImages = () => {
        const images = [];

        // Try to get image from API
        if (property.image_url) {
          images.push(property.image_url);
        }

        // Add additional images if available in property.images array
        if (property.images && Array.isArray(property.images)) {
          property.images.forEach(img => {
            if (img && !images.includes(img)) {
              images.push(img);
            }
          });
        }

        // Add fallback images if needed
        const fallbackSet = fallbackImages[index % fallbackImages.length];
        while (images.length < 4 && images.length < fallbackSet.length) {
          const fallbackIndex = images.length;
          images.push(fallbackSet[fallbackIndex]);
        }

        return images;
      };

      // Get property status
      const getStatus = () => {
        if (property.status === 'approved' || property.status === 'active') {
          return 'Ready to Move';
        }
        if (property.status === 'pending') {
          return 'Under Construction';
        }
        return property.status || 'Available';
      };

      // Get area text
      const getArea = () => {
        if (property.built_up_area) {
          return `${property.built_up_area} ${property.area_unit || 'sqft'}`;
        }
        if (property.carpet_area) {
          return `${property.carpet_area} ${property.area_unit || 'sqft'}`;
        }
        return null;
      };

      // Get BHK text
      const getBHK = () => {
        if (property.bedrooms) {
          return `${property.bedrooms} BHK`;
        }
        return '2 BHK'; // Default
      };

      // Get title
      const getTitle = () => {
        const bhk = getBHK();
        const type = property.property_type || 'Flat';
        return `${bhk} ${type}`;
      };

      return {
        id: property.id || property._id,
        title: getTitle(),
        price: formatPrice(property.price),
        area: getArea(),
        location: property.locality || property.city || property.location || 'Pune',
        status: getStatus(),
        images: getImages(),
        bhk: property.bedrooms || 2,
        bathrooms: property.bathrooms || 2,
        parking: property.parking || 1,
        _original: property
      };
    });
  }, [apiResponse]);

  const handleCardClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  const handleRetry = () => {
    refetch();
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-black text-gray-700">
                Fresh Properties in Pune
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
            </div>
            <div className="text-yellow-600 font-medium text-sm flex items-center gap-1 mt-4 md:mt-0">
              See all Properties <span className="text-yellow-600">→</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <PropertySkeleton key={item} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-black text-gray-700">
                Fresh Properties in Pune
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Error Loading Properties
            </h3>
            <p className="text-red-600 mb-4">
              {error?.data?.message || "Failed to load fresh properties. Please try again."}
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (properties.length === 0) {
    return (
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-black text-gray-700">
                Fresh Properties in Pune
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
            </div>
            <Link
              to="/properties"
              className="text-yellow-600 font-medium hover:text-yellow-700 transition-colors text-sm flex items-center gap-1 mt-4 md:mt-0"
            >
              See all Properties <span className="text-yellow-600">→</span>
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Fresh Properties Available
            </h3>
            <p className="text-gray-600 mb-4">
              Check back later for new property listings.
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h3 className="text-3xl font-black text-gray-700">
              Fresh Properties in Pune
            </h3>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
          </div>
          <Link
            to="/properties"
            className="text-yellow-600 font-medium hover:text-yellow-700 transition-colors text-sm flex items-center gap-1 mt-4 md:mt-0"
          >
            See all Properties <span className="text-yellow-600">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {properties.map((property) => (
            <div
              key={property.id}
              onClick={() => handleCardClick(property.id)}
              className="group cursor-pointer bg-gradient-to-br from-yellow-50/30 via-white to-yellow-50/20 border border-yellow-100 rounded-xl p-2 hover:shadow-lg hover:shadow-yellow-100/50 hover:border-yellow-200 transition-all duration-300 relative"
            >
              <PropertyCarousel
                images={property.images}
                price={property.price}
                status={property.status}
                title={property.title}
              />

              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors line-clamp-1">
                  {property.title}
                </h3>

                <div className="flex items-center justify-between mt-2 mb-3">
                  <div className="text-lg font-semibold text-yellow-600">
                    {property.price}
                  </div>
                  {property.area && (
                    <div className="text-sm text-gray-500">
                      | {property.area}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-700 font-medium line-clamp-1">
                      {property.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">
                      {property.status}
                    </span>
                  </div>
                </div>

                {/* Additional Info - Only show if available */}
                {(property.bhk || property.bathrooms || property.parking) && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm text-gray-500">
                    {property.bhk && <span>{property.bhk} BHK</span>}
                    {property.bathrooms && <span>{property.bathrooms} Bath</span>}
                    {property.parking && <span>{property.parking} Parking</span>}
                  </div>
                )}

                {/* View Details Button */}
                <button className="w-full mt-4 text-yellow-600 font-medium text-sm py-2 rounded-lg hover:bg-yellow-50 transition-colors">
                  View Details →
                </button>

                {/* Golden accent corners */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-300 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-yellow-300 rounded-bl-lg"></div>

                <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/properties"
            className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Freshproperty;