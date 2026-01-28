import React, { useEffect, useState } from 'react';
import { useGetCreditBalanceQuery, useCreatePaymentOrderMutation, useVerifyPaymentMutation } from '../../store/api/paymentApi';

const TenantPricing = () => {
  const [isBlinking, setIsBlinking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [customCredits, setCustomCredits] = useState(20);
  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState(null);

  // Get credit balance using payment API
  const { 
    data: creditData, 
    refetch: refetchCredits,
    isLoading: creditsLoading 
  } = useGetCreditBalanceQuery(undefined, {
    skip: !userToken,
    refetchOnMountOrArgChange: true
  });

  // Payment mutations
  const [createOrder] = useCreatePaymentOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    setUserToken(token);

    // Get user data from localStorage or context
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserData(user);

    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 1000);

    // Load Razorpay script
    const loadRazorpay = () => {
      if (window.Razorpay) {
        setRazorpayLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
        console.log('Razorpay SDK loaded');
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay SDK');
      };
      document.body.appendChild(script);
    };

    loadRazorpay();

    return () => clearInterval(interval);
  }, []);

  // Credit Packs for Tenants
  const creditPlans = [
    {
      id: 'basic',
      name: "Basic",
      credits: 3,
      basePrice: 249,
      gst: 18,
      popular: false,
      badge: "₹83/contact",
      color: "silver",
      features: [
        "3 Owner Contacts",
        "30 Days Validity",
        "Email Notifications",
        "Basic Support"
      ],
      note: "Most Affordable",
      validityDays: 30
    },
    {
      id: 'standard',
      name: "Standard",
      credits: 6,
      basePrice: 499,
      gst: 18,
      popular: true,
      badge: "BEST VALUE",
      color: "gold",
      features: [
        "6 Owner Contacts",
        "60 Days Validity",
        "Email + SMS Alerts",
        "Priority Support",
        "Advanced Filters"
      ],
      note: "Most Popular",
      validityDays: 60
    },
    {
      id: 'premium',
      name: "Premium",
      credits: 10,
      basePrice: 699,
      gst: 18,
      popular: false,
      badge: "₹69/contact",
      color: "gradient",
      features: [
        "10 Owner Contacts",
        "90 Days Validity",
        "WhatsApp + Email + SMS",
        "24/7 Priority Support",
        "Virtual Tour Access"
      ],
      note: "Maximum Savings",
      validityDays: 90
    }
  ];

  // Calculate total price with GST
  const calculateTotalPrice = (basePrice, gstPercentage) => {
    const gstAmount = (basePrice * gstPercentage) / 100;
    return Math.round(basePrice + gstAmount);
  };

  // Calculate custom plan price - ₹50 per contact for 20+ contacts
  const calculateCustomPrice = (credits) => {
    if (credits >= 20) {
      const basePrice = credits * 50;
      const gstAmount = (basePrice * 18) / 100;
      return Math.round(basePrice + gstAmount);
    }
    return 0;
  };

  // Calculate base price for custom plan (without GST)
  const calculateCustomBasePrice = (credits) => {
    if (credits >= 20) {
      return credits * 50;
    }
    return 0;
  };

  const getCardStyles = (color) => {
    switch (color) {
      case 'gold':
        return {
          bg: 'bg-gradient-to-br from-yellow-900/20 to-amber-900/20',
          border: 'border-yellow-500/50',
          text: 'text-yellow-400',
          badge: 'bg-gradient-to-r from-yellow-600/30 to-amber-600/30 text-yellow-200 border-yellow-500/30'
        };
      case 'silver':
        return {
          bg: 'bg-gradient-to-br from-gray-800/90 to-gray-900/90',
          border: 'border-gray-600/50',
          text: 'text-gray-300',
          badge: 'bg-gray-700/80 text-gray-300 border-gray-600/50'
        };
      case 'gradient':
        return {
          bg: 'bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-gray-900/90',
          border: 'border-orange-500/50',
          text: 'text-amber-300',
          badge: 'bg-gradient-to-r from-amber-600/30 to-orange-600/30 text-amber-200 border-amber-500/30'
        };
      case 'custom':
        return {
          bg: 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20',
          border: 'border-blue-500/50',
          text: 'text-blue-400',
          badge: 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-800/90 to-gray-900/90',
          border: 'border-yellow-500/20',
          text: 'text-gray-300',
          badge: 'bg-gray-700/80 text-gray-300'
        };
    }
  };

  // Create Payment Order using RTK Query
  const handleCreateOrder = async (plan, type, customCreditsCount = null) => {
    if (loading) return;

    if (!userToken) {
      alert('Please login to purchase credits');
      return;
    }

    setLoading(true);

    try {
      let credits, basePrice, validityDays;

      if (type === 'custom') {
        credits = customCreditsCount;
        basePrice = credits * 50;
        validityDays = 120;
      } else {
        credits = plan.credits;
        basePrice = plan.basePrice;
        validityDays = plan.validityDays;
      }

      console.log('Creating order:', { 
        planType: type === 'custom' ? 'custom' : plan.id, 
        credits, 
        basePrice, 
        validityDays 
      });

      // Use RTK Query mutation
      const result = await createOrder({
        planType: type === 'custom' ? 'custom' : plan.id,
        credits: credits,
        basePrice: basePrice,
        validityDays: validityDays
      }).unwrap();

      console.log('Order created:', result.data);

      // If demo mode, handle demo payment
      if (result.data.demoMode) {
        handleDemoPayment(result.data, type);
        return;
      }

      // Real Razorpay integration
      const options = {
        key: result.data.key,
        amount: result.data.amount,
        currency: result.data.currency,
        name: 'PuneRiHomes - Tenant Credits',
        description: `${type === 'custom' ? 'Custom Plan' : plan.name} - ${credits} Credits`,
        order_id: result.data.orderId,
        handler: async function (response) {
          console.log('Payment response:', response);

          try {
            // Verify payment using RTK Query
            const verifyResult = await verifyPayment({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              planType: type === 'custom' ? 'custom' : plan.id,
              credits: credits
            }).unwrap();

            if (verifyResult.success) {
              alert(`✅ Payment Successful!\n\nAdded ${credits} credits to your account!\nTotal: ₹${result.data.totalAmount}\n\nYou can now contact ${credits} property owners.`);

              // Refresh credit balance
              refetchCredits();
            } else {
              alert(`❌ Payment verification failed: ${verifyResult.message}`);
            }
          } catch (verifyError) {
            console.error('Verification error:', verifyError);
            alert('❌ Payment verification failed. Please contact support.');
          }

          setLoading(false);
        },
        prefill: {
          name: userData?.name || 'Tenant User',
          email: userData?.email || 'tenant@example.com',
          contact: userData?.phone || '9999999999'
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal dismissed');
            setLoading(false);
          }
        },
        notes: {
          userId: userData?.id || '',
          planType: type === 'custom' ? 'custom' : plan.id,
          credits: credits.toString()
        }
      };

      console.log('Opening Razorpay with options:', options);

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment initialization failed: ${error.message || 'Please try again'}`);
      setLoading(false);
    }
  };

  // Demo Payment Handler (for testing)
  const handleDemoPayment = async (orderData, type) => {
    console.log('Processing demo payment:', orderData);

    setTimeout(async () => {
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        try {
          const verifyResult = await verifyPayment({
            order_id: orderData.orderId,
            payment_id: 'demo_payment_' + Date.now(),
            signature: 'demo_signature_' + Date.now(),
            planType: orderData.planType,
            credits: orderData.credits
          }).unwrap();

          if (verifyResult.success) {
            alert(`✅ Demo Payment Successful!\n\nAdded ${orderData.credits} credits to your account!\nTotal: ₹${orderData.totalAmount}\n\nNote: This is a demo. In production, real payment will be used.`);

            // Refresh credit balance
            refetchCredits();
          }
        } catch (error) {
          console.error('Demo verification error:', error);
          alert('Demo payment completed but verification failed.');
        }
      } else {
        alert('❌ Demo Payment Failed\n\nNote: This is a demo. In production, real payment will be used.');
      }

      setLoading(false);
    }, 1500);
  };

  const renderPlanCard = (plan) => {
    const styles = getCardStyles(plan.color);
    const isPopular = plan.popular;
    const totalPrice = calculateTotalPrice(plan.basePrice, plan.gst);
    const gstAmount = Math.round((plan.basePrice * plan.gst) / 100);

    return (
      <div
        key={plan.id}
        className={`relative ${styles.bg} ${isPopular ? 'scale-[1.02] z-10' : ''} 
                    rounded-xl border ${styles.border} 
                    backdrop-blur-sm p-4 flex flex-col transition-all duration-200 
                    hover:shadow-lg hover:shadow-yellow-900/10 min-h-[320px]`}
      >
        {/* Popular Badge - Top */}
        {isPopular && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
            <span className={`${styles.badge} px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm`}>
              {plan.badge}
            </span>
          </div>
        )}

        {/* Plan Name and Badge */}
        <div className="mb-3">
          <h3 className={`text-lg font-bold ${styles.text} mb-1`}>
            {plan.name}
          </h3>
          {!isPopular && plan.badge && (
            <span className={`${styles.badge} px-2 py-1 rounded text-xs font-medium`}>
              {plan.badge}
            </span>
          )}
        </div>

        {/* Price - Main focus on BASE PRICE */}
        <div className="mb-3">
          {/* Large Base Price Display */}
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-white">₹{plan.basePrice}</span>
            <span className="text-gray-300 text-sm ml-2 font-medium">Base Price</span>
          </div>

          {/* GST as small text below */}
          <div className="mt-1">
            <div className="flex items-center">
              <span className="text-gray-400 text-xs">
                + ₹{gstAmount} GST ({plan.gst}%)
              </span>
            </div>
          </div>

          {/* Total Price */}
          <div className="mt-2 pt-2 border-t border-gray-700/30">
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-blue-300">₹{totalPrice}</span>
              <span className="text-gray-400 text-xs ml-2">Total (incl. GST)</span>
            </div>
          </div>

          {/* Contacts count */}
          <div className="text-gray-400 text-xs mt-2">
            {plan.credits} contacts • ₹{Math.round(plan.basePrice / plan.credits)} per contact
          </div>

          {plan.note && (
            <p className="text-yellow-400 text-xs mt-2 font-medium">{plan.note}</p>
          )}
        </div>

        {/* Features List - Compact */}
        <div className="flex-grow mb-4">
          <ul className="space-y-1.5">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className={`w-3.5 h-3.5 ${styles.text} mr-2 mt-0.5 flex-shrink-0`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-xs">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button - Smaller */}
        <button
          onClick={() => {
            if (!userToken) {
              alert('Please login to purchase credits');
              return;
            }
            handleCreateOrder(plan, 'credit');
          }}
          disabled={loading || !userToken}
          className={`${isPopular
            ? 'bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-600 hover:to-amber-500 text-gray-900'
            : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-300'
            } font-medium px-4 py-2 rounded-lg w-full transition-all duration-150 
           shadow hover:shadow-md hover:scale-[1.01] active:scale-[0.99] mt-auto
           disabled:opacity-70 disabled:cursor-not-allowed text-sm`}
        >
          {loading ? 'Processing...' : !userToken ? 'Login to Buy' : 'Buy Now'}
        </button>
      </div>
    );
  };

  const customPlanBasePrice = calculateCustomBasePrice(customCredits);
  const customPlanTotalPrice = calculateCustomPrice(customCredits);
  const customPlanGST = 18;
  const customPlanGSTAmount = Math.round((customPlanBasePrice * customPlanGST) / 100);

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Credit Balance */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Tenant Pricing Plans
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-4">
            Connect directly with property owners. Choose your credit pack.
          </p>

          {/* Credit Balance Display */}
          {userToken && creditData && (
            <div className="inline-flex items-center gap-3 bg-gray-800/50 rounded-xl px-4 py-2 border border-blue-500/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm">Your Credits:</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-green-400">{creditData.data?.balance || 0}</span>
                <span className="text-gray-300 text-xs">available</span>
              </div>
              {creditData.data?.expiryInfo && !creditData.data.expiryInfo.isExpired && (
                <div className="text-yellow-300 text-xs">
                  Expires in {creditData.data.expiryInfo.daysRemaining} days
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl border border-yellow-500/30">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mb-3"></div>
                <p className="text-white text-sm">Processing Payment...</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Notice */}
        {!userToken && (
          <div className="mb-6 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="text-yellow-400 text-lg">🔒</div>
              <div>
                <p className="text-yellow-300 text-sm font-medium">Please login to purchase credits</p>
                <p className="text-gray-400 text-xs">You need to be logged in to buy credits.</p>
              </div>
            </div>
          </div>
        )}

        {/* Standard Credit Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {creditPlans.map(plan => renderPlanCard(plan))}
        </div>

        {/* Custom Plan Card */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-gray-900 
                          rounded-xl border border-blue-500/50 backdrop-blur-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-blue-400">
                Bulk Custom Plan
              </h3>
              <span className="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded">
                20+ Contacts
              </span>
            </div>

            {/* Pricing Info */}
            <div className="mb-4 text-center bg-blue-900/10 rounded-lg p-2">
              <div className="text-blue-300 font-bold text-lg">₹50 per contact</div>
              <div className="text-gray-400 text-xs">(Minimum 20 contacts)</div>
            </div>

            {/* Credits Selector */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-300 text-xs">Contacts:</label>
                <span className="text-blue-400 font-bold text-sm">{customCredits}</span>
              </div>

              <input
                type="range"
                min="20"
                max="100"
                value={customCredits}
                onChange={(e) => setCustomCredits(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer 
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 
                         [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full 
                         [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-600 
                         [&::-webkit-slider-thumb]:to-cyan-600"
              />

              <div className="flex justify-between text-gray-500 text-xs mt-1">
                <span>20</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            {/* Price Summary */}
            <div className="mb-4 bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
              {/* Base Price */}
              <div className="mb-2">
                <div className="flex items-baseline justify-center">
                  <span className="text-2xl font-bold text-white">₹{customPlanBasePrice}</span>
                  <span className="text-gray-300 text-sm ml-2">Base Price</span>
                </div>
              </div>

              {/* GST */}
              <div className="text-center mb-2">
                <span className="text-gray-400 text-xs">
                  + ₹{customPlanGSTAmount} GST ({customPlanGST}%)
                </span>
              </div>

              {/* Total Price */}
              <div className="pt-2 border-t border-gray-700/50">
                <div className="flex items-baseline justify-center">
                  <span className="text-xl font-bold text-blue-400">₹{customPlanTotalPrice}</span>
                  <span className="text-gray-400 text-xs ml-2">Total (incl. GST)</span>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="mb-4">
              <div className="text-gray-300 text-xs mb-2">Quick Select:</div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: 20, label: "20" },
                  { value: 25, label: "25" },
                  { value: 30, label: "30" },
                  { value: 40, label: "40" },
                  { value: 50, label: "50" },
                  { value: 75, label: "75" }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setCustomCredits(item.value)}
                    className={`px-1.5 py-1 rounded text-xs font-medium transition-all ${customCredits === item.value
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                if (!userToken) {
                  alert('Please login to purchase credits');
                  return;
                }
                handleCreateOrder({ id: 'custom', name: 'Custom' }, 'custom', customCredits);
              }}
              disabled={loading || !userToken}
              className={`bg-gradient-to-r from-blue-600 to-cyan-600 
                          hover:from-blue-700 hover:to-cyan-700 text-white font-medium 
                          px-4 py-2 rounded-lg w-full transition-all duration-200 
                          shadow hover:shadow-md hover:scale-[1.01] active:scale-[0.99]
                          disabled:opacity-70 disabled:cursor-not-allowed text-sm`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : !userToken ? 'Login to Buy' : `Buy ${customCredits} Contacts`}
            </button>

            {/* Price in button */}
            <div className="text-center mt-1">
              <span className="text-gray-400 text-xs">
                Total: <span className="text-blue-300 font-bold">₹{customPlanTotalPrice}</span>
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-center text-white mb-6">
            ❓ Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "What is included in each credit?",
                a: "Each credit allows you to view contact details of one property owner."
              },
              {
                q: "How long are credits valid?",
                a: "Credits are valid for 30-120 days depending on your selected plan."
              },
              {
                q: "Is GST included in the price?",
                a: "Yes, all prices include 18% GST as shown. Base price excludes GST."
              },
              {
                q: "Can I get a refund?",
                a: "We offer 7-day refund policy on unused credits."
              },
              {
                q: "How do I use credits?",
                a: "Click 'View Contact' on any property. 1 credit will be deducted and owner contact details shown."
              },
              {
                q: "Can I share credits with others?",
                a: "No, credits are non-transferable and linked to your account only."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                <h4 className="font-medium text-white text-sm mb-1">{faq.q}</h4>
                <p className="text-gray-400 text-xs">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Mode Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              const currentMode = localStorage.getItem('paymentMode');
              const newMode = currentMode === 'demo' ? 'real' : 'demo';
              localStorage.setItem('paymentMode', newMode);
              alert(`Payment mode switched to: ${newMode === 'demo' ? 'Demo Mode' : 'Real Mode'}`);
            }}
            className="text-xs text-gray-400 hover:text-gray-300 underline"
          >
            {localStorage.getItem('paymentMode') === 'demo' ? '🔧 Switch to Real Payment Mode' : '🔄 Switch to Demo Mode'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TenantPricing;
