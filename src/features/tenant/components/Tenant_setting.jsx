import React, { useState } from "react";
import {
    User,
    Bell,
    Shield,
    Globe,
    Moon,
    Download,
    Trash2,
    Save,
    Eye,
    EyeOff,
    Smartphone,
    Mail,
    Lock,
    Home,
    CreditCard,
    Users,
} from "lucide-react";

function Tenant_setting() {
    const [settings, setSettings] = useState({
        // Profile Settings
        profile: {
            name: "Rohan Mehta",
            email: "rohan@email.com",
            phone: "+91 9876543210",
            language: "English",
            timezone: "IST (UTC+5:30)",
        },

        // Notification Settings
        notifications: {
            emailNotifications: true,
            smsNotifications: true,
            marketingEmails: false,
            propertyAlerts: true,
            priceDropAlerts: true,
            newPropertyAlerts: true,
        },

        // Privacy Settings
        privacy: {
            showProfile: true,
            showActivity: false,
            showSavedProperties: true,
            allowMessages: true,
            dataSharing: false,
        },

        // Account Settings
        account: {
            twoFactorAuth: false,
            autoRenewCredits: false,
            savePaymentInfo: false,
            sessionTimeout: "30 minutes",
        },
    });

    const [activeTab, setActiveTab] = useState("profile");
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const handleSettingChange = (category, setting, value) => {
        setSettings({
            ...settings,
            [category]: {
                ...settings[category],
                [setting]: value,
            },
        });
    };

    const handleSave = () => {
        alert("Settings saved successfully!");
    };

    const handlePasswordChange = () => {
        if (passwordData.new !== passwordData.confirm) {
            alert("New passwords don't match!");
            return;
        }
        alert("Password changed successfully!");
        setPasswordData({ current: "", new: "", confirm: "" });
        setShowPasswordForm(false);
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "privacy", label: "Privacy", icon: Shield },
        { id: "account", label: "Account", icon: Lock },
    ];

    return (
        <div className="p-4">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-600 mt-1">Manage your account preferences</p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg border border-gray-200">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    {/* Desktop Tabs (hidden on mobile) */}
                    <div className="hidden md:flex space-x-4 px-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-3 px-1 text-sm font-medium border-b-2 ${activeTab === tab.id
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4 inline mr-2" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Tabs (dropdown) */}
                    <div className="md:hidden p-4">
                        <div className="relative">
                            <select
                                value={activeTab}
                                onChange={(e) => setActiveTab(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <option key={tab.id} value={tab.id} className="flex items-center gap-2">
                                            {tab.label}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Mobile Active Tab Indicator */}
                        <div className="mt-2 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-blue-600 font-medium">
                                {(() => {
                                    const activeTabData = tabs.find(tab => tab.id === activeTab);
                                    const Icon = activeTabData?.icon;
                                    return (
                                        <>
                                            {Icon && <Icon className="w-4 h-4" />}
                                            {activeTabData?.label}
                                        </>
                                    );
                                })()}
                            </div>
                            <div className="text-gray-500">
                                {tabs.findIndex(tab => tab.id === activeTab) + 1} of {tabs.length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                    {/* Profile Settings */}
                    {activeTab === "profile" && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.profile.name}
                                    onChange={(e) => handleSettingChange("profile", "name", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={settings.profile.email}
                                    onChange={(e) => handleSettingChange("profile", "email", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={settings.profile.phone}
                                    onChange={(e) => handleSettingChange("profile", "phone", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Language
                                    </label>
                                    <select
                                        value={settings.profile.language}
                                        onChange={(e) => handleSettingChange("profile", "language", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="English">English</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Marathi">Marathi</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Timezone
                                    </label>
                                    <select
                                        value={settings.profile.timezone}
                                        onChange={(e) => handleSettingChange("profile", "timezone", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="IST (UTC+5:30)">IST (UTC+5:30)</option>
                                        <option value="GMT (UTC+0)">GMT (UTC+0)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === "notifications" && (
                        <div className="space-y-4">
                            {Object.entries(settings.notifications).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {key.includes('email') ? 'Receive email notifications' :
                                                key.includes('sms') ? 'Receive SMS alerts' :
                                                    key.includes('marketing') ? 'Promotional emails' :
                                                        'Property related alerts'}
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => handleSettingChange("notifications", key, e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Privacy Settings */}
                    {activeTab === "privacy" && (
                        <div className="space-y-4">
                            {Object.entries(settings.privacy).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {key.includes('showProfile') ? 'Allow others to see your profile' :
                                                key.includes('showActivity') ? 'Show your property activity' :
                                                    key.includes('allowMessages') ? 'Receive messages from owners' :
                                                        'Share data for better recommendations'}
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => handleSettingChange("privacy", key, e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Account Settings */}
                    {activeTab === "account" && (
                        <div className="space-y-4">
                            <div className="space-y-4">
                                {Object.entries(settings.account).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {key.includes('twoFactor') ? 'Add extra security layer' :
                                                    key.includes('autoRenew') ? 'Automatically renew credits' :
                                                        key.includes('savePayment') ? 'Save payment details' :
                                                            'Auto logout after inactivity'}
                                            </div>
                                        </div>
                                        {key === 'sessionTimeout' ? (
                                            <select
                                                value={value}
                                                onChange={(e) => handleSettingChange("account", key, e.target.value)}
                                                className="px-3 py-1 border border-gray-300 rounded text-sm"
                                            >
                                                <option value="15 minutes">15 minutes</option>
                                                <option value="30 minutes">30 minutes</option>
                                                <option value="1 hour">1 hour</option>
                                                <option value="Never">Never</option>
                                            </select>
                                        ) : (
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={value}
                                                    onChange={(e) => handleSettingChange("account", key, e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Password Change */}
                            {showPasswordForm ? (
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-medium text-gray-900">Change Password</h3>
                                        <button onClick={() => setShowPasswordForm(false)} className="text-gray-500">
                                            ✕
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">Current Password</label>
                                            <input
                                                type="password"
                                                value={passwordData.current}
                                                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                placeholder="Enter current password"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">New Password</label>
                                            <input
                                                type="password"
                                                value={passwordData.new}
                                                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                placeholder="Enter new password"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
                                            <input
                                                type="password"
                                                value={passwordData.confirm}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                        <button
                                            onClick={handlePasswordChange}
                                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowPasswordForm(true)}
                                    className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                                >
                                    <Lock className="w-4 h-4" />
                                    Change Password
                                </button>
                            )}

                            {/* Danger Zone */}
                            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                                <h3 className="font-medium text-red-900 mb-2">Danger Zone</h3>
                                <p className="text-sm text-red-700 mb-3">
                                    These actions are permanent and cannot be undone.
                                </p>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 flex items-center gap-2">
                                        <Trash2 className="w-4 h-4" />
                                        Delete Account
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Export Data
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Save Button */}
                <div className="border-t border-gray-200 p-4">
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tenant_setting;