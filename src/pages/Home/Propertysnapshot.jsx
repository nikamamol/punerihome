import React from "react";
import {
  Home,
  TrendingUp,
  Users,
  Building,
  MapPin,
  GraduationCap,
  Briefcase,
  Star,
  Upload,
  ChevronRight,
} from "lucide-react";

function Propertysnapshot() {
  const [showMore, setShowMore] = React.useState(false);

  const stats = [
    {
      count: "8,500+",
      label: "Affordable Homes in Pune",
      icon: <Home size={20} className="text-yellow-500" />,
    },
    {
      count: "52,000+",
      label: "Active Property Listings",
      icon: <TrendingUp size={20} className="text-yellow-500" />,
    },
    {
      count: "350+",
      label: "Certified Real Estate Agents",
      icon: <Users size={20} className="text-yellow-500" />,
    },
    {
      count: "2,500+",
      label: "Ongoing Projects",
      icon: <Building size={20} className="text-yellow-500" />,
    },
  ];

  const itCompanies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Accenture",
    "Cognizant",
    "Capgemini",
    "Persistent Systems",
    "Cybage",
    "Zensar",
    "L&T Infotech",
  ];

  const colleges = [
    "College of Engineering Pune (COEP)",
    "Pune Institute of Computer Technology (PICT)",
    "Symbiosis Institute of Technology (SIT)",
    "MIT World Peace University",
    "Bharati Vidyapeeth College of Engineering",
  ];

  const placesInPune = [
    "Koregaon Park",
    "Kalyani Nagar",
    "Baner",
    "Hinjewadi",
    "Wakad",
    "Aundh",
    "Viman Nagar",
    "Magarpatta City",
    "Kharadi",
    "Pimple Saudagar",
  ];

  const placesNearPune = [
    "Lavasa (30 km)",
    "Lonavala (65 km)",
    "Mahabaleshwar (120 km)",
    "Panchgani (100 km)",
    "Alibaug (150 km)",
    "Matheran (120 km)",
  ];

  const popularBuilders = [
    "Kolte Patil",
    "Godrej Properties",
    "Lodha Group",
    "Prestige Group",
    "Puranik Builders",
    "Gera Developments",
    "VTP Realty",
    "Nyati Group",
  ];

  const fullText = `Pune, often called the "Oxford of the East" and "Cultural Capital of Maharashtra," has emerged as India's premier educational and IT hub. The city seamlessly blends rich historical heritage with modern infrastructure, offering an exceptional quality of life. With its pleasant year-round climate, green surroundings, and cosmopolitan culture, Pune attracts professionals, students, and families alike.

The city's real estate market is booming with opportunities across all budget segments. From luxury apartments in Koregaon Park to affordable housing in Pimpri-Chinchwad, Pune offers diverse residential options. The IT corridor spanning Hinjewadi, Kharadi, and Magarpatta has transformed the city's economic landscape, attracting major global corporations.

Pune's educational ecosystem includes 500+ colleges and universities, making it a magnet for students nationwide. The city's excellent connectivity through highways, metro, and proposed ring road enhances its appeal. With sustainable development initiatives and smart city projects underway, Pune promises exceptional growth potential for property investors and homebuyers.`;

  const previewText = fullText.substring(0, 280) + "...";

  return (
    <div className="bg-white font-sans p-4 md:p-6 max-w-6xl mx-auto my-2 md:my-4 rounded-lg shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 mt-3 mx-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center mb-5">
            <MapPin className="text-white" size={20} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-5">
            Pune Real Estate Overview
          </h1>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-br from-yellow-50 to-white p-4 rounded-lg border border-yellow-200 mb-4">
          <p className="text-gray-700 leading-relaxed">
            {showMore ? fullText : previewText}
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-yellow-600 font-semibold hover:text-yellow-700 ml-2 transition-colors flex items-center gap-1"
            >
              {showMore ? "Show less" : "Read full overview"}
              <ChevronRight
                size={16}
                className={`transform ${
                  showMore ? "rotate-90" : ""
                } transition-transform`}
              />
            </button>
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg p-4 text-center hover:border-yellow-400 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {stat.count}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-yellow-600 font-semibold">
            Market Insights
          </span>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* IT Companies */}
        <div className="bg-white border border-gray-300 p-4 rounded-lg hover:border-yellow-400 transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center">
              <Briefcase className="text-white" size={18} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Major Employers
            </h3>
          </div>
          <div className="space-y-1">
            {itCompanies.slice(0, 5).map((company, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-1 hover:bg-yellow-50 rounded transition-colors"
              >
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-700 text-sm">{company}</span>
              </div>
            ))}
            <div className="pt-2">
              <button className="text-yellow-600 text-sm font-medium hover:text-yellow-700 flex items-center gap-1">
                View all {itCompanies.length}+ companies
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Top Colleges */}
        <div className="bg-white border border-gray-300 p-4 rounded-lg hover:border-yellow-400 transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white" size={18} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Premier Institutions
            </h3>
          </div>
          <div className="space-y-2">
            {colleges.map((college, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-1 hover:bg-yellow-50 rounded transition-colors group"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <span className="text-gray-700 text-sm">{college}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Builders */}
        <div className="bg-white border border-gray-300 p-4 rounded-lg hover:border-yellow-400 transition-all hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center">
              <Star className="text-white" size={18} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Trusted Developers
            </h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {popularBuilders.map((builder, index) => (
              <span
                key={index}
                className="bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-md text-gray-700 text-xs hover:bg-yellow-100 hover:border-yellow-300 transition-colors"
              >
                {builder}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Places to Visit */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Prime Locations & Getaways
          </h3>
          <div className="flex gap-1">
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
              Within City
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              Weekend Escapes
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Prime Localities */}
          <div className="border border-gray-300 rounded-lg p-4 hover:border-yellow-400 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full"></div>
              <h4 className="font-semibold text-gray-900">
                Prime Residential Areas
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {placesInPune.slice(0, 6).map((place, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-2 rounded-md hover:bg-yellow-50 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-yellow-500" />
                    <span className="text-gray-700 text-sm">{place}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button className="text-yellow-600 text-sm font-medium hover:text-yellow-700 flex items-center gap-1">
                Explore all localities
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Weekend Getaways */}
          <div className="border border-gray-300 rounded-lg p-4 hover:border-yellow-400 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full"></div>
              <h4 className="font-semibold text-gray-900">
                Popular Weekend Destinations
              </h4>
            </div>
            <div className="space-y-2">
              {placesNearPune.map((place, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gradient-to-r from-yellow-50 to-white rounded-md hover:from-yellow-100 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-gray-700 text-sm">
                      {place.split("(")[0]}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {place.split("(")[1]?.replace(")", "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Post Property CTA - Changed to black background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-black rounded-xl p-5 text-white shadow-xl">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-yellow-500/10 rounded-full translate-y-10 -translate-x-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left max-w-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              List Your Property <span className="text-yellow-400">Free</span> &
              Reach <span className="text-yellow-400">1M+</span> Buyers
            </h3>
            <p className="text-gray-300 mb-3 text-sm">
              Join thousands of property owners who successfully sold their
              properties through our platform. Get verified leads, professional
              photography, and end-to-end support.
            </p>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span>Zero Listing Fees</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span>Instant Buyer Matches</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span>Legal Assistance</span>
              </div>
            </div>
          </div>
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 min-w-[180px] justify-center whitespace-nowrap hover:scale-105 transform">
            <Upload size={18} />
            Start Listing Free
          </button>
        </div>
      </div>
    </div>
  );
}

export default Propertysnapshot;
