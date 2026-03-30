import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export function StarRating({ rating, size = 'md', showValue = false, className = '' }: StarRatingProps) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    const filled = rating >= starValue;
    const partial = rating > i && rating < starValue;

    return (
      <div key={i} className="relative">
        <Star
          className={`${sizeStyles[size]} ${filled ? 'fill-accent text-accent' : 'fill-muted text-muted'}`}
        />
        {partial && (
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating - i) * 100}%` }}>
            <Star className={`${sizeStyles[size]} fill-accent text-accent`} />
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stars}
      {showValue && <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>}
    </div>
  );
}
