import { useNavigate, useParams } from 'react-router';
import { TopBar } from '../components/TopBar';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { CheckCircle, XCircle } from 'lucide-react';

export function MemberDetailScreen() {
  const { groupId, memberId } = useParams();
  const navigate = useNavigate();

  const memberData = {
    name: 'Sara Ali',
    role: 'Member',
    contributedTotal: 'PKR 30,000',
    receivedTotal: 'PKR 30,000',
    balance: 'PKR 0',
    periods: [
      { period: 3, status: 'paid', received: true, date: 'Mar 2026' },
      { period: 2, status: 'paid', received: false, date: 'Feb 2026' },
      { period: 1, status: 'paid', received: false, date: 'Jan 2026' }
    ]
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <TopBar title="Member details" showBack />

      <div className="px-4 py-6 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <Avatar name={memberData.name} size="xl" />
          <div>
            <h2 className="mb-1">{memberData.name}</h2>
            <Badge variant="secondary">{memberData.role}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Contributed</p>
            <p className="text-lg">{memberData.contributedTotal.replace('PKR ', '')}</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Received</p>
            <p className="text-lg">{memberData.receivedTotal.replace('PKR ', '')}</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Balance</p>
            <p className="text-lg">{memberData.balance.replace('PKR ', '')}</p>
          </Card>
        </div>

        <div className="space-y-3">
          <h3>Activity timeline</h3>

          <div className="space-y-2">
            {memberData.periods.map((period) => (
              <div
                key={period.period}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    period.status === 'paid' ? 'bg-success/10' : 'bg-muted'
                  }`}
                >
                  {period.status === 'paid' ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm">Period {period.period}</p>
                  <p className="text-xs text-muted-foreground">{period.date}</p>
                </div>

                <div className="flex gap-2">
                  <Badge variant={period.status === 'paid' ? 'success' : 'default'}>
                    {period.status === 'paid' ? 'Paid' : 'Pending'}
                  </Badge>
                  {period.received && (
                    <Badge variant="secondary">Receiver</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
