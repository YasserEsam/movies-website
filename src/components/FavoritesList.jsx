'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../app/firebase/config'

const FavoritesList = ({ user, lang }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const q = query(
          collection(db, 'favorites'),
          where('userId', '==', user.uid),
        )
        const querySnapshot = await getDocs(q)
        const likedItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setFavorites(likedItems)
      }
    }

    fetchFavorites()
  }, [user])

  const handleRemove = async (itemId) => {
    const itemRef = doc(db, 'favorites', itemId)
    await deleteDoc(itemRef)
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== itemId))
  }

  const handleClearAll = async () => {
    if (user) {
      const q = query(
        collection(db, 'favorites'),
        where('userId', '==', user.uid),
      )
      const querySnapshot = await getDocs(q)
      const batch = writeBatch(db)
      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref)
      })
      await batch.commit()
      setFavorites([])
    }
  }

  const categorizeFavorites = () => {
    return favorites.reduce((acc, fav) => {
      const type = getItemType(fav.itemType)
      if (!acc[type]) acc[type] = []
      acc[type].push(fav)
      return acc
    }, {})
  }

  const getItemType = (type) => {
    if (type.startsWith('/movies/')) return 'Movies'
    if (type.startsWith('/tv/')) return 'TV Shows'
    if (type.startsWith('/actors/')) return 'Actors'
    return 'Unknown'
  }

  const categorizedFavorites = categorizeFavorites()

  const sortedCategories = Object.keys(categorizedFavorites).sort((a, b) => a.localeCompare(b))

  if (favorites.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-300">
        {lang === 'ar' ? 'لا توجد مفضلات' : 'No favorites yet'}
      </p>
    )
  }

  return (
    <>
      <button
        onClick={handleClearAll}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 mb-6"
      >
        {lang === 'ar' ? 'مسح جميع المفضلات' : 'Clear all favorites'}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedCategories.map((type) => (
          <div
            key={type}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              {type}
            </h2>
            {categorizedFavorites[type].length > 0 ? (
              <div className="h-96 overflow-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className={`py-2 px-4 text-${lang === 'ar' ? 'right' : 'left'} text-gray-700 dark:text-white`}>
                        {lang === 'ar' ? 'العنصر' : 'Item'}
                      </th>
                      <th className={`py-2 px-4 text-${lang === 'ar' ? 'right' : 'left'} text-gray-700 dark:text-white`}>
                        {lang === 'ar' ? 'العمليات' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorizedFavorites[type].map((fav) => (
                      <tr
                        key={fav.id}
                        className="border-b hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <td className={`py-2 px-4 flex items-center text-${lang === 'ar' ? 'right' : 'left'}`}>
                          <img
                            src={fav.imageUrl}
                            alt={fav.itemName}
                            className="w-20 h-20 object-cover rounded-md mr-4"
                          />
                          <span className="text-gray-800 dark:text-white">
                            {fav.itemName}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleRemove(fav.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg transition-colors hover:bg-red-700"
                          >
                            {lang === 'ar' ? 'مسح' : 'Remove'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                {lang === 'ar' ? `لا يوجد مفضلات في ${type}` : `No ${type.toLowerCase()} favorites yet.`}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default FavoritesList
