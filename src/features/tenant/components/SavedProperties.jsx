import React, { useState } from "react";
import {
  Search,
  Filter,
  Heart,
  Bookmark,
  MapPin,
  Building,
  DollarSign,
  Bed,
  Bath,
  Square,
  Eye,
  Phone,
  MessageSquare,
  X,
  MoreVertical,
  SortAsc,
  SortDesc,
  RefreshCw,
  Home,
  Star,
  Calendar,
  Clock,
  Unlock,
} from "lucide-react";

function SavedProperties() {
  // Sample saved properties data
  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      title: "Luxury 3BHK Villa with Pool",
      location: "Koregaon Park, Pune",
      price: "₹2.5 Cr",
      type: "Villa",
      bhk: "3 BHK",
      area: "2800 sq ft",
      savedDate: "2024-02-22",
      lastViewed: "2024-02-22",
      views: 245,
      likes: 89,
      status: "Available",
      owner: "Rajesh Kumar",
      contactUnlocked: true,
      contactDetails: "+91 98765 43210",
      features: ["Swimming Pool", "Garden", "Parking", "Gym", "Power Backup"],
      images: ["villa1.jpg", "villa2.jpg", "villa3.jpg"],
      rating: 4.8,
      description: "Spacious luxury villa with modern amenities and premium finishes in prime location.",
    },
    {
      id: 2,
      title: "Modern 2BHK Premium Apartment",
      location: "Kalyani Nagar, Pune",
      price: "₹85 L",
      type: "Apartment",
      bhk: "2 BHK",
      area: "1250 sq ft",
      savedDate: "2024-02-20",
      lastViewed: "2024-02-21",
      views: 189,
      likes: 56,
      status: "Available",
      owner: "Priya Sharma",
      contactUnlocked: false,
      features: ["Fully Furnished", "Parking", "Security", "Lift"],
      images: ["apt1.jpg", "apt2.jpg"],
      rating: 4.5,
      description: "Well-maintained apartment with beautiful views and modern amenities.",
    },
    {
      id: 3,
      title: "1BHK Studio with Balcony",
      location: "Viman Nagar, Pune",
      price: "₹45 L",
      type: "Studio",
      bhk: "1 BHK",
      area: "650 sq ft",
      savedDate: "2024-02-18",
      lastViewed: "2024-02-19",
      views: 124,
      likes: 32,
      status: "Under Negotiation",
      owner: "Amit Patel",
      contactUnlocked: true,
      contactDetails: "+91 98765 43212",
      features: ["Furnished", "Balcony", "Parking", "24x7 Water"],
      images: ["studio1.jpg"],
      rating: 4.2,
      description: "Compact studio apartment perfect for singles or couples.",
    },
    {
      id: 4,
      title: "Premium 4BHK Penthouse",
      location: "Baner, Pune",
      price: "₹3.8 Cr",
      type: "Penthouse",
      bhk: "4 BHK",
      area: "3200 sq ft",
      savedDate: "2024-02-15",
      lastViewed: "2024-02-17",
      views: 312,
      likes: 128,
      status: "Available",
      owner: "Vikram Singh",
      contactUnlocked: false,
      features: ["Terrace Garden", "Private Pool", "Jacuzzi", "Home Theater"],
      images: ["pent1.jpg", "pent2.jpg", "pent3.jpg", "pent4.jpg"],
      rating: 4.9,
      description: "Luxury penthouse with panoramic city views and premium amenities.",
    },
    {
      id: 5,
      title: "2BHK Garden View Apartment",
      location: "Aundh, Pune",
      price: "₹65 L",
      type: "Apartment",
      bhk: "2 BHK",
      area: "1100 sq ft",
      savedDate: "2024-02-12",
      lastViewed: "2024-02-14",
      views: 156,
      likes: 48,
      status: "Sold Out",
      owner: "Neha Gupta",
      contactUnlocked: true,
      contactDetails: "+91 98765 43213",
      features: ["Garden View", "Parking", "Play Area", "Community Hall"],
      images: ["garden1.jpg", "garden2.jpg"],
      rating: 4.3,
      description: "Peaceful apartment overlooking garden in family-friendly society.",
    },
    {
      id: 6,
      title: "Commercial Space for Office",
      location: "FC Road, Pune",
      price: "₹1.2 Cr",
      type: "Commercial",
      bhk: "Office Space",
      area: "1800 sq ft",
      savedDate: "2024-02-10",
      lastViewed: "2024-02-11",
      views: 98,
      likes: 25,
      status: "Available",
      owner: "Tech Spaces Ltd",
      contactUnlocked: false,
      features: ["AC", "WiFi Ready", "Parking", "Conference Room"],
      images: ["office1.jpg", "office2.jpg"],
      rating: 4.1,
      description: "Ready-to-move office space in prime commercial location.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [filteredProperties, setFilteredProperties] = useState(savedProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Filter and search properties
  React.useEffect(() => {
    let filtered = [...savedProperties];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((property) => property.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((property) => property.type === typeFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.savedDate) - new Date(a.savedDate);
      } else if (sortBy === "oldest") {
        return new Date(a.savedDate) - new Date(b.savedDate);
      } else if (sortBy === "price-high") {
        return parsePrice(b.price) - parsePrice(a.price);
      } else if (sortBy === "price-low") {
        return parsePrice(a.price) - parsePrice(b.price);
      } else if (sortBy === "views-high") {
        return b.views - a.views;
      } else if (sortBy === "rating-high") {
        return b.rating - a.rating;
      }
      return 0;
    });

    setFilteredProperties(filtered);
  }, [searchQuery, statusFilter, typeFilter, sortBy, savedProperties]);

  const parsePrice = (priceString) => {
    return parseInt(priceString.replace(/[^0-9]/g, ""));
  };

  const handleRemoveSaved = (propertyId) => {
    setSavedProperties(savedProperties.filter(property => property.id !== propertyId));
  };

  const handleUnlockContact = (propertyId) => {
    setSavedProperties(savedProperties.map(property =>
      property.id === propertyId
        ? { ...property, contactUnlocked: true, contactDetails: "+91 XXXXX XXXXX" }
        : property
    ));
    alert("Contact unlocked successfully!");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Under Negotiation": return "bg-yellow-100 text-yellow-800";
      case "Sold Out": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Saved Properties</h1>
            <p className="text-sm text-gray-600 mt-1">
              {savedProperties.length} properties saved • Manage your favorite listings
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              Refresh
            </button>
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Search New Properties
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xl font-bold text-gray-900">{savedProperties.length}</div>
          <div className="text-xs text-gray-600">Total Saved</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">
            {savedProperties.filter(p => p.status === "Available").length}
          </div>
          <div className="text-xs text-green-600">Available</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-700">
            {savedProperties.filter(p => p.contactUnlocked).length}
          </div>
          <div className="text-xs text-blue-600">Contacts Unlocked</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="text-xl font-bold text-purple-700">
            {savedProperties.filter(p => p.status === "Under Negotiation").length}
          </div>
          <div className="text-xs text-purple-600">In Negotiation</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                placeholder="Search saved properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Under Negotiation">Under Negotiation</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Recently Saved</option>
              <option value="oldest">Oldest Saved</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="views-high">Most Viewed</option>
              <option value="rating-high">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {searchQuery && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Search: {searchQuery}
              <button onClick={() => setSearchQuery("")} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {statusFilter !== "all" && (
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Status: {statusFilter}
              <button onClick={() => setStatusFilter("all")} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {typeFilter !== "all" && (
            <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Type: {typeFilter}
              <button onClick={() => setTypeFilter("all")} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Saved Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Property Image/Icon */}
            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <Building className="w-16 h-16 text-blue-400" />
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
                <button
                  onClick={() => handleRemoveSaved(property.id)}
                  className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-50"
                  title="Remove from saved"
                >
                  <Bookmark className="w-4 h-4 fill-red-500" />
                </button>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-4">
              {/* Title and Price */}
              <div className="mb-3">
                <h3 className="font-bold text-gray-900 line-clamp-1">{property.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>
                  <div className="text-lg font-bold text-blue-700">{property.price}</div>
                </div>
              </div>

              {/* Property Specs */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-center gap-1 text-sm font-medium text-gray-900">
                    <Bed className="w-3 h-3" />
                    {property.bhk}
                  </div>
                  <div className="text-xs text-gray-500">Type</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-sm font-medium text-gray-900">{property.area}</div>
                  <div className="text-xs text-gray-500">Area</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                  </div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {property.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                  {property.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{property.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Stats and Dates */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {property.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {property.likes}
                  </div>
                </div>
                <div className="text-right">
                  <div>Saved: {formatDate(property.savedDate)}</div>
                  <div>Viewed: {formatDate(property.lastViewed)}</div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-900">Owner: {property.owner}</div>
                  {property.contactUnlocked ? (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Phone className="w-3 h-3" />
                      Contact Unlocked
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Contact Locked</div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {property.contactUnlocked ? (
                    <a
                      href={`tel:${property.contactDetails}`}
                      className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Owner
                    </a>
                  ) : (
                    <button
                      onClick={() => handleUnlockContact(property.id)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Unlock className="w-4 h-4" />
                      Unlock Contact (1 Credit)
                    </button>
                  )}
                  {/* <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No saved properties found</h3>
          <p className="text-gray-600 mt-1 mb-4">
            {searchQuery || statusFilter !== "all" || typeFilter !== "all"
              ? "Try changing your filters"
              : "Start saving properties to see them here"}
          </p>
          {searchQuery || statusFilter !== "all" || typeFilter !== "all" ? (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setTypeFilter("all");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          ) : (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Browse Properties
            </button>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-blue-900">Save Properties for Later</h3>
            <p className="text-sm text-blue-700">
              Saved properties help you keep track of listings you're interested in
            </p>
          </div>
          <div className="text-sm text-blue-900">
            <div className="font-bold">{savedProperties.length} properties saved</div>
            <div className="text-xs">Last saved: {formatDate(savedProperties[0]?.savedDate)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedProperties;