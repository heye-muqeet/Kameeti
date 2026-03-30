import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ChevronLeft } from 'lucide-react';

export function SignUpScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+92');

  const handleSendCode = () => {
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="px-4 py-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 px-6 pt-8">
        <h1 className="mb-2">Sign up</h1>
        <p className="text-muted-foreground mb-8">
          Enter your phone number to get started
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex gap-3">
            <Input
              label="Code"
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-24"
              placeholder="+92"
            />
            <Input
              label="Phone number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="300 1234567"
              className="flex-1"
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleSendCode}
          disabled={!phone}
        >
          Send code
        </Button>

        <p className="mt-6 text-xs text-center text-muted-foreground">
          By continuing, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
