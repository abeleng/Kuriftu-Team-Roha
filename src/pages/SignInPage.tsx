import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Building, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type SignInRole = 'guest' | 'staff';

export function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<SignInRole>('guest');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    
    if (selectedRole === 'guest') {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center relative">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80"
          alt="Resort Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-md w-full mx-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-2xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Star className="h-10 w-10 text-brand-600" />
              <h1 className="text-4xl font-serif font-semibold text-brand-700 tracking-wide">Kuriftu+</h1>
            </div>
            <p className="text-brand-600 mt-2 font-serif text-lg">Sign in to continue</p>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSelectedRole('guest')}
              className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                selectedRole === 'guest'
                  ? 'border-brand-600 bg-brand-50 text-brand-900'
                  : 'border-brand-200 text-brand-600 hover:border-brand-400'
              }`}
            >
              <User className="h-5 w-5" />
              <span className="font-serif">Guest</span>
            </button>
            <button
              onClick={() => setSelectedRole('staff')}
              className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                selectedRole === 'staff'
                  ? 'border-brand-600 bg-brand-50 text-brand-900'
                  : 'border-brand-200 text-brand-600 hover:border-brand-400'
              }`}
            >
              <Building className="h-5 w-5" />
              <span className="font-serif">Staff</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-serif text-brand-800">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-brand-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-brand-200 rounded-md bg-white/70 backdrop-blur-sm shadow-sm focus:ring-brand-500 focus:border-brand-500 font-serif"
                  placeholder={selectedRole === 'guest' ? 'guest@example.com' : 'staff@kuriftu.com'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-serif text-brand-800">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-brand-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-brand-200 rounded-md bg-white/70 backdrop-blur-sm shadow-sm focus:ring-brand-500 focus:border-brand-500 font-serif"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-serif text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition transform hover:scale-105"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-brand-600 font-serif">
              {selectedRole === 'guest' ? (
                'First time? Enter your email to continue'
              ) : (
                'Contact admin for staff account creation'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}