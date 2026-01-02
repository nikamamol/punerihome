import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24">
      {/* Golden Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>

      {/* Silver Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Logo Section */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <span className="text-3xl font-black text-gray-900">19T</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">
                    Puneri
                  </span>
                  <span className="block text-2xl md:text-3xl font-light text-gray-300 mt-1">
                    HOME'S
                  </span>
                </h1>
              </div>
            </div>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Find Your Perfect <span className="text-yellow-300">Home</span> in{' '}
            <span className="text-gray-300">Pune</span>
          </h2>

          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Connect directly with verified owners. No brokers, no hidden charges.
            <span className="block text-yellow-300 font-semibold mt-2">
              Your Trust, Our Priority
            </span>
          </p>

          {/* Trust Badges with Silver/Gold Theme */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 px-5 py-3 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>✓ 100% Owner Verified</span>
            </span>
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 px-5 py-3 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>🔒 Secure Contact System</span>
            </span>
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 px-5 py-3 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>🛡️ No Brokers Allowed</span>
            </span>
          </div>

          {/* Search Bar */}
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl blur-sm opacity-30"></div>
              <div className="relative bg-gray-900 border border-yellow-500/30 rounded-xl p-1 shadow-2xl">
                <div className="flex items-center">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search properties by area, type, or budget..."
                      className="w-full bg-transparent text-white placeholder-gray-400 px-6 py-4 focus:outline-none"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-lg m-1 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/properties"
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-gray-900 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-200 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>Browse Properties</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            <Link
              to="/owner-verification"
              className="group relative overflow-hidden bg-transparent border-2 border-yellow-500 hover:border-yellow-400 hover:bg-yellow-500/10 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>List Your Property</span>
                <span className="text-yellow-300 group-hover:text-yellow-200">🏠</span>
              </span>
            </Link>
          </div>

          {/* Stats Counter */}
          <div className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { number: '500+', label: 'Properties Listed' },
                { number: '98%', label: 'Verified Owners' },
                { number: '₹49', label: 'Contact Unlock' },
                { number: '0%', label: 'Broker Fee' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group"
                >
                  {/* Background with subtle gold accent */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-500/10 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-yellow-500/10 hover:border-yellow-500/20 transition-all duration-300">

                    {/* Golden accent corner */}
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/30 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/30 rounded-bl-xl"></div>

                    {/* Number with gold gradient */}
                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>

                    {/* Label with subtle styling */}
                    <div className="text-sm text-gray-300 font-medium tracking-wide">
                      {stat.label}
                    </div>

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;