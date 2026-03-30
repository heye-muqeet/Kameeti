import { Plus } from 'lucide-react';

interface FABProps {
  onClick: () => void;
  label: string;
}

export function FAB({ onClick, label }: FABProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center"
      aria-label={label}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
