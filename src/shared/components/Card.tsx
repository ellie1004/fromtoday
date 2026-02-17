import { type HTMLAttributes, type ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  hover?: boolean;
}

const variantClasses = {
  default: 'bg-white border border-gray-200',
  bordered: 'bg-white border-2 border-gray-300',
  elevated: 'bg-white shadow-lg',
  gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-200',
};

export function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  ...props
}: CardProps) {
  const hoverClass = hover ? 'hover:shadow-2xl hover:-translate-y-1' : '';

  const classes = [
    'rounded-xl p-6 transition-all duration-300',
    variantClasses[variant],
    hoverClass,
    className,
  ].join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  gradient?: boolean;
}

export function CardHeader({ title, subtitle, action, gradient = false }: CardHeaderProps) {
  const titleClass = gradient
    ? 'text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent'
    : 'text-lg font-semibold text-gray-900';

  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className={titleClass}>{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
