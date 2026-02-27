import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";

// Carousel Component
const PropertyCarousel = React.memo(({ images, price, status, title, height = "h-64" }) => {
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

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    const goToSlide = (index) => setCurrentSlide(index);

    // No images — show clean placeholder
    if (!images || images.length === 0) {
        return (
            <div className={`relative ${height} bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-t-xl flex items-center justify-center`}>
                <div className="text-center text-yellow-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-sm font-medium">No Image Available</p>
                </div>
                <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg z-10">
                    {price}
                </div>
                <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-md z-10">
                    {status}
                </div>
            </div>
        );
    }

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
                            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                    >
                        <img
                            src={image}
                            alt={`${title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                                e.target.parentElement.style.display = 'none';
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
                            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
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
                            onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide ? 'bg-white w-4' : 'bg-white/60 hover:bg-white'
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

// ─── Extract all real images from API property (no fallbacks) ─────────────────
const getPropertyImages = (property) => {
    const images = [];

    // 1. images array (string or object)
    if (Array.isArray(property.images) && property.images.length > 0) {
        property.images.forEach((img) => {
            const url = typeof img === 'string' ? img : img?.url || img?.image_url || img?.path;
            if (url?.trim()) images.push(url);
        });
    }

    // 2. photos array
    if (images.length === 0 && Array.isArray(property.photos) && property.photos.length > 0) {
        property.photos.forEach((img) => {
            const url = typeof img === 'string' ? img : img?.url || img?.image_url || img?.path;
            if (url?.trim()) images.push(url);
        });
    }

    // 3. media array
    if (images.length === 0 && Array.isArray(property.media) && property.media.length > 0) {
        property.media.forEach((item) => {
            const url = typeof item === 'string' ? item : item?.url || item?.image_url || item?.path;
            if (url?.trim()) images.push(url);
        });
    }

    // 4. Single image fields
    if (images.length === 0) {
        const singleFields = ['image_url', 'thumbnail', 'cover_image', 'featured_image', 'main_image'];
        for (const field of singleFields) {
            if (property[field]?.trim()) {
                images.push(property[field]);
                break;
            }
        }
    }

    return images; // empty array → carousel shows placeholder
};
// ─────────────────────────────────────────────────────────────────────────────

const TrendingInPune = () => {
    const navigate = useNavigate();

    const {
        data: apiResponse,
        isLoading,
        isError,
        error,
        refetch
    } = useGetPublicPropertiesQuery({
        limit: 10,
        sortBy: 'views',
        order: 'desc'
    });

    const trendingProperties = useMemo(() => {
        if (isLoading || isError || !apiResponse?.success || !apiResponse?.data) return [];

        return apiResponse.data.slice(0, 3).map((property) => {
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
                title: `${property.bedrooms || 2} BHK ${property.property_type || 'Flat'}`,
                price: formatPrice(property.price),
                area: property.built_up_area
                    ? `${property.built_up_area} ${property.area_unit || 'sqft'}`
                    : 'N/A',
                location: property.locality || property.city || 'Pune',
                status: getStatus(),
                images: getPropertyImages(property), // ← only real API images
                type: property.property_type || 'Apartment',
                bhk: property.bedrooms || 2,
                bathrooms: property.bathrooms || 1,
                parking: property.parking_available ? 1 : 0,
                views: property.views || 0,
                verification_status: property.verification_status,
                _original: property
            };
        });
    }, [apiResponse, isLoading, isError]);

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

    const handleCardClick = (propertyId) => navigate(`/properties/${propertyId}`);
    const handleButtonClick = (e, propertyId) => { e.stopPropagation(); navigate(`/properties/${propertyId}`); };

    if (isLoading) {
        return (
            <section className="bg-[#F3F4F4] py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <span className="bg-red-100 border border-red-200 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">Trending</span>
                        <h2 className="text-3xl font-black text-gray-700 mb-2 mt-2">Trending in Pune</h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2"><PropertySkeleton /></div>
                        <div className="space-y-8">{[1, 2].map((item) => <PropertySkeleton key={item} />)}</div>
                    </div>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="bg-[#F3F4F4] py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <span className="bg-red-100 border border-red-200 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">Trending</span>
                        <h2 className="text-3xl font-black text-gray-700 mb-2 mt-2">Trending in Pune</h2>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Properties</h3>
                        <p className="text-red-600 mb-4">{error?.data?.message || "Failed to load trending properties. Please try again."}</p>
                        <button onClick={() => refetch()} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            Retry
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (trendingProperties.length === 0) {
        return (
            <section className="bg-[#F3F4F4] py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <span className="bg-red-100 border border-red-200 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">Trending</span>
                        <h2 className="text-3xl font-black text-gray-700 mb-2 mt-2">Trending in Pune</h2>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Trending Properties</h3>
                        <p className="text-gray-600 mb-4">Check back later for trending property updates.</p>
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
                    <h2 className="text-3xl font-black text-gray-700 mb-2 mt-2">Trending in Pune</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Property */}
                    <div className="lg:col-span-2">
                        <div
                            onClick={() => handleCardClick(trendingProperties[0].id)}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        >
                            <PropertyCarousel
                                images={trendingProperties[0].images}
                                price={trendingProperties[0].price}
                                status={trendingProperties[0].status}
                                title={trendingProperties[0].title}
                                height="h-64"
                            />

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{trendingProperties[0].title}</h3>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-lg font-semibold text-yellow-600">{trendingProperties[0].price}</div>
                                    <div className="text-sm text-gray-500">| {trendingProperties[0].area}</div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        <span className="text-gray-700 font-medium">{trendingProperties[0].location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-green-600 font-medium">{trendingProperties[0].status}</span>
                                    </div>
                                    {trendingProperties[0]._original?.verification_status === 'verified' && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="text-blue-600 font-medium">Verified Property</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={(e) => handleButtonClick(e, trendingProperties[0].id)}
                                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    View Details
                                </button>

                                <div className="h-px bg-gray-200 my-8"></div>

                                {/* Localities Section */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">Top Localities in Pune</h4>
                                    <div className="space-y-4">
                                        {localities.slice(0, 1).map((locality) => (
                                            <Link key={locality.id} to={`/localities/${locality.id}`} className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h5 className="font-medium text-gray-900">{locality.name}</h5>
                                                    {locality.verified && <span className="text-green-600 text-sm">✓ Verified</span>}
                                                </div>
                                                <div className="text-lg font-semibold text-gray-900 mb-3">₹{locality.priceRange}</div>
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

                    {/* Right Column */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            {trendingProperties.slice(1).map((property) => (
                                <div
                                    key={property.id}
                                    onClick={() => handleCardClick(property.id)}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                                >
                                    <PropertyCarousel
                                        images={property.images}
                                        price={property.price}
                                        status={property.status}
                                        title={property.title}
                                        height="h-48"
                                    />

                                    <div className="p-5">
                                        <h4 className="text-gray-500 text-sm font-medium mb-2">{property.type} • {property.bhk} BHK</h4>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">{property.title}</h3>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-base font-semibold text-yellow-600">{property.price}</div>
                                            <div className="text-sm text-gray-500">| {property.area}</div>
                                        </div>

                                        <div className="space-y-2 mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                <span className="text-gray-700 font-medium text-sm line-clamp-1">{property.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-green-600 font-medium text-sm">{property.status}</span>
                                            </div>
                                            {property._original?.verification_status === 'verified' && (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <span className="text-blue-600 font-medium text-sm">Verified</span>
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
                                <Link key={locality.id} to={`/localities/${locality.id}`} className="block bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <h5 className="font-medium text-gray-900">{locality.name}</h5>
                                            {locality.verified && <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">Verified</span>}
                                        </div>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900 mb-3">₹{locality.priceRange}</div>
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