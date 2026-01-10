import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Camera,
  Shield,
  CheckCircle,
  XCircle,
  Save,
  X,
  Eye,
  EyeOff,
  Smartphone,
  CreditCard,
  Unlock,
  Bookmark,
  Heart,
  Star,
  TrendingUp,
  TrendingDown,
  Download,
  Share2,
  Bell,
  Lock,
  Globe,
  Home,
  Building,
  Users,
  DollarSign,
  AlertCircle,
} from "lucide-react";

function TenantProfile() {
  // Tenant profile data
  const [tenantData, setTenantData] = useState({
    name: "Rohan Mehta",
    email: "rohan.mehta@email.com",
    phone: "+91 9876543210",
    alternatePhone: "+91 9876543211",
    joinDate: "2024-01-15",
    lastLogin: "2024-02-22 14:30",
    status: "active",
    verification: "verified",

    personalInfo: {
      dateOfBirth: "1992-08-15",
      occupation: "Software Engineer",
      company: "TechCorp Solutions",
      annualIncome: "₹12,00,000",
      maritalStatus: "Single",
      familyMembers: 1,
    },

    preferences: {
      location: ["Koregaon Park", "Hinjewadi", "Kalyani Nagar"],
      budget: {
        min: 20000,
        max: 40000,
      },
      propertyType: ["Apartment", "Flat"],
      bhk: ["2 BHK", "3 BHK"],
      furnished: "Semi-Furnished",
      moveInDate: "2024-04-01",
      parkingRequired: true,
      petsAllowed: true,
    },

    documents: [
      { id: 1, name: "Aadhar Card", status: "verified", uploadDate: "2024-01-15" },
      { id: 2, name: "PAN Card", status: "verified", uploadDate: "2024-01-15" },
      { id: 3, name: "Salary Slip", status: "pending", uploadDate: "2024-02-10" },
      { id: 4, name: "Bank Statement", status: "pending", uploadDate: "2024-02-10" },
    ],

    activityStats: {
      totalPropertiesViewed: 24,
      totalPropertiesSaved: 12,
      totalPropertiesLiked: 8,
      totalContactsUnlocked: 3,
      totalCreditsUsed: 5,
      totalSpent: 447,
      avgTimeOnSite: "15 mins",
      responseRate: "85%",
    },

    creditInfo: {
      currentBalance: 5,
      totalPurchased: 8,
      totalUsed: 3,
      lastPurchaseDate: "2024-02-18",
      lastPurchaseAmount: 149,
    },

    accountSettings: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: false,
      twoFactorAuth: false,
      privacyMode: false,
      autoSaveProperties: true,
      language: "English",
      timezone: "IST (UTC+5:30)",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...tenantData });
  const [activeTab, setActiveTab] = useState("personal");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditForm({
        ...editForm,
        [parent]: {
          ...editForm[parent],
          [child]: value,
        },
      });
    } else {
      setEditForm({
        ...editForm,
        [field]: value,
      });
    }
  };

  const handleSaveProfile = () => {
    setTenantData(editForm);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditForm({ ...tenantData });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // Here you would typically make an API call
    alert("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowChangePassword(false);
  };

  const handleUploadDocument = () => {
    alert("Document upload functionality would go here");
  };

  const formatCurrency = (amount) => {
    if (amount >= 100000) return "₹" + (amount / 100000).toFixed(1) + "L";
    if (amount >= 1000) return "₹" + (amount / 1000).toFixed(0) + "K";
    return "₹" + amount;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === "verified" ? "bg-green-100 text-green-800" :
          status === "pending" ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
        }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your personal information and preferences
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Edit Profile
                </button>
                <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  Export Data
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center relative">
              <User className="w-12 h-12 text-blue-600" />
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="mt-3 text-center">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${tenantData.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                {tenantData.status.charAt(0).toUpperCase() + tenantData.status.slice(1)}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    tenantData.name
                  )}
                </h2>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      tenantData.email
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      tenantData.phone
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Joined: {formatDate(tenantData.joinDate)}
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Account Verification</span>
                {getStatusBadge(tenantData.verification)}
              </div>
              <p className="text-xs text-gray-600">
                Last login: {tenantData.lastLogin}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{tenantData.activityStats.totalPropertiesSaved}</div>
              <div className="text-xs text-gray-600">Saved</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{tenantData.activityStats.totalPropertiesLiked}</div>
              <div className="text-xs text-gray-600">Liked</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{tenantData.creditInfo.currentBalance}</div>
              <div className="text-xs text-gray-600">Credits</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{tenantData.activityStats.totalContactsUnlocked}</div>
              <div className="text-xs text-gray-600">Contacts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
   <div className="border-b border-gray-200">
  {/* Desktop Tabs */}
  <nav className="hidden md:flex space-x-4 px-4" aria-label="Tabs">
    {["personal", "preferences", "documents", "activity", "settings", "security"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`py-3 px-1 text-sm font-medium border-b-2 ${
          activeTab === tab
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </nav>

  {/* Mobile Dropdown */}
  <div className="md:hidden p-4">
    <div className="relative">
      <select
        value={activeTab}
        onChange={(e) => setActiveTab(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        {["personal", "preferences", "documents", "activity", "settings", "security"].map((tab) => (
          <option key={tab} value={tab}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    
    {/* Mobile Active Tab Indicator */}
    <div className="mt-3 flex items-center justify-between text-sm">
      <div className="text-blue-600 font-medium">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </div>
      <div className="text-gray-500">
        {["personal", "preferences", "documents", "activity", "settings", "security"].findIndex(tab => tab === activeTab) + 1} of 6
      </div>
    </div>
  </div>
</div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg">{tenantData.name}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg flex items-center justify-between">
                        <span>{tenantData.email}</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg flex items-center justify-between">
                        <span>{tenantData.phone}</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.alternatePhone}
                        onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg">
                        {tenantData.alternatePhone || "Not provided"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editForm.personalInfo.dateOfBirth}
                        onChange={(e) => handleInputChange("personalInfo.dateOfBirth", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg">
                        {formatDate(tenantData.personalInfo.dateOfBirth)}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.personalInfo.occupation}
                        onChange={(e) => handleInputChange("personalInfo.occupation", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg">
                        {tenantData.personalInfo.occupation}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.personalInfo.company}
                        onChange={(e) => handleInputChange("personalInfo.company", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg">
                        {tenantData.personalInfo.company}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.personalInfo.annualIncome}
                        onChange={(e) => handleInputChange("personalInfo.annualIncome", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg">
                        {tenantData.personalInfo.annualIncome}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                  {isEditing ? (
                    <select
                      value={editForm.personalInfo.maritalStatus}
                      onChange={(e) => handleInputChange("personalInfo.maritalStatus", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                      {tenantData.personalInfo.maritalStatus}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Family Members</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.personalInfo.familyMembers}
                      onChange={(e) => handleInputChange("personalInfo.familyMembers", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                      {tenantData.personalInfo.familyMembers}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">Property Preferences</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Locations</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {editForm.preferences.location.map((loc, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={loc}
                              onChange={(e) => {
                                const newLocations = [...editForm.preferences.location];
                                newLocations[index] = e.target.value;
                                handleInputChange("preferences.location", newLocations);
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {editForm.preferences.location.length > 1 && (
                              <button
                                onClick={() => {
                                  const newLocations = editForm.preferences.location.filter((_, i) => i !== index);
                                  handleInputChange("preferences.location", newLocations);
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newLocations = [...editForm.preferences.location, ""];
                            handleInputChange("preferences.location", newLocations);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          + Add another location
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {tenantData.preferences.location.map((loc, index) => (
                          <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded-full">
                            {loc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Min (₹)</label>
                          <input
                            type="number"
                            value={editForm.preferences.budget.min}
                            onChange={(e) => handleInputChange("preferences.budget.min", parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Max (₹)</label>
                          <input
                            type="number"
                            value={editForm.preferences.budget.max}
                            onChange={(e) => handleInputChange("preferences.budget.max", parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg">
                        ₹{tenantData.preferences.budget.min.toLocaleString()} - ₹{tenantData.preferences.budget.max.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {["Apartment", "Flat", "Villa", "Studio", "House"].map((type) => (
                          <label key={type} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={editForm.preferences.propertyType.includes(type)}
                              onChange={(e) => {
                                const newTypes = e.target.checked
                                  ? [...editForm.preferences.propertyType, type]
                                  : editForm.preferences.propertyType.filter(t => t !== type);
                                handleInputChange("preferences.propertyType", newTypes);
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {tenantData.preferences.propertyType.map((type, index) => (
                          <span key={index} className="px-3 py-1.5 bg-green-100 text-green-700 text-sm rounded-full">
                            {type}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">BHK Preference</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        {["1 BHK", "2 BHK", "3 BHK", "4 BHK"].map((bhk) => (
                          <label key={bhk} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={editForm.preferences.bhk.includes(bhk)}
                              onChange={(e) => {
                                const newBHK = e.target.checked
                                  ? [...editForm.preferences.bhk, bhk]
                                  : editForm.preferences.bhk.filter(b => b !== bhk);
                                handleInputChange("preferences.bhk", newBHK);
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{bhk}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {tenantData.preferences.bhk.map((bhk, index) => (
                          <span key={index} className="px-3 py-1.5 bg-purple-100 text-purple-700 text-sm rounded-full">
                            {bhk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Furnishing Type</label>
                  {isEditing ? (
                    <select
                      value={editForm.preferences.furnished}
                      onChange={(e) => handleInputChange("preferences.furnished", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Fully Furnished">Fully Furnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Unfurnished">Unfurnished</option>
                    </select>
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                      {tenantData.preferences.furnished}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Move-in Date</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editForm.preferences.moveInDate}
                      onChange={(e) => handleInputChange("preferences.moveInDate", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                      {formatDate(tenantData.preferences.moveInDate)}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Preferences</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={tenantData.preferences.parkingRequired}
                        onChange={(e) => {
                          if (isEditing) {
                            handleInputChange("preferences.parkingRequired", e.target.checked);
                          }
                        }}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Parking Required</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={tenantData.preferences.petsAllowed}
                        onChange={(e) => {
                          if (isEditing) {
                            handleInputChange("preferences.petsAllowed", e.target.checked);
                          }
                        }}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Pets Allowed</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">Uploaded Documents</h3>
                <button
                  onClick={handleUploadDocument}
                  className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                >
                  <Camera className="w-3 h-3" />
                  Upload Document
                </button>
              </div>

              <div className="space-y-4">
                {tenantData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {/* <FileText className="w-5 h-5 text-blue-600" /> */}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{doc.name}</div>
                        <div className="text-xs text-gray-500">
                          Uploaded on {formatDate(doc.uploadDate)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Verification Status</h4>
                    <p className="text-xs text-yellow-700 mt-1">
                      Your account verification is pending. Please upload all required documents to get verified status.
                      Verified accounts get better response rates from property owners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">Account Activity</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{tenantData.activityStats.totalPropertiesViewed}</div>
                  <div className="text-sm text-gray-600 mt-1">Properties Viewed</div>
                  <div className="text-xs text-gray-500 mt-2">Total properties you've seen</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{tenantData.activityStats.totalPropertiesSaved}</div>
                  <div className="text-sm text-gray-600 mt-1">Properties Saved</div>
                  <div className="text-xs text-gray-500 mt-2">Properties you've bookmarked</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{tenantData.activityStats.totalPropertiesLiked}</div>
                  <div className="text-sm text-gray-600 mt-1">Properties Liked</div>
                  <div className="text-xs text-gray-500 mt-2">Properties you've liked</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{tenantData.activityStats.totalContactsUnlocked}</div>
                  <div className="text-sm text-gray-600 mt-1">Contacts Unlocked</div>
                  <div className="text-xs text-gray-500 mt-2">Owner contacts accessed</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Credit Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current Balance</span>
                      <span className="font-bold text-blue-600">{tenantData.creditInfo.currentBalance} credits</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Purchased</span>
                      <span className="font-bold text-green-600">{tenantData.creditInfo.totalPurchased} credits</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Used</span>
                      <span className="font-bold text-purple-600">{tenantData.creditInfo.totalUsed} credits</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Amount Spent</span>
                      <span className="font-bold text-orange-600">{formatCurrency(tenantData.activityStats.totalSpent)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Engagement Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Time on Site</span>
                      <span className="font-bold text-gray-900">{tenantData.activityStats.avgTimeOnSite}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Response Rate</span>
                      <span className="font-bold text-green-600">{tenantData.activityStats.responseRate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Credit Purchase</span>
                      <span className="font-bold text-blue-600">
                        {formatDate(tenantData.creditInfo.lastPurchaseDate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Purchase Amount</span>
                      <span className="font-bold text-green-600">
                        ₹{tenantData.creditInfo.lastPurchaseAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">Account Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">Email Notifications</div>
                      <div className="text-xs text-gray-500">Receive emails about property updates</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tenantData.accountSettings.emailNotifications}
                      onChange={() => {
                        setTenantData({
                          ...tenantData,
                          accountSettings: {
                            ...tenantData.accountSettings,
                            emailNotifications: !tenantData.accountSettings.emailNotifications
                          }
                        });
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">SMS Notifications</div>
                      <div className="text-xs text-gray-500">Receive SMS alerts for new properties</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tenantData.accountSettings.smsNotifications}
                      onChange={() => {
                        setTenantData({
                          ...tenantData,
                          accountSettings: {
                            ...tenantData.accountSettings,
                            smsNotifications: !tenantData.accountSettings.smsNotifications
                          }
                        });
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">Marketing Emails</div>
                      <div className="text-xs text-gray-500">Receive promotional offers and updates</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tenantData.accountSettings.marketingEmails}
                      onChange={() => {
                        setTenantData({
                          ...tenantData,
                          accountSettings: {
                            ...tenantData.accountSettings,
                            marketingEmails: !tenantData.accountSettings.marketingEmails
                          }
                        });
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">Auto-save Properties</div>
                      <div className="text-xs text-gray-500">Automatically save properties you view</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tenantData.accountSettings.autoSaveProperties}
                      onChange={() => {
                        setTenantData({
                          ...tenantData,
                          accountSettings: {
                            ...tenantData.accountSettings,
                            autoSaveProperties: !tenantData.accountSettings.autoSaveProperties
                          }
                        });
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      value={tenantData.accountSettings.language}
                      onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          accountSettings: {
                            ...tenantData.accountSettings,
                            language: e.target.value
                          }
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select
                      value={tenantData.accountSettings.timezone}
                      onChange={(e) => {
                        setTenantData({
                          ...tenantData,
                          accountSettings: {
                            ...tenantData.accountSettings,
                            timezone: e.target.value
                          }
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="IST (UTC+5:30)">IST (UTC+5:30)</option>
                      <option value="GMT (UTC+0)">GMT (UTC+0)</option>
                      <option value="EST (UTC-5)">EST (UTC-5)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-gray-900">Security Settings</h3>

              {showChangePassword ? (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Change Password</h4>
                    <button
                      onClick={() => setShowChangePassword(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleChangePassword}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                      >
                        Update Password
                      </button>
                      <button
                        onClick={() => setShowChangePassword(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">Password</div>
                        <div className="text-xs text-gray-500">Last changed 30 days ago</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowChangePassword(true)}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-xs text-gray-500">Add an extra layer of security</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tenantData.accountSettings.twoFactorAuth}
                        onChange={() => {
                          setTenantData({
                            ...tenantData,
                            accountSettings: {
                              ...tenantData.accountSettings,
                              twoFactorAuth: !tenantData.accountSettings.twoFactorAuth
                            }
                          });
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">Privacy Mode</div>
                        <div className="text-xs text-gray-500">Hide your activity from others</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tenantData.accountSettings.privacyMode}
                        onChange={() => {
                          setTenantData({
                            ...tenantData,
                            accountSettings: {
                              ...tenantData.accountSettings,
                              privacyMode: !tenantData.accountSettings.privacyMode
                            }
                          });
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Account Deactivation</h4>
                    <p className="text-xs text-red-700 mt-1">
                      Deactivating your account will hide your profile and preferences from property owners.
                      You can reactivate your account anytime by logging in.
                    </p>
                    <button className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                      Deactivate Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Account Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Member Since</span>
              <span className="font-medium">{formatDate(tenantData.joinDate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Account Status</span>
              <span className="font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Verification Status</span>
              <span className="font-medium text-blue-600">Verified</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Credit Balance</span>
              <span className="font-bold text-blue-600">{tenantData.creditInfo.currentBalance} credits</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Links</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              View Saved Properties
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Check Credit History
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              View Unlocked Contacts
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Download Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantProfile;