import React from "react";
import {
  Home,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronRight,
  Building,
  FileText,
  Newspaper,
  MapPin,
  Users,
  Shield,
  Info,
  BookOpen,
} from "lucide-react";
import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="col-span-full lg:col-span-2 lg:mb-0">
            <a href="/" className="flex justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Puneri Homes Logo"
                  className="mx-auto max-h-24"
                />
              </div>
            </a>
            <p className=" text-gray-400 lg:max-w-xs text-center lg:text-left leading-relaxed">
              Your trusted partner in Pune's real estate market. Direct owner
              connections, zero broker fees.
            </p>
            <a
              href="tel:+919876543210"
              className="py-2 mt-4 px-6 block w-fit bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg shadow-lg text-sm font-bold text-gray-900 mx-auto transition-all duration-300 hover:from-yellow-600 hover:to-yellow-500 hover:shadow-xl lg:mx-0 flex items-center gap-2"
            >
              <Phone size={16} />
              Contact: +91 1111 1111 11
            </a>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="text-lg font-bold text-yellow-300 mb-7 flex items-center gap-2">
              <Building size={20} className="text-yellow-400" />
              Quick Links
            </h4>
            <ul className="text-gray-300 space-y-4">
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Properties
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  New Projects
                </a>
              </li> */}
              {/* <li>
                                <a href="#" className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                                    <ChevronRight size={14} className="text-yellow-500 group-hover:text-yellow-300" />
                                    About Us
                                </a>
                            </li> */}
            </ul>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="text-lg font-bold text-yellow-300 mb-7 flex items-center gap-2">
              <MapPin size={20} className="text-yellow-400" />
              Locations
            </h4>
            <ul className="text-gray-300 space-y-4">
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Baner
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Hinjewadi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Kharadi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Viman Nagar
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="text-lg font-bold text-yellow-300 mb-7 flex items-center gap-2">
              <FileText size={20} className="text-yellow-400" />
              Legal
            </h4>
            <ul className="text-gray-300 space-y-4">
              <li>
                <Link
                  to={"/privacy-policy"}
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to={"/terms-of-use"}
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to={"/disclaimer"}
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to={"/faq"}
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="text-lg font-bold text-yellow-300 mb-7 flex items-center gap-2">
              <Users size={20} className="text-yellow-400" />
              Company
            </h4>
            <ul className="text-gray-300 space-y-4">
              <li>
                <Link
                  to={"/about-us"}
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to={"/services/24/7-support"}
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link
                  to={"/careers"}
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Careers
                </Link>
              </li> */}
              <li>
                <Link
                  to={"/articles"}
                  className="hover:text-yellow-300 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                  Articles
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-7 border-t border-yellow-500/20">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <div className="text-center lg:text-left">
              <span className="text-sm text-gray-400">
                © {new Date().getFullYear()}{" "}
                <a
                  href="/"
                  className="text-yellow-400 font-bold hover:text-yellow-300"
                >
                  Puneri Homes
                </a>
                . All rights reserved.
              </span>
              <p className="text-xs text-gray-500 mt-2">
                Connecting buyers with verified property owners in Pune since
                2020
              </p>
            </div>
            <div className="flex mt-6 space-x-3 sm:justify-center lg:mt-0">
              <a
                href="https://www.facebook.com/PuneriHomes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 border border-yellow-500/30 flex justify-center items-center hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook
                  className="text-yellow-400 hover:text-gray-900"
                  size={18}
                />
              </a>
              <a
                href="https://twitter.com/PuneriHomes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 border border-yellow-500/30 flex justify-center items-center hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter
                  className="text-yellow-400 hover:text-gray-900"
                  size={18}
                />
              </a>
              <a
                href="https://www.instagram.com/PuneriHomes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 border border-yellow-500/30 flex justify-center items-center hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram
                  className="text-yellow-400 hover:text-gray-900"
                  size={18}
                />
              </a>
              <a
                href="https://www.linkedin.com/company/PuneriHomes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 border border-yellow-500/30 flex justify-center items-center hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin
                  className="text-yellow-400 hover:text-gray-900"
                  size={18}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="py-6 border-t border-yellow-500/20">
          <div className="flex items-start gap-3">
            <Shield className="text-yellow-500 mt-1" size={20} />
            <div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Puneri Homes Realty Services Limited is an intermediary platform
                connecting property buyers with verified sellers. We are not a
                party to any transactions between buyers and sellers. All
                listings are verified for authenticity. For complete terms,
                please read our
                <Link
                  to={"/terms-of-use"}
                  className="text-yellow-400 hover:text-yellow-300 font-medium ml-1"
                >
                  Terms & Conditions
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
