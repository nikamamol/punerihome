import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetPropertyByIdQuery } from '../../features/properties/propertiesAPI';
// import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { ArrowLeft, MapPin, Bed, Bath, Square, Star, ShieldCheck } from 'lucide-react';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: property, isLoading, error } = useGetPropertyByIdQuery(id);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return ;
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate('/properties')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={property.images?.[0] || '/placeholder.jpg'}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="font-semibold text-lg">₹{property.rent}/month</span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              {property.isVerified && (
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">Owner Verified</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-8">
            {/* Property Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.location}</span>
              </div>
              <p className="text-gray-700 text-lg">{property.description}</p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Bed className="w-6 h-6 text-blue-600" />
                </div>
                <div className="font-semibold">{property.bedrooms} Beds</div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Bath className="w-6 h-6 text-green-600" />
                </div>
                <div className="font-semibold">{property.bathrooms} Baths</div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Square className="w-6 h-6 text-purple-600" />
                </div>
                <div className="font-semibold">{property.area} sqft</div>
                <div className="text-sm text-gray-600">Area</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold">₹</span>
                </div>
                <div className="font-semibold">₹{property.deposit}</div>
                <div className="text-sm text-gray-600">Security Deposit</div>
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Main Details */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Property Details</h2>
                
                {/* Amenities */}
                {property.amenities && property.amenities.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {property.fullDescription || property.description}
                  </p>
                </div>
              </div>

              {/* Owner & Contact Info */}
              <div>
                <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Owner Information</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">
                          {property.owner?.name?.charAt(0) || 'O'}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{property.owner?.name || 'Property Owner'}</div>
                        <div className="text-sm text-gray-600">Owner</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Listed on:</span>
                        <span className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Property Type:</span>
                        <span className="font-medium">{property.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Furnishing:</span>
                        <span className="font-medium">{property.furnished}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="space-y-3">
                    {isAuthenticated ? (
                      <>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition">
                          Unlock Contact (₹49)
                        </button>
                        <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg transition">
                          Save Property
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => navigate('/login')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
                        >
                          Login to Contact Owner
                        </button>
                        <p className="text-sm text-gray-600 text-center">
                          Login required to unlock owner contact details
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-sm text-gray-500 mt-2">Map integration available</p>
                </div>
              </div>
            </div>

            {/* Report Section */}
            <div className="border-t pt-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">See something wrong?</p>
                  <p className="text-sm text-gray-500">Report suspicious listing or broker</p>
                </div>
                <button className="bg-red-50 text-red-600 hover:bg-red-100 px-6 py-2 rounded-lg font-medium">
                  Report Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;