import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageSquare, Star, Award, CheckCircle, ChevronRight, Users, Home, Shield, Clock } from 'lucide-react';

function Areaexperts() {
  const experts = [
    {
      id: 1,
      name: "Rajesh Sharma",
      area: "Hinjewadi, Wakad",
      experience: "8+ years",
      specialties: ["IT Professionals", "Family Rentals", "Studio Apartments"],
      rating: 4.9,
      reviews: 142,
      contact: "+91 98765 43210",
      languages: ["English", "Hindi", "Marathi"]
    },
    {
      id: 2,
      name: "Priya Patel",
      area: "Kothrud, Shivajinagar",
      experience: "6+ years",
      specialties: ["Students", "Working Professionals", "Budget Apartments"],
      rating: 4.8,
      reviews: 98,
      contact: "+91 98765 43211",
      languages: ["English", "Hindi", "Gujarati"]
    },
    {
      id: 3,
      name: "Amit Verma",
      area: "Viman Nagar, Kharadi",
      experience: "10+ years",
      specialties: ["Luxury Apartments", "Corporate Leases", "Gated Communities"],
      rating: 4.9,
      reviews: 187,
      contact: "+91 98765 43212",
      languages: ["English", "Hindi"]
    },
    {
      id: 4,
      name: "Sunita Desai",
      area: "Baner, Balewadi",
      experience: "7+ years",
      specialties: ["Family Homes", "Villas", "Pet-Friendly Properties"],
      rating: 4.7,
      reviews: 76,
      contact: "+91 98765 43213",
      languages: ["English", "Hindi", "Marathi", "Kannada"]
    }
  ];

  const areas = [
    { name: "Hinjewadi", properties: 1250, experts: 8 },
    { name: "Wakad", properties: 890, experts: 6 },
    { name: "Kothrud", properties: 1540, experts: 10 },
    { name: "Viman Nagar", properties: 2100, experts: 12 },
    { name: "Baner", properties: 980, experts: 7 },
    { name: "Kharadi", properties: 1670, experts: 9 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 rounded-xl mb-3 border border-yellow-500/20">
            <MapPin className="h-6 w-6 text-yellow-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Area Experts</h1>
          <p className="text-gray-600">Connect with local property experts in your preferred area</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">25+</div>
            <div className="text-sm text-gray-600">Areas Covered</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">45+</div>
            <div className="text-sm text-gray-600">Experts</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">15k+</div>
            <div className="text-sm text-gray-600">Properties</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">4.8★</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Experts List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Our Top Experts</h2>
              
              <div className="space-y-4">
                {experts.map((expert) => (
                  <div key={expert.id} className="border border-gray-200 rounded-lg p-4 hover:border-yellow-400 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Expert Avatar & Info */}
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold">
                          {expert.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{expert.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                            <MapPin className="h-3 w-3" />
                            {expert.area}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-sm font-semibold">{expert.rating}</span>
                            </div>
                            <span className="text-xs text-gray-500">({expert.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>

                      {/* Expert Details */}
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {expert.specialties.map((specialty, index) => (
                            <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                              {specialty}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">{expert.experience}</span> experience
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              to={`tel:${expert.contact}`}
                              className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 text-xs font-bold rounded hover:from-yellow-600 hover:to-yellow-500 transition-all flex items-center gap-1"
                            >
                              <Phone className="h-3 w-3" />
                              Call
                            </Link>
                            <Link
                              to={`/experts/${expert.id}`}
                              className="px-3 py-1 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:border-yellow-400 hover:bg-yellow-50 transition-all"
                            >
                              View Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">Why Choose Area Experts?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Local Knowledge</div>
                    <div className="text-xs text-gray-600">Deep understanding of neighborhood</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Price Insights</div>
                    <div className="text-xs text-gray-600">Accurate market price knowledge</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Quick Response</div>
                    <div className="text-xs text-gray-600">Immediate property access</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Negotiation Help</div>
                    <div className="text-xs text-gray-600">Best deal assistance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Areas & Quick Actions */}
          <div className="space-y-4">
            {/* Popular Areas */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Popular Areas</h3>
              
              <div className="space-y-2">
                {areas.map((area, index) => (
                  <Link
                    key={index}
                    to={`/areas/${area.name.toLowerCase()}`}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium text-gray-900">{area.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{area.properties} properties</span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-yellow-500" />
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                to="/all-areas"
                className="mt-3 text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1"
              >
                View all areas
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Quick Connect */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-yellow-500/20 p-4">
              <h3 className="text-lg font-bold text-white mb-3">Quick Connect</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Phone className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Call Support</div>
                    <div className="text-sm text-gray-300">+91 98765 43210</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Live Chat</div>
                    <div className="text-sm text-gray-300">Available 9AM-9PM</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Mail className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-sm text-gray-300">experts@punerihouse.com</div>
                  </div>
                </div>
              </div>

              <Link
                to="/become-expert"
                className="mt-4 inline-block w-full py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm text-center"
              >
                Become an Area Expert
              </Link>
            </div>

            {/* Find Expert */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 mb-3">Find Expert for Your Area</h3>
              
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter area or locality"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none text-sm"
                />
                
                <button className="w-full py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm">
                  Search Experts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Areaexperts;