import { useNavigate, useParams } from 'react-router';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Settings, Users, Calendar } from 'lucide-react';

export function GroupDashboardScreen() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const groupData = {
    name: 'Family Savings',
    role: 'Admin',
    currentPeriod: 3,
    totalPeriods: 6,
    nextDueDate: '28 Mar 2026',
    receiver: { name: 'Sara Ali', imageUrl: '' },
    expectedPot: 'PKR 60,000',
    installment: 'PKR 10,000',
    method: 'Method 1',
    period: 'Monthly',
    members: [
      { id: '1', name: 'Ahmed Khan', paid: true, onTime: true },
      { id: '2', name: 'Sara Ali', paid: true, onTime: true },
      { id: '3', name: 'Ali Hassan', paid: false, onTime: false },
      { id: '4', name: 'Fatima Ahmed', paid: true, onTime: true },
      { id: '5', name: 'Muhammad Ali', paid: false, onTime: false },
      { id: '6', name: 'Zainab Ali', paid: true, onTime: false }
    ]
  };

  const progress = (groupData.currentPeriod / groupData.totalPeriods) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar
        title={groupData.name}
        showBack
        action={
          <button
            onClick={() => navigate(`/group/${groupId}/settings`)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant={groupData.role === 'Admin' ? 'success' : 'secondary'}>
            {groupData.role}
          </Badge>
          <div className="flex gap-2">
            <Badge variant="secondary">{groupData.method}</Badge>
            <Badge variant="secondary">{groupData.period}</Badge>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Period {groupData.currentPeriod} of {groupData.totalPeriods}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">This period's pot</p>
            <p className="text-3xl">{groupData.expectedPot}</p>
          </div>

          <div className="pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Receiver this period</p>
            <div className="flex items-center gap-3">
              <Avatar name={groupData.receiver.name} size="md" />
              <div>
                <p>{groupData.receiver.name}</p>
                <p className="text-sm text-muted-foreground">Due {groupData.nextDueDate}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3>Period {groupData.currentPeriod} payments</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/group/${groupId}/period/${groupData.currentPeriod}`)}
            >
              Record payments
            </Button>
          </div>

          <div className="space-y-2">
            {groupData.members.slice(0, 4).map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 bg-card border border-border rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={member.name} size="sm" />
                  <div>
                    <p className="text-sm">{member.name}</p>
                    {member.paid && member.onTime && (
                      <p className="text-xs text-success">On-time</p>
                    )}
                  </div>
                </div>
                <Badge variant={member.paid ? 'success' : 'default'}>
                  {member.paid ? 'Paid' : 'Pending'}
                </Badge>
              </div>
            ))}

            <button
              onClick={() => navigate(`/group/${groupId}/members`)}
              className="w-full flex items-center justify-center gap-2 p-3 text-primary hover:bg-muted rounded-xl transition-colors"
            >
              <Users className="w-4 h-4" />
              View all {groupData.members.length} members
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
