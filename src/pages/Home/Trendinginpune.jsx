import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Carousel Component
const PropertyCarousel = ({ images, price, status, title, height = "h-64" }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto slide effect
    useEffect(() => {
        if (isPaused) return;

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
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentSlide
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`${title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
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

                {/* Golden Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                            ? 'bg-white w-4'
                            : 'bg-white/60 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const TrendingInPune = () => {
    const navigate = useNavigate();

    // Property images for carousels
    const propertyImageSets = [
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
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop'
        ]
    ];

    const trendingProperties = [
        {
            id: 1,
            title: '3 BHK Multistorey Apartment',
            price: '2.38 Cr',
            area: '2000 sqft',
            location: 'Kharadi, Pune',
            status: 'Ready to Move',
            images: propertyImageSets[0],
            type: 'Apartment',
            bhk: 3,
            bathrooms: 3,
            parking: 2
        },
        {
            id: 2,
            title: '1 BHK Multistorey Apartment',
            price: '65 Lac',
            area: '667 sqft',
            location: 'Keshav Nagar Mundhwa, Pune',
            status: 'Ready to Move',
            images: propertyImageSets[1],
            type: 'Apartment',
            bhk: 1,
            bathrooms: 1,
            parking: 1
        },
        {
            id: 3,
            title: '3 BHK Luxury Apartment',
            price: '110 Cr',
            area: '1160 sqft',
            location: 'EON Free Zone, Kharadi, Pune',
            status: 'Ready to Move',
            images: propertyImageSets[2],
            type: 'Apartment',
            bhk: 3,
            bathrooms: 2,
            parking: 2
        }
    ];

    const localities = [
        {
            id: 1,
            name: 'Mumbai Pune Bypass Road',
            priceRange: '6,897 - 6,897 per sqft',
            rating: 4.2,
            reviews: 37,
            propertiesCount: 14162,
            verified: false
        },

    ];

    const handleCardClick = (propertyId) => {
        navigate(`/properties/${propertyId}`);
    };

    const handleButtonClick = (e, propertyId) => {
        e.stopPropagation();
        navigate(`/properties/${propertyId}`);
    };

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
                                                        <span className="text-green-600 text-sm">✓</span>
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
                                        <h4 className="text-gray-500 text-sm font-medium mb-2">{property.type}</h4>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">
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
                                                <span className="text-gray-700 font-medium text-sm">
                                                    {property.location}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-green-600 font-medium text-sm">
                                                    {property.status}
                                                </span>
                                            </div>
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
                                                <span className="text-green-600">✓</span>
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