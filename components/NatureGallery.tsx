
import React, { useMemo } from 'react';

const NATURE_PHOTOS = [
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80", // Forest
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80", // Foggy Mountain
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80", // Green Hills
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80", // Lush Woods
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"  // Mountain Range
];

const NatureGallery: React.FC = () => {
  // Select a random photo once per component mount to keep it interesting but singular
  const selectedPhoto = useMemo(() => {
    return NATURE_PHOTOS[Math.floor(Math.random() * NATURE_PHOTOS.length)];
  }, []);

  return (
    <div className="w-full max-w-5xl px-4 py-8">
      <div className="relative group overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white">
        <img 
          src={selectedPhoto} 
          alt="Calming nature scene" 
          className="w-full h-[50vh] min-h-[400px] object-cover brightness-95 group-hover:brightness-100 transition-all duration-1000 ease-in-out"
        />
        {/* Subtle overlay to enhance calm feeling */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        
        {/* Soft floating badge for nature */}
        <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-medium tracking-widest uppercase border border-white/30">
          Peaceful Moment
        </div>
      </div>
    </div>
  );
};

export default NatureGallery;
