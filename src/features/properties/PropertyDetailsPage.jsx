// PropertyDetailsPage.jsx - Updated with OTP verification for contact
import React, { useState, useEffect, useRef } from "react";
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
  CreditCard,
  AlertCircle,
  KeyRound,
  RefreshCw,
  ShieldCheck
} from "lucide-react";
import { useGetPropertyByIdQuery } from "../../store/api/propertyApi";
import {
  useLikePropertyMutation,
  useUnlikePropertyMutation,
  useSavePropertyMutation,
  useUnsavePropertyMutation,
  useCheckPropertyStatusQuery
} from "../../store/api/propertyApi";
import {
  useGetTenantCreditsQuery,
  useUseCreditForPropertyMutation
} from "../../store/api/tenantApi";
import { useSelector } from "react-redux";

// ─── OTP Verification Modal ───────────────────────────────────────────────────
const OTPModal = ({ onVerified, onClose, remainingCredits }) => {
  const [generatedOtp] = useState(() =>
    String(Math.floor(100000 + Math.random() * 900000))
  );
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRefs = useRef([]);

  // Focus first input on open
  useEffect(() => {
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, []);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...inputs];
    next[idx] = val;
    setInputs(next);
    setError('');
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !inputs[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setInputs(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const entered = inputs.join('');
    if (entered.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }
    if (entered === generatedOtp) {
      onVerified();
    } else {
      setError('Incorrect OTP. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setInputs(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleRefresh = () => {
    // Reload page to regenerate OTP
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-5 text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white text-xl font-bold leading-none"
          >
            ×
          </button>
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-white font-bold text-lg">OTP Verification</h3>
          <p className="text-white/80 text-xs mt-1">Verify to view owner contact details</p>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Credit info */}
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mb-5">
            <CreditCard className="w-4 h-4 text-yellow-600 flex-shrink-0" />
            <span className="text-sm text-yellow-800">
              <span className="font-semibold">1 credit</span> will be deducted &nbsp;·&nbsp;
              You have <span className="font-semibold">{remainingCredits} credits</span>
            </span>
          </div>

          {/* OTP display box */}
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 mb-5 text-center relative">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">Your OTP</p>
            <div className="flex items-center justify-center gap-2">
              <p className={`text-3xl font-black tracking-[0.3em] text-yellow-600 ${showOtp ? '' : 'blur-sm select-none'}`}>
                {generatedOtp}
              </p>
              <button
                onClick={() => setShowOtp(v => !v)}
                className="text-gray-400 hover:text-gray-600 text-xs border border-gray-300 rounded px-2 py-1 ml-1"
              >
                {showOtp ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Enter this OTP below to proceed</p>
          </div>

          {/* OTP Input boxes */}
          <div
            className={`flex gap-2 justify-center mb-4 ${shake ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}
            onPaste={handlePaste}
            style={shake ? { animation: 'shake 0.3s ease-in-out' } : {}}
          >
            {inputs.map((val, idx) => (
              <input
                key={idx}
                ref={el => inputRefs.current[idx] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={val}
                onChange={e => handleChange(e.target.value, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                className={`w-10 h-12 text-center text-lg font-bold rounded-lg border-2 outline-none transition-all
                  ${val ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 'border-gray-200 bg-gray-50 text-gray-800'}
                  focus:border-yellow-500 focus:bg-yellow-50`}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Buttons */}
          <button
            onClick={handleVerify}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg mb-3"
          >
            Verify & View Contact
          </button>

          <button
            onClick={handleRefresh}
            className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Generate New OTP
          </button>
        </div>
      </div>

      {/* Shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const userType = user?.userType;

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetPropertyByIdQuery(id, { refetchOnMountOrArgChange: true });

  const [likeProperty, { isLoading: isLiking }] = useLikePropertyMutation();
  const [unlikeProperty, { isLoading: isUnliking }] = useUnlikePropertyMutation();
  const [saveProperty, { isLoading: isSaving }] = useSavePropertyMutation();
  const [unsaveProperty, { isLoading: isUnsaving }] = useUnsavePropertyMutation();

  const { data: statusData, refetch: refetchStatus } = useCheckPropertyStatusQuery(id, {
    skip: !userId || !id,
  });

  const {
    data: creditData,
    refetch: refetchCredits,
    isLoading: isLoadingCredits
  } = useGetTenantCreditsQuery(undefined, {
    skip: !userId || userType !== 'tenant',
  });

  const [useCreditForProperty, { isLoading: isUsingCredit }] = useUseCreditForPropertyMutation();

  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);   // ← NEW
  const [contactDetails, setContactDetails] = useState(null);
  const [hasViewedContact, setHasViewedContact] = useState(false);
  const [propertyLikes, setPropertyLikes] = useState(0);
  const [remainingCredits, setRemainingCredits] = useState(0);

  useEffect(() => {
    if (apiResponse?.success && apiResponse?.data) {
      const apiData = apiResponse.data;
      if (apiData.user_status) {
        setIsLiked(apiData.user_status.liked || false);
        setIsSaved(apiData.user_status.saved || false);
      }
      setPropertyLikes(apiData.total_likes || apiData.likes || 0);
    }
    if (statusData?.success && statusData.data) {
      setIsLiked(statusData.data.liked || false);
      setIsSaved(statusData.data.saved || false);
    }
  }, [apiResponse, statusData]);

  useEffect(() => {
    if (creditData?.success) {
      setRemainingCredits(creditData.data.balance || 0);
    }
  }, [creditData]);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('viewedProperties') || '[]');
    if (viewed.includes(id)) setHasViewedContact(true);
  }, [id]);

  useEffect(() => {
    if (apiResponse?.success && apiResponse?.data) {
      const apiData = apiResponse.data;
      const formatPrice = (price) => {
        if (!price) return 'Price on Request';
        const n = parseFloat(price);
        if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
        if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
        if (n >= 1000) return `₹${Math.round(n / 1000)}K`;
        return `₹${n}`;
      };

      // ── Get real images only (no fallbacks) ──
      const getImages = () => {
        const imgs = [];
        if (Array.isArray(apiData.images)) {
          apiData.images.forEach(img => {
            const url = typeof img === 'string' ? img : img?.url || img?.image_url || img?.path;
            if (url?.trim()) imgs.push(url);
          });
        }
        if (imgs.length === 0 && apiData.image_url) imgs.push(apiData.image_url);
        return imgs;
      };

      setProperty({
        id: apiData.id,
        title: apiData.title,
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
        images: getImages(),
        owner: {
          name: apiData.owner_name || 'Owner',
          phone: apiData.owner_phone || 'Not available',
          email: apiData.owner_email || '',
          whatsapp: apiData.owner_whatsapp || '',
          isVerified: apiData.is_verified || false,
        },
        views: apiData.views || 0,
        likes: propertyLikes,
        saves: apiData.total_saves || apiData.saves || 0,
        postedDate: apiData.created_at || new Date().toISOString().split('T')[0],
        propertyType: apiData.property_type || 'Apartment',
        propertyFor: apiData.property_for || 'Sale',
      });
    }
  }, [apiResponse, propertyLikes]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const buildContactDetails = () => ({
    name: apiResponse?.data?.contact_person_name || property?.owner?.name,
    phone: apiResponse?.data?.contact_person_phone || property?.owner?.phone,
    email: apiResponse?.data?.contact_person_email || property?.owner?.email,
    whatsapp: apiResponse?.data?.contact_person_whatsapp || property?.owner?.whatsapp,
  });

  // Called after OTP is verified — use credit then show contact
  const handleOtpVerified = async () => {
    setShowOTPModal(false);
    try {
      const result = await useCreditForProperty(id).unwrap();
      if (result.success) {
        setRemainingCredits(result.data?.remainingCredits ?? remainingCredits - 1);
        const viewed = JSON.parse(localStorage.getItem('viewedProperties') || '[]');
        if (!viewed.includes(id)) {
          viewed.push(id);
          localStorage.setItem('viewedProperties', JSON.stringify(viewed));
          setHasViewedContact(true);
        }
        setContactDetails(buildContactDetails());
        setShowContactForm(true);
        refetchCredits();
      }
    } catch (err) {
      alert(err?.data?.message || 'Failed to use credit. Please try again.');
    }
  };

  // ── Contact Owner click ───────────────────────────────────────────────────
  const handleContactOwner = () => {
    if (!userId) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      window.open('/login', '_blank');
      return;
    }
    if (userType === 'owner') {
      alert('Only tenants can view owner contact details.');
      return;
    }
    if (userType === 'admin') {
      setContactDetails(buildContactDetails());
      setShowContactForm(true);
      return;
    }
    if (userType === 'tenant') {
      // Already viewed — show directly
      if (hasViewedContact) {
        setContactDetails(buildContactDetails());
        setShowContactForm(true);
        return;
      }
      // No credits — go to pricing
      if (remainingCredits <= 0) {
        navigate('/pricing-plans', {
          state: {
            message: 'You need credits to contact property owners.',
            returnTo: window.location.pathname
          }
        });
        return;
      }
      // Has credits — show OTP modal
      setShowOTPModal(true);
    }
  };

  // ── Like / Save ───────────────────────────────────────────────────────────
  const handleLike = async () => {
    if (!userId) {
      localStorage.setItem('pendingLikePropertyId', id);
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      window.open('/login', '_blank');
      return;
    }
    if (userType !== 'tenant' && userType !== 'admin') {
      alert('Only tenants can like properties');
      return;
    }
    try {
      if (isLiked) {
        const r = await unlikeProperty(id).unwrap();
        if (r.success) { setIsLiked(false); setPropertyLikes(p => Math.max(0, p - 1)); refetchStatus(); }
      } else {
        const r = await likeProperty(id).unwrap();
        if (r.success) { setIsLiked(true); setPropertyLikes(p => p + 1); refetchStatus(); }
      }
    } catch (err) {
      alert(err?.data?.message?.includes('Only tenants') ? 'Only tenants can like properties' : 'Failed to process like.');
    }
  };

  const handleSave = async () => {
    if (!userId) {
      localStorage.setItem('pendingSavePropertyId', id);
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      window.open('/login', '_blank');
      return;
    }
    try {
      if (isSaved) {
        const r = await unsaveProperty(id).unwrap();
        if (r.success) { setIsSaved(false); refetchStatus(); }
      } else {
        const r = await saveProperty(id).unwrap();
        if (r.success) { setIsSaved(true); refetchStatus(); }
      }
    } catch { alert('Failed to save property. Please try again.'); }
  };

  const showLikeButton = userType === 'tenant' || userType === 'admin';

  // ── Render guards ─────────────────────────────────────────────────────────
  if (isError) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
        <h2 className="text-xl font-bold text-red-800 mb-2">Property Not Found</h2>
        <p className="text-red-600 mb-4">{error?.data?.message || "This property doesn't exist or has been removed."}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Go Back</button>
          <button onClick={() => navigate('/properties')} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Browse Properties</button>
        </div>
      </div>
    </div>
  );

  if (isLoading || !property) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader className="w-12 h-12 text-yellow-500 animate-spin mx-auto" />
        <p className="mt-4 text-gray-600">Loading property details...</p>
      </div>
    </div>
  );

  // ── Main Render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── OTP Modal ── */}
      {showOTPModal && (
        <OTPModal
          remainingCredits={remainingCredits}
          onVerified={handleOtpVerified}
          onClose={() => setShowOTPModal(false)}
        />
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-4">
              {userType === 'tenant' && userId && (
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                  <CreditCard className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700">
                    {isLoadingCredits ? <Loader className="w-4 h-4 animate-spin" /> : `${remainingCredits} Credits`}
                  </span>
                </div>
              )}
              <button onClick={handleSave} disabled={isSaving || isUnsaving} className="p-2 rounded-full hover:bg-gray-100 transition-colors group relative">
                {(isSaving || isUnsaving) ? <Loader className="w-5 h-5 text-yellow-500 animate-spin" />
                  : isSaved ? <BookmarkCheck className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    : <Bookmark className="w-5 h-5 text-gray-600 group-hover:text-yellow-500" />}
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {isSaved ? "✓" : "+"}
                </span>
              </button>
              {showLikeButton && (
                <button onClick={handleLike} disabled={isLiking || isUnliking} className="p-2 rounded-full hover:bg-gray-100 transition-colors group relative">
                  {(isLiking || isUnliking) ? <Loader className="w-5 h-5 text-red-500 animate-spin" />
                    : isLiked ? <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      : <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />}
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {propertyLikes > 0 ? propertyLikes : "+"}
                  </span>
                </button>
              )}
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left Column ── */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
                {property.images.length > 0 ? (
                  <img
                    src={property.images[currentImage]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.parentElement.classList.add('flex','items-center','justify-center'); e.target.style.display='none'; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-yellow-400">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                      <p className="text-sm font-medium">No Image Available</p>
                    </div>
                  </div>
                )}
                {property.images.length > 1 && (
                  <>
                    <button onClick={() => setCurrentImage(p => p > 0 ? p - 1 : property.images.length - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentImage(p => (p + 1) % property.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full rotate-180">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {property.images.map((_, idx) => (
                        <button key={idx} onClick={() => setCurrentImage(idx)}
                          className={`w-2 h-2 rounded-full ${idx === currentImage ? 'bg-yellow-500' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {property.images.map((img, idx) => (
                    <button key={idx} onClick={() => setCurrentImage(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${idx === currentImage ? 'ring-2 ring-yellow-500' : 'opacity-70 hover:opacity-100'}`}>
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover"
                        onError={e => { e.target.parentElement.style.display = 'none'; }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="mb-6">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="text-2xl font-bold text-yellow-600">
                        {property.price}
                        <span className="text-sm font-normal text-gray-500 ml-2">{property.propertyFor === 'Rent' ? '/month' : ''}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${property.status === 'Ready to Move' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {property.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mt-3">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                      {property.fullAddress && <span className="text-sm text-gray-500">• {property.fullAddress}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleSave} disabled={isSaving || isUnsaving}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isSaved ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} ${(isSaving || isUnsaving) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {(isSaving || isUnsaving) ? <Loader className="w-4 h-4 animate-spin" />
                        : isSaved ? <><BookmarkCheck className="w-4 h-4" /><span className="text-sm font-medium">Saved</span></>
                          : <><Bookmark className="w-4 h-4" /><span className="text-sm font-medium">Save</span></>}
                    </button>
                    {showLikeButton && (
                      <button onClick={handleLike} disabled={isLiking || isUnliking}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isLiked ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} ${(isLiking || isUnliking) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {(isLiking || isUnliking) ? <Loader className="w-4 h-4 animate-spin" />
                          : isLiked ? <><Heart className="w-4 h-4 fill-red-500" /><span className="text-sm font-medium">Liked</span></>
                            : <><Heart className="w-4 h-4" /><span className="text-sm font-medium">Like</span></>}
                        {propertyLikes > 0 && <span className="text-xs bg-white px-1.5 py-0.5 rounded-full">{propertyLikes}</span>}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1"><Bed className="w-4 h-4 text-yellow-600" /><span className="font-semibold">{property.bhk} BHK</span></div>
                  <div className="text-xs text-gray-500">Configuration</div>
                </div>
                {property.area && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1"><Ruler className="w-4 h-4 text-yellow-600" /><span className="font-semibold">{property.area}</span></div>
                    <div className="text-xs text-gray-500">Built-up Area</div>
                  </div>
                )}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1"><Bath className="w-4 h-4 text-yellow-600" /><span className="font-semibold">{property.bathrooms} Bath</span></div>
                  <div className="text-xs text-gray-500">Bathrooms</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1"><Car className="w-4 h-4 text-yellow-600" /><span className="font-semibold">{property.parking} Park</span></div>
                  <div className="text-xs text-gray-500">Parking</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* Property Details */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.furnishing && <div><div className="text-sm text-gray-500">Furnishing</div><div className="font-medium">{property.furnishing}</div></div>}
                  {property.facing && <div><div className="text-sm text-gray-500">Facing</div><div className="font-medium">{property.facing}</div></div>}
                  <div><div className="text-sm text-gray-500">Floor</div><div className="font-medium">{property.floor}</div></div>
                  {property.propertyType && <div><div className="text-sm text-gray-500">Type</div><div className="font-medium">{property.propertyType}</div></div>}
                </div>
              </div>

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-yellow-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Property Stats</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{property.views.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Views</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <HeartHandshake className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{property.likes.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Likes</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-xl font-bold">{new Date(property.postedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    <div className="text-sm text-gray-500">Posted Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column ── */}
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
                    {property.owner.isVerified && <Shield className="w-4 h-4 text-green-500" />}
                  </div>
                  <p className="text-gray-600 text-sm">Property Owner</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleContactOwner}
                  disabled={isUsingCredit}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isUsingCredit ? <Loader className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
                  Contact Owner
                  {userType === 'tenant' && userId && !hasViewedContact && (
                    <span className="bg-white text-yellow-600 text-xs px-2 py-1 rounded-full">1 Credit</span>
                  )}
                  {userType === 'owner' && userId && (
                    <span className="bg-white text-red-600 text-xs px-2 py-1 rounded-full">Login as Tenant</span>
                  )}
                  {!userId && (
                    <span className="bg-white text-blue-600 text-xs px-2 py-1 rounded-full">Login Required</span>
                  )}
                </button>

                <button onClick={() => navigate('/services/flexible-viewings')}
                  className="w-full border border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold py-3 rounded-lg transition-colors">
                  <Calendar className="inline-block w-4 h-4 mr-2" />
                  Schedule Visit
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-yellow-500 shadow-sm">
              <h3 className="text-lg font-bold mb-3 text-gray-900">Quick Actions</h3>
              <div className="space-y-3">
                {showLikeButton && (
                  <button onClick={() => window.open('/tenant/dashboard_section', '_blank')}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold py-2.5 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2">
                    <HeartHandshake className="w-4 h-4" /> View Liked Properties
                  </button>
                )}
                <button onClick={() => window.open('/tenant/dashboard_section', '_blank')}
                  className="w-full bg-white border border-yellow-500 text-yellow-600 font-semibold py-2.5 rounded-lg hover:bg-yellow-50 transition-colors text-sm flex items-center justify-center gap-2">
                  <BookmarkCheck className="w-4 h-4" /> View Saved Properties
                </button>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); }}
                  className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" /> Share with Friend
                </button>
              </div>
            </div>

            {/* Similar Properties */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Similar Properties</h3>
              <div className="text-center py-4 text-gray-500">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No similar properties found</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact Details Modal ── */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Owner Contact Details
              </h3>
              <button onClick={() => setShowContactForm(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>

            <div className="space-y-5">
              {/* Contact Person */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-blue-800">{contactDetails?.name || 'Contact Person'}</h4>
                    <p className="text-blue-600 text-sm font-medium bg-blue-100 px-2 py-0.5 rounded-full inline-block">Contact Person</p>
                  </div>
                </div>
                {[
                  { label: 'Phone', value: contactDetails?.phone, icon: <Phone className="w-4 h-4 text-blue-500" /> },
                  { label: 'Email', value: contactDetails?.email, icon: <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
                  { label: 'WhatsApp', value: contactDetails?.whatsapp, icon: <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" /></svg> },
                ].map(({ label, value, icon }) => value ? (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                      {icon}
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  </div>
                ) : null)}
              </div>

              {/* Owner */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{apiResponse?.data?.owner_name || property?.owner?.name}</h4>
                    <p className="text-gray-600 text-sm bg-gray-200 px-2 py-0.5 rounded-full inline-block">Property Owner</p>
                  </div>
                </div>
                {[
                  { label: 'Phone', value: apiResponse?.data?.owner_phone || property?.owner?.phone, icon: <Phone className="w-4 h-4 text-gray-500" /> },
                  { label: 'Email', value: apiResponse?.data?.owner_email || property?.owner?.email, icon: <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
                ].map(({ label, value, icon }) => value ? (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                      {icon}
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  </div>
                ) : null)}
              </div>
            </div>

            {/* Call / WhatsApp */}
            <div className="flex gap-3 pt-5 mt-2 border-t">
              <a href={`tel:${contactDetails?.phone || property?.owner?.phone}`}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg text-center flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href={`https://wa.me/${(contactDetails?.whatsapp || property?.owner?.whatsapp || '').replace(/\D/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg text-center flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" /></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;