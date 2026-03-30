import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';
import { Avatar } from '../components/Avatar';
import { StarRating } from '../components/StarRating';
import { Badge } from '../components/Badge';
import { Search, ChevronRight, Users as UsersIcon, Share2 } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  rating: number;
  onKameeti: boolean;
  imageUrl?: string;
}

export function FriendsScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactsEnabled, setContactsEnabled] = useState(true);
  const [friends] = useState<Friend[]>([
    { id: '1', name: 'Ahmed Khan', rating: 4.8, onKameeti: true },
    { id: '2', name: 'Sara Ali', rating: 4.5, onKameeti: true },
    { id: '3', name: 'Fatima Ahmed', rating: 5.0, onKameeti: true },
    { id: '4', name: 'Ali Hassan', rating: 4.2, onKameeti: true }
  ]);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Friends" />

      <div className="px-4 py-4">
        {!contactsEnabled && (
          <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="text-sm mb-3">
              See which friends use Kameeti — we only match phone numbers you already have.
            </p>
            <button
              onClick={() => setContactsEnabled(true)}
              className="text-sm text-primary hover:underline"
            >
              Enable contacts
            </button>
          </div>
        )}

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-input-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        {filteredFriends.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <UsersIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2">None of your contacts are on Kameeti yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-xs">
              Invite your friends to join
            </p>
            <button className="flex items-center gap-2 text-primary hover:underline">
              <Share2 className="w-4 h-4" />
              Share app
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFriends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => navigate(`/user/${friend.id}`)}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl transition-colors"
              >
                <Avatar name={friend.name} imageUrl={friend.imageUrl} size="md" />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm">{friend.name}</h4>
                    {friend.onKameeti && (
                      <Badge variant="success" className="text-xs">
                        On Kameeti
                      </Badge>
                    )}
                  </div>
                  <StarRating rating={friend.rating} size="sm" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
