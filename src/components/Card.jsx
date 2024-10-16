'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../app/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebase/config';

const Card = ({ id, title, imageUrl, genre, additionalInfo, type, releaseDate, rating }) => {
  const defaultImageUrl =
    'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg';
  const [finalImageUrl, setFinalImageUrl] = useState(imageUrl || defaultImageUrl);
  const [liked, setLiked] = useState(false);
  const [user] = useAuthState(auth);

  // Handle image load error
  const handleError = () => {
    setFinalImageUrl(defaultImageUrl);
  };

  // Check if the item is already liked
  useEffect(() => {
    if (user) {
      const checkIfLiked = async () => {
        const docRef = doc(db, 'favorites', `${user.uid}_${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLiked(true);
        }
      };
      checkIfLiked();
    }
  }, [user, id]);

  // Handle like and unlike
  const handleLike = async () => {
    if (!user) {
      alert('Please login to like items');
      return;
    }

    const docRef = doc(db, 'favorites', `${user.uid}_${id}`);

    if (liked) {
      await deleteDoc(docRef);
      setLiked(false);
    } else {
      await setDoc(docRef, {
        userId: user.uid,
        itemId: id,
        itemName: title,
        itemType: type,
        imageUrl: finalImageUrl,
      });
      setLiked(true);
    }
  };

  return (
    <div className="relative h-full max-w-xs min-w-[180px] w-full mx-auto group rounded-3xl bg-white dark:bg-gray-800 overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <Link href={type}>
        <img
          className="rounded-t-3xl object-cover w-full h-72 group-hover:scale-110 transition-transform duration-300"
          src={finalImageUrl}
          alt={`${title} image`}
          onError={handleError}
        />
        <div className="p-4">
          {/* Title Section */}
          <h6 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 truncate">{title}</h6>

          {/* Metadata Section */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
            {releaseDate && (
              <p className="flex-1 truncate">📅 {releaseDate}</p>
            )}
            {genre && (
              <p className="flex-1 truncate">🎬 {genre}</p>
            )}
            {additionalInfo && (
              <p className="flex-1 truncate">ℹ️ {additionalInfo}</p>
            )}
          </div>
        </div>
      </Link>

      {user && (
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-300 ${
            liked ? 'bg-red-300 text-white' : 'bg-gray-400 text-gray-600'
          } hover:bg-red-400`}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      )}
    </div>
  );
};

export default Card;
