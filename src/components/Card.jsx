"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../app/firebase/config'; // Firebase config file
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth } from '../app/firebase/config'; // Firebase auth from config.js

const Card = ({ id, title, imageUrl, genre, additionalInfo, type }) => {
  const defaultImageUrl = 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg';
  const [finalImageUrl, setFinalImageUrl] = useState(imageUrl || defaultImageUrl);
  const [liked, setLiked] = useState(false);
  const [user] = useAuthState(auth); // Get the current authenticated user

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
      await deleteDoc(docRef); // Remove from favorites
      setLiked(false);
    } else {
      await setDoc(docRef, {
        userId: user.uid,
        itemId: id,
        itemName: title,
        itemType: type,
        imageUrl: finalImageUrl
      });
      setLiked(true);
    }
  };

  return (

    <div className="relative h-96 w-auto max-w-xs min-w-64 mx-auto group rounded-3xl bg-white dark:bg-gray-900 overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <Link href={type}> 
 
      <img
        className="rounded-2xl object-cover w-full h-72 group-hover:scale-110 transition-transform duration-300"
        src={finalImageUrl}
        alt={`${title} image`}
        onError={handleError} // Set onError handler
      />
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-gray-800 to-transparent rounded-b-3xl">
        <h6 className="font-semibold text-lg text-white">{title}</h6>
        <p className="text-sm text-gray-300">{genre}</p>
      </div>

      </Link>

      {user && ( // Show like button only if user is logged in
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
