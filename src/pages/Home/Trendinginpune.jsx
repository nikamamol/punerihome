import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";

// Carousel Component
const PropertyCarousel = React.memo(({ images, price, status, title, height = "h-64" }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto slide effect
    useEffect(() => {
        if (isPaused || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length, isPaused]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={`relative ${height} overflow-hidden rounded-t-xl`}>
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

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Golden Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Carousel Indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                    ? 'bg-white w-4'
                                    : 'bg-white/60 hover:bg-white'
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

// Loading Skeleton
const PropertySkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
        <div className="h-64 bg-gray-200"></div>
        <div className="p-5">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
    </div>
);

const TrendingInPune = () => {
    const navigate = useNavigate();

    // Use RTK Query to fetch trending properties
    const {
        data: apiResponse,
        isLoading,
        isError,
        error,
        refetch
    } = useGetPublicPropertiesQuery({
        limit: 10, // Get more properties for selection
        sortBy: 'views',
        order: 'desc'
    });

    // Transform API data to component format
    const trendingProperties = useMemo(() => {
        if (isLoading || isError || !apiResponse?.success || !apiResponse?.data) {
            return [];
        }

        const properties = apiResponse.data;
        
        // Get trending properties (top 3 by views)
        const trending = properties.slice(0, 3).map((property, index) => {
            // Format price
            const formatPrice = (price) => {
                const priceNum = parseFloat(price);
                if (priceNum >= 10000000) return `₹${(priceNum / 10000000).toFixed(1)} Cr`;
                if (priceNum >= 100000) return `₹${(priceNum / 100000).toFixed(1)} L`;
                return `₹${Math.round(priceNum / 1000)}K`;
            };

            // Get images
            const getImages = () => {
                const images = [];
                
                // Try to get image from API
                if (property.image_url) {
                    images.push(property.image_url);
                }
                
                // Add fallback images
                const fallbackImages = [
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop'
                ];
                
                // Use fallback images if no API images
                if (images.length === 0) {
                    images.push(...fallbackImages);
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

            return {
                id: property.id,
                title: `${property.bedrooms || 2} BHK ${property.property_type || 'Flat'}`,
                price: formatPrice(property.price),
                area: property.built_up_area ? 
                    `${property.built_up_area} ${property.area_unit || 'sqft'}` : 
                    'N/A',
                location: property.locality || property.city || 'Pune',
                status: getStatus(),
                images: getImages(),
                type: property.property_type || 'Apartment',
                bhk: property.bedrooms || 2,
                bathrooms: property.bathrooms || 1,
                parking: property.parking_available ? 1 : 0,
                views: property.views || 0,
                verification_status: property.verification_status,
                _original: property
            };
        });

        return trending;
    }, [apiResponse, isLoading, isError]);

    // Mock localities data (you can replace this with API call if needed)
    const localities = useMemo(() => [
        {
            id: 1,
            name: 'Mumbai Pune Bypass Road',
            priceRange: '6,897 - 6,897 per sqft',
            rating: 4.2,
            reviews: 37,
            propertiesCount: 14162,
            verified: false
        },
        {
            id: 2,
            name: 'Kharadi',
            priceRange: '7,500 - 8,500 per sqft',
            rating: 4.4,
            reviews: 45,
            propertiesCount: 8923,
            verified: true
        },
        {
            id: 3,
            name: 'Hinjewadi',
            priceRange: '6,200 - 7,800 per sqft',
            rating: 4.1,
            reviews: 32,
            propertiesCount: 6547,
            verified: true
        }
    ], []);

    const handleCardClick = (propertyId) => {
        navigate(`/properties/${propertyId}`);
    };

    const handleButtonClick = (e, propertyId) => {
        e.stopPropagation();
        navigate(`/properties/${propertyId}`);
    };

    // Loading state
    if (isLoading) {
        return (
            <section className="bg-[#F3F4F4] py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <span className="bg-red-100 border border-red-200 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">Trending</span>
                        <h2 className="text-3xl font-black text-gray-700 mb-2 mt-2">
                            Trending in Pune
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <PropertySkeleton />
                        </div>
                        <div className="space-y-8">
                            {[1, 2].map((item) => (
                                <PropertySkeleton key={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (isError) {
        return (
            <section className="bg-[#F3F4F4] py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <span className="bg-red-100 border border-red-200 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">Trending</span>
                        <h2 className="text-3xl font-black text-gray-700 mb-2 mt-2">
                            Trending in Pune
                        </h2>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <h3 className="text-lg font-medium text-red-800 mb-2">
                            Error Loading Properties
                        </h3>
                        <p className="text-red-600 mb-4">
                            {error?.data?.message || "Failed to load trending properties. Please try again."}
                        </p>
                        <button
                            onClick={() => refetch()}
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
    if (trendingProperties.length === 0) {
        return (
            <section className="bg-[#F3F4F4] py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <span className="bg-red-100 border border-red-200 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">Trending</span>
                        <h2 className="text-3xl font-black text-gray-700 mb-2 mt-2">
                            Trending in Pune
                        </h2>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No Trending Properties
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Check back later for trending property updates.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#F3F4F4] py-12">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="mb-8">
                    <span className="bg-red-100 border border-red-200 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">Trending</span>
                    <h2 className="text-3xl font-black text-gray-700 mb-2 mt-2">
                        Trending in Pune
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Property */}
                    <div className="lg:col-span-2">
                        <div
                            onClick={() => handleCardClick(trendingProperties[0].id)}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        >
                            {/* Property Carousel */}
                            <PropertyCarousel
                                images={trendingProperties[0].images}
                                price={trendingProperties[0].price}
                                status={trendingProperties[0].status}
                                title={trendingProperties[0].title}
                                height="h-64"
                            />

                            {/* Property Details */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {trendingProperties[0].title}
                                </h3>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-lg font-semibold text-yellow-600">
                                        {trendingProperties[0].price}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        | {trendingProperties[0].area}
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        <span className="text-gray-700 font-medium">
                                            {trendingProperties[0].location}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-green-600 font-medium">
                                            {trendingProperties[0].status}
                                        </span>
                                    </div>
                                    {trendingProperties[0]._original?.verification_status === 'verified' && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="text-blue-600 font-medium">
                                                Verified Property
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={(e) => handleButtonClick(e, trendingProperties[0].id)}
                                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    View Details
                                </button>

                                {/* Divider */}
                                <div className="h-px bg-gray-200 my-8"></div>

                                {/* Localities Section */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                                        Top Localities in Pune
                                    </h4>

                                    <div className="space-y-4">
                                        {localities.slice(0, 1).map((locality) => (
                                            <Link
                                                key={locality.id}
                                                to={`/localities/${locality.id}`}
                                                className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <h5 className="font-medium text-gray-900">
                                                        {locality.name}
                                                    </h5>
                                                    {locality.verified && (
                                                        <span className="text-green-600 text-sm">✓ Verified</span>
                                                    )}
                                                </div>

                                                <div className="text-lg font-semibold text-gray-900 mb-3">
                                                    ₹{locality.priceRange}
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-yellow-500">★</span>
                                                        <span>{locality.rating}</span>
                                                    </div>
                                                    <div>{locality.reviews} Reviews</div>
                                                </div>

                                                <div className="text-yellow-600 font-medium hover:text-yellow-700 text-sm flex items-center gap-1">
                                                    {locality.propertiesCount.toLocaleString()} Properties for Sale →
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Other Properties and Localities */}
                    <div className="space-y-8">
                        {/* Additional Properties with Carousels */}
                        <div className="space-y-6">
                            {trendingProperties.slice(1).map((property) => (
                                <div
                                    key={property.id}
                                    onClick={() => handleCardClick(property.id)}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                                >
                                    {/* Property Carousel */}
                                    <PropertyCarousel
                                        images={property.images}
                                        price={property.price}
                                        status={property.status}
                                        title={property.title}
                                        height="h-48"
                                    />

                                    <div className="p-5">
                                        <h4 className="text-gray-500 text-sm font-medium mb-2">
                                            {property.type} • {property.bhk} BHK
                                        </h4>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">
                                            {property.title}
                                        </h3>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-base font-semibold text-yellow-600">
                                                {property.price}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                | {property.area}
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                <span className="text-gray-700 font-medium text-sm line-clamp-1">
                                                    {property.location}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-green-600 font-medium text-sm">
                                                    {property.status}
                                                </span>
                                            </div>
                                            {property._original?.verification_status === 'verified' && (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <span className="text-blue-600 font-medium text-sm">
                                                        Verified
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div>{property.views} views</div>
                                            <div>{property.bathrooms} Bath • {property.parking} Parking</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Localities */}
                        <div className="space-y-4">
                            {localities.slice(1).map((locality) => (
                                <Link
                                    key={locality.id}
                                    to={`/localities/${locality.id}`}
                                    className="block bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <h5 className="font-medium text-gray-900">
                                                {locality.name}
                                            </h5>
                                            {locality.verified && (
                                                <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">Verified</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-lg font-semibold text-gray-900 mb-3">
                                        ₹{locality.priceRange}
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">★</span>
                                            <span>{locality.rating}</span>
                                        </div>
                                        <div>{locality.reviews} Reviews</div>
                                    </div>

                                    <div className="text-yellow-600 font-medium hover:text-yellow-700 text-sm flex items-center gap-1">
                                        {locality.propertiesCount.toLocaleString()} Properties for Sale →
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrendingInPune;