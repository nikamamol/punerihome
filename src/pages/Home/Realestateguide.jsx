import React from 'react';
import { PlayCircle, Menu, ChevronRight, Video, FileText, Home, TrendingUp, Shield } from 'lucide-react';

function Realestateguide() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 md:p-8 font-sans">
            {/* Header */}
            <header className="max-w-6xl mx-auto mb-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                        Real Estate Guide
                    </h1>
                    <button className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 hover:from-yellow-600 hover:to-yellow-500 transition-all duration-300 shadow-lg">
                        <Menu size={24} />
                    </button>
                </div>

                {/* Live Banner */}
                <div className="bg-white p-4 rounded-xl shadow-lg mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
                                <span className="font-semibold text-gray-900">LIVE</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                Real Estate Insights: Work, Play & Investment
                            </h2>
                            <p className="text-gray-800 text-sm mt-2">Exclusive market analysis and trends</p>
                        </div>
                        <PlayCircle size={32} className="text-gray-900" />
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto">
                {/* Property Videos */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-yellow-300">Property Videos</h2>
                        <button className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 font-medium transition">
                            View All <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-400/40 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center">
                                        <Video className="text-gray-900" size={24} />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-900 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                                        <PlayCircle size={12} className="text-yellow-400" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        Balewadi, Pune: Property Prices & Trends
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3">Updated market rates and investment analysis</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-yellow-400 text-sm font-medium">Watch Now</span>
                                        <ChevronRight size={18} className="text-yellow-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-400/40 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center">
                                        <Video className="text-gray-900" size={24} />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-900 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                                        <PlayCircle size={12} className="text-yellow-400" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        Marunji, Pune: New Developments & Prices
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3">Latest projects and price trends</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-yellow-400 text-sm font-medium">Watch Now</span>
                                        <ChevronRight size={18} className="text-yellow-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Industry Insights */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-6">Industry Insights</h2>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6">
                        <div className="space-y-4">
                            {[
                                "Ready Reckoner Rate - Complete Guide",
                                "Occupancy Certificate (OC) - Documents Required",
                                "Vastu Tips for Modern Homes",
                                "Land Zone Verification in Maharashtra",
                                "Circle Rates in Pune - Updated List"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-700/30 rounded-lg transition-all duration-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        <span className="text-gray-200 font-medium">{item}</span>
                                    </div>
                                    <ChevronRight size={18} className="text-yellow-500" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 text-center text-yellow-400 font-semibold border border-yellow-500/30 rounded-lg hover:bg-yellow-500/10 transition-all duration-200">
                            View All Insights
                        </button>
                    </div>
                </section>

                {/* Legal Updates */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-6">Legal Updates</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Video Card */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-400/40 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center">
                                    <PlayCircle size={24} className="text-gray-900" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Writing a Will - Complete Guide</h3>
                                    <p className="text-gray-400 text-sm mb-3">Step-by-step video guide</p>
                                    <button className="text-yellow-400 text-sm font-semibold hover:text-yellow-300 transition">
                                        Watch Video →
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Article Card */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-400/40 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 border border-yellow-500/30 rounded-lg flex items-center justify-center">
                                    <FileText size={24} className="text-yellow-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Rent Agreement Formats</h3>
                                    <p className="text-gray-400 text-sm mb-3">Downloadable templates</p>
                                    <button className="text-yellow-400 text-sm font-semibold hover:text-yellow-300 transition">
                                        Read Article →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Services */}
                {/* <section>
          <h2 className="text-2xl font-semibold text-yellow-300 mb-6">Quick Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500/20 rounded-xl p-6 text-center hover:border-yellow-400/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Home className="text-gray-900" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Home Loans</h3>
              <p className="text-gray-400 text-sm mb-4">Compare rates & apply online</p>
              <button className="text-yellow-400 text-sm font-semibold hover:text-yellow-300 transition">
                Explore →
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500/20 rounded-xl p-6 text-center hover:border-yellow-400/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-gray-900" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Investment</h3>
              <p className="text-gray-400 text-sm mb-4">Smart property investment</p>
              <button className="text-yellow-400 text-sm font-semibold hover:text-yellow-300 transition">
                Explore →
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500/20 rounded-xl p-6 text-center hover:border-yellow-400/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-gray-900" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Legal Help</h3>
              <p className="text-gray-400 text-sm mb-4">Property legal services</p>
              <button className="text-yellow-400 text-sm font-semibold hover:text-yellow-300 transition">
                Explore →
              </button>
            </div>
          </div>
        </section> */}
            </main>

        </div>
    );
}

export default Realestateguide;