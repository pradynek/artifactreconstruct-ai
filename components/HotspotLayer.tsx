
import React, { useState } from 'react';
import { Hotspot } from '../types';

interface HotspotLayerProps {
  hotspots: Hotspot[];
}

const HotspotLayer: React.FC<HotspotLayerProps> = ({ hotspots }) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {hotspots.map((spot, idx) => (
        <div 
          key={idx}
          className="absolute pointer-events-auto"
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
        >
          <button 
            onClick={() => setActiveId(activeId === idx ? null : idx)}
            className="w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-[#d4af37] rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse hover:scale-125 transition-transform"
          >
            <i className="fas fa-microscope text-[10px] text-stone-900"></i>
          </button>
          
          {activeId === idx && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-stone-900 text-white p-3 rounded-lg text-xs shadow-2xl z-50 border border-[#d4af37]/30 animate-in fade-in zoom-in">
              <div className="font-bold text-[#d4af37] mb-1 uppercase tracking-tighter">{spot.label}</div>
              <p className="opacity-80 leading-tight">{spot.detail}</p>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45 border-l border-t border-[#d4af37]/30"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HotspotLayer;
