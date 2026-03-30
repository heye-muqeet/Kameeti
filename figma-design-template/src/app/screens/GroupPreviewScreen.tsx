import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TopBar } from '../components/TopBar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { BottomSheet } from '../components/BottomSheet';
import { Avatar } from '../components/Avatar';
import { Users, Calendar, DollarSign, Share2 } from 'lucide-react';

export function GroupPreviewScreen() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [showRequestSheet, setShowRequestSheet] = useState(false);

  const groupData = {
    name: 'Neighborhood Savings',
    admin: { name: 'Ahmed Khan', inContacts: true },
    installment: 'PKR 10,000',
    period: 'Monthly',
    totalPeriods: 12,
    method: 'Method 1',
    memberCount: 8,
    description: 'A trusted savings group for our neighborhood. Looking for committed members who can pay on time.'
  };

  const handleRequestToJoin = () => {
    setShowRequestSheet(false);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <TopBar title="Group details" showBack />

      <div className="px-4 py-6 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className="mb-2">{groupData.name}</h1>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">
                Admin: {groupData.admin.name}
              </span>
              {groupData.admin.inContacts && (
                <Badge variant="success" className="text-xs">
                  in your contacts
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Card className="space-y-4">
          <h3>Group details</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Installment</p>
                <p>{groupData.installment}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Schedule</p>
                <p>
                  {groupData.period} • {groupData.totalPeriods} periods
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Members</p>
                <p>{groupData.memberCount} members</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <Badge variant="secondary">{groupData.method}</Badge>
          </div>
        </Card>

        {groupData.description && (
          <Card>
            <h3 className="mb-2">About</h3>
            <p className="text-muted-foreground">{groupData.description}</p>
          </Card>
        )}

        <div className="flex gap-3">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() => setShowRequestSheet(true)}
          >
            Request to join
          </Button>
          <Button variant="ghost" size="lg" className="px-6">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <BottomSheet
        isOpen={showRequestSheet}
        onClose={() => setShowRequestSheet(false)}
        title="Request to join"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
            <Avatar name={groupData.admin.name} size="md" />
            <div>
              <p className="text-sm text-muted-foreground">Request will be sent to</p>
              <p>{groupData.admin.name}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            The admin will review your trust score and decide whether to accept your request.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleRequestToJoin}
          >
            Send request
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
