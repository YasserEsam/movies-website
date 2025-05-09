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
  const [isScrolled, setIsScrolled] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      } ${isArabic ? 'text-right' : 'text-left'}`}
    >
      <div className="container  mx-auto px-4 md:px-6 lg:px-8 py-3">
        <div className="relative backdrop-blur-xl bg-white/5 dark:bg-black/5 rounded-2xl p-4 border border-white/10 dark:border-white/5 shadow-2xl">
          {/* Animated Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center gap-4 md:gap-8">
              <Link
                href={`/${isArabic ? 'ar' : 'en'}/`}
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
              >
                TMDB
              </Link>

              <ul className="hidden lg:flex gap-8 items-center">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/${isArabic ? 'ar' : 'en'}${item.path}`}
                      className="text-gray-200 hover:text-purple-300 text-sm md:text-base font-medium transition-colors duration-200 relative group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="hidden lg:flex items-center gap-4">
                <div className="relative group">
                  <SearchInput
                    placeholder={dict.search}
                    className="bg-white/5 hover:bg-white/10 focus:bg-white/15 border border-white/10 focus:border-purple-500/50 rounded-xl px-4 py-2.5 w-64 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-gray-200 placeholder-gray-400"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                </div>
                <CustomButton
                  icon={isDarkMode ? FaSun : FaMoon}
                  text={isDarkMode ? dict.light : dict.dark}
                  onClick={toggleTheme}
                  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                />
                <CustomButton
                  text={isArabic ? 'EN' : 'AR'}
                  onClick={toggleLanguage}
                  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                />

                {user ? (
                  <>
                    <CustomButton
                      icon={FaUser}
                      text={user.displayName || dict.profile}
                      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                    />
                    <CustomButton
                      icon={FaSignOutAlt}
                      text={dict.logout}
                      onClick={handleLogout}
                      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                    />
                  </>
                ) : (
                  <Link href="/login">
                    <CustomButton
                      icon={FaUser}
                      text={dict.login}
                      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                    />
                  </Link>
                )}
              </div>

              <button
                className="lg:hidden text-gray-200 hover:text-purple-300 ml-4 transition-colors duration-200"
                onClick={toggleMenu}
              >
                {menuOpen ? <BiX size={28} /> : <BiMenu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${
          menuOpen ? 'block' : 'hidden'
        } bg-gray-900/95 backdrop-blur-lg px-4 shadow-lg transform transition-all duration-300 ease-in-out`}
      >
        <ul className="flex flex-col items-start py-4 space-y-3">
          <li className="w-full">
            <div className="relative group">
              <SearchInput
                placeholder={dict.search}
                className="bg-white/5 hover:bg-white/10 focus:bg-white/15 border border-white/10 focus:border-purple-500/50 rounded-xl px-4 py-2.5 w-full transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-gray-200 placeholder-gray-400"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </div>
          </li>

          {menuItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link
                href={`/${isArabic ? 'ar' : 'en'}${item.path}`}
                onClick={toggleMenu}
                className="flex items-center text-gray-200 hover:text-purple-300 w-full py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li className="w-full pt-2 border-t border-white/10">
            <CustomButton
              width="100%"
              icon={isDarkMode ? FaSun : FaMoon}
              text={isDarkMode ? dict.light : dict.dark}
              onClick={() => {
                toggleTheme()
                toggleMenu()
              }}
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
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
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            />
          </li>

          {user ? (
            <>
              <li className="w-full">
                <CustomButton
                  icon={FaUser}
                  text={user.displayName || dict.profile}
                  width="100%"
                  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
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
                  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
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
                  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 rounded-xl px-4 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
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
