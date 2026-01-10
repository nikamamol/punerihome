import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  TrendingUp,
  Home,
  Building,
  DollarSign,
  MapPin,
  ChevronRight,
  Search,
  Filter,
  Bookmark,
  Share2,
  Eye,
  MessageSquare,
  Tag,
  ArrowRight,
  BookOpen
} from 'lucide-react';

function Articles() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Articles', count: 24 },
    { id: 'market', label: 'Market Trends', count: 8 },
    { id: 'tips', label: 'Buying Tips', count: 6 },
    { id: 'legal', label: 'Legal Guide', count: 5 },
    { id: 'investment', label: 'Investment', count: 5 }
  ];

  const featuredArticle = {
    id: 1,
    title: "Pune Real Estate Market Outlook 2025",
    excerpt: "Discover the emerging trends and investment opportunities in Pune's rapidly growing property market. Learn about the most promising localities and expected returns.",
    author: "Rajesh Verma",
    date: "Dec 28, 2024",
    readTime: "8 min read",
    category: "market",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: 1248,
    comments: 42,
    isFeatured: true
  };

  const articles = [
    {
      id: 2,
      title: "5 Essential Steps Before Buying Your First Home",
      excerpt: "A comprehensive guide for first-time home buyers covering everything from budget planning to documentation.",
      author: "Priya Sharma",
      date: "Dec 25, 2024",
      readTime: "6 min read",
      category: "tips",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      views: 892,
      comments: 31
    },
    {
      id: 3,
      title: "Rental Yield Comparison: Apartments vs Villas",
      excerpt: "Detailed analysis of rental yields across different property types in major Indian cities.",
      author: "Amit Patel",
      date: "Dec 22, 2024",
      readTime: "10 min read",
      category: "investment",
      image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      views: 756,
      comments: 28
    },
    {
      id: 4,
      title: "Understanding RERA: A Complete Guide for Home Buyers",
      excerpt: "Everything you need to know about RERA regulations and how they protect your rights as a buyer.",
      author: "Legal Experts Team",
      date: "Dec 20, 2024",
      readTime: "12 min read",
      category: "legal",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      views: 1023,
      comments: 45
    },
    {
      id: 5,
      title: "Top 10 Emerging Areas for Property Investment in Pune",
      excerpt: "Discover the fastest growing localities in Pune with high appreciation potential.",
      author: "Investment Advisory",
      date: "Dec 18, 2024",
      readTime: "7 min read",
      category: "market",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      views: 1345,
      comments: 56
    },
    {
      id: 6,
      title: "Home Loan Tips: How to Get the Best Interest Rate",
      excerpt: "Expert advice on negotiating better home loan terms and reducing your EMI burden.",
      author: "Financial Experts",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "tips",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      views: 689,
      comments: 23
    },
    {
      id: 7,
      title: "Sustainable Homes: The Future of Real Estate",
      excerpt: "Exploring eco-friendly building practices and their impact on property value.",
      author: "Green Living Team",
      date: "Dec 12, 2024",
      readTime: "9 min read",
      category: "market",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      views: 543,
      comments: 19
    }
  ];

  const news = [
    {
      id: 1,
      title: "Pune Metro Expansion to Boost Property Prices",
      summary: "New metro routes announced for Hinjawadi and Hadapsar corridors.",
      time: "2 hours ago",
      source: "Times Property",
      trending: true
    },
    {
      id: 2,
      title: "Government Announces New Housing Scheme",
      summary: "Affordable housing initiative launched for middle-income groups.",
      time: "5 hours ago",
      source: "Economic Times",
      trending: true
    },
    {
      id: 3,
      title: "RERA Tightens Regulations for Builders",
      summary: "Strict penalties announced for project delays and false commitments.",
      time: "1 day ago",
      source: "Business Standard"
    },
    {
      id: 4,
      title: "Interest Rates Expected to Remain Stable",
      summary: "RBI maintains repo rate, good news for home loan borrowers.",
      time: "2 days ago",
      source: "Financial Express"
    }
  ];

  const trendingTags = [
    "Real Estate Trends", "Home Buying", "Property Investment",
    "RERA Guide", "Home Loans", "Market Analysis",
    "Legal Advice", "Pune Properties", "Interior Design"
  ];

  const filteredArticles = articles.filter(article => {
    if (activeCategory === 'all') return true;
    return article.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Articles & News</h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Stay updated with the latest real estate trends, market insights, and expert advice for making informed property decisions.
              </p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Left Column - Articles List */}
          <div className="lg:col-span-3">
            {/* Categories Filter */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Categories</h2>
                <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1">
                  <Filter size={16} />
                  Filter
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeCategory === category.id
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 shadow-sm'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-yellow-400'
                      }`}
                  >
                    {category.label}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${activeCategory === category.id
                      ? 'bg-gray-900/20'
                      : 'bg-gray-100'
                      }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Article */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group cursor-pointer">
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <div className="relative h-48 md:h-full">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        Market Trends
                      </span>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {featuredArticle.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {featuredArticle.readTime}
                        </div>
                      </div>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center">
                            <User size={16} className="text-gray-900" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{featuredArticle.author}</div>
                            <div className="text-xs text-gray-500">Real Estate Expert</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye size={12} />
                            {featuredArticle.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare size={12} />
                            {featuredArticle.comments}
                          </div>
                        </div>
                      </div>
                      <button className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1">
                        Read More
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Latest Articles</h2>
                <div className="text-sm text-gray-600">
                  Showing {filteredArticles.length} of {articles.length} articles
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group cursor-pointer">
                    <div className="relative h-48">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm">
                          <Bookmark size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm">
                          <Share2 size={16} className="text-gray-600" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${article.category === 'market'
                          ? 'bg-blue-100 text-blue-700'
                          : article.category === 'tips'
                            ? 'bg-green-100 text-green-700'
                            : article.category === 'legal'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {categories.find(c => c.id === article.category)?.label}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {article.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {article.readTime}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                              <User size={12} className="text-gray-600" />
                            </div>
                            <span className="text-sm text-gray-700">{article.author}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye size={10} />
                              {article.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare size={10} />
                              {article.comments}
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-yellow-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Latest News */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp size={20} className="text-yellow-500" />
                  Latest News
                </h3>
                <div className="text-xs text-gray-500">Real-time updates</div>
              </div>
              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 bg-yellow-400 rounded-full"></div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                          {item.trending && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                              Trending
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{item.summary}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{item.time}</span>
                          <span className="text-xs text-blue-600 font-medium">{item.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Tags */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag, index) => (
                  <button
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-yellow-50 border border-gray-200 hover:border-yellow-300 text-gray-700 text-sm rounded-lg transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-5">
              <div className="text-center">
                <BookOpen size={24} className="text-blue-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Stay Updated</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Subscribe to our newsletter for weekly real estate insights
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none text-sm"
                  />
                  <button className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>

            {/* Popular Authors */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Expert Authors</h3>
              <div className="space-y-4">
                {[
                  { name: "Rajesh Verma", role: "Market Analyst", articles: 24 },
                  { name: "Priya Sharma", role: "Legal Expert", articles: 18 },
                  { name: "Amit Patel", role: "Investment Advisor", articles: 32 }
                ].map((author, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center">
                      <User size={18} className="text-gray-900" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{author.name}</div>
                      <div className="text-xs text-gray-500">{author.role}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {author.articles} articles
                    </div>
                  </div>
                  // test
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;