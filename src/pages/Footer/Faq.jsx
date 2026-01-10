import React, { useState } from "react";
import { Link } from "react-router-dom";

function Faq() {
  const [openSections, setOpenSections] = useState({
    general: true,
    tenants: false,
    owners: false,
    verification: false,
    payments: false,
    technical: false,
  });

  const [openQuestions, setOpenQuestions] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleQuestion = (id) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqData = {
    general: [
      {
        id: "gen1",
        question: "What is PuneriHouse and how does it work?",
        answer:
          "PuneriHouse is a zero-brokerage rental platform that connects tenants directly with property owners in Pune. We eliminate middlemen and brokerage fees, allowing you to find or list rental properties without any commission charges. The platform enables direct communication, property viewing scheduling, and document sharing between verified users.",
      },

      {
        id: "gen3",
        question: "Which areas in Pune do you cover?",
        answer:
          "We cover all major areas in Pune including Koregaon Park, Kalyani Nagar, Viman Nagar, Kharadi, Hadapsar, Hinjewadi, Baner, Aundh, Wakad, Pimple Saudagar, and surrounding regions. Our platform is continuously expanding to cover more localities across Pune.",
      },
      {
        id: "gen4",
        question: "What types of properties can I find on PuneriHouse?",
        answer:
          "You can find various types of rental properties including apartments, flats, independent houses, villas, PG accommodations, service apartments, and commercial spaces for rent. We cater to all types of rental needs from single rooms to complete houses.",
      },
    ],
    tenants: [
      {
        id: "ten1",
        question: "How do I search for rental properties?",
        answer:
          "You can search using multiple filters: location, budget, property type (1BHK, 2BHK, etc.), preferred area, amenities (parking, lift, etc.), and availability date. Our advanced search allows you to save searches and set up alerts for new listings matching your criteria.",
      },
      {
        id: "ten2",
        question: "How can I contact property owners?",
        answer:
          "Once you register and verify your account, you can use our secure messaging system to contact property owners directly. We recommend introducing yourself properly and mentioning your requirements to get better responses.",
      },
      {
        id: "ten3",
        question: "What documents do I need to rent a property?",
        answer:
          "Typically you need: 1) Identity proof (Aadhaar/PAN/Passport), 2) Address proof, 3) Employment proof, 4) Latest salary slips, 5) Previous rental agreement (if applicable), 6) Passport-size photographs. Specific requirements may vary by property owner.",
      },
      {
        id: "ten4",
        question: "Can I schedule property visits through the platform?",
        answer:
          "Yes, you can request property visits directly through our platform. Property owners will receive your request and can confirm or suggest alternative timings. We recommend confirming visits 24 hours in advance.",
      },
    ],
    owners: [
      {
        id: "own1",
        question: "How do I list my property for rent?",
        answer:
          '1) Create and verify your account, 2) Click "List Property", 3) Fill property details (type, size, amenities), 4) Add high-quality photos, 5) Set rental price and terms, 6) Submit for approval. Your listing will be live within 24 hours after basic verification.',
      },
      {
        id: "own2",
        question: "What information should I include in my listing?",
        answer:
          "Include: Property type and size, exact location, monthly rent, security deposit, available from date, included amenities, society rules if any, parking availability, nearby landmarks, and clear photos of all rooms and exteriors.",
      },
      {
        id: "own3",
        question: "How do I verify tenant credibility?",
        answer:
          "We provide basic verification (phone/email), but we recommend: 1) Verifying employment documents, 2) Checking previous rental history, 3) Meeting in person, 4) Verifying ID proofs, 5) Taking references if needed. Always use your judgment before finalizing.",
      },
      {
        id: "own4",
        question: "Can I update or remove my listing?",
        answer:
          'Yes, you can edit your listing anytime through your dashboard. You can update price, availability, or description. To remove a listing, simply mark it as "Rented" or "No longer available" from your property management section.',
      },
    ],
    verification: [
      {
        id: "ver1",
        question: "What verification processes do you have?",
        answer:
          "We have multiple verification levels: 1) Phone number verification via OTP, 2) Email verification, 3) Property document verification for premium listings, 4) Address verification for property owners. Higher verification badges increase trust among users.",
      },
      {
        id: "ver2",
        question: "How do I get verified as a property owner?",
        answer:
          "Submit property ownership documents (property papers, maintenance bills, or society NOC) and identity proof. Our team verifies these documents within 48 hours. Verified owners get a blue tick badge on their profile.",
      },
      {
        id: "ver3",
        question: "Do you verify tenant backgrounds?",
        answer:
          "We provide basic identity verification. For comprehensive background checks, we recommend property owners to independently verify employment, previous rental history, and references before finalizing any agreement.",
      },
      {
        id: "ver4",
        question: "What if I find a fake listing or suspicious user?",
        answer:
          'Immediately report it using the "Report" button on the listing/user profile or email us at report@punerihouse.com. We investigate all reports within 24 hours and take appropriate action including removal of listings and banning users.',
      },
    ],
    payments: [
      {
        id: "pay1",
        question: "Do you charge any brokerage or commission?",
        answer:
          "NO. PuneriHouse operates on a zero-brokerage model. We do not charge any commission or brokerage fees for rental transactions. Our platform is completely free for connecting tenants and property owners.",
      },
      {
        id: "pay2",
        question: "What is the typical security deposit amount?",
        answer:
          "In Pune, security deposit typically ranges from 1 to 3 months rent, with 2 months being most common. This amount is refundable at the end of the agreement period, subject to property condition and terms fulfillment.",
      },
      {
        id: "pay3",
        question: "How should I handle rental payments?",
        answer:
          "We recommend: 1) Use traceable payment methods (cheque/bank transfer), 2) Always get receipts, 3) Document all transactions, 4) Avoid cash payments for large amounts, 5) Clearly mention payment terms in the rental agreement.",
      },
      {
        id: "pay4",
        question: "What about maintenance charges and other expenses?",
        answer:
          "Maintenance charges, electricity, water, and other utilities are typically separate from rent. These should be clearly specified in the rental agreement. Society maintenance is usually paid by the tenant unless specified otherwise.",
      },
    ],
    technical: [
      {
        id: "tech1",
        question: "How do I reset my password?",
        answer:
          'Click "Forgot Password" on the login page, enter your registered email, and follow the instructions sent to your email. If you face issues, contact support@punerihouse.com with your registered phone number.',
      },
      {
        id: "tech2",
        question: "Can I use PuneriHouse on mobile?",
        answer:
          "Yes, our website is fully responsive and works perfectly on all mobile devices. We also have a mobile-friendly interface that allows you to search properties, contact owners, and manage your account on the go.",
      },
      {
        id: "tech3",
        question: "How do I delete my account?",
        answer:
          "Go to Account Settings → Privacy → Delete Account. Note: This action is permanent and will remove all your listings and data from our platform. You can also temporarily deactivate your account if you prefer.",
      },
      {
        id: "tech4",
        question: "Who do I contact for technical issues?",
        answer:
          'For technical support, email support@punerihouse.com or use the "Help" option in your account dashboard. Include screenshots and details of the issue for faster resolution. We typically respond within 24 hours.',
      },
    ],
  };

  const stats = [
    { label: "Properties Listed", value: "5000+" },
    { label: "Verified Users", value: "10,000+" },
    { label: "Areas Covered", value: "50+" },
    { label: "Avg Response Time", value: "2-4 hrs" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-yellow-500">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-700">
              Find answers to common questions about using PuneriHouse, our
              zero-brokerage rental platform, and the rental process in Pune.
            </p>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="text-2xl font-bold text-yellow-600">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* General FAQs */}
          <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => toggleSection("general")}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-bold text-gray-700">
                General Questions
              </h2>
              <span className="text-yellow-600">
                {openSections.general ? "−" : "+"}
              </span>
            </button>

            {openSections.general && (
              <div className="px-6 pb-6 space-y-4">
                {faqData.general.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <span className="font-medium text-gray-800">
                        {item.question}
                      </span>
                      <span className="text-yellow-600 ml-2">
                        {openQuestions[item.id] ? "−" : "+"}
                      </span>
                    </button>
                    {openQuestions[item.id] && (
                      <div className="p-4 bg-white">
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* For Tenants */}
          <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => toggleSection("tenants")}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-bold text-gray-700">For Tenants</h2>
              <span className="text-yellow-600">
                {openSections.tenants ? "−" : "+"}
              </span>
            </button>

            {openSections.tenants && (
              <div className="px-6 pb-6 space-y-4">
                {faqData.tenants.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <span className="font-medium text-gray-800">
                        {item.question}
                      </span>
                      <span className="text-yellow-600 ml-2">
                        {openQuestions[item.id] ? "−" : "+"}
                      </span>
                    </button>
                    {openQuestions[item.id] && (
                      <div className="p-4 bg-white">
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* For Property Owners */}
          <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => toggleSection("owners")}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-bold text-gray-700">
                For Property Owners
              </h2>
              <span className="text-yellow-600">
                {openSections.owners ? "−" : "+"}
              </span>
            </button>

            {openSections.owners && (
              <div className="px-6 pb-6 space-y-4">
                {faqData.owners.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <span className="font-medium text-gray-800">
                        {item.question}
                      </span>
                      <span className="text-yellow-600 ml-2">
                        {openQuestions[item.id] ? "−" : "+"}
                      </span>
                    </button>
                    {openQuestions[item.id] && (
                      <div className="p-4 bg-white">
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Verification & Safety */}
          <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => toggleSection("verification")}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-bold text-gray-700">
                Verification & Safety
              </h2>
              <span className="text-yellow-600">
                {openSections.verification ? "−" : "+"}
              </span>
            </button>

            {openSections.verification && (
              <div className="px-6 pb-6 space-y-4">
                {faqData.verification.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <span className="font-medium text-gray-800">
                        {item.question}
                      </span>
                      <span className="text-yellow-600 ml-2">
                        {openQuestions[item.id] ? "−" : "+"}
                      </span>
                    </button>
                    {openQuestions[item.id] && (
                      <div className="p-4 bg-white">
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Payments & Pricing */}
          <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => toggleSection("payments")}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-bold text-gray-700">
                Payments & Pricing
              </h2>
              <span className="text-yellow-600">
                {openSections.payments ? "−" : "+"}
              </span>
            </button>

            {openSections.payments && (
              <div className="px-6 pb-6 space-y-4">
                {faqData.payments.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <span className="font-medium text-gray-800">
                        {item.question}
                      </span>
                      <span className="text-yellow-600 ml-2">
                        {openQuestions[item.id] ? "−" : "+"}
                      </span>
                    </button>
                    {openQuestions[item.id] && (
                      <div className="p-4 bg-white">
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Technical Support */}
          <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => toggleSection("technical")}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-bold text-gray-700">
                Technical Support
              </h2>
              <span className="text-yellow-600">
                {openSections.technical ? "−" : "+"}
              </span>
            </button>

            {openSections.technical && (
              <div className="px-6 pb-6 space-y-4">
                {faqData.technical.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <span className="font-medium text-gray-800">
                        {item.question}
                      </span>
                      <span className="text-yellow-600 ml-2">
                        {openQuestions[item.id] ? "−" : "+"}
                      </span>
                    </button>
                    {openQuestions[item.id] && (
                      <div className="p-4 bg-white">
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Quick Tips Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-bold text-yellow-700 mb-4 text-lg">
              💡 Quick Rental Tips for Pune
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border border-yellow-100">
                <h4 className="font-semibold text-gray-800 mb-2">
                  For Tenants:
                </h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Visit properties during daylight hours</li>
                  <li>• Check water pressure and electricity backup</li>
                  <li>• Verify society rules about visitors/pets</li>
                  <li>• Take photos during move-in for reference</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border border-yellow-100">
                <h4 className="font-semibold text-gray-800 mb-2">
                  For Owners:
                </h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Keep property documents ready</li>
                  <li>• Be clear about maintenance charges</li>
                  <li>• Screen tenants thoroughly</li>
                  <li>• Prepare a comprehensive rental agreement</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is
                here to help you with any questions about using PuneriHouse or
                the rental process in Pune.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-yellow-600 font-bold text-lg mb-2">
                    📧 Email
                  </div>
                  <p className="text-gray-700">support@punerihouse.com</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Response within 24 hours
                  </p>
                </div>

                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-yellow-600 font-bold text-lg mb-2">
                    📞 Phone
                  </div>
                  <p className="text-gray-700">+91 20 1234 5678</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Mon-Sat, 10AM-7PM
                  </p>
                </div>

                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-yellow-600 font-bold text-lg mb-2">
                    💬 Live Chat
                  </div>
                  <p className="text-gray-700">Available on website</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Click chat icon in corner
                  </p>
                </div>
              </div>
              <br />
              <Link
                to="/services/24/7-support"
                className=" px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition"
              >
                Contact Support Team
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Faq;
