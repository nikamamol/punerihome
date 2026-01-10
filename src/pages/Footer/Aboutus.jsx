import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/appartment.jpg';

function Aboutus() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-black text-gray-700 mb-6">
                Welcome to <span className="text-yellow-600">PuneriHouse</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Pune's first zero-brokerage rental platform connecting tenants directly 
                with property owners, eliminating middlemen and saving you money.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center p-6 bg-white rounded-xl border border-yellow-200 shadow-sm">
                <div className="text-3xl font-bold text-yellow-600">5,000+</div>
                <div className="text-gray-600 mt-2">Properties Listed</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-yellow-200 shadow-sm">
                <div className="text-3xl font-bold text-yellow-600">₹50 Cr+</div>
                <div className="text-gray-600 mt-2">Rental Value Saved</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-yellow-200 shadow-sm">
                <div className="text-3xl font-bold text-yellow-600">15,000+</div>
                <div className="text-gray-600 mt-2">Happy Users</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-yellow-200 shadow-sm">
                <div className="text-3xl font-bold text-yellow-600">50+</div>
                <div className="text-gray-600 mt-2">Pune Areas Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-700 mb-6">
                  Our Story: Revolutionizing Pune Rentals
                </h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2022 by Pune natives who experienced firsthand the challenges 
                  of finding rental properties in the city, PuneriHouse was born out of a 
                  simple yet powerful idea: <strong className="text-yellow-600">why pay brokerage when you can connect directly?</strong>
                </p>
                <p className="text-gray-700 mb-4">
                  We noticed that both tenants and property owners were losing significant 
                  amounts of money to brokerage fees, often without receiving corresponding 
                  value in services. The traditional real estate system was opaque, 
                  inefficient, and costly.
                </p>
                <p className="text-gray-700">
                  Today, PuneriHouse stands as Pune's most trusted rental platform, 
                  having facilitated thousands of direct connections and saved our users 
                  crores in unnecessary brokerage fees.
                </p>
              </div>
              <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200">
                {/* <div className="text-yellow-600 text-6xl mb-4">🏡</div> */}
                   <h3 className="text-xl font-bold text-gray-700 mb-3">Our Mission</h3>
                <img src={logo} alt="PuneriHouse Logo" className='rounded-lg shadow-lg'/>
             
                <p className="text-gray-700 mt-4">
                  To make renting in Pune transparent, affordable, and hassle-free by 
                  eliminating brokerage fees and empowering users with direct connections 
                  and verified information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-700 mb-12 text-center">
              The Problem We're Solving
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-red-500 text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-700 mb-4">High Brokerage Fees</h3>
                <p className="text-gray-700">
                  Traditional brokers charge 1-2 months' rent as commission, adding 
                  significant financial burden to both tenants and property owners.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-red-500 text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-700 mb-4">Limited Transparency</h3>
                <p className="text-gray-700">
                  Lack of verified information, hidden charges, and unclear processes 
                  make renting a stressful experience for everyone involved.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-red-500 text-4xl mb-4">⏱️</div>
                <h3 className="text-xl font-bold text-gray-700 mb-4">Time-Consuming Process</h3>
                <p className="text-gray-700">
                  Multiple brokers, endless calls, and repetitive property visits 
                  waste valuable time and energy for both parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-700 mb-12 text-center">
              Our Zero-Brokerage Solution
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Direct Connections</h3>
                    <p className="text-gray-700">
                      Connect directly with verified property owners or tenants without 
                      any middlemen or commission fees.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Verified Listings</h3>
                    <p className="text-gray-700">
                      All properties and users undergo verification processes to ensure 
                      authenticity and build trust within our community.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Secure Platform</h3>
                    <p className="text-gray-700">
                      End-to-end encrypted messaging, secure document sharing, and 
                      comprehensive privacy controls protect your information.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Smart Search</h3>
                    <p className="text-gray-700">
                      Advanced filters, saved searches, and personalized recommendations 
                      help you find the perfect property or tenant quickly.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Complete Transparency</h3>
                    <p className="text-gray-700">
                      Clear pricing, detailed property information, and honest reviews 
                      create a transparent rental ecosystem.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">24/7 Support</h3>
                    <p className="text-gray-700">
                      Our dedicated support team is always available to help with any 
                      questions or concerns throughout your rental journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-700 mb-12 text-center">
              How PuneriHouse Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-yellow-600 text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-4">Create Account</h3>
                <p className="text-gray-700">
                  Sign up for free as a tenant or property owner. Complete your profile 
                  with basic information and get verified.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-yellow-600 text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-4">Search or List</h3>
                <p className="text-gray-700">
                  Tenants can search using advanced filters. Owners can list properties 
                  with photos, details, and pricing.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-yellow-600 text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-4">Connect Directly</h3>
                <p className="text-gray-700">
                  Use our secure messaging to communicate, schedule visits, share 
                  documents, and finalize agreements without brokerage fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Savings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-700 mb-12 text-center">
              The PuneriHouse Impact
            </h2>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 border border-yellow-200">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">₹50,000+</div>
                  <div className="text-gray-700">Average Savings Per Tenant</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">₹75,000+</div>
                  <div className="text-gray-700">Average Savings Per Property Owner</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">2,500+</div>
                  <div className="text-gray-700">Hours Saved Monthly by Users</div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-white rounded-lg border border-yellow-200">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Real Stories from Our Users</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-700 italic mb-2">
                      "Saved ₹1.2 lakh in brokerage while finding my perfect 2BHK in Kalyani Nagar. 
                      The direct connection with the owner made everything so transparent."
                    </p>
                    <p className="text-gray-700 font-medium">- Priya Sharma, Software Engineer</p>
                  </div>
                  <div>
                    <p className="text-gray-700 italic mb-2">
                      "As a property owner, I've rented out 3 flats through PuneriHouse and saved 
                      over ₹2 lakh in brokerage. The platform is simple and effective."
                    </p>
                    <p className="text-gray-700 font-medium">- Rajesh Patil, Property Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-700 mb-12 text-center">
              Our Pune Roots
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-700 mb-6">
                  Built by Punekars, for Punekars
                </h3>
                <p className="text-gray-700 mb-4">
                  PuneriHouse was founded by lifelong Pune residents who understand 
                  the unique challenges of the city's rental market. We're not just 
                  another tech company - we're your neighbors.
                </p>
                <p className="text-gray-700 mb-4">
                  Our team includes real estate experts, technology professionals, 
                  and customer service specialists who are passionate about making 
                  renting in Pune better for everyone.
                </p>
                <p className="text-gray-700">
                  We're committed to the Pune community and actively participate in 
                  local initiatives that improve housing accessibility and affordability.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-700 mb-6">Our Values</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-600">✓</span>
                    </div>
                    <span className="text-gray-800">Transparency in everything we do</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-600">✓</span>
                    </div>
                    <span className="text-gray-800">Zero brokerage, always</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-600">✓</span>
                    </div>
                    <span className="text-gray-800">User privacy and security</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-600">✓</span>
                    </div>
                    <span className="text-gray-800">Community-driven approach</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-600">✓</span>
                    </div>
                    <span className="text-gray-800">Continuous improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">
              Ready to Experience Zero-Brokerage Renting?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of Punekars who are saving money and time with PuneriHouse.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition text-lg">
                List Your Property Free
              </button>
              <button className="px-8 py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition text-lg">
                Find Your Dream Home
              </button>
            </div>
            
            <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-700 mb-4">
                <strong>Still have questions?</strong> Check out our FAQ or contact our Pune-based support team.
              </p>
              <div className="flex justify-center gap-6">
                <Link to={"/faq"} className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Visit FAQ →
                </Link>
                <Link to={"/services/24/7-support"} className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Aboutus;