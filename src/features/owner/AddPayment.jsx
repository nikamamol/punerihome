import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  DollarSign,
  Calendar,
  CreditCard,
  FileText,
  User,
  Home,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const AddPayment = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    propertyId: "",
    propertyAddress: "",
    propertyType: "",
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    paymentMethod: "bank_transfer",
    paymentCycle: "monthly",
    transactionId: "",
    description: "",
    status: "pending",
    notes: "",
    attachments: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: "bank_transfer", name: "Bank Transfer", icon: CreditCard },
    { id: "upi", name: "UPI Payment", icon: CreditCard },
    { id: "cheque", name: "Cheque", icon: FileText },
    { id: "cash", name: "Cash", icon: DollarSign },
    { id: "online", name: "Online Payment", icon: CreditCard },
  ];

  const paymentCycles = [
    { id: "monthly", name: "Monthly" },
    { id: "quarterly", name: "Quarterly" },
    { id: "half_yearly", name: "Half Yearly" },
    { id: "yearly", name: "Yearly" },
    { id: "one_time", name: "One Time" },
  ];

  const propertyTypes = [
    { id: "apartment", name: "Apartment" },
    { id: "villa", name: "Villa" },
    { id: "house", name: "Independent House" },
    { id: "plot", name: "Plot" },
    { id: "commercial", name: "Commercial" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner name is required";
    if (!formData.propertyAddress.trim())
      newErrors.propertyAddress = "Property address is required";
    if (!formData.amount || Number(formData.amount) <= 0)
      newErrors.amount = "Valid amount is required";
    if (!formData.paymentDate)
      newErrors.paymentDate = "Payment date is required";
    if (!formData.paymentMethod)
      newErrors.paymentMethod = "Payment method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        attachments: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate transaction ID if not provided
      const transactionId =
        formData.transactionId || `TXN${Date.now().toString().slice(-8)}`;

      const paymentData = {
        ...formData,
        transactionId,
        amount: Number(formData.amount),
        id: Date.now(), // Generate unique ID
      };

      console.log("Payment Data:", paymentData);

      // Here you would typically send data to backend
      alert("Payment added successfully!");

      // Reset form
      setFormData({
        ownerName: "",
        ownerEmail: "",
        ownerPhone: "",
        propertyId: "",
        propertyAddress: "",
        propertyType: "",
        amount: "",
        paymentDate: new Date().toISOString().split("T")[0],
        dueDate: "",
        paymentMethod: "bank_transfer",
        paymentCycle: "monthly",
        transactionId: "",
        description: "",
        status: "pending",
        notes: "",
        attachments: null,
      });
    } catch (error) {
      alert("Failed to add payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Owner Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                <User className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Tenant Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border ${
                      errors.ownerName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all`}
                    placeholder="Enter tenant's full name"
                  />
                  {errors.ownerName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.ownerName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all"
                    placeholder="tenant@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                <Home className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Property Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property ID (Optional)
                  </label>
                  <input
                    type="text"
                    name="propertyId"
                    value={formData.propertyId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all"
                    placeholder="PROP001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all"
                  >
                    <option value="">Select Property Type</option>
                    {propertyTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Address *
                  </label>
                  <textarea
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    rows="2"
                    className={`w-full px-4 py-3 bg-gray-50 border ${
                      errors.propertyAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all resize-none`}
                    placeholder="Enter complete property address"
                  />
                  {errors.propertyAddress && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.propertyAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                <DollarSign className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 bg-gray-50 border ${
                        errors.amount ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.amount}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Cycle
                  </label>
                  <select
                    name="paymentCycle"
                    value={formData.paymentCycle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all"
                  >
                    {paymentCycles.map((cycle) => (
                      <option key={cycle.id} value={cycle.id}>
                        {cycle.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="paymentDate"
                      value={formData.paymentDate}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 bg-gray-50 border ${
                        errors.paymentDate
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all`}
                    />
                  </div>
                  {errors.paymentDate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.paymentDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID (Optional)
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all"
                    placeholder="TXN123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                <CreditCard className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment Method *
                </h2>
              </div>

              {errors.paymentMethod && (
                <p className="text-sm text-red-600 flex items-center gap-1 mb-4">
                  <AlertCircle className="h-3 w-3" />
                  {errors.paymentMethod}
                </p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = formData.paymentMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          paymentMethod: method.id,
                        }));
                        if (errors.paymentMethod) {
                          setErrors((prev) => ({ ...prev, paymentMethod: "" }));
                        }
                      }}
                      className={`p-4 border rounded-lg transition-all flex flex-col items-center gap-2 ${
                        isSelected
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isSelected ? "text-yellow-600" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          isSelected ? "text-yellow-700" : "text-gray-700"
                        }`}
                      >
                        {method.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Additional Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all resize-none"
                  placeholder="Brief description of the payment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 outline-none transition-all resize-none"
                  placeholder="Add any additional notes or remarks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="attachments"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <label htmlFor="attachments" className="cursor-pointer">
                    <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {formData.attachments
                        ? `Selected: ${formData.attachments.name}`
                        : "Click to upload receipt or document"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports PDF, JPG, PNG, DOC (Max 5MB)
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Link
                to="/owner/payments"
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <>
                    Add Payment
                    <Plus className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">
                Important Notes
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Fields marked with * are required</li>
                <li>
                  • Payment will be processed based on the selected status
                </li>
                <li>• Receipt will be generated after successful submission</li>
                <li>
                  • You can edit payment details later from the payments list
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPayment;
