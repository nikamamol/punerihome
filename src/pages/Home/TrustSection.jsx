import React from 'react';
import { Link } from 'react-router-dom';


const TrustSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why Trust Our Platform?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We implement multiple verification layers to ensure only genuine owners can list properties
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
             
            </div>
            <h3 className="text-xl font-semibold mb-2">Owner Verification</h3>
            <p className="text-gray-600">
              Every owner undergoes strict verification before listing
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            
            </div>
            <h3 className="text-xl font-semibold mb-2">Contact Protection</h3>
            <p className="text-gray-600">
              Owner contacts are protected and unlocked securely
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
        
            </div>
            <h3 className="text-xl font-semibold mb-2">Document Check</h3>
            <p className="text-gray-600">
              Optional document upload for additional verification
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
           
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Reports</h3>
            <p className="text-gray-600">
              Users can report suspicious listings for review
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Link
            to="/owner-verification"
            className="inline-block bg-gray-800 hover:bg-black text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Learn About Our Verification Process
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;