import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationCard } from './components/DestinationCard';
import { AuthModal } from './components/AuthModal';
import { AIChat } from './components/AIChat';
import { Destination, User } from './types';
import { Plane, Hotel, Globe, Shield, Phone, Mail } from 'lucide-react';

const destinationsData: Destination[] = [
  {
    id: 1,
    title: "جزر المالديف الساحرة",
    description: "استمتع بجمال الشواطئ الرملية البيضاء والمياه الكريستالية في منتجعات فاخرة.",
    price: 1200,
    rating: 4.9,
    duration: "5 أيام / 4 ليالي",
    image: "https://picsum.photos/seed/maldives/800/600"
  },
  {
    id: 2,
    title: "باريس، فرنسا",
    description: "رحلة رومانسية إلى مدينة النور، زيارة برج إيفل ومتحف اللوفر.",
    price: 1500,
    rating: 4.8,
    duration: "7 أيام / 6 ليالي",
    image: "https://picsum.photos/seed/paris/800/600"
  },
  {
    id: 3,
    title: "إسطنبول، تركيا",
    description: "اكتشف سحر الشرق والغرب، البوسفور، والمساجد التاريخية.",
    price: 800,
    rating: 4.7,
    duration: "6 أيام / 5 ليالي",
    image: "https://picsum.photos/seed/istanbul/800/600"
  },
  {
    id: 4,
    title: "بالي، إندونيسيا",
    description: "تجربة استوائية فريدة بين الطبيعة الخلابة والمعابد القديمة.",
    price: 950,
    rating: 4.9,
    duration: "8 أيام / 7 ليالي",
    image: "https://picsum.photos/seed/bali/800/600"
  }
];

const services = [
  { icon: <Plane className="w-8 h-8 text-brand-500" />, title: "حجوزات طيران", desc: "أفضل الأسعار على جميع الخطوط الجوية العالمية." },
  { icon: <Hotel className="w-8 h-8 text-brand-500" />, title: "فنادق فاخرة", desc: "إقامة مريحة في أرقى الفنادق والمنتجعات." },
  { icon: <Globe className="w-8 h-8 text-brand-500" />, title: "جولات سياحية", desc: "برامج سياحية متكاملة مع مرشدين محترفين." },
  { icon: <Shield className="w-8 h-8 text-brand-500" />, title: "تأمين سفر", desc: "تغطية شاملة لرحلة آمنة وخالية من القلق." },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderContent = () => {
    if (currentPage === 'ai-assistant') {
      return (
        <div className="min-h-screen bg-slate-50 pt-10">
          <div className="max-w-4xl mx-auto px-4 mb-8 text-center">
             <h2 className="text-3xl font-bold text-gray-900 mb-2">مساعد لمار الذكي</h2>
             <p className="text-gray-600">خطط لرحلتك القادمة بمساعدة الذكاء الاصطناعي</p>
          </div>
          <AIChat />
        </div>
      );
    }

    return (
      <>
        {/* Hero Section */}
        {currentPage === 'home' && <Hero onExplore={() => setCurrentPage('destinations')} />}

        {/* Services Section */}
        <div id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-brand-600 font-bold tracking-wider uppercase text-sm">لماذا نحن؟</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2">خدماتنا المتميزة</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-gray-100 group text-center">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Destinations Section */}
        {(currentPage === 'home' || currentPage === 'destinations') && (
          <div id="destinations" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                 <span className="text-brand-600 font-bold tracking-wider uppercase text-sm">وجهات عالمية</span>
                <h2 className="text-4xl font-black text-gray-900 mt-2">أشهر الوجهات السياحية</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {destinationsData.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action for App */}
        <div className="bg-brand-900 py-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-10 translate-x-10"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-10 -translate-x-10"></div>
           
           <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
             <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لمغامرتك القادمة؟</h2>
             <p className="text-brand-100 text-xl mb-10 max-w-2xl mx-auto">سجل حسابك الآن واحصل على خصومات حصرية وتنبيهات بأحدث العروض السياحية.</p>
             <button 
                onClick={() => setIsAuthOpen(true)}
                className="bg-white text-brand-900 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-transform hover:scale-105"
             >
               ابدأ رحلتك الآن
             </button>
           </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">لمار للسياحة</h3>
                <p className="leading-relaxed text-gray-400">رفيقك الأمثل لاستكشاف العالم. نقدم تجارب سفر استثنائية مع الاهتمام بأدق التفاصيل لراحتك.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-6">روابط سريعة</h4>
                <ul className="space-y-3">
                  <li><button onClick={() => setCurrentPage('home')} className="hover:text-brand-400 transition-colors">الرئيسية</button></li>
                  <li><button onClick={() => setCurrentPage('destinations')} className="hover:text-brand-400 transition-colors">الوجهات</button></li>
                  <li><button onClick={() => setCurrentPage('services')} className="hover:text-brand-400 transition-colors">الخدمات</button></li>
                  <li><button onClick={() => setCurrentPage('ai-assistant')} className="hover:text-brand-400 transition-colors">المساعد الذكي</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-6">تواصل معنا</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><Phone size={18} /> 0116675706</li>
                  <li className="flex items-center gap-3"><Mail size={18} /> omarltalal2011@gmail.com</li>
                  <li className="flex items-center gap-3"><Globe size={18} /> www.lamar-tourism.com</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-6">النشرة البريدية</h4>
                <div className="flex flex-col gap-3">
                  <input type="email" placeholder="البريد الإلكتروني" className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500" />
                  <button className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-colors">اشتراك</button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-500">
              © 2024 شركة لمار للسياحة. جميع الحقوق محفوظة.
            </div>
          </div>
        </footer>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      <Navbar 
        user={user} 
        onOpenAuth={() => setIsAuthOpen(true)} 
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
      />
      
      <main>
        {renderContent()}
      </main>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  );
}

export default App;