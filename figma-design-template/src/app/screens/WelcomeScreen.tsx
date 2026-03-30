import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Users } from 'lucide-react';

export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/5 to-background">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="mb-8 w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-lg">
          <Users className="w-10 h-10 text-primary-foreground" />
        </div>

        <h1 className="text-4xl mb-3 text-center">Kameeti</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-xs">
          Tradition Meets Tech — Your trusted community savings circle
        </p>

        <div className="w-full max-w-xs space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => navigate('/signup')}
          >
            Get started
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={() => navigate('/signin')}
          >
            Sign in
          </Button>
        </div>
      </div>

      <footer className="pb-8 px-6 text-center text-xs text-muted-foreground">
        <a href="#" className="hover:underline">Terms</a>
        {' • '}
        <a href="#" className="hover:underline">Privacy</a>
      </footer>
    </div>
  );
}
