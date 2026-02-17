interface ProgressBarProps {
  value: number; // 0-100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  gradient?: boolean;
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function ProgressBar({
  value,
  showLabel = false,
  size = 'md',
  gradient = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  // Dynamic color based on progress
  const getColorClass = () => {
    if (gradient) {
      if (clampedValue >= 75) return 'bg-gradient-to-r from-green-500 to-green-600';
      if (clampedValue >= 50) return 'bg-gradient-to-r from-blue-500 to-blue-600';
      if (clampedValue >= 25) return 'bg-gradient-to-r from-orange-500 to-orange-600';
      return 'bg-gradient-to-r from-red-500 to-red-600';
    }

    if (clampedValue >= 75) return 'bg-green-500';
    if (clampedValue >= 50) return 'bg-blue-500';
    if (clampedValue >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Progress</span>
          <span className="text-sm font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            {clampedValue}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} ${getColorClass()} transition-all duration-500 ease-out rounded-full shadow-sm`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
