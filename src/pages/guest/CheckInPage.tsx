import { useState } from 'react';
import { Calendar, User, Home, List, Check } from 'lucide-react';

interface FormData {
  name: string;
  roomNumber: string;
  arrivalDate: string;
  preferences: string;
  earlyCheckIn: boolean;
  airportPickup: boolean;
}

export function CheckInPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    roomNumber: '',
    arrivalDate: '',
    preferences: '',
    earlyCheckIn: false,
    airportPickup: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-50 py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80"
            alt="Resort Background"
            className="w-full h-full object-cover fixed"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-serif font-light text-brand-900 mb-4">
              Welcome to Kuriftu Resort
            </h2>
            <p className="text-xl text-brand-600 font-serif mb-8">
              Your check-in has been confirmed. We look forward to making your stay exceptional.
            </p>
            <div className="bg-brand-50/50 rounded-lg p-6 text-left">
              <h3 className="text-xl font-serif text-brand-800 mb-4">Your Details</h3>
              <div className="space-y-2 font-serif">
                <p><span className="text-brand-600">Name:</span> {formData.name}</p>
                <p><span className="text-brand-600">Room:</span> {formData.roomNumber}</p>
                <p><span className="text-brand-600">Arrival:</span> {formData.arrivalDate}</p>
                {formData.earlyCheckIn && (
                  <p><span className="text-brand-600">Early Check-in:</span> Confirmed</p>
                )}
                {formData.airportPickup && (
                  <p><span className="text-brand-600">Airport Pickup:</span> Arranged</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              Welcome to Paradise
            </h2>

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
                  />
                </div>
              </div>

              <div>
                <label className="block text-xl font-serif text-brand-800 mb-2">
                  Room Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Home className="h-5 w-5 text-brand-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-brand-200 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm focus:ring-brand-500 focus:border-brand-500 font-serif text-lg"
                    placeholder="101"
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
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.earlyCheckIn}
                    onChange={(e) => setFormData({ ...formData, earlyCheckIn: e.target.checked })}
                    className="h-5 w-5 text-brand-600 focus:ring-brand-500 border-brand-300 rounded"
                  />
                  <label className="ml-3 block text-lg text-brand-800 font-serif">
                    Early Check-in ($30)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.airportPickup}
                    onChange={(e) => setFormData({ ...formData, airportPickup: e.target.checked })}
                    className="h-5 w-5 text-brand-600 focus:ring-brand-500 border-brand-300 rounded"
                  />
                  <label className="ml-3 block text-lg text-brand-800 font-serif">
                    Airport Pickup ($50)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-serif text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition transform hover:scale-105"
              >
                Complete Check-in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}