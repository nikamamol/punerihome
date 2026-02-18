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
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../../store/api/authApi';
import { clearError, clearSuccess, setSuccess } from '../../../store/slices/authSlice';

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux store
  const { error: authError, success: authSuccess, loading: authLoading } = useSelector(
    (state) => state.auth
  );

  // Use RTK Query mutation for registration
  const [registerUser, { isLoading: registerLoading }] = useRegisterMutation();

  const [userType, setUserType] = useState('owner');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

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

  // Combined loading state
  const loading = authLoading || registerLoading;

  useEffect(() => {
    // Clear errors when user type changes
    dispatch(clearError());
    setValidationErrors({});
  }, [userType, dispatch]);

  useEffect(() => {
    // Clear success message after 5 seconds
    if (authSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authSuccess, dispatch]);

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
      return;
    }

    // Clear previous errors and success
    dispatch(clearError());
    dispatch(clearSuccess());

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
          totalProperties: formData.totalProperties || "1",
          companyName: formData.companyName,
          address: formData.address || ""
        }),

        ...(userType === 'admin' && {
          adminCode: formData.adminCode,
          department: formData.department
        })
      };

      console.log('Sending registration data:', apiData);

      // Use RTK Query mutation
      const response = await registerUser(apiData).unwrap();

      console.log('Registration response:', response);

      if (response.success || response.status === 'success') {
        // Set success state in Redux
        dispatch(setSuccess('Registration successful!'));

        // Store email for auto-fill in login page
        localStorage.setItem('registeredEmail', formData.email);

        // Redirect to login page after success
        setTimeout(() => {
          navigate('/login', {
            replace: true,
            state: {
              registeredEmail: formData.email,
              message: 'Registration successful! Please login with your credentials.',
              userType: userType,
              showSuccessToast: true
            }
          });
        }, 100);

      } else {
        // Handle API response error
        throw new Error(response.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);

      // Handle RTK Query error structure
      if (err.data) {
        // Server validation errors
        if (err.data?.errors) {
          const serverErrors = {};
          err.data.errors.forEach(error => {
            serverErrors[error.field] = error.message;
          });
          setValidationErrors(serverErrors);
        }
        // Handle error message from server
        const errorMessage = err.data?.message || err.data?.error || 'Registration failed';
        // Error will be automatically handled by Redux auth slice
      } else if (err.status === 'FETCH_ERROR') {
        // Network error
        setValidationErrors({
          network: 'Network error. Please check your connection.'
        });
      } else {
        // Other errors
        setValidationErrors({
          general: err.message || 'An error occurred. Please try again.'
        });
      }
    }
  };

  // If registration was successful and we're in success state, show loading screen
  if (authSuccess && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-3 bg-green-500/10 rounded-full mb-3">
            <Check className="h-10 w-10 text-green-400 animate-bounce" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Registration Successful!</h2>
          <p className="text-sm text-gray-400">Redirecting to login page...</p>
          <div className="mt-4">
            <Loader2 className="h-6 w-6 text-yellow-400 animate-spin mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  const renderCommonFields = () => (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Full Name *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <User className={`h-4 w-4 ${validationErrors.name ? 'text-red-500' : 'text-gray-500'}`} />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.name ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
            placeholder="Enter your full name"
            required
            disabled={loading}
          />
        </div>
        {validationErrors.name && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {validationErrors.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Email Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Mail className={`h-4 w-4 ${validationErrors.email ? 'text-red-500' : 'text-gray-500'}`} />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.email ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
            placeholder="example@email.com"
            required
            disabled={loading}
          />
        </div>
        {validationErrors.email && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {validationErrors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Phone Number *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Phone className={`h-4 w-4 ${validationErrors.phone ? 'text-red-500' : 'text-gray-500'}`} />
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.phone ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
            placeholder="10-digit mobile number"
            required
            disabled={loading}
          />
        </div>
        {validationErrors.phone && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {validationErrors.phone}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <Lock className={`h-4 w-4 ${validationErrors.password ? 'text-red-500' : 'text-gray-500'}`} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`pl-9 pr-8 w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.password ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
              placeholder="Create password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-2 flex items-center"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-yellow-400 transition-colors" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-yellow-400 transition-colors" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Min 8 characters with letters & numbers
          </p>
          {validationErrors.password && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {validationErrors.password}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Confirm Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <Lock className={`h-4 w-4 ${validationErrors.confirmPassword ? 'text-red-500' : 'text-gray-500'}`} />
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
              placeholder="Confirm password"
              required
              disabled={loading}
            />
          </div>
          {validationErrors.confirmPassword && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderTenantFields = () => (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Occupation *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Briefcase className={`h-4 w-4 ${validationErrors.occupation ? 'text-red-500' : 'text-gray-500'}`} />
          </div>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className={`pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.occupation ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 appearance-none`}
            required
            disabled={loading}
          >
            <option value="" className="bg-gray-800">Select Occupation</option>
            {tenantOccupations.map(occupation => (
              <option key={occupation} value={occupation} className="bg-gray-800">{occupation}</option>
            ))}
          </select>
        </div>
        {validationErrors.occupation && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {validationErrors.occupation}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Family Members *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <UsersIcon className={`h-4 w-4 ${validationErrors.familyMembers ? 'text-red-500' : 'text-gray-500'}`} />
            </div>
            <select
              name="familyMembers"
              value={formData.familyMembers}
              onChange={handleChange}
              className={`pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.familyMembers ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 appearance-none`}
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
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {validationErrors.familyMembers}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Move-in Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="date"
              name="moveInDate"
              value={formData.moveInDate}
              onChange={handleChange}
              className="pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Preferred Location
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <MapPin className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
            className="pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
            placeholder="e.g., Hinjewadi, Wakad"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Monthly Budget (₹)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <DollarSign className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500"
            placeholder="Maximum rent you can pay"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );

  const renderOwnerFields = () => (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Type of Property *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Home className={`h-4 w-4 ${validationErrors.propertyType ? 'text-red-500' : 'text-gray-500'}`} />
          </div>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className={`pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.propertyType ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 appearance-none`}
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
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {validationErrors.propertyType}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Total Properties
        </label>
        <select
          name="totalProperties"
          value={formData.totalProperties}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100"
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
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Company/Individual Name *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Building className={`h-4 w-4 ${validationErrors.companyName ? 'text-red-500' : 'text-gray-500'}`} />
          </div>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.companyName ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
            placeholder="Your company or individual name"
            required
            disabled={loading}
          />
        </div>
        {validationErrors.companyName && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {validationErrors.companyName}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Business Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="2"
          className="w-full px-3 py-2 text-sm bg-gray-800/50 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500 resize-none"
          placeholder="Your business address (optional)"
          disabled={loading}
        />
      </div>
    </div>
  );

  const renderAdminFields = () => (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500/20 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <div className="p-1.5 bg-yellow-500/10 rounded-lg">
            <Crown className="h-4 w-4 text-yellow-400" />
          </div>
          <div>
            <h4 className="font-semibold text-yellow-300 text-xs">Admin Registration</h4>
            <p className="text-gray-400 text-xs mt-0.5">
              Requires special authorization. Contact system administrator for access code.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Admin Access Code *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Key className={`h-4 w-4 ${validationErrors.adminCode ? 'text-red-500' : 'text-gray-500'}`} />
          </div>
          <input
            type="password"
            name="adminCode"
            value={formData.adminCode}
            onChange={handleChange}
            className={`pl-9 w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.adminCode ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100 placeholder-gray-500`}
            placeholder="Enter admin access code"
            required
            disabled={loading}
          />
        </div>
        {validationErrors.adminCode && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {validationErrors.adminCode}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Department *
        </label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={`w-full px-3 py-2 text-sm bg-gray-800/50 border ${validationErrors.department ? 'border-red-500' : 'border-gray-700 focus:border-yellow-500'} rounded-lg focus:ring-1 focus:ring-yellow-500/30 outline-none transition-all text-gray-100`}
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
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {validationErrors.department}
          </p>
        )}
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-200">
            <span className="font-semibold">Note:</span> Admin accounts have full system access.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black py-6 px-4">
      <div className="max-w-xl mx-auto">
        {/* Error Message from Redux */}
        {authError && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-300">{authError}</p>
            </div>
          </div>
        )}

        {/* Success Message from Redux */}
        {authSuccess && (
          <div className="mb-4 bg-green-500/10 border border-green-500/30 rounded-lg p-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
              <p className="text-xs text-green-300">{authSuccess}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            Create Your Account
          </h1>
          <p className="text-xs text-gray-400">
            Join our exclusive community of property seekers and owners
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50">
          {/* User Type Selection */}
          <div className="p-4 border-b border-gray-700/50">
            <h2 className="text-sm font-semibold text-white mb-3">
              Select Your Role:
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {userTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = userType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    disabled={loading}
                    className={`p-2 rounded-lg border transition-all ${isSelected
                      ? `border-yellow-500 bg-gradient-to-br from-gray-800 to-gray-900`
                      : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className={`p-1.5 rounded-full ${isSelected ? 'bg-yellow-500/20' : 'bg-gray-800'}`}>
                        <Icon className={`h-4 w-4 ${isSelected ? 'text-yellow-400' : 'text-gray-400'}`} />
                      </div>
                      <span className={`text-xs ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                        {type.label}
                      </span>
                      {isSelected && (
                        <CheckCircle className="h-3 w-3 text-yellow-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common Fields Section */}
              <div>
                <div className="flex items-center gap-1 mb-3">
                  <div className="p-1.5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700">
                    <UserPlus className="h-3.5 w-3.5 text-yellow-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    Basic Information
                  </h3>
                </div>
                {renderCommonFields()}
              </div>

              {/* Role Specific Fields */}
              <div>
                <div className="flex items-center gap-1 mb-3">
                  <div className="p-1.5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700">
                    {userType === 'tenant' && <User className="h-3.5 w-3.5 text-yellow-400" />}
                    {userType === 'owner' && <Home className="h-3.5 w-3.5 text-yellow-400" />}
                    {userType === 'admin' && <Shield className="h-3.5 w-3.5 text-yellow-400" />}
                  </div>
                  <h3 className="text-sm font-semibold text-white">
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
              <div className="space-y-3">
                <label className="flex items-start gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 text-yellow-500 focus:ring-yellow-500/50 focus:ring-offset-gray-900 border-gray-600 rounded bg-gray-800 cursor-pointer group-hover:border-yellow-400 transition-colors"
                    required
                    disabled={loading}
                  />
                  <div>
                    <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                      I agree to the{' '}
                      <a href="/terms" className="text-yellow-400 hover:text-yellow-300 font-medium underline underline-offset-2">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-yellow-400 hover:text-yellow-300 font-medium underline underline-offset-2">
                        Privacy Policy
                      </a>
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 text-yellow-500 focus:ring-yellow-500/50 focus:ring-offset-gray-900 border-gray-600 rounded bg-gray-800 cursor-pointer group-hover:border-yellow-400 transition-colors"
                    disabled={loading}
                  />
                  <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                    Subscribe to newsletter for latest property updates
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative w-full py-2.5 px-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-semibold text-sm rounded-lg transition-all duration-300 shadow-lg transform ${!loading ? 'hover:-translate-y-0.5 hover:from-yellow-600 hover:to-yellow-500 hover:shadow-xl' : ''} flex items-center justify-center gap-2 group overflow-hidden ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  Already have an account?{' '}
                  <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-2">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Bottom Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/50 px-4 py-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <div className="p-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700">
                  <Shield className="h-3 w-3 text-yellow-400" />
                </div>
                <span className="text-xs text-gray-400">
                  256-bit encryption
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-2.5 w-2.5 text-yellow-400" />
                  Verified
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-2.5 w-2.5 text-yellow-400" />
                  Secure
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info - Simplified */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-2 border border-gray-700/30">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-yellow-400" />
              <span className="text-xs text-white">Secure</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-2 border border-gray-700/30">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-3 w-3 text-yellow-400" />
              <span className="text-xs text-white">Verified</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-2 border border-gray-700/30">
            <div className="flex items-center gap-1.5">
              <User className="h-3 w-3 text-yellow-400" />
              <span className="text-xs text-white">Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;