import React, { useEffect, useState } from 'react'

const OwnerPricing = () => {
    const [isBlinking, setIsBlinking] = useState(true);
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [customProperties, setCustomProperties] = useState(3);

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

    // Property Listing Plans (For Owners) - AFTER FREE PROPERTY
    const propertyPlans = [
        {
            id: 'free',
            name: "Free Plan",
            properties: 1,
            price: 0,
            popular: false,
            badge: "Start Free",
            color: "silver",
            features: [
                "1 Property Listing FREE",
                "30 Days Basic Visibility",
                "Owner Dashboard Access",
                "Basic Property Analytics",
                "Email Support"
            ],
            note: "First property is always free"
        },
        {
            id: 'double',
            name: "Double Property Pack",
            properties: 2,
            price: 2000,
            popular: true,
            badge: "Recommended",
            color: "gold",
            features: [
                "2 Additional Properties",
                "Total 3 Properties (1 Free + 2 Paid)",
                "60 Days Premium Visibility",
                "Featured Listing Badge",
                "Priority Customer Support",
                "WhatsApp Notifications",
                "Advanced Analytics"
            ],
            note: "₹1,000 per additional property"
        },
        {
            id: 'premium',
            name: "Premium Property Pack",
            properties: 5,
            price: 5000,
            popular: false,
            badge: "Best Value",
            color: "gradient",
            features: [
                "5 Additional Properties",
                "Total 6 Properties (1 Free + 5 Paid)",
                "90 Days Premium Visibility",
                "Top Featured Placement",
                "24/7 Dedicated Support",
                "Multi-channel Notifications",
                "Advanced Analytics Dashboard",
                "Verified Owner Badge",
                "Photo Gallery (20 Images)",
                "Virtual Tour Feature"
            ],
            note: "₹1,000 per additional property"
        }
    ];

    // Calculate custom plan price (₹1,000 per property after first free)
    const calculateCustomPrice = (properties) => {
        // First property is free, so charge for additional properties
        const additionalProperties = Math.max(0, properties - 1);
        return additionalProperties * 1000;
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
                    bg: 'bg-gradient-to-br from-purple-900/30 to-indigo-900/20',
                    border: 'border-purple-500',
                    text: 'text-purple-400',
                    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
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
    const handlePayment = async (plan, type, customProps = null) => {
        if (loading) return;

        if (!razorpayLoaded) {
            alert('Payment gateway is loading. Please wait a moment and try again.');
            return;
        }

        setLoading(true);

        try {
            const isCustom = type === 'custom';
            const properties = isCustom ? customProps : (type === 'property' ? plan.properties : 0);
            const price = isCustom ? calculateCustomPrice(properties) : plan.price;

            const options = {
                key: 'rzp_test_S285pD3Oz94VAs',
                amount: price * 100,
                currency: 'INR',
                name: 'Property Portal',
                description: isCustom
                    ? `Custom Plan - ${properties} Properties (${properties - 1} Additional)`
                    : type === 'property'
                        ? `${plan.name} - ${properties} Additional Properties`
                        : `${plan.name} - ${plan.credits} Credits`,
                image: 'https://example.com/logo.png',
                handler: function (response) {
                    console.log('Payment Response:', response);

                    const isSuccess = response.razorpay_payment_id && response.razorpay_order_id;

                    if (isSuccess) {
                        if (type === 'property' || type === 'custom') {
                            const totalProperties = isCustom ? properties : (1 + properties); // 1 free + paid
                            alert(`🎉 Payment Successful!\n\n✅ ${properties} Additional Property${properties > 1 ? 's' : ''} Added!\n✅ Total Properties You Can List: ${totalProperties}\n✅ Payment ID: ${response.razorpay_payment_id}`);
                        }
                    } else {
                        alert('Payment failed or was cancelled');
                    }

                    setLoading(false);
                },
                prefill: {
                    name: 'Property Owner',
                    email: 'owner@example.com',
                    contact: '9999999999'
                },
                notes: {
                    type: type,
                    planId: isCustom ? 'custom' : plan.id,
                    planName: isCustom ? 'Custom Plan' : plan.name,
                    properties: properties,
                    totalProperties: isCustom ? properties : (type === 'property' ? 1 + properties : 0)
                },
                theme: {
                    color: '#FFD700'
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
    const handleDemoPayment = (plan, type, customProps = null) => {
        if (loading) return;

        setLoading(true);

        setTimeout(() => {
            const isSuccess = Math.random() > 0.3;
            const properties = type === 'custom' ? customProps : (type === 'property' ? plan.properties : 0);
            const price = type === 'custom' ? calculateCustomPrice(properties) : plan.price;

            if (isSuccess) {
                if (type === 'property' || type === 'custom') {
                    const totalProperties = type === 'custom' ? properties : (1 + properties);
                    alert(`🎉 Demo Payment Successful!\n\nPlan: ${type === 'custom' ? 'Custom Plan' : plan.name}\nAdditional Properties: ${properties}\nTotal Listable Properties: ${totalProperties}\nAmount: ₹${price}\n\nNote: This is a demo. In production, real payment will be used.`);
                }
            } else {
                alert('❌ Demo Payment Failed\n\nNote: This is a demo. In production, real payment will be used.');
            }

            setLoading(false);
        }, 1500);
    };

    const renderPlanCard = (plan, type) => {
        const styles = getCardStyles(plan.color);
        const isPopular = plan.popular;
        const isFree = plan.price === 0;

        return (
            <div
                key={plan.id}
                className={`relative ${styles.bg} ${isPopular ? 'scale-[1.02] z-10' : ''} 
                  rounded-xl border ${styles.border} 
                  backdrop-blur-sm p-5 flex flex-col transition-all duration-300 
                  hover:shadow-xl hover:shadow-yellow-900/20 ${isFree ? 'opacity-90' : ''}`}
            >
                {/* Popular Badge with Blinking Effect */}
                {isPopular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className={`${styles.badge} px-3 py-0.5 rounded-full text-xs font-bold border backdrop-blur-sm ${isBlinking ? 'opacity-100' : 'opacity-80'
                            } transition-opacity duration-500`}>
                            {plan.badge}
                        </span>
                    </div>
                )}

                {/* Plan Badge */}
                {!isPopular && plan.badge && (
                    <div className="mb-3">
                        <span className={`${styles.badge} px-2 py-0.5 rounded-full text-xs font-medium border`}>
                            {plan.badge}
                        </span>
                    </div>
                )}

                {/* Plan Name */}
                <h3 className={`text-xl font-bold mb-2 ${styles.text}`}>
                    {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                    <div className="flex items-baseline">
                        {isFree ? (
                            <>
                                <span className="text-3xl font-bold text-green-400">FREE</span>
                                <span className="text-gray-400 ml-2 text-sm">First Property</span>
                            </>
                        ) : (
                            <>
                                <span className="text-3xl font-bold text-white">₹{plan.price}</span>
                                <span className="text-gray-400 ml-2 text-sm">
                                    for {plan.properties} additional
                                </span>
                            </>
                        )}
                    </div>
                    <p className="text-gray-400 text-xs mt-1">
                        {isFree
                            ? "1 Property (Free Forever)"
                            : `Total: ${1 + plan.properties} (1 Free + ${plan.properties} Paid)`}
                    </p>
                    {plan.note && (
                        <p className="text-yellow-400 text-xs mt-1 font-medium">{plan.note}</p>
                    )}
                </div>

                {/* Features List - Smaller */}
                <div className="flex-grow mb-6">
                    <ul className="space-y-2">
                        {plan.features.slice(0, 5).map((feature, index) => (
                            <li key={index} className="flex items-start">
                                <svg className={`w-4 h-4 ${styles.text} mr-2 mt-0.5 flex-shrink-0`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-300 text-sm">{feature}</span>
                            </li>
                        ))}
                        {plan.features.length > 5 && (
                            <li className="text-yellow-400 text-xs pl-6">
                                +{plan.features.length - 5} more features
                            </li>
                        )}
                    </ul>
                </div>

                {/* CTA Button - Smaller */}
                <button
                    onClick={() => {
                        const isDemoMode = localStorage.getItem('paymentMode') === 'demo';
                        if (isDemoMode) {
                            handleDemoPayment(plan, 'property');
                        } else {
                            handlePayment(plan, 'property');
                        }
                    }}
                    disabled={loading}
                    className={`${isFree
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white'
                        : 'bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-600 hover:to-amber-500 text-gray-900'
                        } font-bold px-4 py-2.5 rounded-lg w-full transition-all duration-200 
          shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] mt-auto text-sm
          disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                    {loading ? 'Processing...' : isFree ? 'Activate Free' : 'Buy Now'}
                </button>
            </div>
        );
    };

    const customPlanPrice = calculateCustomPrice(customProperties);

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header - Smaller */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                        Owner Pricing Plans
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-3">
                        <span className="text-green-400 font-bold">First property is always FREE!</span> Pay only for additional properties.
                    </p>
                    <div className="inline-flex items-center bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-1.5 mt-1">
                        <span className="text-green-400 text-xs">
                            💡 <strong>Pricing:</strong> ₹1,000 per additional property
                        </span>
                    </div>
                </div>

                {/* Loading Overlay */}
                {loading && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-6 rounded-xl border border-yellow-500/30">
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500 mb-3"></div>
                                <p className="text-white text-sm">Processing Payment...</p>
                                <p className="text-gray-400 text-xs mt-1">Please don't close this window</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pricing Summary - Smaller */}
                <div className="mb-10 bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                    <h3 className="text-lg font-bold text-white mb-4 text-center">💰 Simple Pricing</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-400">First Property</p>
                            <p className="text-xl font-bold text-green-400">FREE</p>
                            <p className="text-[10px] text-gray-400">Always free</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-400">+1 Property</p>
                            <p className="text-xl font-bold text-white">₹1,000</p>
                            <p className="text-[10px] text-gray-400">Total: 2 Properties</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg border border-yellow-500/50">
                            <p className="text-xs text-gray-400">+2 Properties</p>
                            <p className="text-xl font-bold text-yellow-400">₹2,000</p>
                            <p className="text-[10px] text-green-400">Total: 3 Properties</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-400">+5 Properties</p>
                            <p className="text-xl font-bold text-white">₹5,000</p>
                            <p className="text-[10px] text-green-400">Total: 6 Properties</p>
                        </div>
                    </div>
                </div>

                {/* Standard Plans Grid - Tighter spacing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {propertyPlans.map(plan => renderPlanCard(plan, 'property'))}
                </div>

                {/* Custom Plan Card - Smaller */}
                <div className="mb-8 max-w-md mx-auto">
                    <div className="relative bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-gray-900 
                    rounded-xl border border-purple-500 backdrop-blur-sm p-5 
                    transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20">
                        {/* Custom Badge - Compact */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                            px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                                Custom Plan
                            </span>
                        </div>

                        {/* Header with Icon */}
                        <div className="flex items-center justify-center mb-4">

                            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 
                           bg-clip-text text-transparent">
                                Build Your Plan
                            </h3>
                        </div>

                        {/* Property Selector - Horizontal Layout */}
                        <div className="mb-5">
                            <label className="block text-gray-300 mb-3 text-center text-sm">
                                Total Properties (1 Free + Additional)
                            </label>

                            {/* Slider-like Input */}
                            <div className="relative">
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={customProperties}
                                    onChange={(e) => setCustomProperties(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer 
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 
                             [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full 
                             [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-600 
                             [&::-webkit-slider-thumb]:to-indigo-600"
                                />
                                <div className="flex justify-between mt-1">
                                    <span className="text-gray-400 text-xs">1</span>
                                    <span className="text-gray-400 text-xs">10</span>
                                    <span className="text-gray-400 text-xs">20</span>
                                </div>
                            </div>

                            {/* Current Selection Display */}
                            <div className="mt-4 text-center">
                                <div className="inline-flex items-center bg-gray-800/50 rounded-lg px-4 py-2">
                                    <span className="text-3xl font-bold text-white mr-2">{customProperties}</span>
                                    <div className="text-left">
                                        <div className="text-white text-sm font-medium">Total Properties</div>
                                        <div className="text-gray-400 text-xs">
                                            {customProperties - 1} additional @ ₹1,000 each
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Summary - Compact */}
                        <div className="mb-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="text-center">
                                    <div className="text-gray-400 text-xs mb-1">Free Property</div>
                                    <div className="text-green-400 text-lg font-bold">1</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-gray-400 text-xs mb-1">Additional</div>
                                    <div className="text-yellow-400 text-lg font-bold">{customProperties - 1}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-gray-400 text-xs mb-1">Per Property</div>
                                    <div className="text-white text-sm">₹1,000</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-gray-400 text-xs mb-1">Total Price</div>
                                    <div className="text-purple-400 text-xl font-bold">₹{customPlanPrice}</div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Presets - Compact Grid */}
                        <div className="mb-5">
                            <div className="text-gray-300 text-xs text-center mb-2">Quick Select:</div>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { value: 1, label: "Free Only" },
                                    { value: 2, label: "2 Total" },
                                    { value: 3, label: "3 Total" },
                                    { value: 5, label: "5 Total" },
                                    { value: 10, label: "10 Total" },
                                    { value: 15, label: "15 Total" }
                                ].map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => setCustomProperties(item.value)}
                                        className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${customProperties === item.value
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Features - Two Columns */}
                        <div className="mb-5">
                            <h4 className="text-sm font-bold text-white mb-3 text-center">✅ Included Features</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    "Free Property",
                                    "Premium Visibility",
                                    "Priority Support",
                                    "WhatsApp Alerts",
                                    "Analytics Dashboard",
                                    "Verified Badge"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                                        <span className="text-gray-300 text-xs">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Button - Modern */}
                        <button
                            onClick={() => {
                                if (customProperties === 1) {
                                    alert("🎉 You already have 1 free property! No payment needed.");
                                    return;
                                }

                                const isDemoMode = localStorage.getItem('paymentMode') === 'demo';
                                if (isDemoMode) {
                                    handleDemoPayment(null, 'custom', customProperties);
                                } else {
                                    handlePayment(null, 'custom', customProperties);
                                }
                            }}
                            disabled={loading || customProperties === 1}
                            className={`relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 
                        hover:from-purple-700 hover:to-indigo-700 text-white font-bold 
                        px-4 py-3 rounded-lg w-full transition-all duration-200 
                        shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                        disabled:opacity-70 disabled:cursor-not-allowed group`}
                        >
                            {/* Shine effect */}
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] 
                           transition-transform duration-1000 bg-gradient-to-r from-transparent 
                           via-white/20 to-transparent"></div>

                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full 
                                  animate-spin mr-2"></div>
                                    Processing...
                                </div>
                            ) : customProperties === 1 ? (
                                <div className="flex items-center justify-center">
                                    <span className="mr-2">🎉</span>
                                    Activate Free Plan
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="text-sm">Buy {customProperties - 1} Additional Properties</div>
                                    <div className="text-xs opacity-90">₹{customPlanPrice} • One-time Payment</div>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
                {/* FAQ Section - Smaller */}
                <div className="mt-16 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-white mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: "Is the first property really free forever?",
                                a: "Yes! You can list 1 property completely free with basic features. No hidden charges."
                            },
                            {
                                q: "How are additional properties priced?",
                                a: "Each additional property costs ₹1,000. So 2 additional = ₹2,000, 5 additional = ₹5,000, etc."
                            },
                            {
                                q: "Can I mix and match plans?",
                                a: "Yes! You can purchase multiple packs. Each adds to your total property limit."
                            },
                            {
                                q: "What happens if I exceed my property limit?",
                                a: "You can either upgrade your plan or purchase additional properties anytime."
                            },
                            {
                                q: "Do unused properties carry over?",
                                a: "Yes, your property listing slots don't expire. Use them anytime."
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                                <h4 className="font-bold text-white mb-1 text-sm">{faq.q}</h4>
                                <p className="text-gray-400 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr className='mt-10 border-gray-700' />
        </div>
    )
}

export default OwnerPricing