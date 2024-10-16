"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function RequireAuth({ children }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}
