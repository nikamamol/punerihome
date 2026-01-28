// PropertyDetailsPage.jsx - Updated with proper like/save handling
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Heart,
  Bookmark,
  MapPin,
  Ruler,
  Bath,
  Bed,
  Car,
  Users,
  Calendar,
  CheckCircle,
  Shield,
  Phone,
  Eye,
  Loader,
  BookmarkCheck,
  HeartHandshake,
} from "lucide-react";
import { useGetPropertyByIdQuery } from "../../store/api/propertyApi";
import {
  useLikePropertyMutation,
  useUnlikePropertyMutation,
  useSavePropertyMutation,
  useUnsavePropertyMutation,
  useCheckPropertyStatusQuery
} from "../../store/api/propertyApi";
import { useSelector } from "react-redux";

// Fallback images array
const fallbackImages = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop',
];

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const userType = user?.userType;

  // Use RTK Query to fetch property by ID
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetPropertyByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  // Like/Save mutations
  const [likeProperty, { isLoading: isLiking }] = useLikePropertyMutation();
  const [unlikeProperty, { isLoading: isUnliking }] = useUnlikePropertyMutation();
  const [saveProperty, { isLoading: isSaving }] = useSavePropertyMutation();
  const [unsaveProperty, { isLoading: isUnsaving }] = useUnsavePropertyMutation();

  // Check property status - only if user is logged in
  const { data: statusData, refetch: refetchStatus } = useCheckPropertyStatusQuery(id, {
    skip: !userId || !id,
  });

  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [propertyLikes, setPropertyLikes] = useState(0);

  // Initialize like/save status from API response and status endpoint
  useEffect(() => {
    if (apiResponse?.success && apiResponse?.data) {
      const apiData = apiResponse.data;

      // Set like/save status from property data
      if (apiData.user_status) {
        setIsLiked(apiData.user_status.liked || false);
        setIsSaved(apiData.user_status.saved || false);
      }

      // Set likes count
      setPropertyLikes(apiData.total_likes || apiData.likes || 0);
    }

    // Override with status endpoint data if available (more accurate)
    if (statusData?.success && statusData.data) {
      setIsLiked(statusData.data.liked || false);
      setIsSaved(statusData.data.saved || false);
    }
  }, [apiResponse, statusData]);

  // Transform API data to match component format
  useEffect(() => {
    if (apiResponse?.success && apiResponse?.data) {
      const apiData = apiResponse.data;

      // Format price
      const formatPrice = (price) => {
        if (!price) return 'Price on Request';
        const priceNum = parseFloat(price);
        if (priceNum >= 10000000) return `₹${(priceNum / 10000000).toFixed(1)} Cr`;
        if (priceNum >= 100000) return `₹${(priceNum / 100000).toFixed(1)} L`;
        if (priceNum >= 1000) return `₹${Math.round(priceNum / 1000)}K`;
        return `₹${priceNum}`;
      };

      // Format property object
      const formattedProperty = {
        id: apiData.id,
        title: `${apiData.bedrooms || 2} BHK ${apiData.property_type || 'Flat'}`,
        price: formatPrice(apiData.price),
        area: apiData.built_up_area ? `${apiData.built_up_area} ${apiData.area_unit || 'sqft'}` : '',
        location: apiData.locality || apiData.area || apiData.city || 'Pune',
        fullAddress: apiData.address || `${apiData.locality}, ${apiData.city}`,
        status: apiData.status === 'approved' ? 'Ready to Move' : 'Under Review',
        bhk: apiData.bedrooms || 2,
        bathrooms: apiData.bathrooms || 2,
        parking: apiData.parking || 1,
        furnishing: apiData.furnishing_status || apiData.furnishing_type || 'Semi-Furnished',
        facing: apiData.facing || 'North-East',
        floor: apiData.floor_number ? `${apiData.floor_number} Floor` : 'Ground Floor',
        description: apiData.description || 'No description available.',
        amenities: apiData.amenities || [],
        images: apiData.images?.map(img => img.url) || [],
        owner: {
          name: apiData.owner_name || 'Owner',
          phone: apiData.owner_phone || 'Not available',
          email: apiData.owner_email || '',
          isVerified: apiData.is_verified || false,
        },
        views: apiData.views || 0,
        likes: propertyLikes,
        saves: apiData.total_saves || apiData.saves || 0,
        postedDate: apiData.created_at || new Date().toISOString().split('T')[0],
        propertyType: apiData.property_type || 'Apartment',
        propertyFor: apiData.property_for || 'Sale',
      };

      setProperty(formattedProperty);
    }
  }, [apiResponse, propertyLikes]);

  // Handle like action - Only for tenants
  const handleLike = async () => {
    if (!userId) {
      // Save property ID for after login
      localStorage.setItem('pendingLikePropertyId', id);
      localStorage.setItem('redirectAfterLogin', window.location.pathname);

      // Open login in new tab
      const loginWindow = window.open('/login', '_blank');

      // Focus on new window
      if (loginWindow) {
        loginWindow.focus();
      }

      return;
    }

    // Check if user is tenant (like is only for tenants)
    if (userType !== 'tenant' && userType !== 'admin') {
      alert('Only tenants can like properties');
      return;
    }

    try {
      if (isLiked) {
        const result = await unlikeProperty(id).unwrap();
        if (result.success) {
          setIsLiked(false);
          setPropertyLikes(prev => Math.max(0, prev - 1));
          // Refetch status
          refetchStatus();
        }
      } else {
        const result = await likeProperty(id).unwrap();
        if (result.success) {
          setIsLiked(true);
          setPropertyLikes(prev => prev + 1);
          // Refetch status
          refetchStatus();
        }
      }
    } catch (error) {
      console.error('Like action failed:', error);
      // Check if error is due to user type restriction
      if (error?.data?.message?.includes('Only tenants')) {
        alert('Only tenants can like properties');
      } else {
        alert('Failed to process like. Please try again.');
      }
    }
  };

  // Handle save action - For all authenticated users
  const handleSave = async () => {
    if (!userId) {
      // Save property ID for after login
      localStorage.setItem('pendingSavePropertyId', id);
      localStorage.setItem('redirectAfterLogin', window.location.pathname);

      // Open login in new tab
      const loginWindow = window.open('/login', '_blank');

      // Focus on new window
      if (loginWindow) {
        loginWindow.focus();
      }

      return;
    }

    try {
      if (isSaved) {
        const result = await unsaveProperty(id).unwrap();
        if (result.success) {
          setIsSaved(false);
          // Refetch status
          refetchStatus();
        }
      } else {
        const result = await saveProperty(id).unwrap();
        if (result.success) {
          setIsSaved(true);
          // Refetch status
          refetchStatus();
        }
      }
    } catch (error) {
      console.error('Save action failed:', error);
      alert('Failed to save property. Please try again.');
    }
  };

  // Check if like button should be shown (tenants only)
  const showLikeButton = userType === 'tenant' || userType === 'admin';

  // Handle error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Property Not Found</h2>
            <p className="text-red-600 mb-4">
              {error?.data?.message || "The property you're looking for doesn't exist or has been removed."}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => navigate('/properties')}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Browse Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (isLoading || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-yellow-500 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-4">
              {/* Save Button - For all authenticated users */}
              <button
                onClick={handleSave}
                disabled={isSaving || isUnsaving}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors group relative"
                title={isSaved ? "Remove from saved" : "Save property"}
              >
                {(isSaving || isUnsaving) ? (
                  <Loader className="w-5 h-5 text-yellow-500 animate-spin" />
                ) : isSaved ? (
                  <BookmarkCheck className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ) : (
                  <Bookmark className="w-5 h-5 text-gray-600 group-hover:text-yellow-500" />
                )}
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {isSaved ? "✓" : "+"}
                </span>
              </button>

              {/* Like Button - Only for tenants */}
              {showLikeButton && (
                <button
                  onClick={handleLike}
                  disabled={isLiking || isUnliking}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors group relative"
                  title={isLiked ? "Unlike property" : "Like property"}
                >
                  {(isLiking || isUnliking) ? (
                    <Loader className="w-5 h-5 text-red-500 animate-spin" />
                  ) : isLiked ? (
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  ) : (
                    <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
                  )}
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {propertyLikes > 0 ? propertyLikes : "+"}
                  </span>
                </button>
              )}

              {/* Share Button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Share property"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={property.images[currentImage] || fallbackImages[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = fallbackImages[0];
                  }}
                />

                {/* Navigation buttons */}
                <button
                  onClick={() =>
                    setCurrentImage((prev) =>
                      prev > 0 ? prev - 1 : property.images.length - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() =>
                    setCurrentImage(
                      (prev) => (prev + 1) % property.images.length
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full rotate-180"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full ${idx === currentImage ? "bg-yellow-500" : "bg-white/50"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${idx === currentImage
                      ? "ring-2 ring-yellow-500"
                      : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = fallbackImages[idx % fallbackImages.length];
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="text-2xl font-bold text-yellow-600">
                        {property.price}
                        <span className="text-sm font-normal text-gray-500 ml-2">
                          {property.propertyFor === 'Rent' ? '/month' : ''}
                        </span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${property.status === 'Ready to Move'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                        }`}>
                        {property.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mt-3">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                      {property.fullAddress && (
                        <span className="text-sm text-gray-500">
                          • {property.fullAddress}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* Save Button */}
                    <button
                      onClick={handleSave}
                      disabled={isSaving || isUnsaving}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isSaved
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } ${(isSaving || isUnsaving) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {(isSaving || isUnsaving) ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : isSaved ? (
                        <>
                          <BookmarkCheck className="w-4 h-4" />
                          <span className="text-sm font-medium">Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4" />
                          <span className="text-sm font-medium">Save</span>
                        </>
                      )}
                    </button>

                    {/* Like Button - Only for tenants */}
                    {showLikeButton && (
                      <button
                        onClick={handleLike}
                        disabled={isLiking || isUnliking}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isLiked
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          } ${(isLiking || isUnliking) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {(isLiking || isUnliking) ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : isLiked ? (
                          <>
                            <Heart className="w-4 h-4 fill-red-500" />
                            <span className="text-sm font-medium">Liked</span>
                          </>
                        ) : (
                          <>
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium">Like</span>
                          </>
                        )}
                        {propertyLikes > 0 && (
                          <span className="text-xs bg-white px-1.5 py-0.5 rounded-full">
                            {propertyLikes}
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Bed className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold">{property.bhk} BHK</span>
                  </div>
                  <div className="text-xs text-gray-500">Configuration</div>
                </div>

                {property.area && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Ruler className="w-4 h-4 text-yellow-600" />
                      <span className="font-semibold">{property.area}</span>
                    </div>
                    <div className="text-xs text-gray-500">Built-up Area</div>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Bath className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold">
                      {property.bathrooms} Bath
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Bathrooms</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Car className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold">
                      {property.parking} Park
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Parking</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Additional Details */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.furnishing && (
                    <div>
                      <div className="text-sm text-gray-500">Furnishing</div>
                      <div className="font-medium">{property.furnishing}</div>
                    </div>
                  )}

                  {property.facing && (
                    <div>
                      <div className="text-sm text-gray-500">Facing</div>
                      <div className="font-medium">{property.facing}</div>
                    </div>
                  )}

                  <div>
                    <div className="text-sm text-gray-500">Floor</div>
                    <div className="font-medium">
                      {property.floor}
                    </div>
                  </div>

                  {property.propertyType && (
                    <div>
                      <div className="text-sm text-gray-500">Type</div>
                      <div className="font-medium">{property.propertyType}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-yellow-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats Section */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Property Stats</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {property.views.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Views</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <HeartHandshake className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {property.likes.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Likes</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-xl font-bold">
                      {new Date(property.postedDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-gray-500">Posted Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Actions */}
          <div className="space-y-6">
            {/* Owner Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">{property.owner.name}</h3>
                    {property.owner.isVerified && (
                      <Shield className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">Property Owner</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Phone className="inline-block w-4 h-4 mr-2" />
                  Contact Owner
                </button>

                <button className="w-full border border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold py-3 rounded-lg transition-colors">
                  <Calendar className="inline-block w-4 h-4 mr-2" />
                  Schedule Visit
                </button>
              </div>
            </div>

            {/* Quick Actions - Only show if user is logged in */}
            {userId && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-yellow-500 shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {showLikeButton && (
                    <button
                      onClick={() => navigate('/tenant/dashboard_section')}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold py-2.5 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2"
                    >
                      <HeartHandshake className="w-4 h-4" />
                      View Liked Properties
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/tenant/dashboard_section')}

                    className="w-full bg-white border border-yellow-500 text-yellow-600 font-semibold py-2.5 rounded-lg hover:bg-yellow-50 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    View Saved Properties
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }}
                    className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share with Friend
                  </button>
                </div>
              </div>
            )}

            {/* Similar Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Similar Properties</h3>
              <div className="space-y-4">
                <div className="text-center py-4 text-gray-500">
                  <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No similar properties found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Contact Owner</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Contact details are protected. Your message will be forwarded to the owner.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  placeholder="Enter your phone"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  rows="3"
                  placeholder="I'm interested in this property..."
                  defaultValue={`Hi, I'm interested in ${property.title} at ${property.location}. Please share more details.`}
                ></textarea>
              </div>

              <button
                type="button"
                onClick={() => {
                  alert('Message sent to owner! They will contact you soon.');
                  setShowContactForm(false);
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;