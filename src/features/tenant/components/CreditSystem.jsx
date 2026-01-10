import React, { useState } from "react";
import {
  CreditCard,
  DollarSign,
  Wallet,
  TrendingUp,
  History,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  XCircle,
  ShoppingCart,
  Gift,
  Percent,
  Calendar,
  Smartphone,
  Users,
  BarChart,
  Shield,
  Zap,
  Crown,
  Star,
  Award,
  Target,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

function CreditSystem() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Credit data
  const creditData = {
    balance: 5,
    totalPurchased: 12,
    totalUsed: 7,
    totalSpent: 447,

    // Credit Plans
    plans: [
      { id: 1, name: "Basic Plan", credits: 1, price: 99, popular: false, features: ["1 Owner Contact", "7 Days Validity", "Basic Support"] },
      { id: 2, name: "Standard Plan", credits: 3, price: 149, popular: true, features: ["3 Owner Contacts", "15 Days Validity", "Priority Support", "Email Notifications"] },
      { id: 3, name: "Premium Plan", credits: 10, price: 399, popular: false, features: ["10 Owner Contacts", "30 Days Validity", "24/7 Support", "WhatsApp Alerts", "Property Recommendations"] },
      { id: 4, name: "Business Plan", credits: 25, price: 899, popular: false, features: ["25 Owner Contacts", "60 Days Validity", "Dedicated Manager", "Bulk Contact Export", "Analytics Dashboard"] },
    ],

    // Credit Purchase History
    purchaseHistory: [
      { id: 1, date: "2024-02-22", plan: "Standard Plan", credits: 3, amount: 149, status: "completed", transactionId: "TX123456" },
      { id: 2, date: "2024-02-18", plan: "Basic Plan", credits: 1, amount: 99, status: "completed", transactionId: "TX123455" },
      { id: 3, date: "2024-02-10", plan: "Standard Plan", credits: 3, amount: 149, status: "completed", transactionId: "TX123454" },
      { id: 4, date: "2024-02-05", plan: "Basic Plan", credits: 1, amount: 99, status: "completed", transactionId: "TX123453" },
      { id: 5, date: "2024-02-01", plan: "Standard Plan", credits: 3, amount: 149, status: "pending", transactionId: "TX123452" },
    ],

    // Credit Usage History
    usageHistory: [
      { id: 1, date: "2024-02-22", property: "Luxury 3BHK Villa", owner: "Rajesh Kumar", creditsUsed: 1, status: "unlocked", phone: "+91 98765 43210" },
      { id: 2, date: "2024-02-21", property: "Modern 2BHK Flat", owner: "Priya Sharma", creditsUsed: 1, status: "unlocked", phone: "+91 98765 43211" },
      { id: 3, date: "2024-02-20", property: "1BHK Studio", owner: "Amit Patel", creditsUsed: 1, status: "unlocked", phone: "+91 98765 43212" },
      { id: 4, date: "2024-02-18", property: "Premium Penthouse", owner: "Vikram Singh", creditsUsed: 1, status: "unlocked", phone: "+91 98765 43213" },
      { id: 5, date: "2024-02-15", property: "Garden View Apartment", owner: "Neha Gupta", creditsUsed: 1, status: "unlocked", phone: "+91 98765 43214" },
    ],

    // Statistics
    stats: {
      avgCreditsPerMonth: 8,
      favoritePlan: "Standard Plan",
      totalContactsUnlocked: 5,
      responseRate: "85%",
      savings: 50,
      renewalDate: "2024-03-22",
    },

    // Benefits
    benefits: [
      { id: 1, title: "Instant Access", description: "Get owner contacts immediately after payment", icon: Zap },
      { id: 2, title: "Verified Owners", description: "All owners are verified for authenticity", icon: Shield },
      { id: 3, title: "Best Value", description: "More credits = Lower per-contact cost", icon: TrendingUp },
      { id: 4, title: "Flexible Plans", description: "Choose plans based on your needs", icon: Gift },
    ],
  };

  const handlePurchase = (plan) => {
    setSelectedPlan(plan);
    // In real app, this would open payment modal
    alert(`Proceeding to purchase ${plan.name} for ₹${plan.price}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return `₹${amount}`;
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Credit System</h1>
        <p className="text-sm text-gray-600 mt-1">
          Unlock property owner contacts using credits
        </p>
      </div>

      {/* Credit Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-medium">Available Credits</span>
            </div>
            <div className="text-3xl font-bold">{creditData.balance}</div>
            <p className="text-blue-100 text-sm mt-1">
              Unlock owner contacts instantly
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm mb-2">Total Value</div>
            <div className="text-2xl font-bold">
              {formatCurrency(creditData.totalSpent)}
            </div>
            <div className="text-xs text-blue-200">
              {creditData.totalPurchased} purchased • {creditData.totalUsed} used
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Credits Usage</span>
            <span>{creditData.totalUsed}/{creditData.totalPurchased}</span>
          </div>
          <div className="w-full bg-blue-800 rounded-full h-2">
            <div
              className="bg-green-400 h-2 rounded-full"
              style={{ width: `${(creditData.totalUsed / creditData.totalPurchased) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-xl font-bold text-gray-900">
            {creditData.stats.totalContactsUnlocked}
          </div>
          <div className="text-xs text-gray-600">Contacts Unlocked</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">
            {creditData.stats.responseRate}
          </div>
          <div className="text-xs text-green-600">Response Rate</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-700">
            ₹{creditData.stats.savings}
          </div>
          <div className="text-xs text-blue-600">Total Savings</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="text-xl font-bold text-purple-700">
            {formatDate(creditData.stats.renewalDate)}
          </div>
          <div className="text-xs text-purple-600">Renewal Date</div>
        </div>
      </div>



      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-blue-900">
              Why Use Credits?
            </h2>
            <p className="text-sm text-blue-700 mt-1">
              Get the best value for contacting property owners
            </p>
          </div>
          <Percent className="w-8 h-8 text-blue-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {creditData.benefits.map((benefit) => (
            <div key={benefit.id} className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                </div>
              </div>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Purchase History */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Purchase History
              </h2>
              <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <Download className="w-3 h-3" />
                Export
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {creditData.purchaseHistory.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${purchase.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                      }`}>
                      {purchase.status === "completed" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{purchase.plan}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(purchase.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">
                      +{purchase.credits} credits
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatCurrency(purchase.amount)}
                    </div>
                    <div className={`text-xs ${purchase.status === "completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                      }`}>
                      {purchase.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage History */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Credit Usage
              </h2>
              <span className="text-xs text-gray-600">
                {creditData.totalUsed} credits used
              </span>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {creditData.usageHistory.map((usage) => (
                <div key={usage.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{usage.property}</p>
                      <p className="text-xs text-gray-500">{usage.owner}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">
                      -{usage.creditsUsed} credit
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatDate(usage.date)}
                    </div>
                    <div className="text-xs text-green-600">
                      {usage.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Cost Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-2 px-3 font-medium text-gray-700">Plan</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Credits</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Price</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Cost/Credit</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Savings</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody>
              {creditData.plans.map((plan) => (
                <tr key={plan.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <div className="font-medium text-gray-900">{plan.name}</div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="font-medium text-gray-900">{plan.credits}</div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="font-medium text-gray-900">{formatCurrency(plan.price)}</div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="font-medium text-gray-900">
                      ₹{(plan.price / plan.credits).toFixed(0)}
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="font-medium text-green-600">
                      {plan.id === 1 ? '0%' :
                        plan.id === 2 ? '25%' :
                          plan.id === 3 ? '40%' : '50%'}
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="text-gray-600">
                      {plan.id === 1 ? 'Single contact' :
                        plan.id === 2 ? 'Multiple properties' :
                          plan.id === 3 ? 'Active searching' : 'Business use'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips & FAQ */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-green-900">Tips for Best Value</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span className="text-green-800">Buy in bulk for better per-credit rates</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span className="text-green-800">Use credits within validity period</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span className="text-green-800">Check owner response rate before unlocking</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-blue-900">Credit Validity</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">Basic Plan:</span>
              <span className="font-medium">7 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-800">Standard Plan:</span>
              <span className="font-medium">15 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-800">Premium Plan:</span>
              <span className="font-medium">30 days</span>
            </div>
            <div className="text-xs text-blue-700 mt-2">
              Unused credits expire after validity period
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2"
          to="/pricing-plans"
          target="_blank">
          <ShoppingCart className="w-4 h-4" />
          Buy More Credits
        </Link>
        <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Gift className="w-4 h-4" />
          Gift Credits
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <BarChart className="w-4 h-4" />
          Usage Analytics
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Auto-renew
        </button>
      </div>
    </div>
  );
}

export default CreditSystem;