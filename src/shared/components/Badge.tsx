import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
  warning: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
  error: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
  info: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
  primary: 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300',
  secondary: 'bg-gradient-to-r from-blue-900/10 to-blue-800/20 text-blue-900 border border-blue-900/20',
  accent: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const classes = [
    'inline-flex items-center font-semibold rounded-full shadow-sm',
    variantClasses[variant],
    sizeClasses[size],
  ].join(' ');

  return <span className={classes}>{children}</span>;
}
