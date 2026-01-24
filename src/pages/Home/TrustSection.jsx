import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";

// Property images arrays for each carousel (fallback)
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
const PropertyCarousel = React.memo(({ images, price, status, title }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide effect
  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  return (
    <div className="relative mb-4 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>

      {/* Image Container */}
      <div className="relative h-40 overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide
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

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg z-10">
          {price}
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-md z-10">
          {status}
        </div>

        {/* Navigation Arrows (visible on hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Golden Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Carousel Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center items-center pt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-yellow-500 w-6'
                  : 'bg-gray-300 hover:bg-yellow-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

PropertyCarousel.displayName = 'PropertyCarousel';

// Loading skeleton component
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

const TrustSection = () => {
  const navigate = useNavigate();
  
  // Use RTK Query to fetch public properties for Trust Section
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetPublicPropertiesQuery({
    limit: 4, // Show only 4 properties in Trust Section
    sortBy: 'views',
    order: 'desc'
  });

  // Transform API data to match component format
  const properties = useMemo(() => {
    if (!apiResponse?.success || !apiResponse?.data) return [];

    return apiResponse.data.slice(0, 4).map((property, index) => {
      // Format price
      const formatPrice = (price) => {
        const priceNum = parseFloat(price);
        if (priceNum >= 10000000) return `₹${(priceNum / 10000000).toFixed(1)} Cr`;
        if (priceNum >= 100000) return `₹${(priceNum / 100000).toFixed(1)} L`;
        return `₹${Math.round(priceNum / 1000)}K`;
      };

      // Get images from API or fallback
      const getImages = () => {
        const images = [];
        
        // Try to get image from API
        if (property.image_url) {
          images.push(property.image_url);
        }
        
        // Add fallback images if needed
        const fallbackSet = fallbackImages[index % fallbackImages.length];
        while (images.length < 4) {
          const fallbackIndex = images.length % fallbackSet.length;
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
        return null;
      };

      return {
        id: property.id,
        title: `${property.bedrooms || 2} BHK ${property.property_type || 'Flat'}`,
        price: formatPrice(property.price),
        area: getArea(),
        location: property.locality || property.city || 'Pune',
        status: getStatus(),
        images: getImages(),
        property_type: property.property_type,
        _original: property
      };
    });
  }, [apiResponse]);

  const handleCardClick = useCallback((propertyId) => {
    navigate(`/properties/${propertyId}`);
  }, [navigate]);

  // Handle retry
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-[#F3F4F4] py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-black text-gray-700 mb-2">
                Popular Owner Properties
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-yellow-600 font-medium text-sm flex items-center gap-1">
                See all Properties <span className="text-yellow-600">→</span>
              </div>
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
      <section className="bg-[#F3F4F4] py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-black text-gray-700 mb-2">
                Popular Owner Properties
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Error Loading Properties
            </h3>
            <p className="text-red-600 mb-4">
              {error?.data?.message || "Failed to load properties. Please try again."}
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
      <section className="bg-[#F3F4F4] py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-black text-gray-700 mb-2">
                Popular Owner Properties
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Properties Available
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
    <section className="bg-[#F3F4F4] py-10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h3 className="text-3xl font-black text-gray-700 mb-2">
              Popular Owner Properties
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

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {properties.map((property) => (
            <div
              key={property.id}
              onClick={() => handleCardClick(property.id)}
              className="group cursor-pointer bg-gradient-to-br from-yellow-50/30 via-white to-yellow-50/20 border border-yellow-100 rounded-xl p-2 hover:shadow-lg hover:shadow-yellow-100/50 hover:border-yellow-200 transition-all duration-300"
            >
              {/* Property Image Carousel */}
              <PropertyCarousel
                images={property.images}
                price={property.price}
                status={property.status}
                title={property.title}
              />

              {/* Property Details */}
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

                {/* Golden accent corners */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-300 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-yellow-300 rounded-bl-lg"></div>

                {/* Hover Underline Effect */}
                <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
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

export default TrustSection;