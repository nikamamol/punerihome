import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, Filter, MessageSquare, User, Phone, Mail,
  Clock, CheckCircle, XCircle, ChevronRight,
  Star, Eye, Reply, Archive, Trash2, ExternalLink,
  ChevronLeft
} from 'lucide-react';

const INITIAL_INQUIRIES = [
  {
    id: 1,
    propertyId: 101,
    propertyTitle: "2 BHK Apartment in Hinjewadi",
    userName: "Rahul Sharma",
    userPhone: "+91 9876543210",
    userEmail: "rahul.sharma@email.com",
    message: "Hi, I'm interested in this property. Could you please share more details about the maintenance charges and amenities?",
    date: "2024-02-15 10:30 AM",
    status: "unread",
    priority: "high",
    source: "website",
    followUpDate: "2024-02-17",
    notes: "Needs 2 BHK for family",
    lastContacted: "2024-02-15",
    tags: ["Family", "Urgent"]
  },
  {
    id: 2,
    propertyId: 102,
    propertyTitle: "3 BHK Villa in Wakad",
    userName: "Priya Patel",
    userPhone: "+91 9876543211",
    userEmail: "priya.patel@email.com",
    message: "Is this property available for immediate possession? Also, what are the parking facilities?",
    date: "2024-02-14 03:45 PM",
    status: "read",
    priority: "medium",
    source: "phone",
    followUpDate: "2024-02-16",
    notes: "Looking for gated community",
    lastContacted: "2024-02-14",
    tags: ["Working Professional"]
  },
  {
    id: 3,
    propertyId: 103,
    propertyTitle: "4 BHK Penthouse in Baner",
    userName: "Amit Singh",
    userPhone: "+91 9876543212",
    userEmail: "amit.singh@email.com",
    message: "Can we schedule a site visit this weekend? I'm particularly interested in the balcony view.",
    date: "2024-02-14 11:20 AM",
    status: "replied",
    priority: "high",
    source: "whatsapp",
    followUpDate: "2024-02-15",
    notes: "NRIs, visiting next week",
    lastContacted: "2024-02-14",
    tags: ["NRI", "Premium"]
  },
  {
    id: 4,
    propertyId: 101,
    propertyTitle: "2 BHK Apartment in Hinjewadi",
    userName: "Sneha Gupta",
    userPhone: "+91 9876543213",
    userEmail: "sneha.gupta@email.com",
    message: "What is the exact location and nearby schools/hospitals? Also, is the society pet-friendly?",
    date: "2024-02-13 02:15 PM",
    status: "archived",
    priority: "low",
    source: "website",
    followUpDate: "2024-02-18",
    notes: "Has pets, needs pet-friendly society",
    lastContacted: "2024-02-13",
    tags: ["Pet Owner"]
  },
  {
    id: 5,
    propertyId: 104,
    propertyTitle: "1 BHK Studio in Kothrud",
    userName: "Vikram Joshi",
    userPhone: "+91 9876543214",
    userEmail: "vikram.joshi@email.com",
    message: "Interested for bachelor accommodation. What's the minimum lease period and deposit amount?",
    date: "2024-02-12 09:45 AM",
    status: "unread",
    priority: "medium",
    source: "website",
    followUpDate: "2024-02-14",
    notes: "Bachelor, IT professional",
    lastContacted: "2024-02-12",
    tags: ["Bachelor", "IT"]
  }
];

const STATUS_CONFIG = {
  unread: {
    color: 'bg-blue-100 text-blue-800 border border-blue-200',
    icon: MessageSquare,
    label: 'Unread'
  },
  read: {
    color: 'bg-gray-100 text-gray-800 border border-gray-200',
    icon: Eye,
    label: 'Read'
  },
  replied: {
    color: 'bg-green-100 text-green-800 border border-green-200',
    icon: CheckCircle,
    label: 'Replied'
  },
  archived: {
    color: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    icon: Archive,
    label: 'Archived'
  }
};

const PRIORITY_CONFIG = {
  high: { color: 'bg-red-100 text-red-800', label: 'High' },
  medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
  low: { color: 'bg-green-100 text-green-800', label: 'Low' }
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'priority', label: 'Priority High-Low' }
];

