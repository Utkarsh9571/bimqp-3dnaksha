import React, { useRef } from 'react';
import { Badge } from './Badge';
import { useInView } from '../../hooks/useInView';

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.15, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`relative mb-12 md:mb-16 ${
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      } ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        {number && (
          <span className="font-mono-tech text-xs tracking-widest text-[#9A6A38] uppercase font-bold">
            {number} //
          </span>
        )}
        {badgeText && (
          <Badge variant={badgeVariant} size="sm">
            {badgeText}
          </Badge>
        )}
      </div>

      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A0A0A] leading-[1.15]">
        {title}{' '}
        {highlightText && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A6A38] via-[#D97706] to-[#B45309]">
            {highlightText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-[#4B5563] font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
