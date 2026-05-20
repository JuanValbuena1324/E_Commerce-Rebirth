'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/ui.store';
import { signIn, useSession } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const showToast = useUIStore((s) => s.showToast);
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Please enter email and password');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/email-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'login',
          email, 
          password 
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showToast(data.message || 'Welcome back to Rebirth!');
        setTimeout(() => router.push('/'), 1000);
      } else {
        showToast(data.error || 'Login failed');
      }
    } catch (error) {
      showToast('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      showToast('Google sign in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:grid" style={{ gridTemplateColumns: '500px 1fr' }}>
      {/* Solo la imagen - sin texto, sin overlay, sin nada */}
      <div className="relative bg-brand-black flex items-center justify-center py-10 md:py-0 overflow-hidden">
        <Image 
          src="/images/R_Account.png"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Form */}
      <div className="bg-brand-offwhite flex items-center justify-center flex-1 px-6 py-10">
        <div className="w-full max-w-[420px]">
          <h1 className="font-cinzel text-[18px] font-bold tracking-[0.2em] uppercase text-brand-black text-center mb-10">
            Login
          </h1>
          
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-brand-light bg-transparent font-sofia text-[13px] text-brand-black mb-3 focus:outline-none focus:border-brand-black transition-colors" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-brand-light bg-transparent font-sofia text-[13px] text-brand-black mb-3 focus:outline-none focus:border-brand-black transition-colors" />
          
          <button onClick={handleLogin} disabled={isLoading}
            className="w-full py-3.5 bg-brand-black text-white font-cinzel text-[10px] tracking-[0.2em] uppercase mt-2 mb-4 hover:bg-brand-carbon transition-colors disabled:opacity-50">
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-light"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-brand-offwhite px-2 text-brand-mid font-sofia">OR</span>
            </div>
          </div>
          
          <button 
            onClick={handleGoogleSignIn}
            className="w-full py-3.5 border border-brand-black bg-white text-brand-black font-cinzel text-[10px] tracking-[0.2em] uppercase hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            CONTINUE WITH GOOGLE
          </button>
          
          <Link href="/signup" className="block text-center font-cinzel text-[9px] tracking-[0.15em] uppercase text-brand-mid hover:text-brand-black transition-colors mt-6">
            CREATE ACCOUNT
          </Link>
        </div>
      </div>
    </div>
  );
}