const Inquiries = () => {
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Memoized statistics
  const stats = useMemo(() => ({
    totalInquiries: inquiries.length,
    unreadInquiries: inquiries.filter(i => i.status === 'unread').length,
    todayInquiries: inquiries.filter(i => 
      new Date(i.date).toDateString() === new Date().toDateString()
    ).length,
    conversionRate: '15%'
  }), [inquiries]);

  // Memoized status items with counts
  const statusItems = useMemo(() => [
    { id: 'all', label: 'All', count: inquiries.length },
    ...Object.entries(STATUS_CONFIG).map(([key, value]) => ({
      id: key,
      label: value.label,
      count: inquiries.filter(i => i.status === key).length
    }))
  ], [inquiries]);

  const priorityItems = useMemo(() => [
    { id: 'all', label: 'All' },
    ...Object.entries(PRIORITY_CONFIG).map(([key, value]) => ({
      id: key,
      label: value.label
    }))
  ], []);

  // Memoized filtered inquiries
  const filteredInquiries = useMemo(() => {
    let result = [...inquiries];
    
    // Apply filters
    if (statusFilter !== 'all') {
      result = result.filter(inq => inq.status === statusFilter);
    }
    
    if (priorityFilter !== 'all') {
      result = result.filter(inq => inq.priority === priorityFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(inq =>
        inq.userName.toLowerCase().includes(term) ||
        inq.propertyTitle.toLowerCase().includes(term) ||
        inq.message.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    const sortFunctions = {
      newest: (a, b) => new Date(b.date) - new Date(a.date),
      oldest: (a, b) => new Date(a.date) - new Date(b.date),
      priority: (a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    };
    
    return result.sort(sortFunctions[sortBy] || sortFunctions.newest);
  }, [inquiries, statusFilter, priorityFilter, searchTerm, sortBy]);

  // Memoized utility functions
  const formatDate = useCallback((dateString) => {
    const options = { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  }, []);

  // Action handlers
  const updateInquiryStatus = useCallback((id, newStatus) => {
    setInquiries(prev => prev.map(inq => 
      inq.id === id ? { ...inq, status: newStatus } : inq
    ));
  }, []);

  const handleMarkAsRead = useCallback((id) => updateInquiryStatus(id, 'read'), [updateInquiryStatus]);
  const handleMarkAsReplied = useCallback((id) => updateInquiryStatus(id, 'replied'), [updateInquiryStatus]);
  const handleArchive = useCallback((id) => updateInquiryStatus(id, 'archived'), [updateInquiryStatus]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    }
  }, []);

  const handleReply = useCallback((id) => {
    if (replyText.trim()) {
      alert(`Reply sent to inquiry ${id}: ${replyText}`);
      setReplyText('');
      handleMarkAsReplied(id);
    }
  }, [replyText, handleMarkAsReplied]);

  const handleViewProperty = useCallback((propertyId) => {
    alert(`View property ${propertyId}`);
  }, []);

  const handleCall = useCallback((phone) => {
    alert(`Calling ${phone}`);
  }, []);

  const handleEmail = useCallback((email) => {
    alert(`Emailing ${email}`);
  }, []);

  // Component render helpers
  const renderStatusBadge = (status) => {
    const config = STATUS_CONFIG[status];
    if (!config) return null;
    
    const Icon = config.icon;
    return (
      <span className={`px-2 py-1 text-xs rounded flex items-center gap-1 ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const renderPriorityBadge = (priority) => {
    const config = PRIORITY_CONFIG[priority];
    if (!config) return null;
    
    return (
      <span className={`px-2 py-1 text-xs rounded ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Sub-components
  const MobileHeader = () => (
    <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {selectedInquiry ? (
            <button onClick={() => setSelectedInquiry(null)} className="p-2">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
          )}
          <div>
            <h1 className="font-bold text-gray-900">Inquiries</h1>
            <p className="text-xs text-gray-500">
              {selectedInquiry ? 'Inquiry Details' : `${filteredInquiries.length} inquiries`}
            </p>
          </div>
        </div>
        
        {!selectedInquiry && (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="p-2 rounded-lg bg-gray-100"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg">
              Quick Reply
            </button>
          </div>
        )}
      </div>

      {!selectedInquiry && (
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="bg-blue-50 p-2 rounded-lg">
            <div className="text-xs text-blue-600">Total</div>
            <div className="font-bold text-sm">{stats.totalInquiries}</div>
          </div>
          <div className="bg-red-50 p-2 rounded-lg">
            <div className="text-xs text-red-600">Unread</div>
            <div className="font-bold text-sm text-red-600">{stats.unreadInquiries}</div>
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <div className="text-xs text-green-600">Today</div>
            <div className="font-bold text-sm text-green-600">{stats.todayInquiries}</div>
          </div>
          <div className="bg-yellow-50 p-2 rounded-lg">
            <div className="text-xs text-yellow-600">Conv.</div>
            <div className="font-bold text-sm text-yellow-600">{stats.conversionRate}</div>
          </div>
        </div>
      )}
    </div>
  );

  const MobileFilters = () => (
    showMobileFilters && !selectedInquiry && (
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inquiries..."
              className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <div className="text-xs font-medium text-gray-700 mb-2">Status</div>
            <div className="flex flex-wrap gap-2">
              {statusItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setStatusFilter(item.id)}
                  className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 ${
                    statusFilter === item.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {item.id === 'all' ? <MessageSquare className="w-3 h-3" /> : renderStatusBadge(item.id)}
                  <span>{item.label}</span>
                  <span className={`${statusFilter === item.id ? 'bg-gray-700' : 'bg-gray-200'} px-1.5 py-0.5 rounded text-xs`}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-medium text-gray-700 mb-2">Priority</div>
              <select
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                {priorityItems.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-700 mb-2">Sort By</div>
              <select
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const InquiryListItem = ({ inquiry }) => (
    <div 
      onClick={() => setSelectedInquiry(inquiry)}
      className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer ${
        inquiry.status === 'unread' ? 'border-l-4 border-blue-500' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{inquiry.userName}</h3>
            <div className="flex items-center gap-2 mt-1">
              {renderPriorityBadge(inquiry.priority)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">{formatDate(inquiry.date)}</div>
          <div className="mt-1">
            {renderStatusBadge(inquiry.status)}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-sm font-medium text-gray-900 mb-1">{inquiry.propertyTitle}</div>
        <p className="text-sm text-gray-600 line-clamp-2">{inquiry.message}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCall(inquiry.userPhone);
            }}
            className="p-1.5 bg-gray-100 rounded-lg"
          >
            <Phone className="w-3.5 h-3.5 text-gray-600" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEmail(inquiry.userEmail);
            }}
            className="p-1.5 bg-gray-100 rounded-lg"
          >
            <Mail className="w-3.5 h-3.5 text-gray-600" />
          </button>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );

  const DesktopFilters = () => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {statusItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setStatusFilter(item.id)}
              className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition-all ${
                statusFilter === item.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.id === 'all' ? <MessageSquare className="w-3 h-3" /> : renderStatusBadge(item.id)}
              <span>{item.label}</span>
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {item.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, property, message..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            {priorityItems.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const InquiryDetailView = ({ inquiry, onClose }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{inquiry.userName}</h3>
          <div className="flex items-center gap-2 mt-1">
            {renderStatusBadge(inquiry.status)}
            {renderPriorityBadge(inquiry.priority)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button 
          onClick={() => handleCall(inquiry.userPhone)}
          className="flex items-center justify-center gap-2 p-2 bg-blue-50 text-blue-700 rounded-lg"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">Call</span>
        </button>
        <button 
          onClick={() => handleEmail(inquiry.userEmail)}
          className="flex items-center justify-center gap-2 p-2 bg-gray-50 text-gray-700 rounded-lg"
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">Email</span>
        </button>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Property</div>
        <div className="font-medium text-gray-900">{inquiry.propertyTitle}</div>
        <button 
          onClick={() => handleViewProperty(inquiry.propertyId)}
          className="text-xs text-blue-600 mt-1 flex items-center gap-1"
        >
          <ExternalLink className="w-3 h-3" />
          View Property
        </button>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Message</div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{inquiry.message}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-xs text-gray-500">Received</div>
          <div className="text-sm font-medium">{formatDate(inquiry.date)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Last Contacted</div>
          <div className="text-sm font-medium">{inquiry.lastContacted}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Source</div>
          <div className="text-sm font-medium capitalize">{inquiry.source}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Follow-up</div>
          <div className="text-sm font-medium">{inquiry.followUpDate}</div>
        </div>
      </div>

      {inquiry.notes && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">Notes</div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-700">{inquiry.notes}</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="text-xs text-gray-500 mb-2">Tags</div>
        <div className="flex flex-wrap gap-2">
          {inquiry.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Reply</div>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg text-sm mb-3"
          rows="3"
          placeholder="Type your reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleReply(inquiry.id)}
            className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2"
          >
            <Reply className="w-4 h-4" />
            Send Reply
          </button>
          <button
            onClick={() => handleMarkAsReplied(inquiry.id)}
            className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg"
          >
            Mark Replied
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-200">
        <button onClick={() => handleMarkAsRead(inquiry.id)} className="px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded-lg">
          Mark Read
        </button>
        <button onClick={() => handleArchive(inquiry.id)} className="px-3 py-2 text-xs bg-yellow-50 text-yellow-700 rounded-lg">
          Archive
        </button>
        <button onClick={() => handleDelete(inquiry.id)} className="px-3 py-2 text-xs bg-red-50 text-red-700 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12 px-4">
      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <MessageSquare className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
      <p className="text-gray-600 text-sm">
        {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
          ? "Try adjusting your filters"
          : "No inquiries yet"}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader />
      <MobileFilters />
      
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {selectedInquiry ? (
          <div className="p-4">
            <button onClick={() => setSelectedInquiry(null)} className="flex items-center gap-2 text-blue-600 mb-4">
              <ChevronLeft className="w-4 h-4" />
              Back to Inquiries
            </button>
            <InquiryDetailView inquiry={selectedInquiry} onClose={() => setSelectedInquiry(null)} />
          </div>
        ) : (
          <div className="p-2">
            {filteredInquiries.length > 0 ? (
              <div className="space-y-2">
                {filteredInquiries.map((inquiry) => (
                  <InquiryListItem key={inquiry.id} inquiry={inquiry} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block p-4">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Inquiries</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage all property inquiries and customer messages
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-gray-600">Avg. Response Time</div>
                <div className="text-sm font-semibold text-gray-900">2.5 hours</div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Quick Reply Template
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-gray-600">Total Inquiries</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{stats.totalInquiries}</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-4 h-4 text-red-600" />
                <span className="text-xs text-gray-600">Unread</span>
              </div>
              <div className="text-xl font-bold text-red-600">{stats.unreadInquiries}</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-600">Today</span>
              </div>
              <div className="text-xl font-bold text-green-600">{stats.todayInquiries}</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Star className="w-4 h-4 text-yellow-600" />
                <span className="text-xs text-gray-600">Conversion</span>
              </div>
              <div className="text-xl font-bold text-yellow-600">{stats.conversionRate}</div>
            </div>
          </div>
        </div>

        <DesktopFilters />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {filteredInquiries.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry) => (
                    <div 
                      key={inquiry.id} 
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        inquiry.status === 'unread' ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{inquiry.userName}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  {renderStatusBadge(inquiry.status)}
                                  {renderPriorityBadge(inquiry.priority)}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500">{formatDate(inquiry.date)}</div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewProperty(inquiry.propertyId);
                                }}
                                className="mt-1 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                View Property
                              </button>
                            </div>
                          </div>

                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                              Property: {inquiry.propertyTitle}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {inquiry.message}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {inquiry.tags.map((tag, index) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-3 mt-2 sm:mt-0">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCall(inquiry.userPhone);
                                }}
                                className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600"
                              >
                                <Phone className="w-3 h-3" />
                                {inquiry.userPhone}
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEmail(inquiry.userEmail);
                                }}
                                className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600"
                              >
                                <Mail className="w-3 h-3" />
                                Email
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          Source: {inquiry.source} • Follow-up: {inquiry.followUpDate}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(inquiry.id);
                            }}
                            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
                          >
                            Mark Read
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArchive(inquiry.id);
                            }}
                            className="px-3 py-1 text-xs bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded"
                          >
                            Archive
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(inquiry.id);
                            }}
                            className="px-3 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-700 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            {selectedInquiry ? (
              <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Inquiry Details</h3>
                  <button onClick={() => setSelectedInquiry(null)} className="text-gray-400 hover:text-gray-600">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                <InquiryDetailView inquiry={selectedInquiry} onClose={() => setSelectedInquiry(null)} />
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Inquiry</h3>
                <p className="text-gray-600 text-sm">
                  Click on any inquiry from the list to view details and respond
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiries;