import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Search, ChevronRight, Users as UsersIcon } from 'lucide-react';

interface DiscoverGroup {
  id: string;
  name: string;
  adminName: string;
  installment: string;
  memberCount: number;
  periods: number;
}

export function DiscoverScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [groups] = useState<DiscoverGroup[]>([
    {
      id: '4',
      name: 'Neighborhood Savings',
      adminName: 'Ahmed Khan',
      installment: 'PKR 10,000',
      memberCount: 8,
      periods: 12
    },
    {
      id: '5',
      name: 'Monthly Pool',
      adminName: 'Sara Ali',
      installment: 'PKR 5,000',
      memberCount: 6,
      periods: 6
    }
  ]);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Discover" />

      <div className="px-4 py-4">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-input-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        <p className="text-sm text-muted-foreground mb-4 px-2">
          Groups run by people in your contacts
        </p>

        {filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <UsersIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2">No groups match your contacts</h3>
            <p className="text-muted-foreground text-center max-w-xs">
              Add more contacts to discover available groups
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                onClick={() => navigate(`/group-preview/${group.id}`)}
                className="space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1">{group.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Admin: {group.adminName}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        in your contacts
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{group.installment}</span>
                  <span>•</span>
                  <span>{group.memberCount} members</span>
                  <span>•</span>
                  <span>{group.periods} periods</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
