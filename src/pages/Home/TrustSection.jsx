import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";

// Carousel Component for each property
const PropertyCarousel = React.memo(({ images, price, status, title }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setCurrentSlide(0);
  }, [images]);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
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

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-56 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-yellow-400">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <p className="text-sm font-medium">No Image Available</p>
        </div>
        <div className="absolute top-3 left-3 bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
          {price}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full shadow">
          {status}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-56 overflow-hidden rounded-lg group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} - Image ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ))}
      </div>

      {/* Price Badge */}
      <div className="absolute top-3 left-3 bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-10">
        {price}
      </div>

      {/* Status Badge */}
      <div className="absolute top-3 right-3 bg-white/90 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full shadow z-10">
        {status}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-yellow-500 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-yellow-500 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Golden Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[5]" />

      {/* Carousel Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-yellow-500 w-6' : 'bg-white/70 hover:bg-yellow-400 w-2'
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
  <div className="animate-pulse bg-white border border-yellow-100 rounded-xl p-3">
    <div className="w-full h-56 bg-gray-200 rounded-lg mb-4" />
    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-full mb-3" />
    <div className="flex gap-2 mt-3">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
);

// ─── Extract all real images from API (no fallbacks) ──────────────────────────
const getPropertyImages = (property) => {
  const images = [];

  if (Array.isArray(property.images) && property.images.length > 0) {
    property.images.forEach((img) => {
      if (typeof img === 'string' && img.trim()) images.push(img);
      else if (img?.url?.trim()) images.push(img.url);
      else if (img?.image_url?.trim()) images.push(img.image_url);
      else if (img?.path?.trim()) images.push(img.path);
    });
  }
  if (images.length === 0 && Array.isArray(property.photos)) {
    property.photos.forEach((img) => {
      const url = typeof img === 'string' ? img : img?.url || img?.image_url || img?.path;
      if (url?.trim()) images.push(url);
    });
  }
  if (images.length === 0 && Array.isArray(property.media)) {
    property.media.forEach((item) => {
      const url = typeof item === 'string' ? item : item?.url || item?.image_url || item?.path;
      if (url?.trim()) images.push(url);
    });
  }
  if (images.length === 0) {
    for (const field of ['image_url', 'thumbnail', 'cover_image', 'featured_image', 'main_image']) {
      if (property[field]?.trim()) { images.push(property[field]); break; }
    }
  }
  return images;
};
// ─────────────────────────────────────────────────────────────────────────────

const TrustSection = () => {
  const navigate = useNavigate();

  const { data: apiResponse, isLoading, isError, error, refetch } = useGetPublicPropertiesQuery({
    limit: 4,
    sortBy: 'views',
    order: 'desc'
  });

  const properties = useMemo(() => {
    if (!apiResponse?.success || !apiResponse?.data) return [];

    return apiResponse.data.slice(0, 4).map((property) => {
      const formatPrice = (price) => {
        const priceNum = parseFloat(price);
        if (isNaN(priceNum)) return 'Price on Request';
        if (priceNum >= 10000000) return `₹${(priceNum / 10000000).toFixed(1)} Cr`;
        if (priceNum >= 100000) return `₹${(priceNum / 100000).toFixed(1)} L`;
        return `₹${Math.round(priceNum / 1000)}K`;
      };

      const getStatus = () => {
        if (property.status === 'approved' || property.status === 'active') return 'Ready to Move';
        if (property.status === 'pending') return 'Under Construction';
        return property.status || 'Available';
      };

      return {
        id: property.id,
        title: property.title || `${property.property_type || 'Property'} in ${property.city || 'Pune'}`,
        price: formatPrice(property.price),
        area: property.built_up_area ? `${property.built_up_area} ${property.area_unit || 'sqft'}` : null,
        location: property.locality || property.city || 'Pune',
        status: getStatus(),
        images: getPropertyImages(property),
        property_type: property.property_type || 'Apartment',
        bhk: property.bedrooms ? `${property.bedrooms} BHK` : null,
        bathrooms: property.bathrooms || null,
        parking: property.parking_available ? '1 Parking' : null,
        furnishing: property.furnishing_status || property.furnishing_type || null,
        floor: property.floor_number ? `Floor ${property.floor_number}` : null,
        postedDate: property.created_at
          ? new Date(property.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
          : null,
        views: property.views || 0,
        isVerified: property.verification_status === 'verified',
        _original: property
      };
    });
  }, [apiResponse]);

  const handleCardClick = useCallback((propertyId) => {
    navigate(`/properties/${propertyId}`);
  }, [navigate]);

  const handleRetry = useCallback(() => refetch(), [refetch]);

  if (isLoading) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Popular Owner Properties</h2>
          <Link to="/properties" className="text-yellow-600 hover:text-yellow-700 font-medium text-base">
            See all Properties →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => <PropertySkeleton key={item} />)}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Owner Properties</h2>
        <p className="text-red-500 mb-2 font-semibold text-lg">Error Loading Properties</p>
        <p className="text-gray-500 mb-4">{error?.data?.message || "Failed to load properties. Please try again."}</p>
        <button onClick={handleRetry} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-semibold transition">
          Retry
        </button>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Owner Properties</h2>
        <p className="text-gray-500 mb-4 text-base">No Properties Available. Check back later for new listings.</p>
        <button onClick={handleRetry} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-semibold transition">
          Refresh
        </button>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Popular Owner Properties</h2>
        <Link to="/properties" className="text-yellow-600 hover:text-yellow-700 font-medium text-base transition-colors">
          See all Properties →
        </Link>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => handleCardClick(property.id)}
            className="group cursor-pointer bg-gradient-to-br from-yellow-50/30 via-white to-yellow-50/20 border border-yellow-100 rounded-xl p-3 hover:shadow-lg hover:shadow-yellow-100/50 hover:border-yellow-200 transition-all duration-300 relative flex flex-col"
          >
            {/* Carousel */}
            <PropertyCarousel
              images={property.images}
              price={property.price}
              status={property.status}
              title={property.title}
            />

            {/* Details */}
            <div className="mt-3 px-1 flex flex-col flex-1">

              {/* Verified Badge */}
              {property.isVerified && (
                <div className="flex items-center gap-1 mb-1">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-green-600 font-semibold">Verified</span>
                </div>
              )}

              {/* Title */}
              <h3 className="font-bold text-gray-800 text-base truncate group-hover:text-yellow-700 transition-colors">
                {property.title}
              </h3>

              {/* Property Type & BHK */}
              {(property.property_type || property.bhk) && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {[property.property_type, property.bhk].filter(Boolean).join(' · ')}
                </p>
              )}

              {/* Price & Area */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-base font-bold text-yellow-600">{property.price}</span>
                {property.area && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm text-gray-500">{property.area}</span>
                  </>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 mt-1.5 text-sm text-gray-500">
                <svg className="w-3.5 h-3.5 flex-shrink-0 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{property.location}</span>
              </div>

              {/* Features Row: Bath / Floor / Furnishing */}
              {(property.bathrooms || property.floor || property.furnishing) && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                  {property.bathrooms && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 10V6a2 2 0 012-2h3m0 6V4m10 6V4m0 0a2 2 0 012 2v4M5 20h14a2 2 0 002-2v-4H3v4a2 2 0 002 2z" />
                      </svg>
                      {property.bathrooms} Bath
                    </div>
                  )}
                  {property.floor && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                      </svg>
                      {property.floor}
                    </div>
                  )}
                  {property.furnishing && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                      </svg>
                      {property.furnishing}
                    </div>
                  )}
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-100 mt-3 pt-2 flex items-center justify-between">
                {/* Views */}
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {property.views > 0 ? `${property.views} views` : 'New'}
                </div>

                {/* Posted Date */}
                {property.postedDate && (
                  <span className="text-xs text-gray-400">{property.postedDate}</span>
                )}
              </div>

              {/* View Details Button */}
              <button className="mt-3 w-full text-center text-sm font-semibold text-yellow-600 hover:text-yellow-700 py-1.5 rounded-lg hover:bg-yellow-50 transition-colors border border-transparent hover:border-yellow-200">
                View Details →
              </button>
            </div>

            {/* Golden accent corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-yellow-400 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-yellow-400 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover Underline Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-300 rounded-b-xl" />
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-8">
        <Link
          to="/properties"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-base px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-yellow-200"
        >
          View All Properties
        </Link>
      </div>
    </section>
  );
};

export default TrustSection;