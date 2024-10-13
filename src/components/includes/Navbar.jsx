'use client'

import { useEffect, useState } from 'react'
import { FaSearch, FaSun, FaMoon, FaUser } from 'react-icons/fa'
import { BiMenu, BiX } from 'react-icons/bi'
import Link from 'next/link'
import SearchInput from '../SearchInput'
import CustomButton from '../CustomButton'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isArabic, setIsArabic] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('darkMode', newTheme)

    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleLanguage = () => setIsArabic(!isArabic)

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Actors', path: '/actors' },
    { name: 'Contact', path: '/contact' },
  ]

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode')
    if (darkMode === 'true') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg  w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Left Section: Logo and Menu Items */}
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 dark:text-white"
          >
            TMDB 
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4 lg:space-x-8 items-center">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-400 text-sm md:text-base"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Search, Theme Toggle, Language Toggle, Login*/}
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="hidden md:flex items-center gap-1 space-x-2 lg:space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <SearchInput placeholder="Search movies..." />
              {/* Other buttons and links */}
            </div>
            <CustomButton
              icon={isDarkMode ? FaSun : FaMoon}
              text={isDarkMode ? 'Light' : 'Dark'}
              onClick={toggleTheme}
            />

            <CustomButton
              text={isArabic ? 'EN' : 'AR'}
              onClick={toggleLanguage}
            />

            <CustomButton icon={FaUser} text="Login" />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 ml-4"
            onClick={toggleMenu}
          >
            {menuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 px-3`}
      >
        <ul className="flex flex-col items-start py-4 space-y-2 border-b border-gray-300 dark:border-gray-700">
          {/* Search Input in Mobile */}
          <li className="w-full">
            <SearchInput placeholder="Search..." />
          </li>

          {menuItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link
                href={item.path}
                onClick={toggleMenu}
                className="flex items-center text-gray-700 dark:text-gray-200 w-full py-2 hover:bg-gray-200 dark:hover:bg-gray-800 border-b border-gray-300 dark:border-gray-700"
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* Theme Toggle in Mobile */}
          <li className="w-full">
            <CustomButton
              width="100%"
              icon={isDarkMode ? FaSun : FaMoon}
              text={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              onClick={() => {
                toggleTheme()
                toggleMenu() // Close the menu after clicking
              }}
            />
          </li>

          {/* Language Toggle in Mobile */}
          <li className="w-full">
            <CustomButton
              width="100%"
              text={isArabic ? 'Switch to EN' : 'Switch to AR'}
              onClick={() => {
                toggleLanguage()
                toggleMenu() // Close the menu after clicking
              }}
            />
          </li>

          {/* Login in Mobile */}
          <li className="w-full">
            <CustomButton icon={FaUser} text="Login" width="100%" />
          </li>
        </ul>
      </div>
    </nav>
  )
}
