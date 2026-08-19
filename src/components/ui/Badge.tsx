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
    bronze: 'bg-amber-50 text-[#9A6A38] border-amber-200 font-bold',
    blue: 'bg-blue-50 text-[#0284C7] border-blue-200 font-bold',
    amber: 'bg-amber-50 text-[#B45309] border-amber-200 font-bold',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200 font-medium',
    outline: 'bg-white text-gray-700 border-gray-300 font-medium'
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[11px] tracking-widest',
    md: 'px-3 py-1 text-xs tracking-wider'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono-tech uppercase rounded-sm border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="opacity-90">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
