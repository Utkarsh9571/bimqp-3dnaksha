import React from 'react';
import { Badge } from './Badge';

interface SectionHeadingProps {
  number?: string;
  badgeText?: string;
  badgeVariant?: 'bronze' | 'blue' | 'amber' | 'neutral';
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  badgeText,
  badgeVariant = 'bronze',
  title,
  highlightText,
  subtitle,
  align = 'left',
  className = ''
}) => {
  return (
    <div
      className={`relative mb-12 md:mb-16 ${
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      } ${className}`}
    >
      <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        {number && (
          <span className="font-mono-tech text-xs tracking-widest text-[#D4A373] uppercase font-semibold">
            {number} //
          </span>
        )}
        {badgeText && (
          <Badge variant={badgeVariant} size="sm">
            {badgeText}
          </Badge>
        )}
      </div>

      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#F3F4F6] leading-[1.15]">
        {title}{' '}
        {highlightText && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] via-[#E5A93B] to-[#F4D06F]">
            {highlightText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-[#8A92A0] font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
