import React, { useState } from 'react';
import { Chrome, Facebook, Apple, Sparkles } from 'lucide-react';

export const Login: React.FC<{ onLogin: (name: string) => void }> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialLogin = (provider: string) => {
    setIsLoading(provider);
    setTimeout(() => {
      onLogin('Student');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full z-10 space-y-10">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent/20 shadow-[0_0_30px_var(--color-accent-glow)]">
            <Sparkles className="text-accent w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Focuslio</h1>
          <p className="text-text-secondary font-medium">
            Lock In. Study Smarter.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading !== null}
            className="w-full btn-secondary flex items-center justify-center gap-3 relative overflow-hidden"
          >
            {isLoading === 'google' ? (
              <div className="w-5 h-5 border-2 border-text-secondary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Chrome className="w-5 h-5" />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading !== null}
            className="w-full btn-secondary flex items-center justify-center gap-3 relative overflow-hidden"
          >
            {isLoading === 'facebook' ? (
              <div className="w-5 h-5 border-2 border-text-secondary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Facebook className="w-5 h-5 text-blue-500" />
                <span>Continue with Facebook</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleSocialLogin('apple')}
            disabled={isLoading !== null}
            className="w-full btn-secondary flex items-center justify-center gap-3 relative overflow-hidden"
          >
            {isLoading === 'apple' ? (
              <div className="w-5 h-5 border-2 border-text-secondary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Apple className="w-5 h-5" />
                <span>Continue with Apple</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-text-secondary px-4 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};
