import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { FAB } from '../components/FAB';
import { Calendar, Users as UsersIcon } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  status: 'active' | 'completed';
  nextPeriod: number;
  totalPeriods: number;
  dueDate: string;
  paymentDue: boolean;
}

export function HomeScreen() {
  const navigate = useNavigate();
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Family Savings',
      status: 'active',
      nextPeriod: 4,
      totalPeriods: 12,
      dueDate: '28 Mar',
      paymentDue: true
    },
    {
      id: '2',
      name: 'Office Committee',
      status: 'active',
      nextPeriod: 2,
      totalPeriods: 6,
      dueDate: '5 Apr',
      paymentDue: false
    },
    {
      id: '3',
      name: 'Friends Circle',
      status: 'completed',
      nextPeriod: 10,
      totalPeriods: 10,
      dueDate: 'Completed',
      paymentDue: false
    }
  ]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Your committees" />

      <div className="px-4 py-6">
        {groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <UsersIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2">No groups yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-xs">
              Create your first kameeti or join one from Discover
            </p>
            <button
              onClick={() => navigate('/create-group')}
              className="text-primary hover:underline"
            >
              Create your first group
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm text-muted-foreground px-2">Your committees</h3>
            {groups.map((group) => (
              <Card
                key={group.id}
                onClick={() => navigate(`/group/${group.id}`)}
                className="space-y-3"
              >
                <div className="flex items-start justify-between">
                  <h3>{group.name}</h3>
                  <Badge variant={group.status === 'active' ? 'success' : 'default'}>
                    {group.status === 'active' ? 'Active' : 'Completed'}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Next: Period {group.nextPeriod} • Due {group.dueDate}</span>
                  </div>
                </div>

                {group.paymentDue && (
                  <Badge variant="warning" className="w-fit">
                    Payment due
                  </Badge>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <FAB onClick={() => navigate('/create-group')} label="Create new kameeti" />
      <BottomNav />
    </div>
  );
}
