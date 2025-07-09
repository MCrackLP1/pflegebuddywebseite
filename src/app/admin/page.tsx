'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Secure authentication via API route
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login erfolgreich
        localStorage.setItem('admin-auth', 'true');
        localStorage.setItem('admin-user', data.user);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Ungültiger Benutzername oder Passwort');
      }
    } catch (err) {
      setError('Netzwerkfehler. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#23243a] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-[#23243a]/90 rounded-3xl shadow-lg p-8 backdrop-blur">
        <h1 className="text-3xl font-bold text-[#30b9c9] mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-[#f3f6fa] mb-2">
              Benutzername
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-md text-[#f3f6fa] focus:outline-none focus:border-[#30b9c9]"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#f3f6fa] mb-2">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-md text-[#f3f6fa] focus:outline-none focus:border-[#30b9c9]"
              required
            />
          </div>
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#30b9c9] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#167080] transition disabled:opacity-50"
          >
            {loading ? 'Anmelden...' : 'Anmelden'}
          </button>
        </form>
        <div className="mt-6 text-center text-[#f3f6fa]/70 text-sm">
          <p>⚠️ Dieser Bereich ist nur für autorisierte Benutzer zugänglich.</p>
        </div>
      </div>
    </main>
  );
} 