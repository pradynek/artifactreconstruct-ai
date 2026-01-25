
import React, { useState, useRef, useEffect } from 'react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImage, afterImage, beforeLabel, afterLabel }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: any) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    let position = ((x - rect.left) / rect.width) * 100;

    if (position < 0) position = 0;
    if (position > 100) position = 100;

    setSliderPos(position);
  };

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e as any);
  };

  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e);
    };
    const onMouseUp = () => stopDragging();
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e);
    };
    const onTouchEnd = () => stopDragging();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-ew-resize select-none bg-[#050505]"
      onMouseDown={startDragging}
      onTouchStart={startDragging}
    >
      <img
        src={afterImage}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        alt="Reconstructed"
      />

      <img
        src={beforeImage}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        alt="Original Fragment"
      />

      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none w-0.5 bg-[#d4af37]/80"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] border-2 border-[#d4af37] transition-transform hover:scale-110">
          <i className="fas fa-arrows-left-right text-stone-900 text-sm"></i>
        </div>
      </div>

      <div className="absolute top-4 left-4 z-30 pointer-events-none">
        <span className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest text-white font-bold border border-white/10">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-30 pointer-events-none">
        <span className="bg-[#d4af37]/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest text-black font-bold border border-white/20">
          {afterLabel}
        </span>
      </div>
    </div>
  );
};

export default ComparisonSlider;
