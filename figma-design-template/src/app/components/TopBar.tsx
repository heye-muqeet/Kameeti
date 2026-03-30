import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ReactNode } from 'react';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  action?: ReactNode;
}

export function TopBar({ title, showBack = false, action }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-10" />
        )}
        <h1 className="text-lg">{title}</h1>
        {action || <div className="w-10" />}
      </div>
    </header>
  );
}
