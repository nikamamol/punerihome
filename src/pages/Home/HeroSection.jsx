import React from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Home, IndianRupee, ChevronDown } from "lucide-react";
import logo from "../../assets/images/logo.png";

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
            <img
              src={logo}
              alt="Puneri Homes Logo"
              className="mx-auto max-h-24"
            />
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Find Your Perfect <span className="text-yellow-300">Home</span> in{" "}
            <span className="text-gray-300">Pune</span>
          </h2>

          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Connect directly with verified owners. No brokers, no hidden
            charges.
            <span className="block text-yellow-300 font-semibold mt-2">
              Ghar jo aapko aap jaisa lage
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

          {/* Search Bar with Location, Flat, Budget */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl blur-sm opacity-30"></div>
              <div className="relative bg-gray-900 border border-yellow-500/30 rounded-xl p-1 shadow-2xl">
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Location Field */}
                  <div className="flex-1 border-r border-yellow-500/20 relative">
                    <div className="flex items-center px-4 py-3">
                      <MapPin className="w-5 h-5 text-yellow-400 mr-3" />
                      <div className="flex-1 relative">
                        <label className="block text-xs text-gray-400 mb-1">
                          Location
                        </label>
                        <div className="relative">
                          <select className="w-full bg-black border border-yellow-500/40 rounded-lg px-3 py-2 text-white focus:outline-none text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 appearance-none pr-10">
                            <option value="" className="bg-black">
                              Select Location
                            </option>

                            {/* Core Areas */}
                            <option value="koregaon-park" className="bg-black">
                              Koregaon Park
                            </option>
                            <option value="viman-nagar" className="bg-black">
                              Viman Nagar
                            </option>
                            <option value="kalyani-nagar" className="bg-black">
                              Kalyani Nagar
                            </option>
                            <option value="aundh" className="bg-black">
                              Aundh
                            </option>
                            <option value="baner" className="bg-black">
                              Baner
                            </option>
                            <option value="balewadi" className="bg-black">
                              Balewadi
                            </option>
                            <option value="wakad" className="bg-black">
                              Wakad
                            </option>
                            <option value="pashan" className="bg-black">
                              Pashan
                            </option>

                            {/* IT Hubs */}
                            <option value="hinjewadi" className="bg-black">
                              Hinjewadi
                            </option>
                            <option value="kharadi" className="bg-black">
                              Kharadi
                            </option>
                            <option value="magarpatta" className="bg-black">
                              Magarpatta
                            </option>
                            <option value="hadapsar" className="bg-black">
                              Hadapsar
                            </option>

                            {/* Central / Old Pune */}
                            <option value="shivajinagar" className="bg-black">
                              Shivajinagar
                            </option>
                            <option value="deccan" className="bg-black">
                              Deccan
                            </option>
                            <option value="karve-nagar" className="bg-black">
                              Karve Nagar
                            </option>
                            <option value="kothrud" className="bg-black">
                              Kothrud
                            </option>
                            <option value="warje" className="bg-black">
                              Warje Malwadi
                            </option>

                            {/* PCMC / Suburbs */}
                            <option
                              value="pimple-saudagar"
                              className="bg-black"
                            >
                              Pimple Saudagar
                            </option>
                            <option value="pimple-nilakh" className="bg-black">
                              Pimple Nilakh
                            </option>
                            <option value="chinchwad" className="bg-black">
                              Chinchwad
                            </option>
                            <option value="pimpri" className="bg-black">
                              Pimpri
                            </option>
                            <option value="ravet" className="bg-black">
                              Ravet
                            </option>
                            <option value="tathawade" className="bg-black">
                              Tathawade
                            </option>

                            {/* East Pune */}
                            <option value="yerwada" className="bg-black">
                              Yerwada
                            </option>
                            <option value="mundhwa" className="bg-black">
                              Mundhwa
                            </option>
                            <option value="wadgaon-sheri" className="bg-black">
                              Wadgaon Sheri
                            </option>

                            {/* South Pune */}
                            <option value="katraj" className="bg-black">
                              Katraj
                            </option>
                            <option value="bibwewadi" className="bg-black">
                              Bibwewadi
                            </option>
                            <option value="kondhwa" className="bg-black">
                              Kondhwa
                            </option>
                            <option value="wanowrie" className="bg-black">
                              Wanowrie
                            </option>
                            <option value="nibm" className="bg-black">
                              NIBM
                            </option>

                            {/* Outskirts */}
                            <option value="lohegaon" className="bg-black">
                              Lohegaon
                            </option>
                            <option value="wagholi" className="bg-black">
                              Wagholi
                            </option>
                            <option value="moshi" className="bg-black">
                              Moshi
                            </option>
                            <option value="chakan" className="bg-black">
                              Chakan
                            </option>
                          </select>

                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ChevronDown className="w-4 h-4 text-yellow-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flat Type Field */}
                  <div className="flex-1 border-r border-yellow-500/20 relative">
                    <div className="flex items-center px-4 py-3">
                      <Home className="w-5 h-5 text-yellow-400 mr-3" />
                      <div className="flex-1 relative">
                        <label className="block text-xs text-gray-400 mb-1">
                          Property Type
                        </label>

                        <div className="relative">
                          <select className="w-full bg-black border border-yellow-500/40 rounded-lg px-3 py-2 text-white focus:outline-none text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 appearance-none pr-10">
                            <option value="" className="bg-black">
                              Select Property Type
                            </option>

                            {/* Residential */}
                            <option value="1bhk" className="bg-black">
                              1 BHK
                            </option>
                            <option value="2bhk" className="bg-black">
                              2 BHK
                            </option>
                            <option value="3bhk" className="bg-black">
                              3 BHK
                            </option>
                            <option value="4bhk" className="bg-black">
                              4 BHK
                            </option>
                            <option value="studio" className="bg-black">
                              Studio
                            </option>
                            <option value="penthouse" className="bg-black">
                              Penthouse
                            </option>
                            <option value="villa" className="bg-black">
                              Villa
                            </option>

                            {/* Commercial */}
                            <option value="office" className="bg-black">
                              Office
                            </option>
                            <option value="shop" className="bg-black">
                              Shop
                            </option>
                            <option value="coworking" className="bg-black">
                              Co-working Space
                            </option>

                            {/* Short term / Vacation */}
                            <option value="vacation-home" className="bg-black">
                              Vacation Home
                            </option>
                            <option
                              value="service-apartment"
                              className="bg-black"
                            >
                              Serviced Apartment
                            </option>
                            <option value="homestay" className="bg-black">
                              Homestay
                            </option>
                          </select>

                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ChevronDown className="w-4 h-4 text-yellow-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Budget Field */}
                  <div className="flex-1 border-r border-yellow-500/20 relative">
                    <div className="flex items-center px-4 py-3">
                      <IndianRupee className="w-5 h-5 text-yellow-400 mr-3" />
                      <div className="flex-1 relative">
                        <label className="block text-xs text-gray-400 mb-1">
                          Monthly Budget
                        </label>

                        <div className="relative">
                          <select className="w-full bg-black border border-yellow-500/40 rounded-lg px-3 py-2 text-white focus:outline-none text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 appearance-none pr-10">
                            <option value="" className="bg-black">
                              Select Budget
                            </option>

                            <option value="7000" className="bg-black">
                              ₹7,000
                            </option>
                            <option value="12000" className="bg-black">
                              ₹12,000
                            </option>
                            <option value="18000" className="bg-black">
                              ₹18,000
                            </option>
                            <option value="25000" className="bg-black">
                              ₹25,000
                            </option>
                            <option value="35000" className="bg-black">
                              ₹35,000
                            </option>
                            <option value="50000" className="bg-black">
                              ₹50,000
                            </option>
                            <option value="75000" className="bg-black">
                              ₹75,000
                            </option>
                            <option value="150000" className="bg-black">
                              ₹1,50,000
                            </option>
                          </select>

                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ChevronDown className="w-4 h-4 text-yellow-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="w-full md:w-auto flex items-center justify-center">
                    <button className="w-full md:w-auto bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-gray-900 font-semibold px-3 py-1.5 rounded-md transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg min-h-[40px] md:min-h-[80px]">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
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
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Link>

            <Link
              to="/addownerproperty"
              className="group relative overflow-hidden bg-transparent border-2 border-yellow-500 hover:border-yellow-400 hover:bg-yellow-500/10 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>List Your Property</span>
                <span className="text-yellow-300 group-hover:text-yellow-200">
                  🏠
                </span>
              </span>
            </Link>
          </div>

          {/* Stats Counter */}
          <div className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { number: "500+", label: "Properties Listed" },
                { number: "98%", label: "Verified Owners" },
                { number: "₹49", label: "Contact Unlock" },
                { number: "0%", label: "Broker Fee" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
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
