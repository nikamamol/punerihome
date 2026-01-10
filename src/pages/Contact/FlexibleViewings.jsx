import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, CheckCircle, Phone, Mail, MessageSquare, ChevronRight, Shield, Star, Users, Home, Building } from 'lucide-react';

function FlexibleViewings() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Viewing Request:', {
            selectedDate,
            selectedTime,
            propertyType,
            location,
            name,
            phone
        });

        setIsSubmitting(false);
        setSubmitted(true);

        // Reset form
        setSelectedDate('');
        setSelectedTime('');
        setPropertyType('');
        setLocation('');
        setName('');
        setPhone('');

        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
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

                            {submitted ? (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                                    <h3 className="font-bold text-green-900 mb-2">Viewing Scheduled!</h3>
                                    <p className="text-green-700">
                                        We'll confirm your appointment within 2 hours. Check your SMS/Email.
                                    </p>
                                </div>
                            ) : (
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
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
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
                                                value={selectedTime}
                                                onChange={(e) => setSelectedTime(e.target.value)}
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
                                                value={propertyType}
                                                onChange={(e) => setPropertyType(e.target.value)}
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
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
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
                                                    onClick={() => setLocation(loc)}
                                                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${location === loc
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
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
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
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="10-digit mobile number"
                                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
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
                            )}
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

                            <Link
                                to="/viewing-checklist"
                                className="mt-3 text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1"
                            >
                                Download checklist
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        {/* Schedule Multiple */}
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="font-bold text-gray-900 mb-2">Schedule Multiple Viewings</h3>
                            <p className="text-sm text-gray-700 mb-3">
                                Want to see multiple properties in one trip?
                            </p>
                            <Link
                                to="/multiple-viewings"
                                className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1"
                            >
                                Book property tour
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlexibleViewings;