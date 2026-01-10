import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Phone, Mail, MessageSquare, Clock, Shield,
    HelpCircle, FileText, CheckCircle, ArrowRight
} from 'lucide-react';

function Support() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const supportOptions = [
        {
            icon: <Phone className="h-5 w-5" />,
            title: "Call Us",
            details: "+91 98765 43210",
            timing: "24/7 Available"
        },
        {
            icon: <Mail className="h-5 w-5" />,
            title: "Email Us",
            details: "support@punerihouse.com",
            timing: "Reply within 4 hours"
        },
        {
            icon: <MessageSquare className="h-5 w-5" />,
            title: "Live Chat",
            details: "Chat with Expert",
            timing: "8 AM - 10 PM"
        }
    ];

    const faqs = [
        {
            question: "How to verify property?",
            answer: "Submit documents through owner dashboard."
        },
        {
            question: "Verification time?",
            answer: "24-48 hours for basic verification."
        },
        {
            question: "Schedule viewing?",
            answer: "Directly through property page."
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Support Request:', formData);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
        alert('Message sent! We will contact you soon.');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 rounded-xl mb-3 border border-yellow-500/20">
                        <Shield className="h-6 w-6 text-yellow-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Support Center</h1>
                    <p className="text-gray-600">Get help with your queries</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {supportOptions.map((option, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-yellow-400 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-yellow-50 rounded-lg">
                                    <div className="text-yellow-500">{option.icon}</div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                                    <p className="text-gray-900 font-medium text-sm mb-1">{option.details}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Clock className="h-3 w-3" />
                                        {option.timing}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left - Contact Form */}
                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Send Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none"
                                    placeholder="Your name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 outline-none resize-none"
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right - FAQs */}
                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <HelpCircle className="h-5 w-5 text-yellow-500" />
                            <h2 className="text-lg font-bold text-gray-900">FAQs</h2>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-gray-100 rounded-lg p-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                                {faq.question}
                                            </h4>
                                            <p className="text-gray-600 text-xs">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <Link
                                to="/faq"
                                className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1"
                            >
                                View all FAQs
                                <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Help */}
                <div className="mt-6 bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-yellow-600" />
                        <h3 className="font-bold text-gray-900">Need Immediate Help?</h3>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                        For urgent issues, call our emergency line
                    </p>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-yellow-600" />
                        <span className="font-bold text-gray-900">Emergency:</span>
                        <span className="text-yellow-700 font-semibold">+91 98765 43210</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Support;