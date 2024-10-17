'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../app/firebase/config';
import Link from 'next/link';

export default  function LoginForm({ dict }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the home page after login
      window.location.href = '/'; // Redirect to homepage
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message); // Display the error to the user
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">{dict.title}</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={dict.form.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={dict.form.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors duration-300"
          >
            {dict.loginButton}
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
        {dict.dontHaveAccount}{' '}
        <Link href="/signup" className="text-blue-500 hover:text-blue-600">
          {dict.register}
        </Link>
      </p>
    </div>
  );
}
