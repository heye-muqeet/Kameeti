import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TopBar } from '../components/TopBar';
import { Avatar } from '../components/Avatar';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

interface JoinRequest {
  id: string;
  user: {
    name: string;
    rating: number;
    trustLevel: string;
    imageUrl?: string;
  };
  timestamp: string;
}

export function JoinRequestsScreen() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<JoinRequest[]>([
    {
      id: '1',
      user: {
        name: 'Omar Farooq',
        rating: 4.8,
        trustLevel: 'High reliability',
        imageUrl: ''
      },
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      user: {
        name: 'Ayesha Khan',
        rating: 4.2,
        trustLevel: 'Medium reliability',
        imageUrl: ''
      },
      timestamp: '5 hours ago'
    }
  ]);

  const handleAccept = (requestId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const handleReject = (requestId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <TopBar title="Join requests" showBack />

      <div className="px-4 py-6">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <span className="text-4xl">📬</span>
            </div>
            <h3 className="mb-2">No pending requests</h3>
            <p className="text-muted-foreground text-center">
              New join requests will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-card border border-border rounded-xl p-4 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <Avatar name={request.user.name} size="lg" />
                  <div className="flex-1">
                    <h3 className="mb-1">{request.user.name}</h3>
                    <StarRating rating={request.user.rating} size="sm" showValue />
                    <Badge variant="secondary" className="mt-2">
                      {request.user.trustLevel}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{request.timestamp}</p>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={() => handleAccept(request.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    className="flex-1"
                    onClick={() => handleReject(request.id)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
