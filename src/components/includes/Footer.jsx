import React from 'react';
import Link from 'next/link';

const Footer = ({ dict }) => {
  const footerLinks = [
    { name: dict.links.home, path: '/' },
    { name: dict.links.movies, path: '/movies' },
    { name: dict.links.actors, path: '/actors' },
    { name: dict.links.contact, path: '/contact' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo with subtle hover effect */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            TMDB
          </Link>
          
          {/* Navigation Links with better spacing */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium text-sm uppercase tracking-wider"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright with subtle top border */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {dict.copyright} Yasser AL-ariqi (yaaser10esam10@gmail.com)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;