import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import logo from "../../../assets/images/logo.png";
import qrcode from "../../../assets/images/images.png";
import {
  Menu,
  X,
  User,
  Search,
  Bell,
  Home,
  Building2,
  ChevronDown,
  Check,
  ChevronRight,
  Users,
  UserCheck,
  XCircle,
  Shield,
  Phone,
  HelpCircle,
  Download,
  Star,
  MapPin,
  Calendar,
  MessageSquare,
  Heart,
  Eye,
  Filter,
  FileText,
  Newspaper,
  BarChart3,
  Mail,
  Upload,
  Eye as EyeIcon,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isRentMenuOpen, setIsRentMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isOwnerMenuOpen, setIsOwnerMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  // Close search when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Search"]')
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Property types for Rent dropdown (from your image content)
  const propertyTypes = [
    "Flat for rent in Pune",
    "House for rent in Pune",
    "Villa for rent in Pune",
    "PG in Pune",
    "Office Space in Pune",
  ];

  // Budget ranges for Rent dropdown (from your image content)
  const budgetRanges = [
    "Under ₹ 10,000",
    "₹ 10,000 - ₹ 15,000",
    "₹ 15,000 - ₹ 25,000",
    "Above ₹ 25,000",
  ];

  // Popular choices for Rent dropdown (from your image content)
  const popularChoices = [
    "Owner Properties",
    "Verified Properties",
    "Furnished Homes",
    "Bachelor Friendly Homes",
    "Immediately Available",
  ];

  // Owner offerings data (from your image content)
  const ownerOfferings = [
    {
      icon: <Upload className="w-4 h-4" />,
      title: "Post Property",
      description: "List your property free",
    },
    // {
    //   icon: <EyeIcon className="w-4 h-4" />,
    //   title: "View Responses",
    //   description: "See tenant inquiries"
    // },
    // {
    //   icon: <Shield className="w-4 h-4" />,
    //   title: "Owner Services",
    //   description: "Premium owner tools"
    // },
    // {
    //   icon: <FileText className="w-4 h-4" />,
    //   title: "Insights",
    //   description: "Market analytics"
    // },
    // {
    //   icon: <BarChart3 className="w-4 h-4" />,
    //   title: "PuneriHomes",
    //   description: "Your property portfolio"
    // },
    {
      icon: <Newspaper className="w-4 h-4" />,
      title: "Articles & News",
      description: "Real estate updates",
    },
  ];

  // Services data
  const services = [
    {
      icon: <Shield className="w-4 h-4" />,
      title: "Verified Properties",
      description: "100% verified listings",
      slug: "verified-properties",
    },
    {
      icon: <Phone className="w-4 h-4" />,
      title: "24/7 Support",
      description: "Always here to help",
      slug: "support",
    },
    {
      icon: <Star className="w-4 h-4" />,
      title: "Premium Listings",
      description: "Top quality properties",
      slug: "premium-listings",
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      title: "Area Experts",
      description: "Local knowledge",
      slug: "area-experts",
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      title: "Flexible Viewings",
      description: "Schedule as per your convenience",
      slug: "schedule-viewing",
    },
    // {
    //   icon: <MessageSquare className="w-4 h-4" />,
    //   title: "Direct Chat",
    //   description: "Talk directly to owners",
    //   slug: "chat"
    // }
  ];

  const handleRentPropertyClick = (propertyType) => {
    setIsRentMenuOpen(false);
    setIsMenuOpen(false);

    // Extract property type for query params
    const type = propertyType.toLowerCase().includes("flat")
      ? "flat"
      : propertyType.toLowerCase().includes("house")
      ? "house"
      : propertyType.toLowerCase().includes("villa")
      ? "villa"
      : propertyType.toLowerCase().includes("pg")
      ? "pg"
      : propertyType.toLowerCase().includes("office")
      ? "office"
      : "all";

    navigate(`/properties?propertyType=${type}`);
  };

  const handleRentBudgetClick = (budget) => {
    setIsRentMenuOpen(false);
    setIsMenuOpen(false);

    // Parse budget range for query params
    let minPrice, maxPrice;

    if (budget.includes("Under")) {
      minPrice = 0;
      maxPrice = 10000;
    } else if (budget.includes("Above")) {
      minPrice = 25000;
      maxPrice = 9999999;
    } else {
      const parts = budget.split(" - ");
      minPrice = parseInt(parts[0].replace("₹", "").replace(",", "").trim());
      maxPrice = parseInt(parts[1].replace("₹", "").replace(",", "").trim());
    }

    navigate(`/properties?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  };

  const handleRentPopularClick = (choice) => {
    setIsRentMenuOpen(false);
    setIsMenuOpen(false);

    const filterMap = {
      "Owner Properties": "owner",
      "Verified Properties": "verified",
      "Furnished Homes": "furnished",
      "Bachelor Friendly Homes": "bachelor",
      "Immediately Available": "available",
    };

    navigate(`/properties?filter=${filterMap[choice] || "all"}`);
  };

  const handleServiceClick = (service) => {
    setIsServicesMenuOpen(false);
    setIsMenuOpen(false);
    navigate(`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`);
  };

  // Handle owner offering click
  const handleOwnerOfferingClick = (offering) => {
    setIsOwnerMenuOpen(false);
    setIsMenuOpen(false);

    const routeMap = {
      "Post Property": "/addownerproperty",
      "View Responses": "/owner/responses",
      "Owner Services": "/owner-services",
      // 'Insights': '/owner/insights',
      My9sacres: "/my9sacres",
      "Articles & News": "/articles",
    };

    navigate(routeMap[offering.title] || "/for-owner");
  };

  // Handle "View All Rental Properties" click
  const handleViewAllRentals = () => {
    setIsRentMenuOpen(false);
    setIsMenuOpen(false);
    navigate("/properties");
  };

  const handleCloseAllMenus = () => {
    setIsMenuOpen(false);
    setIsRentMenuOpen(false);
    setIsServicesMenuOpen(false);
    setIsOwnerMenuOpen(false);
    setIsUserMenuOpen(false);
    if (isMobile && isSearchOpen) {
      setIsSearchOpen(false);
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    if (searchQuery) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      if (isMobile) {
        setIsMenuOpen(false);
      }
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
    }
  };

  // Handle direct navigation to properties page
  const handlePropertiesClick = () => {
    setIsMenuOpen(false);
    navigate("/properties");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800 border-b border-yellow-500/20 shadow-lg shadow-black/30">
      {/* Golden Top Border */}
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500"></div>

      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo - Left aligned */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Puneri Homes Logo"
              className="h-10 lg:h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Services Dropdown Menu - Desktop */}
            <div
              className="relative group"
              onMouseEnter={() => setIsServicesMenuOpen(true)}
              onMouseLeave={() => setIsServicesMenuOpen(false)}
            >
              <button
                onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2.5 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 font-medium transition-all duration-200 group"
              >
                <Shield className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
                <span>Services</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isServicesMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Services Desktop Dropdown Container */}
              {isServicesMenuOpen && (
                <div className="absolute left-0 top-full mt-0 w-[400px] bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-500/30 rounded-b-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                  <div className="p-4">
                    <h3 className="text-yellow-300 font-bold mb-3 text-sm uppercase tracking-wider">
                      Our Premium Services
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((service, index) => {
                        // Generate slug from title
                        const slug = service.title
                          .toLowerCase()
                          .replace(/\s+/g, "-");

                        return (
                          <Link
                            key={index}
                            to={`/services/${slug}`}
                            onClick={() => {
                              setIsServicesMenuOpen(false);
                              setIsMenuOpen(false);
                            }}
                            className="flex items-start space-x-2 p-3 rounded-lg text-left bg-gray-900/50 hover:bg-gray-800/70 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-200 group"
                          >
                            <div className="p-1.5 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                              {React.cloneElement(service.icon, {
                                className: "w-4 h-4 text-yellow-400",
                              })}
                            </div>
                            <div>
                              <div className="text-yellow-300 font-bold text-xs">
                                {service.title}
                              </div>
                              <div className="text-gray-400 text-xs mt-0.5">
                                {service.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rent Dropdown Menu - Desktop */}
            <div
              className="relative group"
              onMouseEnter={() => setIsRentMenuOpen(true)}
              onMouseLeave={() => setIsRentMenuOpen(false)}
            >
              <button
                onClick={() => setIsRentMenuOpen(!isRentMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2.5 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 font-medium transition-all duration-200 group"
              >
                <Users className="w-4 h-4" />
                <span>For Tenants</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isRentMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Dropdown Container */}
              {isRentMenuOpen && (
                <div className="absolute left-0 top-full mt-0 w-[600px] bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-500/30 rounded-b-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                  <div className="grid grid-cols-3 gap-0">
                    {/* Popular Choices Column */}
                    <div className="p-3 border-r border-yellow-500/20">
                      <h3 className="text-yellow-300 font-bold mb-2 text-xs uppercase tracking-wider">
                        POPULAR
                      </h3>
                      <ul className="space-y-1">
                        {popularChoices.map((choice, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleRentPopularClick(choice)}
                              className="w-full text-left flex items-center space-x-1 px-2 py-1.5 rounded text-xs text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 group"
                            >
                              <Check className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span>{choice}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Property Types Column */}
                    <div className="p-3 border-r border-yellow-500/20">
                      <h3 className="text-yellow-300 font-bold mb-2 text-xs uppercase tracking-wider">
                        PROPERTY TYPES
                      </h3>
                      <ul className="space-y-1">
                        {propertyTypes.map((type, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleRentPropertyClick(type)}
                              className="w-full text-left flex items-center justify-between px-2 py-1.5 rounded text-xs text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 group"
                            >
                              <span className="truncate pr-2">{type}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Budget Column */}
                    <div className="p-3">
                      <h3 className="text-yellow-300 font-bold mb-2 text-xs uppercase tracking-wider">
                        BUDGET
                      </h3>
                      <ul className="space-y-1">
                        {budgetRanges.map((budget, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleRentBudgetClick(budget)}
                              className="w-full text-left flex items-center space-x-1 px-2 py-1.5 rounded text-xs text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 group"
                            >
                              <Check className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span>{budget}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-yellow-500/20 p-2">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleViewAllRentals}
                        className="text-yellow-300 hover:text-yellow-400 font-bold text-xs transition-colors duration-200 flex items-center space-x-1"
                      >
                        <span>View All Rental Properties</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Owner Dropdown Menu - Desktop */}
            <div
              className="relative group"
              onMouseEnter={() => setIsOwnerMenuOpen(true)}
              onMouseLeave={() => setIsOwnerMenuOpen(false)}
            >
              <button
                onClick={() => setIsOwnerMenuOpen(!isOwnerMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2.5 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 font-medium transition-all duration-200 group"
              >
                <UserCheck className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
                <span>For Owner</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isOwnerMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Owner Desktop Dropdown Container */}
              {isOwnerMenuOpen && (
                <div className="absolute left-0 top-full mt-0 w-[450px] bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-500/30 rounded-b-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-yellow-300 font-bold text-sm uppercase tracking-wider">
                        OWNER OFFERINGS
                      </h3>
                      <h3 className="text-yellow-300 font-bold text-sm uppercase tracking-wider">
                        INSIGHTS
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Owner Offerings Left Column */}
                      <div className="space-y-3">
                        {ownerOfferings.slice(0, 1).map((offering, index) => (
                          <button
                            key={index}
                            onClick={() => handleOwnerOfferingClick(offering)}
                            className="flex items-start space-x-2 p-3 rounded-lg text-left bg-gray-900/50 hover:bg-gray-800/70 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-200 group w-full"
                          >
                            <div className="p-1.5 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors flex-shrink-0">
                              {React.cloneElement(offering.icon, {
                                className: "w-4 h-4 text-yellow-400",
                              })}
                            </div>
                            <div className="flex-1">
                              <div className="text-yellow-300 font-bold text-xs">
                                {offering.title}
                              </div>
                              <div className="text-gray-400 text-xs mt-0.5">
                                {offering.description}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Insights Right Column */}
                      <div className="space-y-3">
                        {ownerOfferings.slice(1).map((offering, index) => (
                          <button
                            key={index}
                            onClick={() => handleOwnerOfferingClick(offering)}
                            className="flex items-start space-x-2 p-3 rounded-lg text-left bg-gray-900/50 hover:bg-gray-800/70 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-200 group w-full"
                          >
                            <div className="p-1.5 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors flex-shrink-0">
                              {React.cloneElement(offering.icon, {
                                className: "w-4 h-4 text-yellow-400",
                              })}
                            </div>
                            <div className="flex-1">
                              <div className="text-yellow-300 font-bold text-xs">
                                {offering.title}
                              </div>
                              <div className="text-gray-400 text-xs mt-0.5">
                                {offering.description}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-yellow-500/20 p-3">
                    <div className="flex items-center justify-between">
                      <Link
                        to="/for-owner"
                        className="text-yellow-300 hover:text-yellow-400 font-bold text-xs transition-colors duration-200 flex items-center space-x-1"
                        onClick={() => setIsOwnerMenuOpen(false)}
                      >
                        <span>View All Owner Services</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                      <Link
                        to="/owner-help"
                        className="text-gray-400 hover:text-yellow-300 text-xs transition-colors duration-200 flex items-center space-x-1"
                        onClick={() => setIsOwnerMenuOpen(false)}
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Owner Support</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Link to Properties */}
            <button
              onClick={handlePropertiesClick}
              className="flex items-center space-x-1 px-3 py-2.5 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 font-medium transition-all duration-200 group"
            >
              <Home className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
              <span>All Properties</span>
            </button>

            {/* Download App Section */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2.5 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 font-medium transition-all duration-200 group">
                <Download className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
                <span>Download App</span>
              </button>

              {/* App Download Dropdown */}
              <div className="absolute left-0 top-full mt-0 w-72 bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-500/30 rounded-b-xl shadow-2xl shadow-black/50 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-xl flex items-center justify-center">
                      <Home className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-yellow-300 font-bold text-sm">
                        Puneri Homes App
                      </h3>
                      <p className="text-gray-400 text-xs">
                        Find your perfect home on the go
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="https://play.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/70 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">G</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-300 text-xs">GET IT ON</div>
                        <div className="text-yellow-300 font-bold text-sm">
                          Google Play
                        </div>
                      </div>
                    </a>

                    <a
                      href="https://apps.apple.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/70 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">A</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-300 text-xs">
                          Download on the
                        </div>
                        <div className="text-yellow-300 font-bold text-sm">
                          App Store
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="mt-3 pt-3 border-t border-yellow-500/20">
                    <p className="text-gray-400 text-xs text-center">
                      Scan QR Code to Download
                    </p>
                    <div className="flex justify-center mt-2">
                      <div className="w-26 h-26 bg-white rounded-lg p-1">
                        <img
                          src={qrcode}
                          alt="QR Code"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Icon - Desktop */}
            <button
              onClick={handleSearchClick}
              className="flex items-center space-x-1 px-3 py-2.5 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Authentication - Desktop */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-2">
                <button className="p-2 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 rounded-lg transition-all duration-200 relative">
                  <Bell className="w-4 h-4" />
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                </button>

                <div
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 hover:border-yellow-500/50 text-gray-300 hover:text-yellow-300 rounded-lg transition-all duration-200 group"
                  >
                    <div className="w-7 h-7 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-sm">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-500/30 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                      <div className="p-3 border-b border-yellow-500/20">
                        <div className="text-xs font-medium text-gray-300">
                          Signed in as
                        </div>
                        <div className="text-yellow-300 font-bold text-sm truncate">
                          {user?.email}
                        </div>
                      </div>

                      <div className="p-1.5">
                        <Link
                          to={
                            user?.role === "tenant"
                              ? "/tenant/dashboard"
                              : "/owner/dashboard"
                          }
                          className="flex items-center space-x-2 px-2.5 py-2 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 text-sm"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>

                        <button className="flex items-center space-x-2 w-full px-2.5 py-2 rounded-lg text-red-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-1.5 border-t border-yellow-500/20 pt-1.5 text-sm">
                          <span className="w-4 h-4 text-center">🚪</span>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-yellow-300 font-medium transition-all duration-200 hover:bg-gray-800/50 rounded-lg text-sm"
                >
                  Login
                </Link>
                <div className="relative w-full">
                  {/* FREE Budget Tag */}
                  <span
                    className="absolute -top-2 left-1/2 -translate-x-1/2 
                    bg-green-500 text-white text-[10px] font-bold 
                    px-2 py-0.5 rounded-full shadow-md 
                    z-20
                    scale-90 hover:scale-100 
                    transition-transform duration-200"
                  >
                    FREE
                  </span>

                  {/* Wave Animated Button */}
                  <Link
                    to="/addownerproperty"
                    onClick={handleCloseAllMenus}
                    className="relative overflow-hidden block w-full text-center 
                    text-gray-900 font-bold p-2 rounded-lg text-xs
                    bg-yellow-500 wave-btn"
                  >
                    <span className="relative z-10">Post Property</span>

                    {/* Wave Layer */}
                    <span
                      className="absolute inset-0 bg-gradient-to-r 
                      from-yellow-400 via-yellow-300 to-yellow-500 
                      animate-wave z-0"
                    ></span>
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center lg:hidden space-x-1">
            {/* Mobile Search Icon */}
            <button
              className="p-1.5 text-gray-300 hover:text-yellow-300"
              onClick={handleSearchClick}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Auth Button */}
            {isAuthenticated ? (
              <button className="p-1.5 text-gray-300 hover:text-yellow-300 relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              </button>
            ) : (
              <Link
                to="/login"
                className="px-2 py-1 text-xs border border-yellow-500/30 text-yellow-300 hover:border-yellow-500/50 rounded-lg font-medium transition-all duration-200"
                onClick={handleCloseAllMenus}
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="p-1.5 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar - Opens on click */}
        {isSearchOpen && (
          <div
            ref={searchContainerRef}
            className={`py-2 animate-fadeIn ${
              isMobile ? "border-t border-yellow-500/20" : ""
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-lg blur-sm opacity-20"></div>
              <div className="relative bg-gray-800 border border-yellow-500/30 rounded-lg overflow-hidden">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <Search className="w-5 h-5 text-gray-400 ml-3" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    name="search"
                    placeholder="Search properties, locations, or keywords..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 px-3 py-2.5 focus:outline-none"
                    autoFocus
                    onKeyDown={handleSearchKeyDown}
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 text-gray-400 hover:text-yellow-300 mr-1"
                    aria-label="Close search"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && !isSearchOpen && (
          <div className="lg:hidden fixed inset-0 top-14 z-40 bg-gradient-to-b from-gray-900 to-gray-800">
            {/* Scrollable Menu Content */}
            <div className="h-[calc(100vh-56px)] overflow-y-auto pb-20">
              {/* Mobile Menu Links */}
              <div className="space-y-0">
                <Link
                  to="/"
                  className="flex items-center space-x-2 px-3 py-3 border-b border-yellow-500/10 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 text-sm"
                  onClick={handleCloseAllMenus}
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium">Home</span>
                </Link>

                {/* Direct Properties Link */}
                <button
                  onClick={handlePropertiesClick}
                  className="flex items-center space-x-2 w-full px-3 py-3 border-b border-yellow-500/10 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 text-sm text-left"
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium">All Properties</span>
                </button>

                {/* Mobile Services Dropdown */}
                <div className="border-b border-yellow-500/10">
                  <button
                    onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
                    className="flex items-center justify-between w-full px-3 py-3 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Services</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isServicesMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Services Submenu */}
                  {isServicesMenuOpen && (
                    <div className="bg-gray-900/50 border-t border-yellow-500/10">
                      <div className="p-3 grid grid-cols-2 gap-2">
                        {services.slice(0, 4).map((service, index) => (
                          <button
                            key={index}
                            onClick={() => handleServiceClick(service)}
                            className="flex flex-col items-center p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-200"
                          >
                            <div className="p-1.5 bg-yellow-500/10 rounded-lg mb-1">
                              {React.cloneElement(service.icon, {
                                className: "w-4 h-4 text-yellow-400",
                              })}
                            </div>
                            <span className="text-yellow-300 font-bold text-xs text-center">
                              {service.title}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="p-2 border-t border-yellow-500/10">
                        <Link
                          to="/services"
                          className="block w-full text-center py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:border-yellow-500/50 rounded-lg font-bold text-xs transition-all duration-200"
                          onClick={handleCloseAllMenus}
                        >
                          View All Services
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Rent Dropdown */}
                <div className="border-b border-yellow-500/10">
                  <button
                    onClick={() => setIsRentMenuOpen(!isRentMenuOpen)}
                    className="flex items-center justify-between w-full px-3 py-3 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">For Tenants</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isRentMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Rent Submenu */}
                  {isRentMenuOpen && (
                    <div className="bg-gray-900/50 border-t border-yellow-500/10">
                      {/* Popular Choices */}
                      <div className="px-4 py-2">
                        <h4 className="text-yellow-300 font-bold mb-1 text-xs">
                          POPULAR
                        </h4>
                        <div className="space-y-1">
                          {popularChoices.slice(0, 3).map((choice, index) => (
                            <button
                              key={index}
                              onClick={() => handleRentPopularClick(choice)}
                              className="w-full text-left px-2 py-1.5 rounded text-xs text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-colors flex items-center"
                            >
                              <Check className="w-3 h-3 mr-1 opacity-70" />
                              {choice}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Property Types */}
                      <div className="px-4 py-2">
                        <h4 className="text-yellow-300 font-bold mb-1 text-xs">
                          PROPERTY TYPES
                        </h4>
                        <div className="space-y-1">
                          {propertyTypes.slice(0, 3).map((type, index) => (
                            <button
                              key={index}
                              onClick={() => handleRentPropertyClick(type)}
                              className="w-full text-left px-2 py-1.5 rounded text-xs text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-colors"
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="px-4 py-2">
                        <h4 className="text-yellow-300 font-bold mb-1 text-xs">
                          BUDGET
                        </h4>
                        <div className="space-y-1">
                          {budgetRanges.slice(0, 3).map((budget, index) => (
                            <button
                              key={index}
                              onClick={() => handleRentBudgetClick(budget)}
                              className="w-full text-left px-2 py-1.5 rounded text-xs text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-colors flex items-center"
                            >
                              <Check className="w-3 h-3 mr-1 opacity-70" />
                              {budget}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* View All Rentals Button */}
                      <div className="p-2 border-t border-yellow-500/10">
                        <button
                          onClick={handleViewAllRentals}
                          className="block w-full text-center py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:border-yellow-500/50 rounded-lg font-bold text-xs transition-all duration-200"
                        >
                          View All Rental Properties
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Owner Dropdown */}
                <div className="border-b border-yellow-500/10">
                  <button
                    onClick={() => setIsOwnerMenuOpen(!isOwnerMenuOpen)}
                    className="flex items-center justify-between w-full px-3 py-3 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4" />
                      <span className="font-medium">For Owner</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOwnerMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Owner Submenu */}
                  {isOwnerMenuOpen && (
                    <div className="bg-gray-900/50 border-t border-yellow-500/10">
                      <div className="px-4 py-3">
                        <h4 className="text-yellow-300 font-bold mb-2 text-xs text-center">
                          OWNER OFFERINGS
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {ownerOfferings.slice(0, 3).map((offering, index) => (
                            <button
                              key={index}
                              onClick={() => handleOwnerOfferingClick(offering)}
                              className="flex flex-col items-center p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-200"
                            >
                              <div className="p-1.5 bg-yellow-500/10 rounded-lg mb-1">
                                {React.cloneElement(offering.icon, {
                                  className: "w-4 h-4 text-yellow-400",
                                })}
                              </div>
                              <span className="text-yellow-300 font-bold text-xs text-center">
                                {offering.title}
                              </span>
                              <span className="text-gray-400 text-[10px] text-center mt-0.5">
                                {offering.description}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* View All Owner Services Button */}
                      <div className="p-2 border-t border-yellow-500/10">
                        <Link
                          to="/for-owner"
                          className="block w-full text-center py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:border-yellow-500/50 rounded-lg font-bold text-xs transition-all duration-200"
                          onClick={handleCloseAllMenus}
                        >
                          View All Owner Services
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Download App Mobile */}
                <div className="border-b border-yellow-500/10">
                  <div className="px-3 py-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Download className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium text-yellow-300">
                        Download App
                      </span>
                    </div>
                    <div className="space-y-2">
                      <a
                        href="https://play.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-900/50 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-200"
                        onClick={handleCloseAllMenus}
                      >
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            G
                          </span>
                        </div>
                        <div>
                          <div className="text-gray-300 text-xs">
                            Google Play
                          </div>
                          <div className="text-yellow-300 text-xs font-bold">
                            Download Now
                          </div>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-900/50 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-200"
                        onClick={handleCloseAllMenus}
                      >
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            A
                          </span>
                        </div>
                        <div>
                          <div className="text-gray-300 text-xs">App Store</div>
                          <div className="text-yellow-300 text-xs font-bold">
                            Download Now
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Authentication Mobile */}
                <div className="px-3 py-3 border-b border-yellow-500/10">
                  {isAuthenticated ? (
                    <>
                      <div className="mb-3">
                        <div className="text-xs text-gray-400">
                          Signed in as
                        </div>
                        <div className="text-yellow-300 font-bold truncate text-sm">
                          {user?.email}
                        </div>
                      </div>

                      <Link
                        to={
                          user?.role === "tenant"
                            ? "/tenant/dashboard"
                            : "/owner/dashboard"
                        }
                        className="flex items-center space-x-2 w-full px-2 py-2 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 mb-2 text-sm"
                        onClick={handleCloseAllMenus}
                      >
                        <User className="w-4 h-4" />
                        <span className="font-medium">Dashboard</span>
                      </Link>

                      <button className="flex items-center space-x-2 w-full px-2 py-2 rounded-lg text-red-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm">
                        <span className="w-4 h-4 text-center">🚪</span>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="block w-full text-center py-2 border border-yellow-500/30 text-yellow-300 hover:border-yellow-500/50 rounded-lg font-bold text-xs transition-all duration-200"
                        onClick={handleCloseAllMenus}
                      >
                        Login
                      </Link>
                      <Link
                        to="/addownerproperty"
                        className="block w-full text-center bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-gray-900 font-bold py-2 rounded-lg transition-all duration-200 text-xs"
                        onClick={handleCloseAllMenus}
                      >
                        Post Property
                      </Link>
                    </div>
                  )}
                </div>

                {/* Services Grid for Mobile */}
                <div className="p-3 border-t border-yellow-500/20">
                  <h3 className="text-yellow-300 font-bold mb-3 text-sm text-center">
                    Our Services
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-2 rounded-lg bg-gray-900/50 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-200"
                      >
                        <div className="p-1.5 bg-yellow-500/10 rounded-lg mb-1">
                          {React.cloneElement(service.icon, {
                            className: "w-3.5 h-3.5 text-yellow-400",
                          })}
                        </div>
                        <span className="text-yellow-300 font-bold text-xs text-center">
                          {service.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
