import { useNavigate, useParams } from 'react-router';
import { TopBar } from '../components/TopBar';
import { Avatar } from '../components/Avatar';
import { StarRating } from '../components/StarRating';
import { Badge } from '../components/Badge';
import { Shield, Trophy, Award } from 'lucide-react';

export function UserProfileScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const userData = {
    name: 'Ahmed Khan',
    rating: 4.8,
    trustPoints: 1520,
    badges: [
      { icon: Shield, label: 'Trusted', color: 'text-primary' },
      { icon: Trophy, label: 'Top Performer', color: 'text-accent' }
    ],
    recentActivity: [
      { action: 'Completed cycle in Family Savings', date: '15 Mar' },
      { action: 'On-time payment', date: '2 Mar' },
      { action: 'Joined Office Committee', date: '1 Feb' }
    ]
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <TopBar title="Profile" showBack />

      <div className="px-4 py-6 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar name={userData.name} size="xl" />
          <div>
            <h2 className="mb-2">{userData.name}</h2>
            <StarRating rating={userData.rating} size="lg" showValue />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <p className="text-2xl">{userData.trustPoints}</p>
              <p className="text-sm text-muted-foreground">Trust points</p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap pt-2">
            {userData.badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-card rounded-full border border-border"
              >
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3>Recent activity</h3>

          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {userData.recentActivity.map((activity, index) => (
              <div key={index} className="p-4">
                <p className="text-sm mb-1">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
