import { NavLink, useLocation } from 'react-router';
import { Home, Search, Users, UserCircle } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();

  const tabs = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/discover', label: 'Discover', icon: Search },
    { path: '/friends', label: 'Friends', icon: Users },
    { path: '/profile', label: 'Profile', icon: UserCircle }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around h-20 px-2 max-w-md mx-auto">
        {tabs.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[60px] ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-primary/20' : ''}`} />
              <span className="text-xs">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
