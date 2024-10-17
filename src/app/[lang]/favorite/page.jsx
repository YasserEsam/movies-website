"use client"


import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/config'
import FavoritesList from '@/components/FavoritesList'
import LoginPrompt from '@/components/LoginPrompt'


const FavoritesPage = ({ params: { lang } }) => {
  const [user] = useAuthState(auth)

  return (
    <section className="p-4 bg-white dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          {lang === 'ar' ? 'المفضلة' : 'Favorites'}
        </h1>
        
        {user ? (
          <FavoritesList user={user} lang={lang} />
        ) : (
          <LoginPrompt lang={lang} />
        )}
      </div>
    </section>
  )
}

export default FavoritesPage
