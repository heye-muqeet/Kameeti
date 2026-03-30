import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';
import { Avatar } from '../components/Avatar';
import { StarRating } from '../components/StarRating';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Edit2, Shield, Trophy, Award, ChevronRight } from 'lucide-react';

export function ProfileScreen() {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState<'everyone' | 'friends' | 'hidden'>('everyone');

  const badges = [
    { icon: Shield, label: 'Trusted', color: 'text-primary' },
    { icon: Trophy, label: 'Early Bird', color: 'text-accent' },
    { icon: Award, label: 'Reliable', color: 'text-success' }
  ];

  const reputationHistory = [
    { action: 'On-time payment', points: '+10', date: '2 Mar', type: 'success' },
    { action: 'Cycle completed', points: '+50', date: '25 Feb', type: 'success' },
    { action: 'On-time payment', points: '+10', date: '2 Feb', type: 'success' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Profile" />

      <div className="px-4 py-6 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar name="You" size="xl" />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          <h2 className="mb-1">Muhammad Ali</h2>
          <p className="text-sm text-muted-foreground">+92 ••• ••• 1234</p>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3>Trust Score</h3>
            <StarRating rating={4.8} size="md" showValue />
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-2xl">1,245</span>
            <span className="text-muted-foreground">Trust points</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {badges.map((badge, index) => (
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
          <div className="flex items-center justify-between px-2">
            <h3>Reputation history</h3>
            <button className="text-sm text-primary hover:underline">View all</button>
          </div>

          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            {reputationHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm mb-0.5">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <span className="text-success">{item.points}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="px-2">Who can see my trust</h3>

          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            {['everyone', 'friends', 'hidden'].map((option) => (
              <button
                key={option}
                onClick={() => setVisibility(option as any)}
                className="w-full flex items-center justify-between"
              >
                <span className="capitalize text-sm">{option === 'friends' ? 'Friends only' : option}</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    visibility === option ? 'border-primary' : 'border-input'
                  }`}
                >
                  {visibility === option && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="destructive"
          size="lg"
          className="w-full"
          onClick={() => navigate('/')}
        >
          Sign out
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
