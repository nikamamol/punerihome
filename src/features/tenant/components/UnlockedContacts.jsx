import React, { useState } from "react";
import {
  Phone,
  User,
  Calendar,
  Building,
  MapPin,
  DollarSign,
  MessageSquare,
  Clock,
  Download,
  Filter,
  Search,
  X,
  Copy,
  Star,
  Eye,
  Heart,
  ChevronRight,
  PhoneCall,
  Mail,
} from "lucide-react";

function UnlockedContacts() {
  // Sample unlocked contacts data
  const [unlockedContacts, setUnlockedContacts] = useState([
    {
      id: 1,
      ownerName: "Rajesh Kumar",
      ownerEmail: "rajesh@email.com",
      phone: "+91 98765 43210",
      property: "Luxury 3BHK Villa",
      propertyLocation: "Koregaon Park, Pune",
      propertyPrice: "₹2.5 Cr",
      unlockDate: "2024-02-22",
      unlockTime: "14:30",
      creditsUsed: 1,
      lastContacted: "2024-02-22",
      contactStatus: "active",
      responseRate: "95%",
      rating: 4.8,
      notes: "Very responsive, flexible with timings",
      viewedCount: 3,
      liked: true,
    },
    {
      id: 2,
      ownerName: "Priya Sharma",
      ownerEmail: "priya@email.com",
      phone: "+91 98765 43211",
      property: "Modern 2BHK Flat",
      propertyLocation: "Kalyani Nagar, Pune",
      propertyPrice: "₹85 L",
      unlockDate: "2024-02-21",
      unlockTime: "11:15",
      creditsUsed: 1,
      lastContacted: "2024-02-21",
      contactStatus: "active",
      responseRate: "85%",
      rating: 4.5,
      notes: "Prefers WhatsApp communication",
      viewedCount: 2,
      liked: false,
    },
    {
      id: 3,
      ownerName: "Amit Patel",
      ownerEmail: "amit@email.com",
      phone: "+91 98765 43212",
      property: "1BHK Studio Apartment",
      propertyLocation: "Viman Nagar, Pune",
      propertyPrice: "₹45 L",
      unlockDate: "2024-02-20",
      unlockTime: "16:45",
      creditsUsed: 1,
      lastContacted: "2024-02-20",
      contactStatus: "pending",
      responseRate: "70%",
      rating: 4.2,
      notes: "Waiting for property visit schedule",
      viewedCount: 1,
      liked: true,
    },
    {
      id: 4,
      ownerName: "Vikram Singh",
      ownerEmail: "vikram@email.com",
      phone: "+91 98765 43213",
      property: "Premium 4BHK Penthouse",
      propertyLocation: "Baner, Pune",
      propertyPrice: "₹3.8 Cr",
      unlockDate: "2024-02-18",
      unlockTime: "10:00",
      creditsUsed: 1,
      lastContacted: "2024-02-19",
      contactStatus: "active",
      responseRate: "90%",
      rating: 4.9,
      notes: "Professional owner, quick responses",
      viewedCount: 4,
      liked: true,
    },
    {
      id: 5,
      ownerName: "Neha Gupta",
      ownerEmail: "neha@email.com",
      phone: "+91 98765 43214",
      property: "2BHK Garden View Apartment",
      propertyLocation: "Aundh, Pune",
      propertyPrice: "₹65 L",
      unlockDate: "2024-02-15",
      unlockTime: "13:20",
      creditsUsed: 1,
      lastContacted: "2024-02-16",
      contactStatus: "inactive",
      responseRate: "60%",
      rating: 4.3,
      notes: "Slow to respond, busy schedule",
      viewedCount: 2,
      liked: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredContacts, setFilteredContacts] = useState(unlockedContacts);

  // Filter contacts
  React.useEffect(() => {
    let filtered = [...unlockedContacts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (contact) =>
          contact.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.propertyLocation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.contactStatus === statusFilter);
    }

    setFilteredContacts(filtered);
  }, [searchQuery, statusFilter, unlockedContacts]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    alert("Phone number copied to clipboard!");
  };

  const stats = {
    total: unlockedContacts.length,
    active: unlockedContacts.filter(c => c.contactStatus === "active").length,
    totalCreditsUsed: unlockedContacts.reduce((sum, c) => sum + c.creditsUsed, 0),
    avgRating: (unlockedContacts.reduce((sum, c) => sum + c.rating, 0) / unlockedContacts.length).toFixed(1),
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Unlocked Contacts</h1>
        <p className="text-sm text-gray-600 mt-1">
          {unlockedContacts.length} owner contacts unlocked • Accessible anytime
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-600">Total Unlocked</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">{stats.active}</div>
          <div className="text-xs text-green-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-700">{stats.totalCreditsUsed}</div>
          <div className="text-xs text-blue-600">Credits Used</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-yellow-200">
          <div className="text-xl font-bold text-yellow-700">{stats.avgRating}</div>
          <div className="text-xs text-yellow-600">Avg Rating</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              placeholder="Search owner or property..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
            <PhoneCall className="w-4 h-4" />
            Call All Active
          </button>
        </div>
      </div>

      {/* Unlocked Contacts List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              {/* Left Column - Owner Info */}
              <div className="md:w-1/3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">{contact.ownerName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.contactStatus)}`}>
                        {contact.contactStatus}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-gray-500" />
                        <span className="font-medium text-gray-900">{contact.phone}</span>
                        <button
                          onClick={() => handleCopyPhone(contact.phone)}
                          className="p-1 text-blue-600 hover:text-blue-700"
                          title="Copy phone number"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">{contact.ownerEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column - Property Info */}
              <div className="md:w-1/3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{contact.property}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">{contact.propertyLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-3 h-3 text-gray-500" />
                    <span className="font-medium text-gray-900">{contact.propertyPrice}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Actions & Info */}
              <div className="md:w-1/3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">Unlocked:</div>
                    <div className="font-medium">
                      {formatDate(contact.unlockDate)} at {contact.unlockTime}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{contact.rating}</span>
                      <span className="text-xs text-gray-500">({contact.responseRate})</span>
                    </div>
                    <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {contact.creditsUsed} credit used
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes and Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Last contacted: {formatDate(contact.lastContacted)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Viewed: {contact.viewedCount} times
                  </div>
                  {contact.liked && (
                    <div className="flex items-center gap-1 text-red-600">
                      <Heart className="w-3 h-3 fill-red-500" />
                      Liked
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {contact.notes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <PhoneCall className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No unlocked contacts found</h3>
          <p className="text-gray-600 mt-1 mb-4">
            {searchQuery || statusFilter !== "all"
              ? "Try changing your filters"
              : "Unlock property contacts to see them here"}
          </p>
          {searchQuery || statusFilter !== "all" ? (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          ) : (
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Browse Properties
            </button>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-green-900">Your Unlocked Contacts</h3>
            <p className="text-sm text-green-700">
              {stats.active} active contacts • {stats.totalCreditsUsed} credits spent
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-green-900">
              Average Response Rate: {(unlockedContacts.reduce((sum, c) => sum + parseInt(c.responseRate), 0) / unlockedContacts.length).toFixed(0)}%
            </div>
            <div className="text-xs text-green-700">
              Most recent unlock: {formatDate(unlockedContacts[0]?.unlockDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnlockedContacts;