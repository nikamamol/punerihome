import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, CheckCircle, Phone, Mail, MessageSquare, ChevronRight, Shield, Star, Users, Home, Building } from 'lucide-react';
import { useSubmitViewingRequestMutation } from '../../store/api/viewingApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FlexibleViewings() {
    const [formData, setFormData] = useState({
        preferred_date: '',
        preferred_time: '',
        property_type: '',
        location: '',
        name: '',
        phone: '',
        property_link: ''
    });

    const [submitViewingRequest, { isLoading }] = useSubmitViewingRequestMutation();

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
        '5:00 PM', '6:00 PM', '7:00 PM'
    ];

    const propertyTypes = [
        'Flat/Apartment', 'Independent House', 'Villa', 'PG/Hostel', 'Office Space'
    ];

    const popularLocations = [
        'Hinjewadi', 'Wakad', 'Kothrud', 'Viman Nagar',
        'Baner', 'Kharadi', 'Shivajinagar', 'Hadapsar'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLocationClick = (location) => {
        setFormData(prev => ({ ...prev, location }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await submitViewingRequest(formData).unwrap();

            if (result.success) {
                // Success toast message
                toast.success('Viewing scheduled successfully! We will confirm your appointment within 2 hours.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                // Reset form
                setFormData({
                    preferred_date: '',
                    preferred_time: '',
                    property_type: '',
                    location: '',
                    name: '',
                    phone: '',
                    property_link: ''
                });
            }
        } catch (error) {
            console.error('Viewing request submission error:', error);

            // Error toast message
            toast.error(error.data?.message || 'Failed to schedule viewing. Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 rounded-xl mb-3 border border-yellow-500/20">
                        <Calendar className="h-6 w-6 text-yellow-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Flexible Viewings</h1>
                    <p className="text-gray-600">Schedule property viewings at your convenience</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Booking Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Schedule a Viewing</h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Date & Time */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="h-4 w-4 inline mr-1" />
                                            Preferred Date *
                                        </label>
                                        <input
                                            type="date"
                                            name="preferred_date"
                                            value={formData.preferred_date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Clock className="h-4 w-4 inline mr-1" />
                                            Preferred Time *
                                        </label>
                                        <select
                                            name="preferred_time"
                                            value={formData.preferred_time}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none"
                                            required
                                        >
                                            <option value="">Select Time Slot</option>
                                            {timeSlots.map((time) => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Property Type
                                        </label>
                                        <select
                                            name="property_type"
                                            value={formData.property_type}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none"
                                        >
                                            <option value="">Select Type</option>
                                            {propertyTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="h-4 w-4 inline mr-1" />
                                            Preferred Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Enter area or locality"
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Quick Location Pills */}
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Popular Locations:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {popularLocations.map((loc) => (
                                            <button
                                                key={loc}
                                                type="button"
                                                onClick={() => handleLocationClick(loc)}
                                                className={`px-3 py-1 text-xs rounded-full border transition-colors ${formData.location === loc
                                                    ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                                                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-yellow-300'
                                                    }`}
                                            >
                                                {loc}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="10-digit mobile number"
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Property Link */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Enter Property Link *
                                    </label>
                                    <input
                                        type="text"
                                        name="property_link"
                                        value={formData.property_link}
                                        onChange={handleChange}
                                        placeholder="https://punehomerent.com/properties/15"
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                                            Scheduling...
                                        </>
                                    ) : (
                                        <>
                                            Schedule Viewing
                                            <ChevronRight className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Features */}
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="font-bold text-gray-900 mb-3">Viewing Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">Flexible Timings</div>
                                        <div className="text-xs text-gray-600">7 days a week, 9AM-7PM</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">No Commissions</div>
                                        <div className="text-xs text-gray-600">Free for tenants</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">Expert Guidance</div>
                                        <div className="text-xs text-gray-600">Area expert assistance</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">Multiple Properties</div>
                                        <div className="text-xs text-gray-600">View multiple in one visit</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Info & Contact */}
                    <div className="space-y-4">
                        {/* Viewing Hours */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Clock className="h-5 w-5 text-yellow-500" />
                                <h3 className="font-bold text-gray-900">Viewing Hours</h3>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">Monday - Friday</span>
                                    <span className="font-semibold text-gray-900">9 AM - 7 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">Saturday - Sunday</span>
                                    <span className="font-semibold text-gray-900">10 AM - 6 PM</span>
                                </div>
                                <div className="pt-2 border-t border-gray-100">
                                    <div className="text-xs text-gray-500">
                                        * Evening viewings available on request
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-yellow-500/20 p-4">
                            <h3 className="text-lg font-bold text-white mb-3">Need Urgent Viewing?</h3>

                            <div className="space-y-3 mb-4">
                                <Link
                                    to="tel:+919876543210"
                                    className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <Phone className="h-5 w-5 text-yellow-400" />
                                    <div>
                                        <div className="text-white font-medium">Call Now</div>
                                        <div className="text-sm text-gray-300">+91 98765 43210</div>
                                    </div>
                                </Link>

                                <Link
                                    to="/whatsapp-viewing"
                                    className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <MessageSquare className="h-5 w-5 text-yellow-400" />
                                    <div>
                                        <div className="text-white font-medium">WhatsApp</div>
                                        <div className="text-sm text-gray-300">Instant booking</div>
                                    </div>
                                </Link>
                            </div>

                            <div className="text-xs text-gray-300">
                                Same-day viewings available for urgent requirements
                            </div>
                        </div>

                        {/* Viewing Tips */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-900 mb-3">Viewing Tips</h3>

                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div className="text-sm text-gray-700">Bring ID proof for gated societies</div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div className="text-sm text-gray-700">Check water pressure & amenities</div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div className="text-sm text-gray-700">Note down maintenance details</div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div className="text-sm text-gray-700">Ask about parking & security</div>
                                </div>
                            </div>


                        </div>

                        {/* Schedule Multiple */}
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="font-bold text-gray-900 mb-2">Schedule Multiple Viewings</h3>
                            <p className="text-sm text-gray-700 mb-3">
                                Want to see multiple properties in one trip?
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlexibleViewings;