import { useState, useRef, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { ChevronLeft } from 'lucide-react';

export function VerifyOTPScreen() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    navigate('/home');
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
        <h1 className="mb-2">Verify code</h1>
        <p className="text-muted-foreground mb-8">
          Enter the 6-digit code we sent you.
        </p>

        <div className="flex gap-3 justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-xl border-2 border-input rounded-xl bg-input-background focus:border-primary focus:outline-none transition-colors"
            />
          ))}
        </div>

        <div className="text-center mb-8">
          {timer > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend code in {timer}s
            </p>
          ) : (
            <button className="text-sm text-primary hover:underline">
              Resend code
            </button>
          )}
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleVerify}
          disabled={otp.some(digit => !digit)}
        >
          Verify
        </Button>

        <button
          onClick={() => navigate('/signup')}
          className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Wrong number?
        </button>
      </div>
    </div>
  );
}
