import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TopBar } from '../components/TopBar';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Check } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  paid: boolean;
  onTime: boolean;
}

export function PeriodDetailScreen() {
  const { groupId, periodId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Ahmed Khan', paid: true, onTime: true },
    { id: '2', name: 'Sara Ali', paid: true, onTime: true },
    { id: '3', name: 'Ali Hassan', paid: false, onTime: false },
    { id: '4', name: 'Fatima Ahmed', paid: true, onTime: true },
    { id: '5', name: 'Muhammad Ali', paid: false, onTime: false },
    { id: '6', name: 'Zainab Ali', paid: true, onTime: false }
  ]);

  const installment = 10000;
  const totalCollected = members.filter((m) => m.paid).length * installment;
  const expectedPot = members.length * installment;

  const togglePaid = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, paid: !m.paid } : m))
    );
  };

  const handleSave = () => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title={`Period ${periodId} — March 2026`} showBack />

      <div className="px-4 py-6 space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Who pays this period</p>

          <div className="space-y-2">
            {members.map((member) => (
              <button
                key={member.id}
                onClick={() => togglePaid(member.id)}
                className="w-full flex items-center justify-between p-4 bg-card border-2 border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={member.name} size="md" />
                  <div className="text-left">
                    <p className="text-sm">{member.name}</p>
                    {member.paid && member.onTime && (
                      <p className="text-xs text-success">On-time</p>
                    )}
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    member.paid
                      ? 'bg-success border-success'
                      : 'border-input'
                  }`}
                >
                  {member.paid && <Check className="w-4 h-4 text-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Collected so far</span>
            <span className="text-xl">PKR {totalCollected.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Expected pot</span>
            <span className="text-xl">PKR {expectedPot.toLocaleString()}</span>
          </div>
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span>Status</span>
              <span
                className={
                  totalCollected === expectedPot
                    ? 'text-success'
                    : 'text-warning'
                }
              >
                {totalCollected === expectedPot ? 'Complete' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <Button
          variant="primary"
          size="lg"
          className="w-full max-w-md mx-auto"
          onClick={handleSave}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
