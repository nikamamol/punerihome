import React, { useState } from 'react';
import {
    TrendingUp,
    Users,
    Home,
    Eye,
    Heart,
    MessageSquare,
    Calendar,
    BarChart3,
    DollarSign,
    Filter,
    Download,
    Share2,
    ChevronRight,
    Clock,
    MapPin,
    Phone,
    Mail,
    Building,
    Bath,
    Star,
    ArrowUp,
    ArrowDown,
    MoreVertical,
    Menu,
    X,
    ChevronLeft
} from 'lucide-react';

function Insights() {
    const [timeRange, setTimeRange] = useState('7d');
    const [activeTab, setActiveTab] = useState('overview');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const stats = [
        {
            title: 'Total Properties',
            value: '12',
            change: '+2',
            changeType: 'up',
            icon: <Home size={20} className="text-blue-500" />,
            color: 'bg-blue-50'
        },
        {
            title: 'Total Views',
            value: '1,248',
            change: '+15%',
            changeType: 'up',
            icon: <Eye size={20} className="text-green-500" />,
            color: 'bg-green-50'
        },
        {
            title: 'Enquiries',
            value: '48',
            change: '+8',
            changeType: 'up',
            icon: <MessageSquare size={20} className="text-purple-500" />,
            color: 'bg-purple-50'
        },
        {
            title: 'Favorites',
            value: '89',
            change: '-3%',
            changeType: 'down',
            icon: <Heart size={20} className="text-red-500" />,
            color: 'bg-red-50'
        }
    ];

    const properties = [
        {
            id: 1,
            title: "3 BHK Luxury Apartment",
            location: "Koregaon Park, Pune",
            price: "₹47,000",
            views: 189,
            enquiries: 12,
            favorites: 23,
            status: "Active",
            performance: "High"
        },
        {
            id: 2,
            title: "1.5 BHK Modern Flat",
            location: "Hinjawadi, Pune",
            price: "₹29,999",
            views: 128,
            enquiries: 8,
            favorites: 15,
            status: "Active",
            performance: "Medium"
        },
        {
            id: 3,
            title: "2 BHK Premium Apartment",
            location: "Wakad, Pune",
            price: "₹36,000",
            views: 245,
            enquiries: 18,
            favorites: 34,
            status: "Active",
            performance: "High"
        },
        {
            id: 4,
            title: "4.5 BHK Luxury Villa",
            location: "Baner, Pune",
            price: "₹3,00,000",
            views: 89,
            enquiries: 5,
            favorites: 12,
            status: "Active",
            performance: "Low"
        }
    ];

    const insights = [
        {
            title: "High demand in Koregaon Park",
            description: "Properties in Koregaon Park are getting 40% more views than average",
            type: "trend",
            impact: "positive"
        },
        {
            title: "Evening enquiries perform better",
            description: "Enquiries between 6-9 PM have 25% higher conversion rate",
            type: "timing",
            impact: "positive"
        },
        {
            title: "Consider reducing price for Baner property",
            description: "Similar properties in Baner are priced 15% lower",
            type: "pricing",
            impact: "warning"
        }
    ];

    const enquiries = [
        {
            id: 1,
            property: "3 BHK Luxury Apartment",
            user: "Rajesh Kumar",
            time: "2 hours ago",
            contact: "+91 98765 43210",
            status: "New"
        },
        {
            id: 2,
            property: "1.5 BHK Modern Flat",
            user: "Priya Sharma",
            time: "1 day ago",
            contact: "priya.sharma@email.com",
            status: "Contacted"
        },
        {
            id: 3,
            property: "2 BHK Premium Apartment",
            user: "Amit Patel",
            time: "2 days ago",
            contact: "+91 87654 32109",
            status: "Follow Up"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="p-2"
                        >
                            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Insights</h1>
                            <p className="text-xs text-gray-600">Owner Dashboard</p>
                        </div>
                    </div>
                    
                    <button className="p-2 bg-yellow-500 rounded-lg text-gray-900">
                        <Download size={18} />
                    </button>
                </div>

                {/* Mobile Time Range Selector */}
                <div className="px-4 pb-4">
                    <div className="relative">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm appearance-none"
                        >
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                            <option value="1y">Last year</option>
                        </select>
                        <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {showMobileMenu && (
                <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowMobileMenu(false)}>
                    <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">Navigation</h3>
                                <button onClick={() => setShowMobileMenu(false)} className="p-2">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            {['overview', 'properties', 'enquiries', 'analytics'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        setActiveTab(tab);
                                        setShowMobileMenu(false);
                                    }}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg ${activeTab === tab
                                        ? 'bg-yellow-50 text-yellow-600 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="p-3 md:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Desktop Header */}
                    <div className="hidden lg:block mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Owner Insights</h1>
                                <p className="text-gray-600 mt-1">Track performance and get actionable insights for your properties</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <select
                                        value={timeRange}
                                        onChange={(e) => setTimeRange(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-200"
                                    >
                                        <option value="7d">Last 7 days</option>
                                        <option value="30d">Last 30 days</option>
                                        <option value="90d">Last 90 days</option>
                                        <option value="1y">Last year</option>
                                    </select>
                                    <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex items-center gap-2">
                                    <Download size={18} />
                                    Export Report
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards - Mobile Optimized */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 md:mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-3 md:p-5">
                                <div className="flex items-center justify-between mb-2 md:mb-4">
                                    <div className={`p-1.5 md:p-2 rounded-lg ${stat.color}`}>
                                        {stat.icon}
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.changeType === 'up' ? <ArrowUp size={12} className="md:size-4" /> : <ArrowDown size={12} className="md:size-4" />}
                                        {stat.change}
                                    </div>
                                </div>
                                <div className="text-lg md:text-3xl font-bold text-gray-900 mb-0.5 md:mb-1">{stat.value}</div>
                                <div className="text-xs md:text-sm text-gray-600 truncate">{stat.title}</div>
                            </div>
                        ))}
                    </div>

                    {/* Tabs - Mobile Scrollable */}
                    <div className="mb-4 md:mb-6">
                        <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto scrollbar-hide">
                            {['overview', 'properties', 'enquiries', 'analytics'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-2.5 text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors ${activeTab === tab
                                        ? 'bg-white border-t border-l border-r border-gray-200 text-yellow-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                        {/* Left Column - Property Performance */}
                        <div className="lg:col-span-2">
                            {/* Properties Performance Table - Mobile Responsive */}
                            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 md:mb-6">
                                <div className="p-3 md:p-5 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base md:text-lg font-bold text-gray-900">Property Performance</h3>
                                        <button className="text-xs md:text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1">
                                            <Filter size={14} className="md:size-4" />
                                            <span className="hidden md:inline">Filter</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[600px]">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700">Property</th>
                                                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700">Views</th>
                                                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700">Enquiries</th>
                                                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700">Favorites</th>
                                                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700">Performance</th>
                                                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {properties.map((property) => (
                                                <tr key={property.id} className="hover:bg-gray-50">
                                                    <td className="py-3 md:py-4 px-3 md:px-4">
                                                        <div>
                                                            <div className="font-medium text-gray-900 text-sm md:text-base line-clamp-1">{property.title}</div>
                                                            <div className="text-xs md:text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                                                <MapPin size={10} className="md:size-3" />
                                                                <span className="truncate">{property.location}</span>
                                                            </div>
                                                            <div className="text-xs md:text-sm font-semibold text-gray-900 mt-1">{property.price}/month</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 md:py-4 px-3 md:px-4">
                                                        <div className="flex items-center gap-1 md:gap-2">
                                                            <Eye size={12} className="md:size-4 text-gray-400" />
                                                            <span className="font-medium text-sm md:text-base">{property.views}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 md:py-4 px-3 md:px-4">
                                                        <div className="flex items-center gap-1 md:gap-2">
                                                            <MessageSquare size={12} className="md:size-4 text-gray-400" />
                                                            <span className="font-medium text-sm md:text-base">{property.enquiries}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 md:py-4 px-3 md:px-4">
                                                        <div className="flex items-center gap-1 md:gap-2">
                                                            <Heart size={12} className="md:size-4 text-gray-400" />
                                                            <span className="font-medium text-sm md:text-base">{property.favorites}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 md:py-4 px-3 md:px-4">
                                                        <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium ${property.performance === 'High'
                                                            ? 'bg-green-100 text-green-700'
                                                            : property.performance === 'Medium'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            {property.performance}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 md:py-4 px-3 md:px-4">
                                                        <button className="p-1 md:p-2 hover:bg-gray-100 rounded-lg">
                                                            <MoreVertical size={14} className="md:size-5 text-gray-400" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Recent Enquiries - Mobile Cards */}
                            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200">
                                <div className="p-3 md:p-5 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base md:text-lg font-bold text-gray-900">Recent Enquiries</h3>
                                        <button className="text-xs md:text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                                            View All
                                        </button>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {enquiries.map((enquiry) => (
                                        <div key={enquiry.id} className="p-3 md:p-4 hover:bg-gray-50">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-gray-900 text-sm md:text-base">{enquiry.user}</div>
                                                    <div className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 line-clamp-1">{enquiry.property}</div>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs md:text-sm">
                                                        <div className="flex items-center gap-1 text-gray-500">
                                                            <Clock size={10} className="md:size-3" />
                                                            {enquiry.time}
                                                        </div>
                                                     
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 self-start">
                                                    <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium ${enquiry.status === 'New'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : enquiry.status === 'Contacted'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {enquiry.status}
                                                    </span>
                                                    <button className="px-2 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 text-xs md:text-sm font-bold rounded hover:from-yellow-600 hover:to-yellow-500 transition-all whitespace-nowrap">
                                                        Contact
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Insights & Tips */}
                        <div className="space-y-4 md:space-y-6">
                            {/* AI Insights */}
                            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200">
                                <div className="p-3 md:p-5 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <TrendingUp size={16} className="md:size-5 text-yellow-500" />
                                            <span className="hidden md:inline">AI Insights</span>
                                            <span className="md:hidden">Insights</span>
                                        </h3>
                                        <Share2 size={14} className="md:size-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                    </div>
                                </div>

                                <div className="p-3 md:p-5 space-y-3 md:space-y-4">
                                    {insights.map((insight, index) => (
                                        <div key={index} className="p-2 md:p-3 rounded-lg border hover:border-yellow-300 transition-colors cursor-pointer">
                                            <div className="flex items-start gap-2 md:gap-3">
                                                <div className={`p-1.5 md:p-2 rounded-lg flex-shrink-0 ${insight.impact === 'positive'
                                                    ? 'bg-green-50 text-green-600'
                                                    : insight.impact === 'warning'
                                                        ? 'bg-yellow-50 text-yellow-600'
                                                        : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                    {insight.type === 'trend' && <TrendingUp size={12} className="md:size-4" />}
                                                    {insight.type === 'timing' && <Clock size={12} className="md:size-4" />}
                                                    {insight.type === 'pricing' && <DollarSign size={12} className="md:size-4" />}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-medium text-gray-900 text-sm md:text-base mb-0.5 md:mb-1 line-clamp-1">{insight.title}</div>
                                                    <div className="text-xs md:text-sm text-gray-600 line-clamp-2">{insight.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg md:rounded-xl p-3 md:p-5">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Quick Actions</h3>
                                <div className="space-y-2 md:space-y-3">
                                    <button className="w-full flex items-center justify-between p-2 md:p-3 bg-white border border-gray-200 rounded-lg hover:border-yellow-400 hover:shadow-sm transition-all">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="p-1.5 md:p-2 bg-yellow-50 rounded-lg">
                                                <Building size={14} className="md:size-5 text-yellow-500" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-medium text-gray-900 text-sm md:text-base">Add Property</div>
                                                <div className="text-xs text-gray-500">List in minutes</div>
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className="md:size-5 text-gray-400" />
                                    </button>

                                    <button className="w-full flex items-center justify-between p-2 md:p-3 bg-white border border-gray-200 rounded-lg hover:border-yellow-400 hover:shadow-sm transition-all">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="p-1.5 md:p-2 bg-blue-50 rounded-lg">
                                                <BarChart3 size={14} className="md:size-5 text-blue-500" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-medium text-gray-900 text-sm md:text-base">View Reports</div>
                                                <div className="text-xs text-gray-500">Advanced analytics</div>
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className="md:size-5 text-gray-400" />
                                    </button>

                                    <button className="w-full flex items-center justify-between p-2 md:p-3 bg-white border border-gray-200 rounded-lg hover:border-yellow-400 hover:shadow-sm transition-all">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="p-1.5 md:p-2 bg-green-50 rounded-lg">
                                                <DollarSign size={14} className="md:size-5 text-green-500" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-medium text-gray-900 text-sm md:text-base">Update Pricing</div>
                                                <div className="text-xs text-gray-500">Optimize prices</div>
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className="md:size-5 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Performance Tips */}
                            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-3 md:p-5">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Performance Tips</h3>
                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex items-start gap-2 md:gap-3">
                                        <div className="p-1.5 md:p-2 bg-yellow-50 rounded-lg flex-shrink-0">
                                            <Star size={12} className="md:size-4 text-yellow-500" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-medium text-gray-900 text-sm md:text-base mb-0.5 md:mb-1">Better Photos</div>
                                            <div className="text-xs md:text-sm text-gray-600">Professional photos get 40% more views</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2 md:gap-3">
                                        <div className="p-1.5 md:p-2 bg-green-50 rounded-lg flex-shrink-0">
                                            <Clock size={12} className="md:size-4 text-green-500" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-medium text-gray-900 text-sm md:text-base mb-0.5 md:mb-1">Fast Response</div>
                                            <div className="text-xs md:text-sm text-gray-600">Respond within 1 hour for 60% better conversion</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2 md:gap-3">
                                        <div className="p-1.5 md:p-2 bg-blue-50 rounded-lg flex-shrink-0">
                                            <DollarSign size={12} className="md:size-4 text-blue-500" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-medium text-gray-900 text-sm md:text-base mb-0.5 md:mb-1">Competitive Pricing</div>
                                            <div className="text-xs md:text-sm text-gray-600">Price within 5% of market average</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
                <div className="flex justify-around items-center h-16">
                    {['overview', 'properties', 'enquiries', 'analytics'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === tab
                                ? 'text-yellow-600'
                                : 'text-gray-500'
                                }`}
                        >
                            <div className="text-xs font-medium capitalize">
                                {tab === 'overview' && 'Home'}
                                {tab === 'properties' && 'Properties'}
                                {tab === 'enquiries' && 'Enquiries'}
                                {tab === 'analytics' && 'Analytics'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Content Padding for Bottom Nav */}
            <div className="pb-16 lg:pb-0"></div>
        </div>
    );
}

export default Insights;