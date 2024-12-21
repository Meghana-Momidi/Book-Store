import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faPinterest,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Return Policy", href: "#" },
  { label: "FAQ", href: "#" },
];

const socialIcons = [
  { link: "https://facebook.com", icon: faFacebookF, label: "Facebook" },
  { link: "https://twitter.com", icon: faTwitter, label: "Twitter" },
  { link: "https://instagram.com", icon: faInstagram, label: "Instagram" },
  { link: "https://linkedin.com", icon: faLinkedinIn, label: "LinkedIn" },
  { link: "https://pinterest.com", icon: faPinterest, label: "Pinterest" },
  { link: "https://youtube.com", icon: faYoutube, label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6" role="contentinfo">
      <div className="mx-auto px-6 text-center">
        {/* Quick Links */}
        <nav aria-label="Footer navigation" className="mb-4">
          <ul className="flex justify-center flex-wrap gap-4">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-white hover:text-primary pr-2"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
                {index < quickLinks.length - 1 && <span className="mx-2">|</span>}
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Media Icons */}
        <div
          role="navigation"
          aria-label="Social media links"
          className="flex justify-center space-x-6 mb-6"
        >
          {socialIcons.map((icon) => (
            <a
              key={icon.link}
              href={icon.link}
              className="mt-8 mb-4 hover:text-primary transform transition-transform duration-200 hover:scale-125"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${icon.label} page`}
            >
              <FontAwesomeIcon icon={icon.icon} size="xl" />
            </a>
          ))}
        </div>

        {/* Copyrights */}
        <div className="mb-4">
          <p>&copy; {new Date().getFullYear()} Book Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
