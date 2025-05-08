'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Einfache Authentifizierung - in einer Produktionsumgebung sollte dies 
    // sicherer implementiert werden, z.B. mit NextAuth oder einer API
    if (username === 'tim' && password === 'pflegebuddy2025') {
      // Login erfolgreich
      localStorage.setItem('admin-auth', 'true');
      localStorage.setItem('admin-user', 'Tim Werner');
      router.push('/admin/dashboard');
    } else {
      setError('Ungültiger Benutzername oder Passwort');
    }
  };

  return (
    <main className="min-h-screen bg-[#23243a] pb-16 pt-16">
      <section className="max-w-md mx-auto bg-[#23243a]/90 rounded-3xl shadow-lg p-8 backdrop-blur">
        <h1 className="text-3xl font-bold text-[#30b9c9] mb-6 text-center">Admin Login</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
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
          
          <button
            type="submit"
            className="w-full px-4 py-2 text-[#1a1b2e] bg-[#30b9c9] rounded-md hover:bg-[#27a0af] transition-colors font-medium"
          >
            Anmelden
          </button>
        </form>
      </section>
    </main>
  );
} 