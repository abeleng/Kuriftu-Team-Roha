import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Bell, 
  Globe, 
  Lock, 
  Mail, 
  Moon,
  Phone,
  User,
  ChevronDown,
  Check
} from 'lucide-react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true
  });
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-brand-600 hover:text-brand-700">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-serif font-light text-brand-900">Settings</h1>
          </div>
          <p className="text-brand-600 font-serif mt-1">Manage your preferences and account settings</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Settings Navigation */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <nav className="flex border-b border-brand-100">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'preferences', label: 'Preferences', icon: Globe },
              { id: 'security', label: 'Security', icon: Lock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-4 font-serif text-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-brand-900 border-b-2 border-brand-600'
                    : 'text-brand-600 hover:text-brand-900'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-brand-900">Profile Information</h2>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-serif text-brand-600 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400 h-5 w-5" />
                      <input
                        type="text"
                        defaultValue="Emma Thompson"
                        className="w-full pl-10 pr-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent font-serif"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-serif text-brand-600 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400 h-5 w-5" />
                      <input
                        type="email"
                        defaultValue="emma.t@example.com"
                        className="w-full pl-10 pr-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent font-serif"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-serif text-brand-600 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400 h-5 w-5" />
                      <input
                        type="tel"
                        defaultValue="+251 912 345 678"
                        className="w-full pl-10 pr-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent font-serif"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-brand-900">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { id: 'email', label: 'Email Notifications', description: 'Receive updates and confirmations via email' },
                    { id: 'push', label: 'Push Notifications', description: 'Get instant updates on your device' },
                    { id: 'marketing', label: 'Marketing Communications', description: 'Stay updated with special offers and promotions' },
                    { id: 'updates', label: 'Service Updates', description: 'Important updates about your stay' }
                  ].map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 bg-brand-50 rounded-lg">
                      <div>
                        <h3 className="font-serif text-brand-900">{setting.label}</h3>
                        <p className="text-sm text-brand-600 font-serif">{setting.description}</p>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [setting.id]: !prev[setting.id as keyof typeof notifications] }))}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications[setting.id as keyof typeof notifications]
                            ? 'bg-brand-600'
                            : 'bg-brand-200'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                          notifications[setting.id as keyof typeof notifications]
                            ? 'translate-x-7'
                            : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferences Settings */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-brand-900">App Preferences</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-brand-50 rounded-lg">
                    <h3 className="font-serif text-brand-900 mb-2">Language</h3>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full appearance-none bg-white border border-brand-200 rounded-lg py-2 pl-4 pr-10 font-serif focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="am">Amharic</option>
                        <option value="fr">French</option>
                        <option value="ar">Arabic</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-400 h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4 bg-brand-50 rounded-lg">
                    <h3 className="font-serif text-brand-900 mb-2">Theme</h3>
                    <div className="relative">
                      <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-full appearance-none bg-white border border-brand-200 rounded-lg py-2 pl-4 pr-10 font-serif focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System Default</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-400 h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-brand-900">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-serif text-brand-600 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent font-serif"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-serif text-brand-600 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent font-serif"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-serif text-brand-600 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent font-serif"
                    />
                  </div>
                  <button className="w-full bg-brand-600 text-white py-2 px-4 rounded-lg hover:bg-brand-700 transition font-serif mt-4">
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-brand-600 text-white px-8 py-3 rounded-full hover:bg-brand-700 transition transform hover:scale-105 font-serif text-lg flex items-center space-x-2">
            <span>Save Changes</span>
            <Check className="h-5 w-5" />
          </button>
        </div>
      </main>
    </div>
  );
}