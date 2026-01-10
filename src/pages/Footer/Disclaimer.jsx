import React from "react";

function Disclaimer() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-yellow-500">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              Legal Disclaimer
            </h1>
            <p className="text-gray-700">
              This disclaimer outlines the limitations and scope of services
              provided by PuneriHouse.com. Please read it carefully before using
              our platform.
            </p>
            <div className="mt-4 text-gray-500">
              Effective Date: December 2025
            </div>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="container mx-auto px-4 -mt-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-red-500 mr-3">
                <span className="font-bold text-lg">⚠️</span>
              </div>
              <div>
                <h3 className="font-bold text-red-700 mb-1">
                  Important Legal Notice
                </h3>
                <p className="text-red-600 text-sm">
                  PuneriHouse is an intermediary platform only. We do not
                  verify, endorse, or guarantee any property listings or user
                  information.
                </p>
              </div>
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
              1. Nature of Services
            </h2>
            <p className="text-gray-700 mb-4">
              PuneriHouse.com operates as an online classifieds platform and
              technology service provider. We are:
            </p>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="h-2 w-2 bg-yellow-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    An Intermediary Platform
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We provide technological infrastructure to connect users but
                    do not participate in transactions
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-2 w-2 bg-yellow-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Not a Real Estate Broker
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We do not act as agents, brokers, or representatives of
                    either party
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-2 w-2 bg-yellow-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Zero-Brokerage Model
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We facilitate direct connections without charging brokerage
                    fees
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-2 w-2 bg-yellow-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Information Provider
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We display user-generated content but do not verify its
                    accuracy
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              2. Property Listings Disclaimer
            </h2>
            <p className="text-gray-700 mb-4">
              Regarding property listings on our platform:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-yellow-600 mb-3">
                  We DO NOT:
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Verify property ownership or legal title</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Inspect properties for condition or amenities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Confirm rental prices or availability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Endorse or recommend any property</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Guarantee property legality or compliance</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-yellow-600 mb-3">
                  Users MUST:
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Verify all property details independently</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Check property documents and ownership</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Visit properties before making decisions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Consult legal experts for agreements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Conduct due diligence at every stage</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              3. User Verification & Identity
            </h2>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  Limited Verification:
                </h4>
                <p className="text-gray-700">
                  While we may implement basic verification mechanisms (phone
                  OTP, email verification), these do not constitute:
                </p>
                <ul className="text-gray-700 space-y-1 ml-4 mt-2">
                  <li>• Background checks</li>
                  <li>• Financial capability verification</li>
                  <li>• Criminal record checks</li>
                  <li>• Employment verification</li>
                  <li>• Reference checks</li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded">
                <h4 className="font-semibold text-amber-700 mb-2">
                  ⚠️ User Responsibility:
                </h4>
                <p className="text-amber-600 text-sm">
                  It is the sole responsibility of users to verify the identity,
                  background, and credibility of other users before entering
                  into any agreements or sharing personal information.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              4. Financial & Transaction Disclaimers
            </h2>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  No Financial Advice:
                </h4>
                <p className="text-gray-700">PuneriHouse does not provide:</p>
                <ul className="text-gray-700 space-y-1 ml-4 mt-2">
                  <li>• Rental price recommendations or valuations</li>
                  <li>• Financial or investment advice</li>
                  <li>• Legal advice on rental agreements</li>
                  <li>• Tax implications guidance</li>
                  <li>• Market trend analysis or predictions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  Transaction Risks:
                </h4>
                <p className="text-gray-700">
                  Users engage in financial transactions at their own risk. We
                  recommend:
                </p>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded border border-blue-100">
                    <h5 className="font-medium text-blue-800 mb-1">
                      For Tenants
                    </h5>
                    <p className="text-blue-600 text-xs">
                      • Pay through traceable methods (cheque/bank transfer)
                      <br />
                      • Get receipts for all payments
                      <br />
                      • Verify owner's bank account details
                      <br />• Ensure security deposit terms are clear
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded border border-green-100">
                    <h5 className="font-medium text-green-800 mb-1">
                      For Owners
                    </h5>
                    <p className="text-green-600 text-xs">
                      • Verify tenant's employment/income
                      <br />
                      • Check previous rental history
                      <br />
                      • Take advance rent securely
                      <br />• Document all payments received
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              5. Content Accuracy & Reliability
            </h2>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  User-Generated Content:
                </h4>
                <p className="text-gray-700 mb-3">
                  All property listings, descriptions, photos, and user profiles
                  are created by users. We do not:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Edit or modify user content for accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Verify photos represent actual properties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Check amenity claims or property features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Monitor all communications between users</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded">
                <h4 className="font-semibold text-purple-700 mb-2">
                  Report Inaccurate Content:
                </h4>
                <p className="text-purple-600 text-sm">
                  If you find inaccurate or misleading content, please report it
                  immediately to{" "}
                  <span className="font-medium">report@punerihouse.com</span>.
                  We will investigate and may remove content violating our
                  policies.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              6. Legal Compliance & Regulations
            </h2>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  Local Laws:
                </h4>
                <p className="text-gray-700">
                  Users are responsible for complying with all applicable laws
                  including:
                </p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <div className="text-xs text-gray-500">
                      Maharashtra Rent Control Act
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <div className="text-xs text-gray-500">
                      Registration Act
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <div className="text-xs text-gray-500">IT Act, 2000</div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <div className="text-xs text-gray-500">
                      Consumer Protection Act
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">
                  Society Rules & Regulations:
                </h4>
                <p className="text-gray-700 text-sm">
                  Many residential societies have specific rules regarding
                  rentals, visitor policies, pet restrictions, etc. It is the
                  responsibility of both parties to verify and comply with these
                  regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              7. Limitation of Liability
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded">
                <h4 className="font-semibold text-red-700 mb-2">
                  Critical Limitation:
                </h4>
                <p className="text-red-600 text-sm">
                  To the maximum extent permitted by law, PuneriHouse and its
                  affiliates shall not be liable for any direct, indirect,
                  incidental, special, consequential, or exemplary damages
                  resulting from:
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Use or inability to use our platform
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Inaccurate, incomplete, or misleading information on
                    listings
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Unauthorized access to or alteration of your transmissions
                    or data
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Statements or conduct of any third party on the platform
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700">
                    Any other matter relating to the platform
                  </span>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-yellow-700 text-sm">
                  This limitation applies regardless of whether the damages
                  arise from breach of contract, tort, or any other legal theory
                  or form of action.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              8. Indemnification
            </h2>
            <p className="text-gray-700 mb-4">
              By using PuneriHouse, you agree to indemnify, defend, and hold
              harmless PuneriHouse, its officers, directors, employees, and
              agents from and against any and all claims, damages, obligations,
              losses, liabilities, costs, or debt, and expenses arising from:
            </p>

            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-gray-700">
                  Your use of and access to the platform
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-gray-700">
                  Your violation of any term of these Terms of Use
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-gray-700">
                  Your violation of any third-party right, including
                  intellectual property rights
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-gray-700">
                  Any claim that your content caused damage to a third party
                </span>
              </div>
            </div>
          </section>

          {/* Final Warning */}
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
            <div className="flex items-start">
              <div className="text-red-500 mr-4 text-2xl">⚠️</div>
              <div>
                <h3 className="font-bold text-red-700 mb-3 text-lg">
                  Final Legal Warning
                </h3>
                <p className="text-red-600 mb-4">
                  Using PuneriHouse.com constitutes your acknowledgment and
                  agreement that:
                </p>
                <ul className="text-red-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>You understand the limitations of our platform</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>
                      You accept full responsibility for your decisions and
                      actions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>
                      You will conduct independent verification of all
                      information
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>
                      You release PuneriHouse from all liability related to
                      transactions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>
                      You will seek professional advice before making binding
                      commitments
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              For Legal Inquiries
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this disclaimer or need clarification
              on legal matters:
            </p>

            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="text-yellow-600 font-medium">
                  Legal Department:
                </span>{" "}
                legal@punerihouse.com
              </p>
              <p className="text-gray-700">
                <span className="text-yellow-600 font-medium">
                  Grievance Officer:
                </span>{" "}
                grievance@punerihouse.com
              </p>
              <p className="text-gray-700">
                <span className="text-yellow-600 font-medium">
                  Registered Address:
                </span>{" "}
                Pune, Maharashtra, India
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  <strong>Note:</strong> This disclaimer supplements but does
                  not replace our Terms of Use and Privacy Policy. All documents
                  should be read together.
                </p>
              </div>
            </div>
          </section>

          {/* Acknowledgment */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-700">
              By continuing to use PuneriHouse.com, you acknowledge that you
              have read, understood, and agree to be bound by this Legal
              Disclaimer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;
