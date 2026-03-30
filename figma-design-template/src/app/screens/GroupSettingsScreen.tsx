import { useNavigate, useParams } from 'react-router';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { ChevronRight, UserPlus } from 'lucide-react';

export function GroupSettingsScreen() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const pendingRequests = 2;
  const members = [
    { id: '1', name: 'Ahmed Khan', role: 'Admin' },
    { id: '2', name: 'Sara Ali', role: 'Member' },
    { id: '3', name: 'Ali Hassan', role: 'Member' },
    { id: '4', name: 'Fatima Ahmed', role: 'Member' },
    { id: '5', name: 'Muhammad Ali', role: 'Member' },
    { id: '6', name: 'Zainab Ali', role: 'Member' }
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      <TopBar title="Group settings" showBack />

      <div className="px-4 py-6 space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm text-muted-foreground px-2">Admin actions</h3>

          <button
            onClick={() => navigate(`/group/${groupId}/join-requests`)}
            className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <span>Join requests</span>
            </div>
            <div className="flex items-center gap-2">
              {pendingRequests > 0 && (
                <Badge variant="destructive">{pendingRequests}</Badge>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm text-muted-foreground px-2">Members ({members.length})</h3>

          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {members.map((member) => (
              <button
                key={member.id}
                onClick={() => navigate(`/group/${groupId}/member/${member.id}`)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={member.name} size="md" />
                  <div className="text-left">
                    <p className="text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm text-muted-foreground px-2">Actions</h3>

          <div className="space-y-3">
            <Button variant="secondary" size="lg" className="w-full">
              Edit group details
            </Button>
            <Button variant="secondary" size="lg" className="w-full">
              Archive group
            </Button>
            <Button variant="destructive" size="lg" className="w-full">
              Leave group
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
