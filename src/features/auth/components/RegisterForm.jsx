import React, { useState, useEffect } from 'react';
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
  DollarSign,
  Loader2,
  AlertTriangle,
  Check,
  XCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// Axios instance setup
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userType, setUserType] = useState('tenant');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    occupation: '',
    familyMembers: '',
    preferredLocation: '',
    budget: '',
    moveInDate: '',
    propertyType: '',
    totalProperties: '',
    companyName: '',
    address: '',
    adminCode: '',
    department: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const userTypes = [
    {
      id: 'tenant',
      label: 'Tenant',
      icon: User,
    },
    {
      id: 'owner',
      label: 'Property Owner',
      icon: Home,
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: Shield,
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

  useEffect(() => {
    // Clear errors when user type changes
    setError('');
    setValidationErrors({});
  }, [userType]);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = 'Invalid email format';

    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone))
      errors.phone = 'Phone number must be 10 digits';

    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 8)
      errors.password = 'Password must be at least 8 characters';

    if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm password';
    else if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = 'Passwords do not match';

    if (userType === 'tenant') {
      if (!formData.occupation) errors.occupation = 'Occupation is required';
      if (!formData.familyMembers) errors.familyMembers = 'Family members is required';
    }

    if (userType === 'owner') {
      if (!formData.propertyType) errors.propertyType = 'Property type is required';
      if (!formData.companyName.trim()) errors.companyName = 'Company/Individual name is required';
    }

    if (userType === 'admin') {
      if (!formData.adminCode) errors.adminCode = 'Admin code is required';
      if (!formData.department) errors.department = 'Department is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setError('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Prepare data for API
      const apiData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userType: userType,

        ...(userType === 'tenant' && {
          occupation: formData.occupation,
          familyMembers: formData.familyMembers,
          preferredLocation: formData.preferredLocation,
          budget: formData.budget ? parseInt(formData.budget) : 0,
          moveInDate: formData.moveInDate
        }),

        ...(userType === 'owner' && {
          propertyType: formData.propertyType,
          totalProperties: formData.totalProperties,
          companyName: formData.companyName,
          address: formData.address
        }),

        ...(userType === 'admin' && {
          adminCode: formData.adminCode,
          department: formData.department
        })
      };

      console.log('Sending registration data:', apiData);

      // Make API call
      const response = await api.post('/auth/register', apiData);

      console.log('Registration response:', response.data);

      if (response.data.success || response.data.status === 'success') {
        // Set success state
        setSuccess(true);

        // Store token in localStorage
        if (response.data.token || response.data.data?.token) {
          const token = response.data.token || response.data.data.token;
          localStorage.setItem('token', token);

          if (response.data.user || response.data.data?.user) {
            const user = response.data.user || response.data.data.user;
            localStorage.setItem('user', JSON.stringify(user));
          }
        }

        // Store email for auto-fill in login page
        localStorage.setItem('registeredEmail', formData.email);

        // Wait a moment to show loading state, then redirect
        setTimeout(() => {
          navigate('/login', {
            replace: true, // Replace history entry
            state: {
              registeredEmail: formData.email,
              message: 'Registration successful! Please login with your credentials.',
              userType: userType,
              showSuccessToast: true
            }
          });
        }, 100); // Small delay to ensure state updates

      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);

      if (err.response) {
        // Server responded with error
        const errorMessage = err.response.data?.message ||
          err.response.data?.error ||
          'Registration failed';
        setError(errorMessage);

        // Handle validation errors from server
        if (err.response.data?.errors) {
          const serverErrors = {};
          err.response.data.errors.forEach(error => {
            serverErrors[error.field] = error.message;
          });
          setValidationErrors(serverErrors);
        }
      } else if (err.request) {
        // Request was made but no response
        setError('Network error. Please check your connection.');
      } else {
        // Something else happened
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // If success and redirecting, show loading screen
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-green-500/10 rounded-full mb-4">
            <Check className="h-12 w-12 text-green-400 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
          <p className="text-gray-400">Redirecting to login page...</p>
          <div className="mt-6">
            <Loader2 className="h-8 w-8 text-yellow-400 animate-spin mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  const renderCommonFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name *
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className={`h-5 w-5 ${validationErrors.name ? 'text-red-500' : 'text-gray-500 group-focus-within:text-yellow-400'} transition-colors`} />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`pl-10 w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.name ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
            placeholder="Enter your full name"
            required
            disabled={loading}
          />
        </div>
        {validationErrors.name && (
          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {validationErrors.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address *
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className={`h-5 w-5 ${validationErrors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-yellow-400'} transition-colors`} />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`pl-10 w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.email ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
            placeholder="example@email.com"
            required
            disabled={loading}
          />
        </div>
        {validationErrors.email && (
          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {validationErrors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number *
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className={`h-5 w-5 ${validationErrors.phone ? 'text-red-500' : 'text-gray-500 group-focus-within:text-yellow-400'} transition-colors`} />
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`pl-10 w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.phone ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
            placeholder="10-digit mobile number"
            required
            disabled={loading}
          />
        </div>
        {validationErrors.phone && (
          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {validationErrors.phone}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password *
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className={`h-5 w-5 ${validationErrors.password ? 'text-red-500' : 'text-gray-500 group-focus-within:text-yellow-400'} transition-colors`} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`pl-10 pr-10 w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.password ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
              placeholder="Create password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              disabled={loading}
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
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              {validationErrors.password}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password *
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className={`h-5 w-5 ${validationErrors.confirmPassword ? 'text-red-500' : 'text-gray-500 group-focus-within:text-yellow-400'} transition-colors`} />
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
              placeholder="Confirm password"
              required
              disabled={loading}
            />
          </div>
          {validationErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              {validationErrors.confirmPassword}
            </p>
          )}
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
            <Briefcase className={`h-5 w-5 ${validationErrors.occupation ? 'text-red-500' : 'text-gray-500'}`} />
          </div>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className={`pl-10 w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.occupation ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 appearance-none`}
            required
            disabled={loading}
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
        {validationErrors.occupation && (
          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {validationErrors.occupation}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Family Members *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UsersIcon className={`h-5 w-5 ${validationErrors.familyMembers ? 'text-red-500' : 'text-gray-500'}`} />
            </div>
            <select
              name="familyMembers"
              value={formData.familyMembers}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.familyMembers ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 appearance-none`}
              required
              disabled={loading}
            >
              <option value="" className="bg-gray-800">Select</option>
              <option value="1" className="bg-gray-800">1 Person</option>
              <option value="2" className="bg-gray-800">2 Persons</option>
              <option value="3" className="bg-gray-800">3 Persons</option>
              <option value="4" className="bg-gray-800">4 Persons</option>
              <option value="5" className="bg-gray-800">5+ Persons</option>
            </select>
          </div>
          {validationErrors.familyMembers && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              {validationErrors.familyMembers}
            </p>
          )}
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
              disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            <Home className={`h-5 w-5 ${validationErrors.propertyType ? 'text-red-500' : 'text-gray-500'}`} />
          </div>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className={`pl-10 w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.propertyType ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 appearance-none`}
            required
            disabled={loading}
          >
            <option value="" className="bg-gray-800">Select Property Type</option>
            {propertyTypes.map(type => (
              <option key={type} value={type} className="bg-gray-800">{type}</option>
            ))}
          </select>
        </div>
        {validationErrors.propertyType && (
          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {validationErrors.propertyType}
          </p>
        )}
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
          disabled={loading}
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
            <Building className={`h-5 w-5 ${validationErrors.companyName ? 'text-red-500' : 'text-gray-500 group-focus-within:text-yellow-400'} transition-colors`} />
          </div>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`pl-10 w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.companyName ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
            placeholder="Your company or individual name"
            required
            disabled={loading}
          />
        </div>
        {validationErrors.companyName && (
          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {validationErrors.companyName}
          </p>
        )}
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
          disabled={loading}
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
            <Key className={`h-5 w-5 ${validationErrors.adminCode ? 'text-red-500' : 'text-gray-500 group-focus-within:text-yellow-400'} transition-colors`} />
          </div>
          <input
            type="password"
            name="adminCode"
            value={formData.adminCode}
            onChange={handleChange}
            className={`pl-10 w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.adminCode ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
            placeholder="Enter admin access code"
            required
            disabled={loading}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          This code is provided by system administrator
        </p>
        {validationErrors.adminCode && (
          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {validationErrors.adminCode}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Department *
        </label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-800/50 border ${validationErrors.department ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all text-gray-100`}
          required
          disabled={loading}
        >
          <option value="" className="bg-gray-800">Select Department</option>
          <option value="verification" className="bg-gray-800">Property Verification</option>
          <option value="support" className="bg-gray-800">Customer Support</option>
          <option value="management" className="bg-gray-800">System Management</option>
          <option value="finance" className="bg-gray-800">Finance & Payments</option>
          <option value="content" className="bg-gray-800">Content Moderation</option>
        </select>
        {validationErrors.department && (
          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {validationErrors.department}
          </p>
        )}
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
      <div className=" max-w-2xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          </div>
        )}

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
                    disabled={loading}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${isSelected
                      ? `border-yellow-500 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg shadow-yellow-500/20`
                      : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    disabled={loading}
                  />
                  <div>
                    <span className={`text-sm ${loading ? 'text-gray-500' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
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
                    disabled={loading}
                  />
                  <span className={`text-sm ${loading ? 'text-gray-500' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
                    Subscribe to newsletter for latest property updates and offers
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative w-full py-3 md:py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg transition-all duration-300 shadow-lg transform ${!loading ? 'hover:-translate-y-0.5 hover:from-yellow-600 hover:to-yellow-500 hover:shadow-xl' : ''} flex items-center justify-center gap-2 group overflow-hidden ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="relative z-10">Processing...</span>
                    </>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      Create Account
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                  {!loading && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white to-transparent transition-opacity duration-300 animate-wave"></div>
                  )}
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