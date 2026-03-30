import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function CreateGroupScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    currency: 'PKR',
    installment: '',
    period: 'monthly' as 'monthly' | 'weekly',
    startDate: '',
    totalPeriods: '',
    method: 'method1' as 'method1' | 'method2',
    note: ''
  });

  const handleCreate = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <TopBar title="Create group" showBack />

      <div className="px-4 py-6 space-y-8">
        <div className="space-y-4">
          <h3 className="text-sm text-muted-foreground">Basics</h3>

          <Input
            label="Group name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Family Savings"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm text-muted-foreground">Money & schedule</h3>

          <div className="flex gap-3">
            <div className="w-24">
              <Input
                label="Currency"
                type="text"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              />
            </div>
            <Input
              label="Installment amount"
              type="text"
              value={formData.installment}
              onChange={(e) => setFormData({ ...formData, installment: e.target.value })}
              placeholder="10,000"
              className="flex-1"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Period</label>
            <div className="flex gap-3">
              <button
                onClick={() => setFormData({ ...formData, period: 'monthly' })}
                className={`flex-1 h-12 rounded-xl border-2 transition-colors ${
                  formData.period === 'monthly'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-input bg-input-background'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setFormData({ ...formData, period: 'weekly' })}
                className={`flex-1 h-12 rounded-xl border-2 transition-colors ${
                  formData.period === 'weekly'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-input bg-input-background'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <Input
            label="Start date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />

          <Input
            label="Number of periods"
            type="number"
            value={formData.totalPeriods}
            onChange={(e) => setFormData({ ...formData, totalPeriods: e.target.value })}
            placeholder="12"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm text-muted-foreground">Rules</h3>

          <div className="space-y-3">
            <label className="text-sm">Join method</label>

            <button
              onClick={() => setFormData({ ...formData, method: 'method1' })}
              className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                formData.method === 'method1'
                  ? 'border-primary bg-primary/5'
                  : 'border-input bg-input-background'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    formData.method === 'method1' ? 'border-primary' : 'border-input'
                  }`}
                >
                  {formData.method === 'method1' && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
                <div>
                  <p className="mb-1">Method 1 (Buy-in)</p>
                  <p className="text-sm text-muted-foreground">
                    All members join from start, equal pot sizes
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setFormData({ ...formData, method: 'method2' })}
              className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                formData.method === 'method2'
                  ? 'border-primary bg-primary/5'
                  : 'border-input bg-input-background'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    formData.method === 'method2' ? 'border-primary' : 'border-input'
                  }`}
                >
                  {formData.method === 'method2' && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
                <div>
                  <p className="mb-1">Method 2 (Mid-cycle join)</p>
                  <p className="text-sm text-muted-foreground">
                    Members can join later, variable pot sizes
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div className="pt-2">
            <label className="text-sm mb-2 block">Optional note</label>
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Add rules or notes for members..."
              className="w-full h-24 px-4 py-3 rounded-xl bg-input-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleCreate}
          disabled={!formData.name || !formData.installment || !formData.totalPeriods}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
