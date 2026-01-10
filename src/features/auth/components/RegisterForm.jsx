import React, { useState } from 'react';
import {
  User,
  Home,
  Shield,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Building,
  MapPin,
  Calendar,
  UserPlus,
  ArrowRight,
  Crown,
  Key,
  Briefcase,
  Users as UsersIcon,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [userType, setUserType] = useState('tenant'); // 'tenant', 'owner', 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Tenant specific
    occupation: '',
    familyMembers: '',
    preferredLocation: '',
    budget: '',
    moveInDate: '',
    
    // Owner specific
    propertyType: '',
    totalProperties: '',
    companyName: '',
    address: '',
    
    // Admin specific
    adminCode: '',
    department: '',
  });

  const userTypes = [
    { 
      id: 'tenant', 
      label: 'Tenant', 
      icon: User, 
      color: 'bg-gradient-to-br from-gray-800 to-gray-900',
      borderColor: 'border-gray-700',
      iconColor: 'text-yellow-400'
    },
    { 
      id: 'owner', 
      label: 'Property Owner', 
      icon: Home, 
      color: 'bg-gradient-to-br from-gray-800 to-gray-900',
      borderColor: 'border-gray-700',
      iconColor: 'text-yellow-400'
    },
    { 
      id: 'admin', 
      label: 'Admin', 
      icon: Shield, 
      color: 'bg-gradient-to-br from-gray-800 to-gray-900',
      borderColor: 'border-gray-700',
      iconColor: 'text-yellow-400'
    },
  ];

  const tenantOccupations = [
    'Student', 'Working Professional', 'Business Owner', 
    'Government Employee', 'Private Employee', 'Other'
  ];

  const propertyTypes = [
    'Apartment', 'Independent House', 'Villa', 
    'PG/Hostel', 'Commercial Space', 'Plot'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', { userType, ...formData });
    // Add your API call here
    alert('Registration successful!');
  };

  const renderCommonFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name *
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address *
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
            placeholder="example@email.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number *
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
            placeholder="10-digit mobile number"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password *
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
              placeholder="Create password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-yellow-400 transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-yellow-400 transition-colors" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Minimum 8 characters with letters and numbers
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password *
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
              placeholder="Confirm password"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTenantFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Occupation *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Briefcase className="h-5 w-5 text-gray-500" />
          </div>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 appearance-none"
            required
          >
            <option value="" className="bg-gray-800">Select Occupation</option>
            {tenantOccupations.map(occupation => (
              <option key={occupation} value={occupation} className="bg-gray-800">{occupation}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Family Members *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UsersIcon className="h-5 w-5 text-gray-500" />
            </div>
            <select
              name="familyMembers"
              value={formData.familyMembers}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 appearance-none"
              required
            >
              <option value="" className="bg-gray-800">Select</option>
              <option value="1" className="bg-gray-800">1 Person</option>
              <option value="2" className="bg-gray-800">2 Persons</option>
              <option value="3" className="bg-gray-800">3 Persons</option>
              <option value="4" className="bg-gray-800">4 Persons</option>
              <option value="5" className="bg-gray-800">5+ Persons</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Move-in Date
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
            </div>
            <input
              type="date"
              name="moveInDate"
              value={formData.moveInDate}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Preferred Location
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
          </div>
          <input
            type="text"
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
            className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
            placeholder="e.g., Hinjewadi, Wakad, Kothrud"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Monthly Budget (₹)
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
          </div>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
            placeholder="Maximum rent you can pay"
          />
        </div>
      </div>
    </div>
  );

  const renderOwnerFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Type of Property *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Home className="h-5 w-5 text-gray-500" />
          </div>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 appearance-none"
            required
          >
            <option value="" className="bg-gray-800">Select Property Type</option>
            {propertyTypes.map(type => (
              <option key={type} value={type} className="bg-gray-800">{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Total Properties
        </label>
        <select
          name="totalProperties"
          value={formData.totalProperties}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100"
        >
          <option value="" className="bg-gray-800">Select</option>
          <option value="1" className="bg-gray-800">1 Property</option>
          <option value="2-5" className="bg-gray-800">2-5 Properties</option>
          <option value="6-10" className="bg-gray-800">6-10 Properties</option>
          <option value="10+" className="bg-gray-800">10+ Properties</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Company/Individual Name *
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
          </div>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
            placeholder="Your company or individual name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Business Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="2"
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500 resize-none"
          placeholder="Your business address (optional)"
        />
      </div>
    </div>
  );

  const renderAdminFields = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Crown className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h4 className="font-semibold text-yellow-300 text-sm">Admin Registration</h4>
            <p className="text-gray-400 text-xs mt-1">
              Admin registration requires special authorization and verification.
              Please contact system administrator for admin access code.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Admin Access Code *
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Key className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400 transition-colors" />
          </div>
          <input
            type="password"
            name="adminCode"
            value={formData.adminCode}
            onChange={handleChange}
            className="pl-10 w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
            placeholder="Enter admin access code"
            required
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          This code is provided by system administrator
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Department *
        </label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100"
          required
        >
          <option value="" className="bg-gray-800">Select Department</option>
          <option value="verification" className="bg-gray-800">Property Verification</option>
          <option value="support" className="bg-gray-800">Customer Support</option>
          <option value="management" className="bg-gray-800">System Management</option>
          <option value="finance" className="bg-gray-800">Finance & Payments</option>
          <option value="content" className="bg-gray-800">Content Moderation</option>
        </select>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-200">
            <span className="font-semibold">Note:</span> Admin accounts have full access to system data,
            user management, and configuration settings. Use with responsibility.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
   
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-glow">
            Create Your Account
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Join our exclusive community of property seekers and owners
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* User Type Selection */}
          <div className="p-6 md:p-8 border-b border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4 md:mb-6">
              Select Your Role:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {userTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = userType === type.id;
                
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${isSelected
                        ? `border-yellow-500 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-yellow-500/20`
                        : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`p-3 rounded-full transition-all duration-300 ${isSelected
                          ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-400/10'
                          : 'bg-gray-800'
                        }`}>
                        <Icon className={`h-6 w-6 ${isSelected ? 'text-yellow-400' : 'text-gray-400'}`} />
                      </div>
                      <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                        {type.label}
                      </span>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-yellow-400 animate-pulse" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Common Fields Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700">
                    <UserPlus className="h-5 w-5 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Basic Information
                  </h3>
                </div>
                {renderCommonFields()}
              </div>

              {/* Role Specific Fields */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700">
                    {userType === 'tenant' && <User className="h-5 w-5 text-yellow-400" />}
                    {userType === 'owner' && <Home className="h-5 w-5 text-yellow-400" />}
                    {userType === 'admin' && <Shield className="h-5 w-5 text-yellow-400" />}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {userType === 'tenant' && 'Tenant Details'}
                    {userType === 'owner' && 'Owner Details'}
                    {userType === 'admin' && 'Admin Details'}
                  </h3>
                </div>

                {userType === 'tenant' && renderTenantFields()}
                {userType === 'owner' && renderOwnerFields()}
                {userType === 'admin' && renderAdminFields()}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 text-yellow-500 focus:ring-yellow-500/50 focus:ring-offset-gray-900 border-gray-600 rounded bg-gray-800 cursor-pointer group-hover:border-yellow-400 transition-colors"
                    required
                  />
                  <div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      I agree to the{' '}
                      <a href="/terms" className="text-yellow-400 hover:text-yellow-300 font-medium underline underline-offset-2">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-yellow-400 hover:text-yellow-300 font-medium underline underline-offset-2">
                        Privacy Policy
                      </a>
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      By creating an account, you agree to receive important updates and notifications
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 text-yellow-500 focus:ring-yellow-500/50 focus:ring-offset-gray-900 border-gray-600 rounded bg-gray-800 cursor-pointer group-hover:border-yellow-400 transition-colors"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    Subscribe to newsletter for latest property updates and offers
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="relative w-full py-3 md:py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Create Account
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white to-transparent transition-opacity duration-300 animate-wave"></div>
                </button>
                
                <p className="text-center text-sm text-gray-400 mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-2">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Bottom Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/50 px-6 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700">
                  <Shield className="h-4 w-4 text-yellow-400" />
                </div>
                <span className="text-xs text-gray-400">
                  Your data is secured with 256-bit encryption
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-yellow-400" />
                  Verified Users
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-yellow-400" />
                  Safe & Secure
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Shield className="h-5 w-5 text-yellow-400" />
              </div>
              <h4 className="font-semibold text-white text-sm">Secure Platform</h4>
            </div>
            <p className="text-xs text-gray-400">
              Enterprise-grade security for all your transactions and data
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <h4 className="font-semibold text-white text-sm">Verified Users</h4>
            </div>
            <p className="text-xs text-gray-400">
              All users undergo thorough verification process
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <User className="h-5 w-5 text-yellow-400" />
              </div>
              <h4 className="font-semibold text-white text-sm">24/7 Support</h4>
            </div>
            <p className="text-xs text-gray-400">
              Round-the-clock customer support for all your queries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;