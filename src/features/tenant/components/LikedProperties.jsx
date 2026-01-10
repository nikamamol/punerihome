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
  TrendingUp,
  TrendingDown,
  Unlock,
  Download,
} from "lucide-react";

function LikedProperties() {
  // Sample liked properties data
  const [likedProperties, setLikedProperties] = useState([
    {
      id: 1,
      title: "Premium 4BHK Penthouse with Terrace",
      location: "Baner, Pune",
      price: "₹3.8 Cr",
      type: "Penthouse",
      bhk: "4 BHK",
      area: "3200 sq ft",
      likedDate: "2024-02-22",
      lastViewed: "2024-02-22",
      views: 312,
      likes: 128,
      popularity: "trending",
      status: "Available",
      owner: "Vikram Singh",
      contactUnlocked: false,
      features: ["Terrace Garden", "Private Pool", "Jacuzzi", "Home Theater", "Smart Home"],
      images: 4,
      rating: 4.9,
      description: "Luxury penthouse with panoramic city views and premium amenities.",
      priceTrend: "increasing",
      daysOnMarket: 15,
      similarProperties: 3,
    },
    {
      id: 2,
      title: "Modern 3BHK Apartment with City View",
      location: "Kalyani Nagar, Pune",
      price: "₹1.2 Cr",
      type: "Apartment",
      bhk: "3 BHK",
      area: "1650 sq ft",
      likedDate: "2024-02-21",
      lastViewed: "2024-02-21",
      views: 245,
      likes: 89,
      popularity: "popular",
      status: "Available",
      owner: "Priya Sharma",
      contactUnlocked: true,
      contactDetails: "+91 98765 43211",
      features: ["City View", "Fully Furnished", "Club House", "Gym", "Security"],
      images: 5,
      rating: 4.6,
      description: "Spacious apartment with modern amenities and beautiful city views.",
      priceTrend: "stable",
      daysOnMarket: 28,
      similarProperties: 5,
    },
    {
      id: 3,
      title: "Luxury Villa with Private Garden",
      location: "Koregaon Park, Pune",
      price: "₹2.9 Cr",
      type: "Villa",
      bhk: "3 BHK",
      area: "2900 sq ft",
      likedDate: "2024-02-20",
      lastViewed: "2024-02-20",
      views: 421,
      likes: 156,
      popularity: "hot",
      status: "Under Negotiation",
      owner: "Rajesh Kumar",
      contactUnlocked: true,
      contactDetails: "+91 98765 43210",
      features: ["Private Garden", "Swimming Pool", "Home Theater", "Maid Room", "Parking"],
      images: 6,
      rating: 4.8,
      description: "Exclusive villa with premium finishes and extensive outdoor space.",
      priceTrend: "decreasing",
      daysOnMarket: 42,
      similarProperties: 2,
    },
    {
      id: 4,
      title: "2BHK Premium Flat with Balcony",
      location: "Hinjewadi, Pune",
      price: "₹75 L",
      type: "Flat",
      bhk: "2 BHK",
      area: "1150 sq ft",
      likedDate: "2024-02-19",
      lastViewed: "2024-02-19",
      views: 187,
      likes: 67,
      popularity: "new",
      status: "Available",
      owner: "Amit Patel",
      contactUnlocked: false,
      features: ["Balcony", "Parking", "Power Backup", "Lift", "Water Supply"],
      images: 3,
      rating: 4.3,
      description: "Well-maintained flat with modern amenities in tech hub.",
      priceTrend: "stable",
      daysOnMarket: 7,
      similarProperties: 8,
    },
    {
      id: 5,
      title: "Studio Apartment for Professionals",
      location: "Viman Nagar, Pune",
      price: "₹42 L",
      type: "Studio",
      bhk: "1 BHK",
      area: "600 sq ft",
      likedDate: "2024-02-18",
      lastViewed: "2024-02-18",
      views: 134,
      likes: 45,
      popularity: "trending",
      status: "Available",
      owner: "Neha Gupta",
      contactUnlocked: false,
      features: ["Fully Furnished", "WiFi Ready", "Parking", "Security", "Maintenance"],
      images: 4,
      rating: 4.2,
      description: "Compact studio perfect for working professionals.",
      priceTrend: "increasing",
      daysOnMarket: 21,
      similarProperties: 6,
    },
    {
      id: 6,
      title: "Commercial Space for Startup Office",
      location: "FC Road, Pune",
      price: "₹1.1 Cr",
      type: "Commercial",
      bhk: "Office Space",
      area: "1750 sq ft",
      likedDate: "2024-02-17",
      lastViewed: "2024-02-17",
      views: 98,
      likes: 32,
      popularity: "new",
      status: "Available",
      owner: "Tech Spaces Ltd",
      contactUnlocked: false,
      features: ["AC", "Conference Room", "Parking", "Cafeteria", "24x7 Power"],
      images: 5,
      rating: 4.1,
      description: "Ready-to-move office space in prime commercial location.",
      priceTrend: "stable",
      daysOnMarket: 14,
      similarProperties: 4,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [popularityFilter, setPopularityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [filteredProperties, setFilteredProperties] = useState(likedProperties);

  // Filter and search properties
  React.useEffect(() => {
    let filtered = [...likedProperties];

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

    // Apply popularity filter
    if (popularityFilter !== "all") {
      filtered = filtered.filter((property) => property.popularity === popularityFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.likedDate) - new Date(a.likedDate);
      } else if (sortBy === "oldest") {
        return new Date(a.likedDate) - new Date(b.likedDate);
      } else if (sortBy === "price-high") {
        return parsePrice(b.price) - parsePrice(a.price);
      } else if (sortBy === "price-low") {
        return parsePrice(a.price) - parsePrice(b.price);
      } else if (sortBy === "views-high") {
        return b.views - a.views;
      } else if (sortBy === "likes-high") {
        return b.likes - a.likes;
      } else if (sortBy === "rating-high") {
        return b.rating - a.rating;
      }
      return 0;
    });

    setFilteredProperties(filtered);
  }, [searchQuery, statusFilter, typeFilter, popularityFilter, sortBy, likedProperties]);

  const parsePrice = (priceString) => {
    return parseInt(priceString.replace(/[^0-9]/g, ""));
  };

  const handleUnlike = (propertyId) => {
    setLikedProperties(likedProperties.filter(property => property.id !== propertyId));
  };

  const handleSaveProperty = (propertyId) => {
    setLikedProperties(likedProperties.map(property =>
      property.id === propertyId
        ? { ...property, saved: !property.saved }
        : property
    ));
    alert("Property saved to favorites!");
  };

  const handleUnlockContact = (propertyId) => {
    setLikedProperties(likedProperties.map(property =>
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

  const getPopularityColor = (popularity) => {
    switch (popularity) {
      case "hot": return "bg-red-100 text-red-800";
      case "trending": return "bg-orange-100 text-orange-800";
      case "popular": return "bg-blue-100 text-blue-800";
      case "new": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriceTrendIcon = (trend) => {
    switch (trend) {
      case "increasing": return <TrendingUp className="w-3 h-3 text-red-500" />;
      case "decreasing": return <TrendingDown className="w-3 h-3 text-green-500" />;
      default: return <TrendingUp className="w-3 h-3 text-gray-500" />;
    }
  };

  const stats = {
    total: likedProperties.length,
    available: likedProperties.filter(p => p.status === "Available").length,
    unlocked: likedProperties.filter(p => p.contactUnlocked).length,
    trending: likedProperties.filter(p => p.popularity === "trending").length,
    totalLikes: likedProperties.reduce((sum, p) => sum + p.likes, 0),
    avgRating: (likedProperties.reduce((sum, p) => sum + p.rating, 0) / likedProperties.length).toFixed(1),
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Liked Properties</h1>
            <p className="text-sm text-gray-600 mt-1">
              {likedProperties.length} properties liked • Track properties you love
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              Refresh
            </button>
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Discover More
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-600">Total Liked</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">{stats.available}</div>
          <div className="text-xs text-green-600">Available</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-700">{stats.unlocked}</div>
          <div className="text-xs text-blue-600">Unlocked</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-orange-200">
          <div className="text-xl font-bold text-orange-700">{stats.trending}</div>
          <div className="text-xs text-orange-600">Trending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="text-xl font-bold text-purple-700">{stats.totalLikes}</div>
          <div className="text-xs text-purple-600">Total Likes</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-yellow-200">
          <div className="text-xl font-bold text-yellow-700">{stats.avgRating}</div>
          <div className="text-xs text-yellow-600">Avg Rating</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                placeholder="Search liked properties..."
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
              <option value="Penthouse">Penthouse</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Flat">Flat</option>
              <option value="Studio">Studio</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Popularity Filter */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={popularityFilter}
              onChange={(e) => setPopularityFilter(e.target.value)}
            >
              <option value="all">All Popularity</option>
              <option value="hot">Hot</option>
              <option value="trending">Trending</option>
              <option value="popular">Popular</option>
              <option value="new">New</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Recently Liked</option>
              <option value="oldest">Oldest Liked</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="likes-high">Most Liked</option>
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
          {popularityFilter !== "all" && (
            <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
              Popularity: {popularityFilter}
              <button onClick={() => setPopularityFilter("all")} className="ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Liked Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
            {/* Property Header with Popularity Badge */}
            <div className="relative h-48 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPopularityColor(property.popularity)}`}>
                  {property.popularity}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleUnlike(property.id)}
                    className="p-1.5 bg-white text-red-500 rounded-full hover:bg-red-50"
                    title="Unlike property"
                  >
                    <Heart className="w-4 h-4 fill-red-500" />
                  </button>
                  <button
                    onClick={() => handleSaveProperty(property.id)}
                    className="p-1.5 bg-white text-blue-500 rounded-full hover:bg-blue-50"
                    title="Save property"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <Building className="w-16 h-16 text-purple-400" />
            </div>

            {/* Property Details */}
            <div className="p-4">
              {/* Title and Price with Trend */}
              <div className="mb-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-gray-900 line-clamp-1 flex-1">{property.title}</h3>
                  <div className="flex items-center gap-1">
                    {getPriceTrendIcon(property.priceTrend)}
                    <div className="text-lg font-bold text-blue-700">{property.price}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>
              </div>

              {/* Property Specs */}
              <div className="grid grid-cols-4 gap-2 mb-4">
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
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-sm font-medium text-gray-900">{property.images}</div>
                  <div className="text-xs text-gray-500">Photos</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {property.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
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

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {property.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                    {property.likes} likes
                  </div>
                </div>
                <div className="text-right">
                  <div>Liked: {formatDate(property.likedDate)}</div>
                  <div className="text-gray-400">{property.daysOnMarket} days on market</div>
                </div>
              </div>

              {/* Market Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Similar properties:</span>
                  <span className="font-medium">{property.similarProperties} available</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {property.priceTrend === "increasing" ? "Price increasing" :
                    property.priceTrend === "decreasing" ? "Price decreasing" :
                      "Price stable"}
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
                      className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                    >
                      <Unlock className="w-4 h-4" />
                      Unlock Contact
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
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No liked properties found</h3>
          <p className="text-gray-600 mt-1 mb-4">
            {searchQuery || statusFilter !== "all" || typeFilter !== "all" || popularityFilter !== "all"
              ? "Try changing your filters"
              : "Like properties to see them here"}
          </p>
          {searchQuery || statusFilter !== "all" || typeFilter !== "all" || popularityFilter !== "all" ? (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setTypeFilter("all");
                setPopularityFilter("all");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          ) : (
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Browse Properties to Like
            </button>
          )}
        </div>
      )}

      {/* Insights Section */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-purple-900">Your Likes Insights</h3>
            <p className="text-sm text-purple-700 mt-1">
              Most liked property types: {Array.from(new Set(likedProperties.map(p => p.type))).join(", ")}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-purple-900">Trend Analysis</div>
            <div className="text-xs text-purple-700">
              {stats.trending} trending properties in your likes
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-bold text-gray-900">Most Liked Type</div>
            <div className="text-sm text-purple-600 mt-1">Penthouse</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-bold text-gray-900">Avg Price</div>
            <div className="text-sm text-green-600 mt-1">₹1.8 Cr</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-bold text-gray-900">Top Location</div>
            <div className="text-sm text-blue-600 mt-1">Koregaon Park</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-bold text-gray-900">Response Rate</div>
            <div className="text-sm text-orange-600 mt-1">78%</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          View Most Liked
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          See Trending
        </button>
        <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Unlock className="w-4 h-4" />
          Unlock All Contacts
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Likes
        </button>
      </div>
    </div>
  );
}

export default LikedProperties;