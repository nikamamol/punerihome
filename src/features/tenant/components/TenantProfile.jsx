import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Camera,
  Shield,
  Save,
  X,
  Download,
  Building,
  Briefcase,
  DollarSign,
  Users,
  Home,
  CreditCard,
  Unlock,
  Bookmark,
  Heart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lock,
  Globe,
  Bell,
  Smartphone,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  useGetTenantProfileQuery,
  useUpdateTenantProfileMutation,
  useGetTenantCreditsQuery,
  useGetPaymentHistoryQuery,
  useGetUnlockedContactsQuery
} from "../../../store/api/tenantApi";
import {
  useGetLikedPropertiesQuery,
  useGetSavedPropertiesQuery
} from "../../../store/api/propertyApi";

function TenantProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [activeTab, setActiveTab] = useState("personal");

  // Get auth state
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  // RTK Query hooks
  const {
    data: profileData,
    isLoading: profileLoading,
    refetch: refetchProfile
  } = useGetTenantProfileQuery(undefined, {
    skip: !userId,
  });

  const {
    data: creditData,
    isLoading: creditsLoading
  } = useGetTenantCreditsQuery(undefined, {
    skip: !userId,
  });

  const {
    data: likedData,
    isLoading: likedLoading
  } = useGetLikedPropertiesQuery(undefined, {
    skip: !userId,
  });

  const {
    data: savedData,
    isLoading: savedLoading
  } = useGetSavedPropertiesQuery(undefined, {
    skip: !userId,
  });

  const {
    data: unlockedData,
    isLoading: unlockedLoading
  } = useGetUnlockedContactsQuery(undefined, {
    skip: !userId,
  });

  const {
    data: paymentHistoryData,
    isLoading: historyLoading
  } = useGetPaymentHistoryQuery({ page: 1, limit: 100 }, {
    skip: !userId,
  });

  // Update tenant profile mutation
  const [updateProfile, { isLoading: isUpdating }] = useUpdateTenantProfileMutation();

  // Set edit form when profile data loads
  useEffect(() => {
    if (profileData?.data) {
      setEditForm(profileData.data);
    }
  }, [profileData]);

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

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editForm).unwrap();
      setIsEditing(false);
      refetchProfile();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditForm(profileData?.data || {});
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return "—";
    if (amount >= 100000) return "₹" + (amount / 100000).toFixed(1) + "L";
    if (amount >= 1000) return "₹" + (amount / 1000).toFixed(0) + "K";
    return "₹" + amount;
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      verified: { bg: "bg-green-100", text: "text-green-800", label: "Verified" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
      rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
    };
    const statusStyle = statusMap[status] || statusMap.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
        {statusStyle.label}
      </span>
    );
  };

  // Calculate statistics
  const likedCount = likedData?.data?.length || 0;
  const savedCount = savedData?.data?.length || 0;
  const unlockedCount = unlockedData?.data?.length || 0;
  
  const totalSpent = paymentHistoryData?.data?.payments?.reduce((total, payment) => {
    if (payment.status === 'completed' || payment.status === 'success') {
      return total + (Number(payment.amount) || 0);
    }
    return total;
  }, 0) || 0;

  const creditBalance = creditData?.data?.balance || 0;
  const totalCreditsUsed = creditData?.data?.totalUsed || 0;
  const totalCreditsPurchased = creditData?.data?.totalPurchased || 0;

  const isLoading = profileLoading || creditsLoading || likedLoading || savedLoading || unlockedLoading || historyLoading;

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-64 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-56"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const profile = profileData?.data || {};

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
                  disabled={isUpdating}
                  className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1 disabled:opacity-50"
                >
                  <Save className="w-3 h-3" />
                  {isUpdating ? "Saving..." : "Save Changes"}
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
              {profile.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-blue-600" />
              )}
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="mt-3 text-center">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                profile.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {profile.status?.charAt(0).toUpperCase() + profile.status?.slice(1) || "Active"}
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
                      value={editForm.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    profile.name || user?.name
                  )}
                </h2>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      profile.email || user?.email
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      profile.phone || user?.phone
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Joined: {formatDate(profile.joinDate || user?.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Account Verification</span>
                {getStatusBadge(profile.verification || "pending")}
              </div>
              <p className="text-xs text-gray-600">
                Last login: {profile.lastLogin || "Today"}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{savedCount}</div>
              <div className="text-xs text-gray-600">Saved</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{likedCount}</div>
              <div className="text-xs text-gray-600">Liked</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{creditBalance}</div>
              <div className="text-xs text-gray-600">Credits</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{unlockedCount}</div>
              <div className="text-xs text-gray-600">Contacts</div>
            </div>
          </div>
        </div>
      </div>

   
    </div>
  );
}

export default TenantProfile;