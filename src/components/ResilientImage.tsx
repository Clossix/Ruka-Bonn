import React, { useState } from 'react';
import { Microscope } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  caption?: string;
  figureNumber?: string;
  className?: string;
  aspectClass?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  caption,
  figureNumber,
  className = '',
  aspectClass = 'aspect-[16/9]',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`m-0 ${className}`}>
      <div className={`relative overflow-hidden bg-[#EBE6DF] border border-[#DED8CE] ${aspectClass}`}>
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EFECE6] to-[#E2DDD3] text-[#57534E]">
            <Microscope className="w-8 h-8 mb-3 text-[#1B365D]/70" strokeWidth={1.5} />
            <p className="text-sm font-serif text-[#181715]">{alt}</p>
            <p className="text-xs font-mono text-[#78716C] mt-1">Archivbild RUKA Bonn</p>
          </div>
        )}
      </div>
      {(caption || figureNumber) && (
        <figcaption className="mt-2.5 text-xs text-[#57534E] leading-relaxed flex flex-wrap items-baseline gap-x-2">
          {figureNumber && (
            <span className="font-mono font-medium text-[#181715] uppercase tracking-wider">
              {figureNumber}
            </span>
          )}
          {caption && <span className="font-serif italic">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
};
