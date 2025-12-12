import React from 'react';
import { Destination } from '../types';
import { MapPin, Clock, Star, ArrowLeft } from 'lucide-react';

interface Props {
  destination: Destination;
}

export const DestinationCard: React.FC<Props> = ({ destination }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-brand-800 flex items-center gap-1 shadow-sm">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          {destination.rating}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{destination.title}</h3>
            <span className="text-brand-600 font-black text-xl">${destination.price}</span>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">{destination.description}</p>
        
        <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-brand-500" />
            <span>{destination.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={16} className="text-brand-500" />
            <span>وجهة سياحية</span>
          </div>
        </div>

        <button className="w-full bg-slate-50 hover:bg-brand-600 hover:text-white text-gray-800 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:gap-4">
          احجز الآن
          <ArrowLeft size={18} />
        </button>
      </div>
    </div>
  );
};
