import React, { useState } from 'react';
import { User } from '../types';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onOpenAuth, onLogout, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', value: 'home' },
    { name: 'وجهاتنا', value: 'destinations' },
    { name: 'خدماتنا', value: 'services' },
    { name: 'مساعد السفر الذكي', value: 'ai-assistant' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-2" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">ل</div>
            <h1 className="text-2xl font-bold text-brand-900">لمار للسياحة</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => onNavigate(link.value)}
                  className="text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <UserIcon size={18} />
                  مرحباً، {user.username}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <LogOut size={16} />
                  خروج
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-brand-600 text-white hover:bg-brand-700 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-brand-500/30 transition-all hover:scale-105"
              >
                تسجيل الدخول
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-brand-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  onNavigate(link.value);
                  setIsOpen(false);
                }}
                className="text-gray-600 hover:text-brand-600 block px-3 py-2 rounded-md text-base font-medium w-full text-right"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4">
              {user ? (
                <div className="flex flex-col gap-3 px-3">
                   <span className="text-sm font-semibold text-gray-700">مرحباً، {user.username}</span>
                   <button onClick={onLogout} className="text-red-600 text-sm font-medium text-right">تسجيل خروج</button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setIsOpen(false);
                  }}
                  className="w-full text-center bg-brand-600 text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  تسجيل الدخول
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
