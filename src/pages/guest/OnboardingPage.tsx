import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, List, Check } from 'lucide-react';

interface FormData {
  name: string;
  arrivalDate: string;
  preferences: string;
  earlyCheckIn: boolean;
  airportPickup: boolean;
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    arrivalDate: '',
    preferences: '',
    earlyCheckIn: false,
    airportPickup: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save this data to a backend
    console.log('Form data:', formData);
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-brand-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&q=80"
          alt="Resort Background"
          className="w-full h-full object-cover fixed"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-2xl">
          <div className="px-8 py-12">
            <h2 className="text-4xl font-serif font-light text-center text-brand-900 mb-8">
              Welcome to Kuriftu Resort
            </h2>
            <p className="text-xl text-brand-600 text-center font-serif mb-12">
              Let's personalize your stay with us
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xl font-serif text-brand-800 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <User className="h-5 w-5 text-brand-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-brand-200 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm focus:ring-brand-500 focus:border-brand-500 font-serif text-lg"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xl font-serif text-brand-800 mb-2">
                  Arrival Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Calendar className="h-5 w-5 text-brand-400" />
                  </div>
                  <input
                    type="date"
                    value={formData.arrivalDate}
                    onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-brand-200 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm focus:ring-brand-500 focus:border-brand-500 font-serif text-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xl font-serif text-brand-800 mb-2">
                  Special Preferences
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <List className="h-5 w-5 text-brand-400" />
                  </div>
                  <textarea
                    value={formData.preferences}
                    onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-brand-200 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm focus:ring-brand-500 focus:border-brand-500 font-serif text-lg"
                    placeholder="Any dietary restrictions or room preferences?"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4 bg-brand-50/50 rounded-lg p-6">
                <h3 className="text-xl font-serif text-brand-800 mb-4">Optional Services</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, earlyCheckIn: !prev.earlyCheckIn }))}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.earlyCheckIn
                        ? 'border-brand-600 bg-brand-50 text-brand-900'
                        : 'border-brand-200 text-brand-600 hover:border-brand-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-lg">Early Check-in</span>
                      {formData.earlyCheckIn && <Check className="h-5 w-5 text-brand-600" />}
                    </div>
                    <p className="text-sm text-brand-600">Available from 10:00 AM ($30)</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, airportPickup: !prev.airportPickup }))}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.airportPickup
                        ? 'border-brand-600 bg-brand-50 text-brand-900'
                        : 'border-brand-200 text-brand-600 hover:border-brand-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-lg">Airport Pickup</span>
                      {formData.airportPickup && <Check className="h-5 w-5 text-brand-600" />}
                    </div>
                    <p className="text-sm text-brand-600">Luxury vehicle with driver ($50)</p>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-serif text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition transform hover:scale-105"
              >
                Complete & Continue to Chat
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}