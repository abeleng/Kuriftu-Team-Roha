import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  MessageSquare,
  Star,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Compass,
  User
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { logout, userRole } = useAuth();

  const navigation = userRole === 'staff' ? [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Guest Profiles', href: '/guests', icon: Users },
    { name: 'Live Chat', href: '/staff/chat', icon: MessageSquare },
    { name: 'Feedback', href: '/reviews', icon: Star },
    { name: 'Analytics', href: '/analytics', icon: BarChart },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ] : [
    { name: 'Chat Support', href: '/chat', icon: MessageSquare },
    { name: 'Messages', href: '/messages', icon: Bell },
    { name: 'Explore', href: '/services', icon: Compass },
    { name: 'Share Feedback', href: '/feedback', icon: Star },
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-brand-600 hover:bg-brand-100"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-brand-100">
            <Link to="/" className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-brand-600" />
              <span className="text-2xl font-serif text-brand-700 tracking-wide">Kuriftu+</span>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-lg font-serif rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-brand-50 text-brand-900'
                    : 'text-brand-600 hover:bg-brand-50 hover:text-brand-900'
                }`}
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex-shrink-0 p-4 border-t border-brand-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-lg font-serif text-brand-600 hover:bg-brand-50 hover:text-brand-900 rounded-lg transition-colors"
            >
              <LogOut className="mr-3 h-6 w-6" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-16 px-4 border-b border-brand-100">
                <Link to="/" className="flex items-center space-x-2">
                  <Star className="h-8 w-8 text-brand-600" />
                  <span className="text-2xl font-serif text-brand-700 tracking-wide">Kuriftu+</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-brand-600 hover:bg-brand-100"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 text-lg font-serif rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-brand-50 text-brand-900'
                        : 'text-brand-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex-shrink-0 p-4 border-t border-brand-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-lg font-serif text-brand-600 hover:bg-brand-50 hover:text-brand-900 rounded-lg transition-colors"
                >
                  <LogOut className="mr-3 h-6 w-6" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}