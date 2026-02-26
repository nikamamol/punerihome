import React, { useEffect, useRef, useState } from 'react';
import { useGetPublicPropertiesQuery } from "../../store/api/propertyApi";
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import TrustSection from './TrustSection';
import { Link } from 'react-router-dom';
import TrendingInPune from './Trendinginpune';
import Freshproperty from './Freshproperty';
import Realestateguide from './Realestateguide';
import Propertysnapshot from './Propertysnapshot';

// ─── Beta Popup Modal ────────────────────────────────────────────────────────
const BetaPopup = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          70% { transform: scale(1.1); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: visible ? 'rgba(10,10,20,0.65)' : 'rgba(10,10,20,0)',
          backdropFilter: visible ? 'blur(6px)' : 'blur(0px)',
          transition: 'background 0.35s ease, backdrop-filter 0.35s ease',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '90%',
            maxWidth: '600px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(234,179,8,0.15)',
            overflow: 'hidden',
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)',
            opacity: visible ? 1 : 0,
            transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease',
          }}
        >
          {/* Top shimmer bar */}
          <div style={{
            height: '4px',
            background: 'linear-gradient(90deg, #ca8a04, #eab308, #fde047, #eab308, #ca8a04)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.5s linear infinite',
          }} />

          {/* Hero illustration area */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
            padding: '28px 32px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background decoration dots */}
            <div style={{ position: 'absolute', top: '12px', right: '160px', width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(234,179,8,0.3)' }} />
            <div style={{ position: 'absolute', top: '30px', right: '200px', width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(234,179,8,0.2)' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '180px', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(234,179,8,0.25)' }} />

            {/* Left: title block */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>
                  We're in Beta Version
                </h2>
                {/* Pulsing live dot */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    position: 'absolute',
                    width: '20px', height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(74,222,128,0.4)',
                    animation: 'pulse-ring 1.8s ease-out infinite',
                    left: '-4px', top: '-4px',
                  }} />
                  <span style={{
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', gap: '5px',
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                    LIVE
                  </span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'rgba(253,224,71,0.85)', fontWeight: 500 }}>
                Data Collection Mode Active
              </p>
              <p style={{ margin: '10px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.5', maxWidth: '280px' }}>
                Building Pune's largest verified owner property network — zero brokers.
              </p>
            </div>

            {/* Right: SVG Illustration */}
            <div style={{ animation: 'float 3s ease-in-out infinite', flexShrink: 0 }}>
              <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Building */}
                <rect x="20" y="35" width="30" height="50" rx="3" fill="#1e3a5f" stroke="#eab308" strokeWidth="1.5" />
                <rect x="25" y="42" width="8" height="8" rx="1" fill="#fde047" opacity="0.9" />
                <rect x="37" y="42" width="8" height="8" rx="1" fill="#fde047" opacity="0.6" />
                <rect x="25" y="55" width="8" height="8" rx="1" fill="#fde047" opacity="0.5" />
                <rect x="37" y="55" width="8" height="8" rx="1" fill="#fde047" opacity="0.9" />
                <rect x="30" y="68" width="10" height="17" rx="2" fill="#2d5a8e" />
                {/* Tall building */}
                <rect x="58" y="18" width="28" height="67" rx="3" fill="#162d4a" stroke="#eab308" strokeWidth="1.5" />
                <rect x="63" y="25" width="7" height="7" rx="1" fill="#fde047" opacity="0.8" />
                <rect x="74" y="25" width="7" height="7" rx="1" fill="#fde047" opacity="0.4" />
                <rect x="63" y="37" width="7" height="7" rx="1" fill="#fde047" opacity="0.6" />
                <rect x="74" y="37" width="7" height="7" rx="1" fill="#fde047" opacity="0.9" />
                <rect x="63" y="49" width="7" height="7" rx="1" fill="#fde047" opacity="0.5" />
                <rect x="74" y="49" width="7" height="7" rx="1" fill="#fde047" opacity="0.7" />
                <rect x="63" y="61" width="7" height="7" rx="1" fill="#fde047" opacity="0.9" />
                <rect x="74" y="61" width="7" height="7" rx="1" fill="#fde047" opacity="0.3" />
                <rect x="66" y="72" width="12" height="13" rx="2" fill="#1e3a5f" />
                {/* Ground */}
                <rect x="10" y="84" width="90" height="3" rx="1.5" fill="#eab308" opacity="0.4" />
                {/* Beta tag floating */}
                <rect x="2" y="2" width="38" height="18" rx="9" fill="#eab308" />
                <text x="21" y="15" textAnchor="middle" fill="#1a1a2e" fontSize="9" fontWeight="800" fontFamily="system-ui">BETA</text>
                {/* Stars */}
                <circle cx="96" cy="12" r="2" fill="#fde047" opacity="0.8" />
                <circle cx="104" cy="25" r="1.5" fill="#fde047" opacity="0.5" />
                <circle cx="8" cy="28" r="1.5" fill="#fde047" opacity="0.6" />
              </svg>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute', top: '14px', right: '14px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                width: '30px', height: '30px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '18px 28px 22px' }}>
            {/* 3 feature pills in a row */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {[
                { icon: '🛡️', label: 'Verified Listings' },
                { icon: '⚡', label: 'Early Access' },
                { icon: '🤝', label: 'Zero Brokerage' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: '#fefce8',
                  border: '1px solid #fde047',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#92400e',
                  flex: '1 1 auto',
                  justifyContent: 'center',
                }}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Info note */}
            <div style={{
              background: '#fffbeb',
              border: '1px solid #fde047',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p style={{ margin: 0, fontSize: '12px', color: '#92400e', lineHeight: '1.45' }}>
                Some features may be limited in Beta. Share your feedback from the dashboard to help us improve!
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={handleClose}
              style={{
                width: '100%',
                padding: '13px',
                background: 'linear-gradient(135deg, #eab308, #ca8a04)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.2px',
                boxShadow: '0 4px 16px rgba(202,138,4,0.35)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(202,138,4,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(202,138,4,0.35)';
              }}
            >
              Got it — Explore Properties →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Loading Skeleton ────────────────────────────────────────────────────────
const LoadingSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading properties...</p>
    </div>
  </div>
);

// ─── Helper ──────────────────────────────────────────────────────────────────
const calculateAveragePrice = (properties) => {
  if (properties.length === 0) return 0;
  const total = properties.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  return Math.round(total / properties.length);
};

// ─── HomePage ────────────────────────────────────────────────────────────────
const HomePage = () => {
  const tracked = useRef(false);
  const [showBetaPopup, setShowBetaPopup] = useState(true);

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetPublicPropertiesQuery({
    limit: 8,
    sortBy: 'views',
    order: 'desc'
  });

  // Show beta popup once per session
  useEffect(() => {
    sessionStorage.removeItem('betaPopupSeen'); // clear old flag
    setShowBetaPopup(true);
  }, []);

  const handlePopupClose = () => {
    setShowBetaPopup(false);
  };

  // Track visitor once
  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      const trackVisitor = async () => {
        try {
          await fetch(`${import.meta.env.VITE_API_BASE_URL}track-visit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          console.log('✅ Visitor tracked once');
        } catch (error) {
          console.error('Tracking failed:', error);
        }
      };
      trackVisitor();
    }
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Properties</h2>
            <p className="text-red-600 mb-4">
              {error?.data?.message || error?.error || "Failed to load properties. Please try again."}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const properties = apiResponse?.success ? apiResponse.data || [] : [];
  const totalProperties = properties.length;
  const verifiedProperties = properties.filter(p => p.verification_status === 'verified').length;
  const activeProperties = properties.filter(p => p.status === 'approved' || p.status === 'active').length;

  return (
    <div className="min-h-screen">
      {/* Beta Popup */}
      {showBetaPopup && <BetaPopup onClose={handlePopupClose} />}

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection
        totalProperties={totalProperties}
        verifiedOwners={verifiedProperties}
        activeListings={activeProperties}
        averageResponseTime="1.2 days"
      />

      {/* Trust & Verification Section */}
      <TrustSection properties={properties.slice(0, 4)} />

      {/* How It Works Section */}
      <section className="py-10 bg-gradient-to-b from-yellow-50/20 via-white to-yellow-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-700 mb-4">How It Works</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Simple steps to find your perfect home directly from verified owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>

            {/* Step 1 */}
            <div className="relative text-center group">
              <div className="relative bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-200/50 hover:border-yellow-300 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-black text-white">1</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-700 transition-colors">
                    Browse Properties
                  </h3>
                  <p className="text-gray-600">
                    Search and filter through {totalProperties}+ verified owner listings
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-300 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-300 rounded-bl-xl"></div>
              </div>
              <div className="md:hidden flex justify-center mt-6">
                <div className="w-6 h-6 text-yellow-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group">
              <div className="relative bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-200/50 hover:border-yellow-300 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-black text-white">2</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-700 transition-colors">
                    Unlock Contact
                  </h3>
                  <p className="text-gray-600">
                    Use credits to unlock genuine owner contact details
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-300 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-300 rounded-bl-xl"></div>
              </div>
              <div className="md:hidden flex justify-center mt-6">
                <div className="w-6 h-6 text-yellow-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center group">
              <div className="relative bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-200/50 hover:border-yellow-300 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-black text-white">3</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-700 transition-colors">
                    Direct Deal
                  </h3>
                  <p className="text-gray-600">
                    Contact {verifiedProperties}+ verified owners directly, no brokers
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-300 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-300 rounded-bl-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending in Pune Section */}
      <TrendingInPune properties={properties} />

      {/* Fresh Properties Section */}
      <Freshproperty properties={properties.slice(0, 6)} />

      {/* Real Estate Guide */}
      <Realestateguide />

      {/* Property Snapshot */}
      <Propertysnapshot
        totalProperties={totalProperties}
        verifiedProperties={verifiedProperties}
        activeProperties={activeProperties}
        averagePrice={calculateAveragePrice(properties)}
      />
    </div>
  );
};

export default HomePage;