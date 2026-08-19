import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'bronze' | 'blue' | 'amber' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'bronze',
  size = 'md',
  className = '',
  icon
}) => {
  const variantStyles = {
    bronze: 'bg-[#D4A373]/10 text-[#D4A373] border-[#D4A373]/30',
    blue: 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30',
    amber: 'bg-[#E5A93B]/10 text-[#E5A93B] border-[#E5A93B]/30',
    neutral: 'bg-white/5 text-[#F3F4F6] border-white/10',
    outline: 'bg-transparent text-[#8A92A0] border-white/15'
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[11px] tracking-widest',
    md: 'px-3 py-1 text-xs tracking-wider'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono-tech uppercase font-medium rounded-sm border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="opacity-90">{icon}</span>}
      {children}
    </span>
  );
};
