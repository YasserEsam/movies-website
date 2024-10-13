import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Actors', path: '/actors' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-gray-900 py-6">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            TMDB
          </Link>
          
          {/* Navigation Links */}
          <ul className="flex flex-row gap-4 mt-4 md:mt-0">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.path} className="text-gray-700 dark:text-gray-200 hover:text-blue-400">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} TMDB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
