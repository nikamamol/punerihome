import React, { useState, useEffect } from "react";
import {
  Settings,
  Shield,
  User,
  Users,
  Building,
  Bell,
  CreditCard,
  Globe,
  Lock,
  Database,
  Mail,
  BellRing,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Key,
  Smartphone,
  Server,
  FileText,
  BarChart,
  Cloud,
  Wifi,
  WifiOff,
  Ban,
  Check,
  X,
  Clock,
  Home,
  Phone,
  Mail as MailIcon,
} from "lucide-react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    general: {
      siteName: "RentEase Pro",
      siteUrl: "https://renteasepro.com",
      adminEmail: "admin@renteasepro.com",
      supportEmail: "support@renteasepro.com",
      contactPhone: "+91 9876543210",
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
      language: "en",
      currency: "INR",
      maintenanceMode: false,
    },

    // Security Settings
    security: {
      twoFactorAuth: true,
      passwordExpiry: 90, // days
      sessionTimeout: 30, // minutes
      maxLoginAttempts: 5,
      ipWhitelist: ["192.168.1.1", "192.168.1.100"],
      sslEnforced: true,
      apiRateLimit: 100, // requests per minute
      auditLogRetention: 365, // days
    },

    // Email Settings
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUsername: "noreply@renteasepro.com",
      smtpPassword: "********",
      emailFrom: "noreply@renteasepro.com",
      emailFromName: "RentEase Pro",
      emailEncryption: "tls",
      testEmail: "",
    },

    // Payment Settings
    payment: {
      currency: "INR",
      platformFeePercentage: 5,
      minRentAmount: 10000,
      maxRentAmount: 500000,
      paymentMethods: ["UPI", "Bank Transfer", "Credit Card", "Debit Card", "Net Banking"],
      autoApprovePayments: true,
      payoutSchedule: "weekly",
      taxPercentage: 18,
      lateFeePercentage: 2,
    },

    // Notification Settings
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      newUserRegistration: true,
      newPropertyListing: true,
      paymentReceived: true,
      paymentDue: true,
      maintenanceAlert: true,
      systemAlerts: true,
      marketingEmails: false,
    },

    // API Settings
    api: {
      apiEnabled: true,
      apiKey: "sk_live_**********",
      webhookUrl: "https://api.renteasepro.com/webhook",
      rateLimit: 100,
      corsOrigins: ["https://app.renteasepro.com", "https://admin.renteasepro.com"],
    },
  });

  // Blocked Lists
  const [blockedOwners, setBlockedOwners] = useState([
    {
      id: 1,
      name: "Raj Malhotra",
      email: "raj.malhotra@email.com",
      phone: "+91 9876543210",
      reason: "Fake property listings",
      blockedBy: "Admin User",
      blockedAt: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya.verma@email.com",
      phone: "+91 9876543211",
      reason: "Payment fraud",
      blockedBy: "System",
      blockedAt: "2024-02-10",
      status: "active",
    },
  ]);

  const [blockedTenants, setBlockedTenants] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit.sharma@email.com",
      phone: "+91 9876543212",
      reason: "Property damage",
      blockedBy: "Owner",
      blockedAt: "2024-02-20",
      status: "active",
    },
    {
      id: 2,
      name: "Neha Reddy",
      email: "neha.reddy@email.com",
      phone: "+91 9876543213",
      reason: "Rent default",
      blockedBy: "Admin User",
      blockedAt: "2024-02-25",
      status: "active",
    },
  ]);

  const [blockedIPs, setBlockedIPs] = useState([
    {
      id: 1,
      ipAddress: "192.168.1.50",
      reason: "Multiple failed login attempts",
      blockedBy: "System",
      blockedAt: "2024-02-28",
      status: "active",
    },
    {
      id: 2,
      ipAddress: "103.21.244.0",
      reason: "Suspicious activity",
      blockedBy: "Admin User",
      blockedAt: "2024-02-27",
      status: "active",
    },
  ]);

  // User Logs
  const [userLogs, setUserLogs] = useState([
    {
      id: 1,
      user: "Admin User",
      action: "Logged in",
      ip: "192.168.1.1",
      timestamp: "2024-02-28 10:30:00",
      status: "success",
    },
    {
      id: 2,
      user: "Unknown",
      action: "Failed login attempt",
      ip: "192.168.1.50",
      timestamp: "2024-02-28 09:45:00",
      status: "failed",
    },
    {
      id: 3,
      user: "Agent 1",
      action: "Updated property status",
      ip: "192.168.1.2",
      timestamp: "2024-02-28 08:20:00",
      status: "success",
    },
    {
      id: 4,
      user: "Owner 5",
      action: "Added new property",
      ip: "103.21.244.1",
      timestamp: "2024-02-27 16:45:00",
      status: "success",
    },
    {
      id: 5,
      user: "Unknown",
      action: "Brute force attempt",
      ip: "103.21.244.0",
      timestamp: "2024-02-27 14:30:00",
      status: "failed",
    },
  ]);

  // System Status
  const [systemStatus, setSystemStatus] = useState({
    database: {
      status: "online",
      size: "2.4 GB",
      lastBackup: "2024-02-28 02:00:00",
      uptime: "99.8%",
    },
    server: {
      status: "online",
      cpu: "45%",
      memory: "68%",
      disk: "42%",
      responseTime: "120ms",
    },
    api: {
      status: "online",
      requests: "1,245/min",
      errors: "0.2%",
      latency: "85ms",
    },
    paymentGateway: {
      status: "online",
      successRate: "99.5%",
      lastCheck: "2024-02-28 10:15:00",
    },
  });

  // New entries for blocking
  const [newBlockedOwner, setNewBlockedOwner] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const [newBlockedTenant, setNewBlockedTenant] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const [newBlockedIP, setNewBlockedIP] = useState({
    ipAddress: "",
    reason: "",
  });

  // Tabs configuration
  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "email", label: "Email", icon: Mail },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API", icon: Server },
    { id: "blocked", label: "Blocked Lists", icon: Ban },
    { id: "logs", label: "User Logs", icon: FileText },
    { id: "system", label: "System Status", icon: BarChart },
    { id: "backup", label: "Backup", icon: Database },
  ];

  // Handle setting change
  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  // Handle save settings
  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  // Handle test email
  const handleTestEmail = () => {
    if (!settings.email.testEmail) {
      alert("Please enter a test email address");
      return;
    }
    alert(`Test email sent to ${settings.email.testEmail}`);
  };

  // Handle block owner
  const handleBlockOwner = () => {
    if (!newBlockedOwner.name || !newBlockedOwner.email || !newBlockedOwner.reason) {
      alert("Please fill all required fields");
      return;
    }

    const newOwner = {
      id: blockedOwners.length + 1,
      ...newBlockedOwner,
      blockedBy: "Admin User",
      blockedAt: new Date().toISOString().split('T')[0],
      status: "active",
    };

    setBlockedOwners([...blockedOwners, newOwner]);
    setNewBlockedOwner({ name: "", email: "", phone: "", reason: "" });
    alert("Owner blocked successfully!");
  };

  // Handle block tenant
  const handleBlockTenant = () => {
    if (!newBlockedTenant.name || !newBlockedTenant.email || !newBlockedTenant.reason) {
      alert("Please fill all required fields");
      return;
    }

    const newTenant = {
      id: blockedTenants.length + 1,
      ...newBlockedTenant,
      blockedBy: "Admin User",
      blockedAt: new Date().toISOString().split('T')[0],
      status: "active",
    };

    setBlockedTenants([...blockedTenants, newTenant]);
    setNewBlockedTenant({ name: "", email: "", phone: "", reason: "" });
    alert("Tenant blocked successfully!");
  };

  // Handle block IP
  const handleBlockIP = () => {
    if (!newBlockedIP.ipAddress || !newBlockedIP.reason) {
      alert("Please fill all required fields");
      return;
    }

    const newIP = {
      id: blockedIPs.length + 1,
      ...newBlockedIP,
      blockedBy: "Admin User",
      blockedAt: new Date().toISOString().split('T')[0],
      status: "active",
    };

    setBlockedIPs([...blockedIPs, newIP]);
    setNewBlockedIP({ ipAddress: "", reason: "" });
    alert("IP blocked successfully!");
  };

  // Handle unblock
  const handleUnblock = (type, id) => {
    if (type === "owner") {
      setBlockedOwners(blockedOwners.filter(owner => owner.id !== id));
    } else if (type === "tenant") {
      setBlockedTenants(blockedTenants.filter(tenant => tenant.id !== id));
    } else if (type === "ip") {
      setBlockedIPs(blockedIPs.filter(ip => ip.id !== id));
    }
    alert("Unblocked successfully!");
  };

  // Handle backup
  const handleBackup = () => {
    setBackupProgress(0);
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          alert("Backup completed successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Handle restore
  const handleRestore = () => {
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = '.json,.sql,.backup';
    file.onchange = (e) => {
      alert(`Restoring from ${e.target.files[0].name}...`);
      // In real app, this would upload and restore
    };
    file.click();
  };

  // Format date
  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const config = {
      online: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Online" },
      offline: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Offline" },
      warning: { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle, label: "Warning" },
      success: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Success" },
      failed: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Failed" },
      active: { color: "bg-red-100 text-red-800", icon: Ban, label: "Blocked" },
    };

    const { color, icon: Icon, label } = config[status] || config.online;
    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${color}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
            <p className="text-sm text-gray-600 mt-1">
              Configure platform settings, security, and system preferences
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("system")}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <BarChart className="w-4 h-4" />
              System Health
            </button>

            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 sticky top-6">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Settings Categories</h3>
              </div>
              
              <div className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Blocked Owners:</span>
                  <span className="font-medium text-red-600">{blockedOwners.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Blocked Tenants:</span>
                  <span className="font-medium text-red-600">{blockedTenants.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Blocked IPs:</span>
                  <span className="font-medium text-red-600">{blockedIPs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Failed Logins (24h):</span>
                  <span className="font-medium text-yellow-600">
                    {userLogs.filter(log => log.status === "failed").length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                    <p className="text-sm text-gray-600">Configure basic platform settings</p>
                  </div>
                  <Settings className="w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.general.siteName}
                        onChange={(e) => handleSettingChange("general", "siteName", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site URL
                      </label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.general.siteUrl}
                        onChange={(e) => handleSettingChange("general", "siteUrl", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.general.adminEmail}
                        onChange={(e) => handleSettingChange("general", "adminEmail", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Support Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.general.supportEmail}
                        onChange={(e) => handleSettingChange("general", "supportEmail", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.general.contactPhone}
                        onChange={(e) => handleSettingChange("general", "contactPhone", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.general.timezone}
                        onChange={(e) => handleSettingChange("general", "timezone", e.target.value)}
                      >
                        <option value="Asia/Kolkata">India (IST)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">EST</option>
                        <option value="Europe/London">GMT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.general.dateFormat}
                        onChange={(e) => handleSettingChange("general", "dateFormat", e.target.value)}
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.general.currency}
                        onChange={(e) => handleSettingChange("general", "currency", e.target.value)}
                      >
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      className="rounded text-blue-600 focus:ring-blue-500"
                      checked={settings.general.maintenanceMode}
                      onChange={(e) => handleSettingChange("general", "maintenanceMode", e.target.checked)}
                    />
                    <label htmlFor="maintenanceMode" className="text-sm text-gray-700">
                      Enable Maintenance Mode
                    </label>
                    <span className="text-xs text-gray-500">
                      (Platform will be temporarily unavailable to users)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                    <p className="text-sm text-gray-600">Configure platform security and access controls</p>
                  </div>
                  <Shield className="w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Expiry (Days)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.security.passwordExpiry}
                        onChange={(e) => handleSettingChange("security", "passwordExpiry", parseInt(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (Minutes)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleSettingChange("security", "sessionTimeout", parseInt(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => handleSettingChange("security", "maxLoginAttempts", parseInt(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Rate Limit (per minute)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.security.apiRateLimit}
                        onChange={(e) => handleSettingChange("security", "apiRateLimit", parseInt(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Audit Log Retention (Days)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.security.auditLogRetention}
                        onChange={(e) => handleSettingChange("security", "auditLogRetention", parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IP Whitelist
                    </label>
                    <textarea
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      rows="3"
                      value={settings.security.ipWhitelist.join("\n")}
                      onChange={(e) => handleSettingChange("security", "ipWhitelist", e.target.value.split("\n"))}
                      placeholder="Enter IP addresses (one per line)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Only these IPs will be allowed to access admin panel
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="twoFactorAuth"
                        className="rounded text-blue-600 focus:ring-blue-500"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleSettingChange("security", "twoFactorAuth", e.target.checked)}
                      />
                      <label htmlFor="twoFactorAuth" className="text-sm text-gray-700">
                        Enable Two-Factor Authentication
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="sslEnforced"
                        className="rounded text-blue-600 focus:ring-blue-500"
                        checked={settings.security.sslEnforced}
                        onChange={(e) => handleSettingChange("security", "sslEnforced", e.target.checked)}
                      />
                      <label htmlFor="sslEnforced" className="text-sm text-gray-700">
                        Enforce SSL/HTTPS
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === "email" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email Settings</h3>
                    <p className="text-sm text-gray-600">Configure email server and notifications</p>
                  </div>
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.email.smtpHost}
                        onChange={(e) => handleSettingChange("email", "smtpHost", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.email.smtpPort}
                        onChange={(e) => handleSettingChange("email", "smtpPort", parseInt(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Username
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.email.smtpUsername}
                        onChange={(e) => handleSettingChange("email", "smtpUsername", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                          value={settings.email.smtpPassword}
                          onChange={(e) => handleSettingChange("email", "smtpPassword", e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.email.emailFrom}
                        onChange={(e) => handleSettingChange("email", "emailFrom", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.email.emailFromName}
                        onChange={(e) => handleSettingChange("email", "emailFromName", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Encryption
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        value={settings.email.emailEncryption}
                        onChange={(e) => handleSettingChange("email", "emailEncryption", e.target.value)}
                      >
                        <option value="tls">TLS</option>
                        <option value="ssl">SSL</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Email Address
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="email"
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        placeholder="Enter email to test configuration"
                        value={settings.email.testEmail}
                        onChange={(e) => handleSettingChange("email", "testEmail", e.target.value)}
                      />
                      <button
                        onClick={handleTestEmail}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Send Test Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Blocked Lists */}
            {activeTab === "blocked" && (
              <div className="space-y-6">
                {/* Block Owners */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Blocked Owners</h3>
                      <p className="text-sm text-gray-600">Manage blocked property owners</p>
                    </div>
                    <Building className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Add New Blocked Owner */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Block New Owner</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <input
                        type="text"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Owner Name"
                        value={newBlockedOwner.name}
                        onChange={(e) => setNewBlockedOwner({...newBlockedOwner, name: e.target.value})}
                      />
                      <input
                        type="email"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Email Address"
                        value={newBlockedOwner.email}
                        onChange={(e) => setNewBlockedOwner({...newBlockedOwner, email: e.target.value})}
                      />
                      <input
                        type="tel"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Phone Number"
                        value={newBlockedOwner.phone}
                        onChange={(e) => setNewBlockedOwner({...newBlockedOwner, phone: e.target.value})}
                      />
                      <input
                        type="text"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Block Reason"
                        value={newBlockedOwner.reason}
                        onChange={(e) => setNewBlockedOwner({...newBlockedOwner, reason: e.target.value})}
                      />
                    </div>
                    <button
                      onClick={handleBlockOwner}
                      className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Block Owner
                    </button>
                  </div>

                  {/* Blocked Owners List */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Owner</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Blocked</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blockedOwners.map((owner) => (
                          <tr key={owner.id} className="border-t hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">{owner.name}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-600">{owner.email}</div>
                              <div className="text-xs text-gray-500">{owner.phone}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-700">{owner.reason}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-600">
                                <div>By: {owner.blockedBy}</div>
                                <div className="text-xs text-gray-500">{owner.blockedAt}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleUnblock("owner", owner.id)}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                              >
                                Unblock
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Block Tenants */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Blocked Tenants</h3>
                      <p className="text-sm text-gray-600">Manage blocked tenants</p>
                    </div>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Add New Blocked Tenant */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Block New Tenant</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <input
                        type="text"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Tenant Name"
                        value={newBlockedTenant.name}
                        onChange={(e) => setNewBlockedTenant({...newBlockedTenant, name: e.target.value})}
                      />
                      <input
                        type="email"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Email Address"
                        value={newBlockedTenant.email}
                        onChange={(e) => setNewBlockedTenant({...newBlockedTenant, email: e.target.value})}
                      />
                      <input
                        type="tel"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Phone Number"
                        value={newBlockedTenant.phone}
                        onChange={(e) => setNewBlockedTenant({...newBlockedTenant, phone: e.target.value})}
                      />
                      <input
                        type="text"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Block Reason"
                        value={newBlockedTenant.reason}
                        onChange={(e) => setNewBlockedTenant({...newBlockedTenant, reason: e.target.value})}
                      />
                    </div>
                    <button
                      onClick={handleBlockTenant}
                      className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Block Tenant
                    </button>
                  </div>

                  {/* Blocked Tenants List */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Tenant</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Blocked</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blockedTenants.map((tenant) => (
                          <tr key={tenant.id} className="border-t hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">{tenant.name}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-600">{tenant.email}</div>
                              <div className="text-xs text-gray-500">{tenant.phone}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-700">{tenant.reason}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-600">
                                <div>By: {tenant.blockedBy}</div>
                                <div className="text-xs text-gray-500">{tenant.blockedAt}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleUnblock("tenant", tenant.id)}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                              >
                                Unblock
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Block IPs */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Blocked IP Addresses</h3>
                      <p className="text-sm text-gray-600">Manage blocked IP addresses</p>
                    </div>
                    <Globe className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Add New Blocked IP */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Block New IP Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="IP Address (e.g., 192.168.1.1)"
                        value={newBlockedIP.ipAddress}
                        onChange={(e) => setNewBlockedIP({...newBlockedIP, ipAddress: e.target.value})}
                      />
                      <input
                        type="text"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                        placeholder="Block Reason"
                        value={newBlockedIP.reason}
                        onChange={(e) => setNewBlockedIP({...newBlockedIP, reason: e.target.value})}
                      />
                      <button
                        onClick={handleBlockIP}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                      >
                        Block IP
                      </button>
                    </div>
                  </div>

                  {/* Blocked IPs List */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">IP Address</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Blocked</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blockedIPs.map((ip) => (
                          <tr key={ip.id} className="border-t hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">{ip.ipAddress}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-700">{ip.reason}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-600">
                                <div>By: {ip.blockedBy}</div>
                                <div className="text-xs text-gray-500">{ip.blockedAt}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleUnblock("ip", ip.id)}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                              >
                                Unblock
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* User Logs */}
            {activeTab === "logs" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">User Activity Logs</h3>
                    <p className="text-sm text-gray-600">Monitor user activities and security events</p>
                  </div>
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                    <option>All Actions</option>
                    <option>Login</option>
                    <option>Logout</option>
                    <option>Create</option>
                    <option>Update</option>
                    <option>Delete</option>
                  </select>
                  <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                    <option>All Status</option>
                    <option>Success</option>
                    <option>Failed</option>
                  </select>
                  <input
                    type="date"
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                  <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    Filter Logs
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                    Clear Filters
                  </button>
                </div>

                {/* Logs Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">IP Address</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userLogs.map((log) => (
                        <tr key={log.id} className="border-t hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{log.user}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-gray-700">{log.action}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-gray-600">{log.ip}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-gray-600">{formatDateTime(log.timestamp)}</div>
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(log.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Logs Summary */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-lg font-bold text-green-900">
                      {userLogs.filter(log => log.status === "success").length}
                    </div>
                    <div className="text-sm text-green-700">Successful Actions</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="text-lg font-bold text-red-900">
                      {userLogs.filter(log => log.status === "failed").length}
                    </div>
                    <div className="text-sm text-red-700">Failed Actions</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-lg font-bold text-blue-900">
                      {userLogs.length}
                    </div>
                    <div className="text-sm text-blue-700">Total Logs</div>
                  </div>
                </div>
              </div>
            )}

            {/* System Status */}
            {activeTab === "system" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                    <p className="text-sm text-gray-600">Monitor system health and performance</p>
                  </div>
                  <BarChart className="w-5 h-5 text-gray-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Database Status */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-600" />
                        <h4 className="font-bold text-gray-900">Database</h4>
                      </div>
                      {getStatusBadge(systemStatus.database.status)}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{systemStatus.database.size}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Last Backup:</span>
                        <span className="font-medium">
                          {formatDateTime(systemStatus.database.lastBackup)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Uptime:</span>
                        <span className="font-medium text-green-600">{systemStatus.database.uptime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Server Status */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Server className="w-5 h-5 text-green-600" />
                        <h4 className="font-bold text-gray-900">Server</h4>
                      </div>
                      {getStatusBadge(systemStatus.server.status)}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">CPU Usage:</span>
                        <span className={`font-medium ${
                          parseInt(systemStatus.server.cpu) > 80 ? "text-red-600" : 
                          parseInt(systemStatus.server.cpu) > 60 ? "text-yellow-600" : "text-green-600"
                        }`}>
                          {systemStatus.server.cpu}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Memory Usage:</span>
                        <span className={`font-medium ${
                          parseInt(systemStatus.server.memory) > 80 ? "text-red-600" : 
                          parseInt(systemStatus.server.memory) > 60 ? "text-yellow-600" : "text-green-600"
                        }`}>
                          {systemStatus.server.memory}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Response Time:</span>
                        <span className="font-medium">{systemStatus.server.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* API Status */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Server className="w-5 h-5 text-purple-600" />
                        <h4 className="font-bold text-gray-900">API Gateway</h4>
                      </div>
                      {getStatusBadge(systemStatus.api.status)}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Requests/Min:</span>
                        <span className="font-medium">{systemStatus.api.requests}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Error Rate:</span>
                        <span className={`font-medium ${
                          parseFloat(systemStatus.api.errors) > 5 ? "text-red-600" : 
                          parseFloat(systemStatus.api.errors) > 2 ? "text-yellow-600" : "text-green-600"
                        }`}>
                          {systemStatus.api.errors}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Latency:</span>
                        <span className="font-medium">{systemStatus.api.latency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Gateway */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-teal-600" />
                        <h4 className="font-bold text-gray-900">Payment Gateway</h4>
                      </div>
                      {getStatusBadge(systemStatus.paymentGateway.status)}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Success Rate:</span>
                        <span className="font-medium text-green-600">{systemStatus.paymentGateway.successRate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Last Check:</span>
                        <span className="font-medium">
                          {formatDateTime(systemStatus.paymentGateway.lastCheck)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium text-green-600">Operational</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Actions */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
                    <div className="text-blue-600 mb-2">
                      <RefreshCw className="w-6 h-6 mx-auto" />
                    </div>
                    <div className="font-medium text-gray-900">Restart Services</div>
                  </button>
                  <button className="p-4 border border-green-200 rounded-lg hover:bg-green-50 text-center">
                    <div className="text-green-600 mb-2">
                      <Database className="w-6 h-6 mx-auto" />
                    </div>
                    <div className="font-medium text-gray-900">Optimize Database</div>
                  </button>
                  <button className="p-4 border border-red-200 rounded-lg hover:bg-red-50 text-center">
                    <div className="text-red-600 mb-2">
                      <AlertCircle className="w-6 h-6 mx-auto" />
                    </div>
                    <div className="font-medium text-gray-900">Clear Cache</div>
                  </button>
                </div>
              </div>
            )}

            {/* Backup */}
            {activeTab === "backup" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Backup & Restore</h3>
                    <p className="text-sm text-gray-600">Manage database backups and system restore</p>
                  </div>
                  <Database className="w-5 h-5 text-gray-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Backup Section */}
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-4">Create Backup</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Backup Type
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                          <option>Full Database Backup</option>
                          <option>Users & Accounts Only</option>
                          <option>Properties Data Only</option>
                          <option>Financial Data Only</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Encryption
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                          <option>AES-256 Encryption</option>
                          <option>No Encryption</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="includeMedia" className="rounded" defaultChecked />
                        <label htmlFor="includeMedia" className="text-sm text-gray-700">
                          Include media files
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="emailBackup" className="rounded" />
                        <label htmlFor="emailBackup" className="text-sm text-gray-700">
                          Email backup when complete
                        </label>
                      </div>

                      {backupProgress > 0 && backupProgress < 100 && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Backup Progress</span>
                            <span className="font-medium">{backupProgress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all"
                              style={{ width: `${backupProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleBackup}
                        disabled={backupProgress > 0 && backupProgress < 100}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        {backupProgress === 0 ? "Start Backup" : 
                         backupProgress === 100 ? "Backup Complete" : "Backing Up..."}
                      </button>
                    </div>
                  </div>

                  {/* Restore Section */}
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-4">Restore Backup</h4>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-yellow-900">Warning</div>
                            <div className="text-sm text-yellow-700 mt-1">
                              Restoring a backup will overwrite all current data. Make sure you have a recent backup before proceeding.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Backup File
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Database className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 mb-3">
                            Drag and drop backup file here, or click to browse
                          </p>
                          <button
                            onClick={handleRestore}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                          >
                            Browse Files
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Restore Options
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                          <option>Full Restore (Replace everything)</option>
                          <option>Merge Data (Keep existing, add missing)</option>
                          <option>Restore Users Only</option>
                          <option>Restore Properties Only</option>
                        </select>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to restore from backup? This will overwrite current data.")) {
                            alert("Restore process started...");
                          }
                        }}
                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Restore from Backup
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Backups */}
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-4">Recent Backups</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Size</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t hover:bg-gray-50">
                          <td className="py-3 px-4">2024-02-28 02:00:00</td>
                          <td className="py-3 px-4">Full Backup</td>
                          <td className="py-3 px-4">2.4 GB</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              Completed
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 mr-2">
                              Download
                            </button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr className="border-t hover:bg-gray-50">
                          <td className="py-3 px-4">2024-02-27 02:00:00</td>
                          <td className="py-3 px-4">Full Backup</td>
                          <td className="py-3 px-4">2.3 GB</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              Completed
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 mr-2">
                              Download
                            </button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs Placeholder */}
            {["payment", "notifications", "api"].includes(activeTab) && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tabs.find(t => t.id === activeTab)?.label} Settings
                    </h3>
                    <p className="text-sm text-gray-600">Configure {activeTab} settings</p>
                  </div>
                  {(() => {
                    const Icon = tabs.find(t => t.id === activeTab)?.icon;
                    return Icon ? <Icon className="w-5 h-5 text-gray-400" /> : null;
                  })()}
                </div>
                <p className="text-gray-600">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings configuration will be available soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;