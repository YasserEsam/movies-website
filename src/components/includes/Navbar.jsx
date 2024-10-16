'use client'

import { useEffect, useState } from 'react'
import { FaSearch, FaSun, FaMoon, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { BiMenu, BiX } from 'react-icons/bi'
import Link from 'next/link'
import SearchInput from '../SearchInput'
import CustomButton from '../CustomButton'
import { auth } from '../../app/firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function Navbar({ lang, dict }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isArabic, setIsArabic] = useState(lang === 'ar')
  const [user, setUser] = useState(null) // Store the logged-in user

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

  const toggleLanguage = () => {
    const newLang = isArabic ? 'en' : 'ar'
    setIsArabic(!isArabic)

    // Store language in both localStorage and a cookie for the server
    localStorage.setItem('preferredLang', newLang)
    document.cookie = `preferredLang=${newLang}; path=/`

    // Rebuild the current path to switch languages
    const currentPath = window.location.pathname.replace(/^\/(en|ar)/, '')
    window.location.href = `/${newLang}${currentPath}`
  }

  const menuItems = [
    { name: dict.home, path: '/' },
    { name: dict.movies, path: '/movies' },
    { name: dict.tv, path: '/tv' },
    { name: dict.actors, path: '/actors' },
    { name: dict.contact, path: '/contact' },
    { name: dict.favorites, path: '/favorite' },
  ]

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode')
    if (darkMode === 'true') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    // Check for preferred language from localStorage
    const savedLang = localStorage.getItem('preferredLang')
    const currentLang = window.location.pathname.split('/')[1] // Extract current language from URL

    if (savedLang && savedLang !== currentLang) {
      window.location.href = `/${savedLang}${window.location.pathname.replace(/^\/(en|ar)/, '')}`
    }
  }, [])

  // Logout function
  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <nav
      className={`bg-white dark:bg-gray-900 shadow-lg w-full ${isArabic ? 'text-right' : 'text-left'}`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            href={`/${isArabic ? 'ar' : 'en'}/`}
            className="text-2xl font-bold text-gray-800 dark:text-white"
          >
            TMDB
          </Link>

          <ul className="hidden md:flex gap-6 md:gap-4 items-center">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={`/${isArabic ? 'ar' : 'en'}${item.path}`}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-400 text-sm md:text-base"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="hidden md:flex items-center gap-1 space-x-2 lg:space-x-4">
            <SearchInput placeholder={dict.search} />
            <CustomButton
              icon={isDarkMode ? FaSun : FaMoon}
              text={isDarkMode ? dict.light : dict.dark}
              onClick={toggleTheme}
            />
            <CustomButton
              text={isArabic ? 'EN' : 'AR'}
              onClick={toggleLanguage}
            />

            {user ? (
              <>
                {/* Show user's displayName if available, otherwise fallback to dict.profile */}
                <CustomButton
                  icon={FaUser}
                  text={user.displayName || dict.profile}
                />
                <CustomButton
                  icon={FaSignOutAlt}
                  text={dict.logout}
                  onClick={handleLogout}
                />
              </>
            ) : (
              <Link href="/login">
                <CustomButton icon={FaUser} text={dict.login} />
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-gray-700 dark:text-gray-200 ml-4"
            onClick={toggleMenu}
          >
            {menuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 px-3`}
      >
        <ul className="flex flex-col items-start py-4 space-y-2 border-b border-gray-300 dark:border-gray-700">
          <li className="w-full">
            <SearchInput placeholder={dict.search} />
          </li>

          {menuItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link
                href={`/${isArabic ? 'ar' : 'en'}${item.path}`}
                onClick={toggleMenu}
                className="flex items-center text-gray-700 dark:text-gray-200 w-full py-2 hover:bg-gray-200 dark:hover:bg-gray-800 border-b border-gray-300 dark:border-gray-700"
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li className="w-full">
            <CustomButton
              width="100%"
              icon={isDarkMode ? FaSun : FaMoon}
              text={isDarkMode ? dict.light : dict.dark}
              onClick={() => {
                toggleTheme()
                toggleMenu() // Close the menu after clicking
              }}
            />
          </li>

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
          <li className="w-full">
            <CustomButton
              icon={FaUser}
              text={user?.displayName || dict.profile}
              width="100%"
            />
          </li>
          <li className="w-full">
            {user ? (
              <CustomButton
                width="100%"
                icon={FaSignOutAlt}
                text={dict.logout}
                onClick={() => {
                  handleLogout()
                  toggleMenu() // Close the menu after logout
                }}
              />
            ) : (
              <CustomButton
                icon={FaUser}
                text={dict.login}
                href="/login"
                width="100%"
              />
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
