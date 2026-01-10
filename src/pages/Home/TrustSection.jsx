import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Property images arrays for each carousel
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

  // Auto slide effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

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
    <div className="relative mb-4 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>

      {/* Image Container */}
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

        {/* Golden Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center items-center pt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-yellow-500 w-6'
                : 'bg-gray-300 hover:bg-yellow-400'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const TrustSection = () => {
  const navigate = useNavigate();
  
  const properties = [
    {
      id: 1,
      title: '3 BHK Flat',
      price: '1.62 Cr',
      area: '1654 sqft',
      location: 'Balewadi, Pune',
      status: 'Ready to Move',
      images: propertyImageSets[0]
    },
    {
      id: 2,
      title: '3 BHK Flat',
      price: '96 Lac',
      area: '1410 sqft',
      location: 'Wagholi, Pune',
      status: 'Ready to Move',
      images: propertyImageSets[1]
    },
    {
      id: 3,
      title: '1 BHK Flat',
      price: '58 Lac',
      area: null,
      location: 'Fursungi, Pune',
      status: 'Ready to Move',
      images: propertyImageSets[2]
    },
    {
      id: 4,
      title: '2 BHK Flat',
      price: '72 Lac',
      area: '1150 sqft',
      location: 'Kondhwa, Pune',
      status: 'Ready to Move',
      images: propertyImageSets[3]
    }
  ];

  const handleCardClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <section className=" bg-[#F3F4F4] py-10">
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
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
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
                    <span className="text-gray-700 font-medium">
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