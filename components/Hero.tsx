import React from 'react';

export const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/travel/1920/1080"
          alt="Travel Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          اكتشف جمال العالم <br />
          <span className="text-brand-500">مع لمار للسياحة</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl mx-auto">
          نقدم لك أفضل العروض السياحية لرحلات لا تنسى. خدمات متميزة، أسعار تنافسية، ووجهات ساحرة.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onExplore}
            className="bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-brand-600/40"
          >
            استكشف الوجهات
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-lg font-bold py-4 px-10 rounded-full border border-white/30 transition-all">
            تواصل معنا
          </button>
        </div>
      </div>
    </div>
  );
};
