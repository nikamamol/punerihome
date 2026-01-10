import React, { useEffect, useState } from 'react'

const TenantPricing = () => {
  const [isBlinking, setIsBlinking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [customCredits, setCustomCredits] = useState(5);

  useEffect(() => {
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
      id: 'free',
      name: "Free Trial",
      credits: 1,
      price: 0,
      popular: false,
      badge: "Try Free",
      color: "silver",
      features: [
        "1 Owner Contact FREE",
        "7 Days Validity",
        "Basic Property Search",
        "Email Notifications",
        "Customer Support"
      ],
      note: "First contact is free"
    },
    {
      id: 'basic',
      name: "Starter Pack",
      credits: 3,
      price: 199,
      popular: true,
      badge: "Most Popular",
      color: "gold",
      features: [
        "3 Owner Contacts",
        "15 Days Validity",
        "Priority Customer Support",
        "Email + SMS Notifications",
        "Property Recommendations",
        "Advanced Search Filters"
      ],
      note: "₹66 per contact"
    },
    {
      id: 'premium',
      name: "Premium Pack",
      credits: 10,
      price: 499,
      popular: false,
      badge: "Best Value",
      color: "gradient",
      features: [
        "10 Owner Contacts",
        "30 Days Validity",
        "24/7 Priority Support",
        "WhatsApp + Email + SMS Alerts",
        "Smart Property Matching",
        "Virtual Tour Access",
        "Broker Contact Details",
        "Price Trend Analysis"
      ],
      note: "₹49 per contact"
    },
    {
      id: 'business',
      name: "Business Pack",
      credits: 25,
      price: 999,
      popular: false,
      badge: "For Professionals",
      color: "platinum",
      features: [
        "25 Owner Contacts",
        "60 Days Validity",
        "Dedicated Account Manager",
        "Multi-channel Alerts",
        "Bulk Contact Export",
        "Analytics Dashboard",
        "Property Comparison Tool",
        "Negotiation Assistance",
        "Legal Documentation Help"
      ],
      note: "₹39 per contact"
    }
  ];

  // Calculate custom plan price (dynamic pricing)
  const calculateCustomPrice = (credits) => {
    if (credits <= 1) return 0;
    if (credits <= 3) return credits * 66;
    if (credits <= 10) return credits * 49;
    return credits * 39;
  };

  const getCardStyles = (color) => {
    switch (color) {
      case 'gold':
        return {
          bg: 'bg-gradient-to-br from-amber-900/30 to-yellow-900/20',
          border: 'border-yellow-500',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
        };
      case 'silver':
        return {
          bg: 'bg-gradient-to-br from-gray-800 to-gray-900',
          border: 'border-gray-400',
          text: 'text-gray-300',
          badge: 'bg-gray-700 text-gray-300 border-gray-600'
        };
      case 'gradient':
        return {
          bg: 'bg-gradient-to-br from-yellow-900/20 via-amber-900/20 to-gray-900',
          border: 'border-gradient-to-r from-yellow-500 to-amber-400',
          text: 'text-amber-300',
          badge: 'bg-gradient-to-r from-amber-600/30 to-yellow-600/30 text-amber-200 border-amber-500/30'
        };
      case 'platinum':
        return {
          bg: 'bg-gradient-to-br from-gray-900 to-black',
          border: 'border-gray-300',
          text: 'text-gray-200',
          badge: 'bg-gray-800 text-gray-200 border-gray-700'
        };
      case 'custom':
        return {
          bg: 'bg-gradient-to-br from-blue-900/30 to-cyan-900/20',
          border: 'border-blue-500',
          text: 'text-blue-400',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-800 to-gray-900',
          border: 'border-yellow-500/20',
          text: 'text-gray-300',
          badge: 'bg-gray-700 text-gray-300'
        };
    }
  };

  // Payment handler
  const handlePayment = async (plan, type, customCreditsCount = null) => {
    if (loading) return;

    if (!razorpayLoaded) {
      alert('Payment gateway is loading. Please wait a moment and try again.');
      return;
    }

    setLoading(true);

    try {
      const isCustom = type === 'custom';
      const credits = isCustom ? customCreditsCount : plan.credits;
      const price = isCustom ? calculateCustomPrice(credits) : plan.price;

      const options = {
        key: 'rzp_test_S285pD3Oz94VAs',
        amount: price * 100,
        currency: 'INR',
        name: 'Property Portal - Tenant',
        description: isCustom
          ? `Custom Plan - ${credits} Owner Contacts`
          : `${plan.name} - ${credits} Owner Contacts`,
        image: 'https://example.com/logo.png',
        handler: function (response) {
          console.log('Payment Response:', response);

          const isSuccess = response.razorpay_payment_id && response.razorpay_order_id;

          if (isSuccess) {
            alert(` Payment Successful!\n\n✅ ${credits} Contact${credits > 1 ? 's' : ''} Added to Your Account!\n✅ You can now contact ${credits} property owner${credits > 1 ? 's' : ''}.\n✅ Payment ID: ${response.razorpay_payment_id}`);
          } else {
            alert('Payment failed or was cancelled');
          }

          setLoading(false);
        },
        prefill: {
          name: 'Property Seeker',
          email: 'tenant@example.com',
          contact: '9999999999'
        },
        notes: {
          type: type,
          planId: isCustom ? 'custom' : plan.id,
          planName: isCustom ? 'Custom Plan' : plan.name,
          credits: credits
        },
        theme: {
          color: '#3B82F6' // Blue color for tenants
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initialization failed. Please try again.');
      setLoading(false);
    }
  };

  // Demo payment handler
  const handleDemoPayment = (plan, type, customCreditsCount = null) => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      const credits = type === 'custom' ? customCreditsCount : plan.credits;
      const price = type === 'custom' ? calculateCustomPrice(credits) : plan.price;

      if (isSuccess) {
        if (type === 'custom') {
          alert(` Demo Payment Successful!\nPlan: Custom Plan\nCredits: ${credits}\nPrice: ₹${price}\n\nNote: This is a demo. In production, real payment will be used.`);
        } else {
          alert(` Demo Payment Successful!\nPlan: ${plan.name}\nCredits: ${credits}\nPrice: ₹${price}\n\nNote: This is a demo. In production, real payment will be used.`);
        }
      } else {
        alert(' Demo Payment Failed\n\nNote: This is a demo. In production, real payment will be used.');
      }

      setLoading(false);
    }, 1500);
  };

  const renderPlanCard = (plan) => {
    const styles = getCardStyles(plan.color);
    const isPopular = plan.popular;
    const isFree = plan.price === 0;

    return (
      <div
        key={plan.id}
        className={`relative ${styles.bg} ${isPopular ? 'scale-105 z-10' : ''} 
                    rounded-2xl border ${styles.border} 
                    backdrop-blur-sm p-6 flex flex-col transition-all duration-300 
                    hover:shadow-2xl hover:shadow-yellow-900/20 ${isFree ? 'opacity-90' : ''}`}
      >
        {/* Popular Badge with Blinking Effect */}
        {isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className={`${styles.badge} px-4 py-1 rounded-full text-sm font-bold border backdrop-blur-sm ${isBlinking ? 'opacity-100' : 'opacity-80'
              } transition-opacity duration-500`}>
              {plan.badge}
            </span>
          </div>
        )}

        {/* Plan Badge */}
        {!isPopular && plan.badge && (
          <div className="mb-4">
            <span className={`${styles.badge} px-3 py-1 rounded-full text-xs font-medium border`}>
              {plan.badge}
            </span>
          </div>
        )}

        {/* Plan Name */}
        <h3 className={`text-2xl font-bold mb-2 ${styles.text}`}>
          {plan.name}
        </h3>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline">
            {isFree ? (
              <>
                <span className="text-4xl font-bold text-green-400">FREE</span>
                <span className="text-gray-400 ml-2">First Contact</span>
              </>
            ) : (
              <>
                <span className="text-4xl font-bold text-white">₹{plan.price}</span>
                <span className="text-gray-400 ml-2">/one-time</span>
              </>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-1">
            {plan.credits} Contact{plan.credits > 1 ? 's' : ''}
          </p>
          {plan.note && (
            <p className="text-yellow-400 text-xs mt-2 font-medium">{plan.note}</p>
          )}
        </div>

        {/* Features List */}
        <div className="flex-grow mb-8">
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className={`w-5 h-5 ${styles.text} mr-3 mt-0.5 flex-shrink-0`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => {
            const isDemoMode = localStorage.getItem('paymentMode') === 'demo';
            if (isDemoMode) {
              handleDemoPayment(plan, 'credit');
            } else {
              handlePayment(plan, 'credit');
            }
          }}
          disabled={loading}
          className={`${isFree
            ? 'bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white'
            : 'bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-600 hover:to-amber-500 text-gray-900'
            } font-bold px-6 py-3 rounded-xl w-full transition-all duration-200 
          shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mt-auto
          disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {loading ? 'Processing...' : isFree ? ' Get Free Trial' : 'Buy Now'}
        </button>
      </div>
    );
  };

  const customPlanPrice = calculateCustomPrice(customCredits);

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Tenant Pricing Plans
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Unlock premium features and connect directly with property owners.
            Buy credits to view owner contact details and find your perfect property.
          </p>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-2xl border border-yellow-500/30">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mb-4"></div>
                <p className="text-white">Processing Payment...</p>
                <p className="text-gray-400 text-sm mt-2">Please don't close this window</p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Summary */}
        <div className="mb-12 bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6 text-center"> Bulk Discounts Available</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">1-3 Contacts</p>
              <p className="text-2xl font-bold text-white">₹66</p>
              <p className="text-xs text-gray-400">per contact</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">4-10 Contacts</p>
              <p className="text-2xl font-bold text-blue-400">₹49</p>
              <p className="text-xs text-green-400">26% discount</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border-2 border-yellow-500/50">
              <p className="text-sm text-gray-400">11-25 Contacts</p>
              <p className="text-2xl font-bold text-yellow-400">₹39</p>
              <p className="text-xs text-green-400">41% discount</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Best Value</p>
              <p className="text-2xl font-bold text-green-400">25 for ₹999</p>
              <p className="text-xs text-green-400">₹39 per contact</p>
            </div>
          </div>
        </div>

        {/* Standard Credit Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {creditPlans.map(plan => renderPlanCard(plan))}
        </div>

        {/* Custom Plan Card - Blue Theme for Tenants */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="relative bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-gray-900 
                          rounded-2xl border border-blue-500 backdrop-blur-sm p-6 
                          transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20">
            {/* Custom Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white 
                               px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                Custom Plan
              </span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-center mb-4">

              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 
                             bg-clip-text text-transparent">
                Build Your Credit Pack
              </h3>
            </div>

            {/* Credits Selector */}
            <div className="mb-5">
              <label className="block text-gray-300 mb-3 text-center text-sm">
                How many owner contacts do you need?
              </label>

              {/* Slider Input */}
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={customCredits}
                  onChange={(e) => setCustomCredits(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer 
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 
                           [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full 
                           [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-600 
                           [&::-webkit-slider-thumb]:to-cyan-600"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-gray-400 text-xs">1</span>
                  <span className="text-gray-400 text-xs">25</span>
                  <span className="text-gray-400 text-xs">50</span>
                </div>
              </div>

              {/* Current Selection Display */}
              <div className="mt-4 text-center">
                <div className="inline-flex items-center bg-gray-800/50 rounded-lg px-4 py-2">
                  <span className="text-3xl font-bold text-white mr-2">{customCredits}</span>
                  <div className="text-left">
                    <div className="text-white text-sm font-medium">Owner Contacts</div>
                    <div className="text-gray-400 text-xs">
                      @ {customCredits <= 3 ? '₹66' : customCredits <= 10 ? '₹49' : '₹39'} each
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="mb-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-gray-400 text-xs mb-1">Credits</div>
                  <div className="text-blue-400 text-lg font-bold">{customCredits}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs mb-1">Price Each</div>
                  <div className="text-white text-sm">
                    ₹{customCredits <= 3 ? '66' : customCredits <= 10 ? '49' : '39'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs mb-1">You Save</div>
                  <div className="text-green-400 text-sm">
                    ₹{Math.max(0, (customCredits * 66) - customPlanPrice)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs mb-1">Total Price</div>
                  <div className="text-blue-400 text-xl font-bold">₹{customPlanPrice}</div>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="mb-5">
              <div className="text-gray-300 text-xs text-center mb-2">Quick Select:</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 1, label: "1 Free" },
                  { value: 3, label: "3 Credits" },
                  { value: 5, label: "5 Credits" },
                  { value: 10, label: "10 Credits" },
                  { value: 25, label: "25 Credits" },
                  { value: 50, label: "50 Credits" }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setCustomCredits(item.value)}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${customCredits === item.value
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-5">
              <h4 className="text-sm font-bold text-white mb-3 text-center">✅ Included Features</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Direct Owner Contact",
                  "Priority Support",
                  "WhatsApp Alerts",
                  "Property Matching",
                  "Virtual Tours",
                  "Analytics"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-300 text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                if (customCredits === 1) {
                  alert("🎉 You already have 1 free contact! Use it to connect with a property owner.");
                  return;
                }

                const isDemoMode = localStorage.getItem('paymentMode') === 'demo';
                if (isDemoMode) {
                  handleDemoPayment(null, 'custom', customCredits);
                } else {
                  handlePayment(null, 'custom', customCredits);
                }
              }}
              disabled={loading || customCredits === 1}
              className={`relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 
                          hover:from-blue-700 hover:to-cyan-700 text-white font-bold 
                          px-4 py-3 rounded-lg w-full transition-all duration-200 
                          shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                          disabled:opacity-70 disabled:cursor-not-allowed group`}
            >
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] 
                             transition-transform duration-1000 bg-gradient-to-r from-transparent 
                             via-white/20 to-transparent"></div>

              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full 
                                animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : customCredits === 1 ? (
                <div className="flex items-center justify-center">
                  <span className="mr-2">🎉</span>
                  Get Free Contact
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="text-sm">Buy {customCredits} Owner Contacts</div>
                  <div className="text-xs opacity-90">₹{customPlanPrice} • One-time Payment</div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What is a credit/contact?",
                a: "Each credit allows you to view contact information of one property owner. Credits are deducted only when you access the contact details."
              },
              {
                q: "How long do credits last?",
                a: "Credits don't expire. Use them anytime to contact property owners. Purchase more anytime you need."
              },
              {
                q: "Can I get a refund?",
                a: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with our service."
              },
              {
                q: "Are the contact details verified?",
                a: "Yes! All owner contact details are verified before being listed on our platform."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit/debit cards, UPI, net banking, and wallets through Razorpay secure gateway."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className='mt-12 border-gray-700' />
    </div>
  )
}

export default TenantPricing