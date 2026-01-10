import React from "react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-yellow-500">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-700">
              This Privacy Policy describes how PuneriHouse ("we", "us", or
              "our") collects, uses, and shares your personal information when
              you use our platform to find or list rental properties without
              brokerage fees.
            </p>
            <div className="mt-4 text-gray-500">
              Last Updated: December 2025
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section 1 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-6">
              To provide our zero-brokerage rental services, we collect:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-yellow-600 mb-3">
                  From Tenants:
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>Name, email, and phone number</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>Rental preferences and search history</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>KYC documents for verification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>Communication with property owners</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-yellow-600 mb-3">
                  From Property Owners:
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>Property details and documentation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>Owner identification and verification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>Bank details for secure transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>Property availability and pricing</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-6">
              We use your information exclusively to facilitate direct rental
              connections without brokerage fees:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  Matching & Connection
                </h4>
                <p className="text-gray-700">
                  Connect verified tenants with legitimate property owners
                  directly
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  Verification
                </h4>
                <p className="text-gray-700">
                  Verify identities to ensure safe and transparent transactions
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  Communication
                </h4>
                <p className="text-gray-700">
                  Enable secure messaging between tenants and owners
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  Zero Brokerage Process
                </h4>
                <p className="text-gray-700">
                  Process rental agreements directly without middlemen
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              3. Data Protection & Security
            </h2>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  SSL Encryption
                </h4>
                <p className="text-gray-700">
                  All data transmission is protected with 256-bit SSL encryption
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  Secure Storage
                </h4>
                <p className="text-gray-700">
                  Sensitive data is stored in encrypted databases with
                  restricted access
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  No Data Selling
                </h4>
                <p className="text-gray-700">
                  We never sell or rent your personal information to third
                  parties
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  Limited Sharing
                </h4>
                <p className="text-gray-700">
                  Information is only shared between matched tenants and
                  property owners
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              4. Your Rights & Choices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Access & Correction
                  </h4>
                  <p className="text-gray-600 text-sm">
                    View and update your profile information anytime
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Data Export
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Request a copy of your data in portable format
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Account Deletion
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Permanently delete your account and associated data
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Communication Preferences
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Opt-in/out of marketing communications
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Cookie Management
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Control cookie settings through your browser
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    Complaint Resolution
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Raise concerns about data handling practices
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or how we
              handle your information, please contact our Data Protection
              Officer.
            </p>

            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="text-yellow-600 font-medium">Email:</span>{" "}
                privacy@punerihouse.com
              </p>
              <p className="text-gray-700">
                <span className="text-yellow-600 font-medium">Address:</span>{" "}
                Pune, Maharashtra, India
              </p>
              <p className="text-gray-700">
                <span className="text-yellow-600 font-medium">
                  Response Time:
                </span>{" "}
                Within 48 business hours
              </p>
            </div>
          </section>

          {/* Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-bold text-yellow-700 mb-3">Important Note</h3>
            <p className="text-gray-700">
              By using PuneriHouse.com, you acknowledge that you have read and
              understood this Privacy Policy. We reserve the right to update
              this policy periodically. Continued use of our platform after
              changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
