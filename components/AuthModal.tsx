import React, { useState } from 'react';
import { AuthMode, User } from '../types';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    if (formData.username && formData.email) {
      onLogin({ username: formData.username, email: formData.email });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-brand-600 p-6 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === AuthMode.LOGIN ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <p className="text-brand-100 text-sm">أهلاً بك في شركة لمار للسياحة</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">اسم المستخدم</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all pl-10"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <UserIcon size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            {mode === AuthMode.SIGNUP && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">كلمة المرور</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02] mt-6">
              {mode === AuthMode.LOGIN ? 'دخول' : 'تسجيل'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN)}
              className="text-brand-600 hover:text-brand-800 text-sm font-medium"
            >
              {mode === AuthMode.LOGIN ? 'ليس لديك حساب؟ أنشئ حساباً جديداً' : 'لديك حساب بالفعل؟ سجل الدخول'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
