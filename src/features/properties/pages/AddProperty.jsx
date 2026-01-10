import React, { useState } from 'react';
import {
    ArrowLeft, Home, MapPin, Camera, Video, Mic,
    CheckCircle, Circle, Wifi, Car, Dumbbell,
    Waves, Shield, Coffee,
    Upload, X, AlertCircle, ChevronRight,
    Building, Bath, Bed, Square, Star, Users,
    Cloud, WashingMachine, Tv, Wind, Fan,
    Sun, Moon, Lock, Bell, WifiOff, Battery,
    Power, Wind as WindIcon, Snowflake, Thermometer,
    Sofa, Table, Microwave, Filter, Speaker,
    Zap, Droplets, Flame, DoorOpen, Key, Mail,
    Phone, MessageSquare,
    BedSingle,
    FlameIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AddProperty() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [propertyScore, setPropertyScore] = useState(75);
    const [formData, setFormData] = useState({
        propertyType: '',
        title: '',
        description: '',
        price: '',
        address: '',
        city: '',
        pincode: '',
        landmark: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        areaUnit: 'sq ft',
        propertyAge: '',
        facing: '',
        totalFloors: '',
        floorNumber: '',
        availableFrom: '',
        tenantType: 'any',
        maintenance: '',
        deposit: '',
        amenities: [],
        furnishing: 'semi',
    });

    const steps = [
        { id: 0, label: 'Basic Details', icon: Home, completed: true },
        { id: 1, label: 'Location Details', icon: MapPin, completed: true },
        { id: 2, label: 'Property Profile', icon: Building, completed: true },
        { id: 3, label: 'Photos & Videos', icon: Camera, completed: false },
        { id: 4, label: 'Amenities', icon: Wifi, completed: false },
        { id: 5, label: 'Additional Details', icon: ChevronRight, completed: false },
    ];

    const amenitiesList = [
        { id: 'lift', label: 'Lift', icon: ArrowLeft },
        { id: 'parking', label: 'Car Parking', icon: Car },
        { id: 'gym', label: 'Gym', icon: Dumbbell },
        { id: 'swimming', label: 'Swimming Pool', icon: Waves },
        { id: 'security', label: '24/7 Security', icon: Shield },
        { id: 'ac', label: 'Air Conditioner', icon: Snowflake },
        { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
        { id: 'power', label: 'Power Backup', icon: Power },
        { id: 'water', label: 'Water Supply', icon: Droplets },
        { id: 'pipedGas', label: 'Piped Gas', icon: Flame },
        { id: 'washing', label: 'Washing Machine', icon: WashingMachine },
        { id: 'tv', label: 'TV', icon: Tv },
        { id: 'fridge', label: 'Refrigerator', icon: Thermometer },
        { id: 'geyser', label: 'Geyser', icon: FlameIcon },
        { id: 'fans', label: 'Fans', icon: Fan },
        { id: 'lights', label: 'Lights', icon: Sun },
        { id: 'curtains', label: 'Curtains', icon: Sun },
        { id: 'cooking', label: 'Cooking Gas', icon: Flame },
        { id: 'exhaust', label: 'Exhaust Fan', icon: WindIcon },
        { id: 'sofa', label: 'Sofa', icon: Sofa },
        { id: 'dining', label: 'Dining Table', icon: Table },
        { id: 'wardrobe', label: 'Wardrobe', icon: DoorOpen },
        { id: 'bed', label: 'Bed', icon: Bed },
        { id: 'mattress', label: 'Mattress', icon: BedSingle },
        { id: 'modular', label: 'Modular Kitchen', icon: Coffee },
        { id: 'waterPurifier', label: 'Water Purifier', icon: Filter },
        { id: 'microwave', label: 'Microwave', icon: Microwave },
        { id: 'chimney', label: 'Chimney', icon: Wind },
        { id: 'intercom', label: 'Intercom', icon: Speaker },
        { id: 'maintenance', label: 'Maintenance Staff', icon: Users },
    ];

    const propertyTypes = [
        { value: 'apartment', label: 'Apartment' },
        { value: 'independent', label: 'Independent House' },
        { value: 'villa', label: 'Villa' },
        { value: 'pg', label: 'PG/Hostel' },
        { value: 'office', label: 'Office Space' },
        { value: 'shop', label: 'Shop' },
        { value: 'warehouse', label: 'Warehouse' },
    ];

    const tenantTypes = [
        { value: 'any', label: 'Any' },
        { value: 'family', label: 'Family Only' },
        { value: 'bachelor', label: 'Bachelor Only' },
        { value: 'company', label: 'Company Lease' },
        { value: 'student', label: 'Students' },
    ];

    const facingDirections = [
        { value: 'north', label: 'North' },
        { value: 'south', label: 'South' },
        { value: 'east', label: 'East' },
        { value: 'west', label: 'West' },
        { value: 'north-east', label: 'North-East' },
        { value: 'north-west', label: 'North-West' },
        { value: 'south-east', label: 'South-East' },
        { value: 'south-west', label: 'South-West' },
    ];

    const furnishingTypes = [
        { value: 'unfurnished', label: 'Unfurnished' },
        { value: 'semi', label: 'Semi-Furnished' },
        { value: 'full', label: 'Fully Furnished' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAmenityToggle = (amenityId) => {
        setFormData(prev => {
            const isSelected = prev.amenities.includes(amenityId);
            return {
                ...prev,
                amenities: isSelected
                    ? prev.amenities.filter(id => id !== amenityId)
                    : [...prev.amenities, amenityId]
            };
        });
    };

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Property Submitted:', formData);
        // Submit logic here
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-4 mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Property Type & Title</h3>
                            <p className="text-gray-600 text-sm">Choose the right category and create an attractive title</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Property Type *
                                </label>
                                <select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                >
                                    <option value="">Select Property Type</option>
                                    {propertyTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Property Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 2 BHK Apartment in Prime Location"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="Describe your property in detail..."
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all resize-none"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-2">Minimum 50 characters recommended</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Monthly Rent *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">₹</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="Enter amount"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Security Deposit
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">₹</span>
                                    <input
                                        type="number"
                                        name="deposit"
                                        value={formData.deposit}
                                        onChange={handleInputChange}
                                        placeholder="Optional"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-4 mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Location Details</h3>
                            <p className="text-gray-600 text-sm">Accurate location increases property visibility</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Complete Address *
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter full address"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Pune"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Pincode *
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    placeholder="6-digit pincode"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Landmark
                                </label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={formData.landmark}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Near Metro Station, Shopping Mall, etc."
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Location Tips</h4>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            Mention nearby metro stations, bus stops, or highways
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            Include popular landmarks for better discovery
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            Exact location helps tenants find your property easily
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-4 mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Property Profile</h3>
                            <p className="text-gray-600 text-sm">Detailed specifications attract serious tenants</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Bedrooms *
                                </label>
                                <select
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="1">1 BHK</option>
                                    <option value="2">2 BHK</option>
                                    <option value="3">3 BHK</option>
                                    <option value="4">4 BHK</option>
                                    <option value="5">5+ BHK</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Bathrooms *
                                </label>
                                <select
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5+</option>
                                </select>
                            </div>

                            <div className="sm:col-span-2 lg:col-span-1">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Area *
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 1000"
                                        className="w-full pl-4 pr-24 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                        required
                                    />
                                    <select
                                        name="areaUnit"
                                        value={formData.areaUnit}
                                        onChange={handleInputChange}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all appearance-none"
                                    >
                                        <option value="sq ft">sq ft</option>
                                        <option value="sq m">sq m</option>
                                        <option value="sq yd">sq yd</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Furnishing *
                                </label>
                                <select
                                    name="furnishing"
                                    value={formData.furnishing}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                >
                                    {furnishingTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Property Age
                                </label>
                                <select
                                    name="propertyAge"
                                    value={formData.propertyAge}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                >
                                    <option value="">Select</option>
                                    <option value="0-1">0-1 years</option>
                                    <option value="1-5">1-5 years</option>
                                    <option value="5-10">5-10 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Facing
                                </label>
                                <select
                                    name="facing"
                                    value={formData.facing}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                >
                                    <option value="">Select Direction</option>
                                    {facingDirections.map(dir => (
                                        <option key={dir.value} value={dir.value}>
                                            {dir.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Total Floors
                                </label>
                                <input
                                    type="number"
                                    name="totalFloors"
                                    value={formData.totalFloors}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 10"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Floor Number
                                </label>
                                <input
                                    type="number"
                                    name="floorNumber"
                                    value={formData.floorNumber}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 5"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                />
                            </div>

                            <div className="sm:col-span-2 lg:col-span-1">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Available From *
                                </label>
                                <input
                                    type="date"
                                    name="availableFrom"
                                    value={formData.availableFrom}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Preferred Tenant
                                </label>
                                <select
                                    name="tenantType"
                                    value={formData.tenantType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                >
                                    {tenantTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="sm:col-span-2 lg:col-span-1">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Maintenance (Monthly)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">₹</span>
                                    <input
                                        type="number"
                                        name="maintenance"
                                        value={formData.maintenance}
                                        onChange={handleInputChange}
                                        placeholder="Optional"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Photos, Videos & Voice-over</h3>
                                    <p className="text-gray-600 text-sm">High-quality media gets 10x more responses</p>
                                </div>
                                <AlertCircle className="w-6 h-6 text-yellow-500" />
                            </div>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-red-700 mb-1">You might get low responses without photos</h4>
                                    <p className="text-red-600 text-sm">Properties with photos get 10x more views and 5x more inquiries.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Photo Upload */}
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 hover:border-yellow-400 transition-all cursor-pointer text-center">
                                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                    <Camera className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Add Photos</h4>
                                <p className="text-gray-600 text-xs md:text-sm mb-4">Upload up to 20 photos (Max 5MB each)</p>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm"
                                >
                                    <Upload className="w-4 h-4 inline mr-2" />
                                    Upload Photos
                                </button>
                                <p className="text-xs text-gray-500 mt-3">Recommended: 800x600px or higher</p>
                            </div>

                            {/* Video Upload */}
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 hover:border-yellow-400 transition-all cursor-pointer text-center">
                                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                    <Video className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Add Video Tour</h4>
                                <p className="text-gray-600 text-xs md:text-sm mb-4">Upload property video (Max 100MB)</p>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm"
                                >
                                    <Upload className="w-4 h-4 inline mr-2" />
                                    Upload Video
                                </button>
                                <p className="text-xs text-gray-500 mt-3">MP4 format recommended</p>
                            </div>

                            {/* Voice-over Upload */}
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 hover:border-yellow-400 transition-all cursor-pointer text-center">
                                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                    <Mic className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Add Voice Description</h4>
                                <p className="text-gray-600 text-xs md:text-sm mb-4">Record property description (Max 2MB)</p>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm"
                                >
                                    <Upload className="w-4 h-4 inline mr-2" />
                                    Upload Audio
                                </button>
                                <p className="text-xs text-gray-500 mt-3">MP3 format recommended</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Photo Upload Tips</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">Living Room</p>
                                        <p className="text-gray-600 text-xs">Well-lit, clean space</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">Bedrooms</p>
                                        <p className="text-gray-600 text-xs">All angles, furniture included</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">Kitchen & Bath</p>
                                        <p className="text-gray-600 text-xs">Fixtures and amenities</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">Building Exterior</p>
                                        <p className="text-gray-600 text-xs">Society view, entrance</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">Amenities</p>
                                        <p className="text-gray-600 text-xs">Gym, pool, parking</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">View from Property</p>
                                        <p className="text-gray-600 text-xs">Balcony view, neighborhood</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-4 mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Amenities Section</h3>
                            <p className="text-gray-600 text-sm">Select all available amenities</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {amenitiesList.map((amenity) => {
                                const isSelected = formData.amenities.includes(amenity.id);
                                const Icon = amenity.icon;

                                return (
                                    <button
                                        key={amenity.id}
                                        type="button"
                                        onClick={() => handleAmenityToggle(amenity.id)}
                                        className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 ${isSelected
                                            ? 'border-yellow-400 bg-yellow-50'
                                            : 'border-gray-300 bg-white hover:border-yellow-300'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-yellow-100' : 'bg-gray-100'
                                            }`}>
                                            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isSelected ? 'text-yellow-500' : 'text-gray-500'
                                                }`} />
                                        </div>
                                        <span className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-yellow-700' : 'text-gray-700'
                                            }`}>
                                            {amenity.label}
                                        </span>
                                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${isSelected
                                            ? 'border-yellow-500 bg-yellow-500'
                                            : 'border-gray-300'
                                            }`}>
                                            {isSelected && (
                                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    const allIds = amenitiesList.map(a => a.id);
                                    setFormData(prev => ({
                                        ...prev,
                                        amenities: allIds
                                    }));
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-sm w-full sm:w-auto"
                            >
                                Select All
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        amenities: []
                                    }));
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all text-sm w-full sm:w-auto"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-4 mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Additional Details</h3>
                            <p className="text-gray-600 text-sm">Final touches for your property listing</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Additional Features
                                </label>
                                <textarea
                                    name="additionalFeatures"
                                    placeholder="e.g., Modular kitchen, wooden flooring, false ceiling, etc."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Contact Person Name *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Contact Number *
                                </label>
                                <input
                                    type="tel"
                                    placeholder="10-digit mobile number"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    WhatsApp Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Optional"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">Property Verification</h4>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400" />
                                    <span className="text-sm text-gray-700">I agree to property verification by Puneri House team</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400" />
                                    <span className="text-sm text-gray-700">I confirm all information provided is accurate</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-400" />
                                    <span className="text-sm text-gray-700">I agree to terms & conditions</span>
                                </label>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-yellow-500/20 shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 text-gray-300 hover:text-yellow-300 hover:bg-gray-800/50 rounded-lg transition-all flex-shrink-0"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-yellow-300">Add New Property</h1>
                                <p className="text-gray-400 text-sm">List your property and reach thousands of tenants</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-300 text-sm hidden sm:inline">Need help?</span>
                            <button className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:border-yellow-500/50 rounded-lg font-medium transition-all duration-200 text-sm">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Column - Steps */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 sticky top-6">
                                <div className="mb-6 md:mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">Progress</h3>
                                        <span className="text-2xl font-bold text-yellow-600">{propertyScore}%</span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500"
                                            style={{ width: `${propertyScore}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 text-center">
                                        Complete all sections to reach 100%
                                    </p>
                                </div>

                                {/* Steps List */}
                                <div className="space-y-2 md:space-y-3">
                                    {steps.map((step) => {
                                        const isActive = step.id === activeStep;
                                        const isCompleted = step.completed;
                                        const Icon = step.icon;

                                        return (
                                            <button
                                                key={step.id}
                                                onClick={() => setActiveStep(step.id)}
                                                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                                                    ? 'bg-yellow-50 border border-yellow-200'
                                                    : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${isActive || isCompleted
                                                    ? 'bg-yellow-100 text-yellow-600'
                                                    : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    {isCompleted ? (
                                                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                                                    ) : (
                                                        <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                                    )}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="flex items-center justify-between">
                                                        <span className={`font-medium text-sm md:text-base ${isActive ? 'text-yellow-700' : 'text-gray-700'
                                                            }`}>
                                                            {step.label}
                                                        </span>
                                                        {isActive && (
                                                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-0.5 hidden md:block">
                                                        {step.id === 0 && "Property type, title & price"}
                                                        {step.id === 1 && "Address & location details"}
                                                        {step.id === 2 && "Specifications & features"}
                                                        {step.id === 3 && "Upload media files"}
                                                        {step.id === 4 && "Select amenities"}
                                                        {step.id === 5 && "Final details & contact"}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Property Score Card */}
                                <div className="mt-6 md:mt-8 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Star className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm md:text-base">Property Score</h4>
                                            <p className="text-gray-600 text-xs md:text-sm">Better score = More visibility</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-xs md:text-sm hidden sm:block">
                                        Complete all sections, add high-quality photos, and provide detailed information
                                        to increase your property visibility and get more responses.
                                    </p>
                                    <div className="mt-3 flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400" style={{ width: '75%' }} />
                                        </div>
                                        <span className="text-sm font-bold text-yellow-600">75%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Form Header */}
                                <div className="border-b border-gray-200 p-4 md:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{steps[activeStep].label}</h2>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Step {activeStep + 1} of {steps.length}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => navigate('/owner/dashboard')}
                                                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all text-sm"
                                            >
                                                Save as Draft
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                className="px-4 py-2 md:px-6 md:py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all shadow-sm text-sm md:text-base"
                                            >
                                                Preview
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Content */}
                                <form onSubmit={handleSubmit} className="p-4 md:p-6">
                                    {renderStepContent()}

                                    {/* Navigation Buttons */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 md:pt-8 mt-6 md:mt-8 border-t border-gray-200 gap-4">
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            disabled={activeStep === 0}
                                            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 w-full sm:w-auto justify-center ${activeStep === 0
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            Previous
                                        </button>

                                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                                            <button
                                                type="button"
                                                onClick={() => navigate('/owner/dashboard')}
                                                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all w-full sm:w-auto text-center"
                                            >
                                                Cancel
                                            </button>

                                            {activeStep < steps.length - 1 ? (
                                                <button
                                                    type="button"
                                                    onClick={handleNext}
                                                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all shadow-sm w-full sm:w-auto text-center"
                                                >
                                                    Next Step
                                                    <ChevronRight className="w-4 h-4 inline ml-2" />
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="px-6 md:px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all shadow-sm hover:shadow-md w-full sm:w-auto text-center"
                                                >
                                                    Submit Property
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Help Section */}
                            <div className="mt-6 bg-gradient-to-r from-gray-900 to-gray-800 border border-yellow-500/20 rounded-xl p-4 md:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-yellow-300 font-bold mb-2 text-sm md:text-base">Need Help?</h3>
                                        <p className="text-gray-300 text-xs md:text-sm mb-3">
                                            Our property experts are here to assist you. Get help with listing creation,
                                            photography tips, or pricing suggestions.
                                        </p>
                                        <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all text-xs md:text-sm w-full sm:w-auto">
                                            Get Expert Assistance
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProperty;