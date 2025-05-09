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
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isArabic, setIsArabic] = useState(lang === 'ar')
  const [user, setUser] = useState(null)

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
    localStorage.setItem('preferredLang', newLang)
    document.cookie = `preferredLang=${newLang}; path=/`

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

    const savedLang = localStorage.getItem('preferredLang')
    const currentLang = window.location.pathname.split('/')[1]

    if (savedLang && savedLang !== currentLang) {
      window.location.href = `/${savedLang}${window.location.pathname.replace(/^\/(en|ar)/, '')}`
    }
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <nav
      className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-lg w-full sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 ${isArabic ? 'text-right' : 'text-left'}`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            href={`/${isArabic ? 'ar' : 'en'}/`}
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-blue-300 transition-all duration-300"
          >
            TMDB
          </Link>

          <ul className="hidden lg:flex gap-8 items-center">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={`/${isArabic ? 'ar' : 'en'}${item.path}`}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 text-sm md:text-base font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="hidden lg:flex items-center gap-3">
            <SearchInput placeholder={dict.search} />
            <CustomButton
              icon={isDarkMode ? FaSun : FaMoon}
              text={isDarkMode ? dict.light : dict.dark}
              onClick={toggleTheme}
              className="hover:scale-105 transition-transform duration-200"
            />
            <CustomButton
              text={isArabic ? 'EN' : 'AR'}
              onClick={toggleLanguage}
              className="hover:scale-105 transition-transform duration-200"
            />

            {user ? (
              <>
                <CustomButton
                  icon={FaUser}
                  text={user.displayName || dict.profile}
                  className="hover:scale-105 transition-transform duration-200"
                />
                <CustomButton
                  icon={FaSignOutAlt}
                  text={dict.logout}
                  onClick={handleLogout}
                  className="hover:scale-105 transition-transform duration-200"
                />
              </>
            ) : (
              <Link href="/login">
                <CustomButton
                  icon={FaUser}
                  text={dict.login}
                  className="hover:scale-105 transition-transform duration-200"
                />
              </Link>
            )}
          </div>

          <button
            className="lg:hidden text-gray-700 dark:text-gray-200 ml-4 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
            onClick={toggleMenu}
          >
            {menuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden ${menuOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 px-4 shadow-lg transform transition-all duration-300 ease-in-out`}
      >
        <ul className="flex flex-col items-start py-4 space-y-3">
          <li className="w-full">
            <SearchInput placeholder={dict.search} />
          </li>

          {menuItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link
                href={`/${isArabic ? 'ar' : 'en'}${item.path}`}
                onClick={toggleMenu}
                className="flex items-center text-gray-700 dark:text-gray-200 w-full py-2.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li className="w-full pt-2 border-t border-gray-200 dark:border-gray-700">
            <CustomButton
              width="100%"
              icon={isDarkMode ? FaSun : FaMoon}
              text={isDarkMode ? dict.light : dict.dark}
              onClick={() => {
                toggleTheme()
                toggleMenu()
              }}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            />
          </li>

          <li className="w-full">
            <CustomButton
              width="100%"
              text={isArabic ? 'Switch to EN' : 'Switch to AR'}
              onClick={() => {
                toggleLanguage()
                toggleMenu()
              }}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            />
          </li>

          {user ? (
            <>
              <li className="w-full">
                <CustomButton
                  icon={FaUser}
                  text={user.displayName || dict.profile}
                  width="100%"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                />
              </li>
              <li className="w-full">
                <CustomButton
                  width="100%"
                  icon={FaSignOutAlt}
                  text={dict.logout}
                  onClick={() => {
                    handleLogout()
                    toggleMenu()
                  }}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                />
              </li>
            </>
          ) : (
            <li className="w-full">
              <Link href="/login">
                <CustomButton
                  icon={FaUser}
                  text={dict.login}
                  width="100%"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  onClick={toggleMenu}
                />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
