import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import {
  Menu, X, User, Search, Bell, Home, Building2,
  CreditCard, Info, ChevronDown, Check, ChevronRight
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isRentMenuOpen, setIsRentMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  // Property types for Rent dropdown
  const propertyTypes = [
    "Flat for rent in Pune",
    "House for rent in Pune",
    "Villa for rent in Pune",
    "PG in Pune",
    "Office Space in Pune",
    "Commercial Space in Pune",
    "Coworking Space in Pune",
    "Coliving Space in Pune",
    "Student Hostels in Pune",
    "Luxury PG in Pune"
  ];

  // Budget ranges for Rent dropdown
  const budgetRanges = [
    "Under ₹ 10,000",
    "₹ 10,000 - ₹ 15,000",
    "₹ 15,000 - ₹ 25,000",
    "Above ₹ 25,000"
  ];

  // Popular choices for Rent dropdown
  const popularChoices = [
    "Owner Properties",
    "Verified Properties",
    "Furnished Homes",
    "Bachelor Friendly Homes",
    "Immediately Available"
  ];

  const handleRentPropertyClick = (propertyType) => {
    setIsRentMenuOpen(false);
    setIsMenuOpen(false);
    navigate(`/properties?type=${encodeURIComponent(propertyType)}`);
  };

  const handleRentBudgetClick = (budget) => {
    setIsRentMenuOpen(false);
    setIsMenuOpen(false);
    navigate(`/properties?budget=${encodeURIComponent(budget)}`);
  };

  const handleRentPopularClick = (choice) => {
    setIsRentMenuOpen(false);
    setIsMenuOpen(false);
    navigate(`/properties?filter=${encodeURIComponent(choice.toLowerCase())}`);
  };

  const handleCloseAllMenus = () => {
    setIsMenuOpen(false);
    setIsRentMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800 border-b border-yellow-500/20 shadow-lg shadow-black/30">
      {/* Golden Top Border */}
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo - Mobile Optimized */}
          <Link to="/" className="flex items-center space-x-2 lg:space-x-3 group" onClick={handleCloseAllMenus}>
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20 group-hover:shadow-yellow-500/40 transition-shadow duration-300">
                <span className="text-xl lg:text-2xl font-black text-gray-900">19T</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
            </div>
            <div className="text-left">
              <h1 className="text-lg lg:text-2xl font-black leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">
                  Puneri
                </span>
                <span className="block text-xs lg:text-sm font-light text-gray-400 mt-0.5">
                  HOME'S
                </span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 font-medium transition-all duration-200 group"
            >
              <Home className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
              <span>Home</span>
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>

            {/* Rent Dropdown Menu - Desktop */}
            <div className="relative group"
              onMouseEnter={() => setIsRentMenuOpen(true)}
              onMouseLeave={() => setIsRentMenuOpen(false)}
            >
              <button
                onClick={() => setIsRentMenuOpen(!isRentMenuOpen)}
                className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 font-medium transition-all duration-200 group"
              >
                <Building2 className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
                <span>Rent</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isRentMenuOpen ? 'rotate-180' : ''}`} />
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>

              {/* Desktop Dropdown Container */}
              {isRentMenuOpen && (
                <div className="absolute left-0 top-full mt-0 w-[700px] bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-500/30 rounded-b-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                  <div className="grid grid-cols-4 gap-0">
                    {/* Popular Choices Column */}
                    <div className="p-4 border-r border-yellow-500/20">
                      <h3 className="text-yellow-300 font-bold mb-3 text-sm uppercase tracking-wider">Popular</h3>
                      <ul className="space-y-1">
                        {popularChoices.map((choice, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleRentPopularClick(choice)}
                              className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 group"
                            >
                              <Check className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span className="text-sm">{choice}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Property Types Column */}
                    <div className="p-4 border-r border-yellow-500/20">
                      <h3 className="text-yellow-300 font-bold mb-3 text-sm uppercase tracking-wider">Property Types</h3>
                      <ul className="space-y-1">
                        {propertyTypes.slice(0, 6).map((type, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleRentPropertyClick(type)}
                              className="w-full text-left flex items-center justify-between px-3 py-2 rounded text-sm text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 group"
                            >
                              <span className="text-sm truncate">{type}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Budget Column */}
                    <div className="p-4 border-r border-yellow-500/20">
                      <h3 className="text-yellow-300 font-bold mb-3 text-sm uppercase tracking-wider">Budget</h3>
                      <ul className="space-y-1">
                        {budgetRanges.map((budget, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleRentBudgetClick(budget)}
                              className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 group"
                            >
                              <Check className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span className="text-sm">{budget}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* More Options Column */}
                    <div className="p-4">
                      <h3 className="text-yellow-300 font-bold mb-3 text-sm uppercase tracking-wider">More</h3>
                      <ul className="space-y-1">
                        {[
                          "Localities",
                          "Buy Vs Rent",
                          "Find an Agent",
                          "Share Requirement",
                          "Property Services",
                          "Rent Agreement"
                        ].slice(0, 5).map((service, index) => (
                          <li key={index}>
                            <button
                              onClick={() => {
                                setIsRentMenuOpen(false);
                                navigate(`/services/${encodeURIComponent(service.toLowerCase().replace(/ /g, '-'))}`);
                              }}
                              className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 group"
                            >
                              <Check className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span className="text-sm">{service}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-yellow-500/20 p-3">
                    <div className="flex items-center justify-center">
                      <Link
                        to="/properties/rent"
                        className="text-yellow-300 hover:text-yellow-400 font-bold text-sm transition-colors duration-200 flex items-center space-x-1"
                        onClick={() => setIsRentMenuOpen(false)}
                      >
                        <span>View All Rental Properties</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/how-it-works"
              className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 font-medium transition-all duration-200 group"
            >
              <Info className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
              <span>How It Works</span>
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>

            <Link
              to="/pricing"
              className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 font-medium transition-all duration-200 group"
            >
              <CreditCard className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
              <span>Pricing</span>
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="relative ml-4">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-lg blur-sm opacity-20"></div>
              <div className="relative bg-gray-800 border border-yellow-500/30 rounded-lg overflow-hidden">
                <div className="flex items-center">
                  <Search className="w-5 h-5 text-gray-400 ml-3" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="bg-transparent text-white placeholder-gray-400 px-3 py-2.5 w-56 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Authentication - Desktop */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-4">
                <button className="p-2.5 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 rounded-lg transition-all duration-200 relative">
                  <Bell className="w-5 h-5" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </button>

                <div className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 hover:border-yellow-500/50 text-gray-300 hover:text-yellow-300 rounded-lg transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{user?.name?.split(' ')[0] || 'User'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-1 w-56 bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-500/30 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                      <div className="p-4 border-b border-yellow-500/20">
                        <div className="text-sm font-medium text-gray-300">Signed in as</div>
                        <div className="text-yellow-300 font-bold truncate">{user?.email}</div>
                      </div>

                      <div className="p-2">
                        <Link
                          to={user?.role === 'tenant' ? '/tenant/dashboard' : '/owner/dashboard'}
                          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>

                        <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-red-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-2 border-t border-yellow-500/20 pt-2">
                          <span className="w-4 h-4 text-center">🚪</span>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-gray-300 hover:text-yellow-300 font-medium transition-all duration-200 hover:bg-gray-800/50 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Navigation - Simplified */}
          <div className="flex items-center lg:hidden space-x-2">
            {/* Mobile Search Icon */}
            <button className="p-2 text-gray-300 hover:text-yellow-300">
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Auth Button */}
            {isAuthenticated ? (
              <button className="p-2 text-gray-300 hover:text-yellow-300 relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm border border-yellow-500/30 text-yellow-300 hover:border-yellow-500/50 rounded-lg font-medium transition-all duration-200"
                onClick={handleCloseAllMenus}
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="p-2 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Fixed for small screens */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 z-40 bg-gradient-to-b from-gray-900 to-gray-800">
            {/* Scrollable Menu Content */}
            <div className="h-[calc(100vh-80px)] overflow-y-auto">
              {/* Mobile Search Bar */}
              <div className="p-4 border-b border-yellow-500/20">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-lg blur-sm opacity-20"></div>
                  <div className="relative bg-gray-800 border border-yellow-500/30 rounded-lg overflow-hidden">
                    <div className="flex items-center">
                      <Search className="w-5 h-5 text-gray-400 ml-3" />
                      <input
                        type="text"
                        placeholder="Search properties..."
                        className="bg-transparent text-white placeholder-gray-400 px-3 py-3 w-full focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Links */}
              <div className="space-y-0">
                <Link
                  to="/"
                  className="flex items-center space-x-3 px-4 py-4 border-b border-yellow-500/10 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200"
                  onClick={handleCloseAllMenus}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Home</span>
                </Link>

                {/* Mobile Rent Dropdown */}
                <div className="border-b border-yellow-500/10">
                  <button
                    onClick={() => setIsRentMenuOpen(!isRentMenuOpen)}
                    className="flex items-center justify-between w-full px-4 py-4 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5" />
                      <span className="font-medium">Rent Properties</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isRentMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mobile Rent Submenu */}
                  {isRentMenuOpen && (
                    <div className="bg-gray-900/50 border-t border-yellow-500/10">
                      {/* Popular Choices */}
                      <div className="px-4 py-3">
                        <h4 className="text-yellow-300 font-bold mb-2 text-sm">Popular Choices</h4>
                        <div className="space-y-2">
                          {popularChoices.slice(0, 3).map((choice, index) => (
                            <button
                              key={index}
                              onClick={() => handleRentPopularClick(choice)}
                              className="w-full text-left px-3 py-2 rounded text-sm text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-colors"
                            >
                              {choice}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Property Types */}
                      <div className="px-4 py-3 border-t border-yellow-500/10">
                        <h4 className="text-yellow-300 font-bold mb-2 text-sm">Property Types</h4>
                        <div className="space-y-2">
                          {propertyTypes.slice(0, 3).map((type, index) => (
                            <button
                              key={index}
                              onClick={() => handleRentPropertyClick(type)}
                              className="w-full text-left px-3 py-2 rounded text-sm text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-colors"
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="px-4 py-3 border-t border-yellow-500/10">
                        <h4 className="text-yellow-300 font-bold mb-2 text-sm">Budget Range</h4>
                        <div className="space-y-2">
                          {budgetRanges.map((budget, index) => (
                            <button
                              key={index}
                              onClick={() => handleRentBudgetClick(budget)}
                              className="w-full text-left px-3 py-2 rounded text-sm text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-colors"
                            >
                              {budget}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* View All Rentals Button */}
                      <div className="p-4 border-t border-yellow-500/10">
                        <Link
                          to="/properties/rent"
                          className="block w-full text-center py-3 bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:border-yellow-500/50 rounded-lg font-bold transition-all duration-200"
                          onClick={handleCloseAllMenus}
                        >
                          View All Rentals
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to="/how-it-works"
                  className="flex items-center space-x-3 px-4 py-4 border-b border-yellow-500/10 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200"
                  onClick={handleCloseAllMenus}
                >
                  <Info className="w-5 h-5" />
                  <span className="font-medium">How It Works</span>
                </Link>

                <Link
                  to="/pricing"
                  className="flex items-center space-x-3 px-4 py-4 border-b border-yellow-500/10 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200"
                  onClick={handleCloseAllMenus}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Pricing</span>
                </Link>

                {/* Authentication Mobile */}
                <div className="px-4 py-4 border-b border-yellow-500/10">
                  {isAuthenticated ? (
                    <>
                      <div className="mb-4">
                        <div className="text-xs text-gray-400">Signed in as</div>
                        <div className="text-yellow-300 font-bold truncate">{user?.email}</div>
                      </div>

                      <Link
                        to={user?.role === 'tenant' ? '/tenant/dashboard' : '/owner/dashboard'}
                        className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 transition-all duration-200 mb-2"
                        onClick={handleCloseAllMenus}
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                      </Link>

                      <button className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-red-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
                        <span className="w-5 h-5 text-center">🚪</span>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/login"
                        className="block w-full text-center py-3 border border-yellow-500/30 text-yellow-300 hover:border-yellow-500/50 rounded-lg font-bold transition-all duration-200"
                        onClick={handleCloseAllMenus}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block w-full text-center bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-all duration-200 shadow-lg"
                        onClick={handleCloseAllMenus}
                      >
                        Sign Up Free
                      </Link>
                    </div>
                  )}
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