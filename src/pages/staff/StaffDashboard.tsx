import { useState } from 'react';
import { Users, Star, Bell, Calendar, TrendingUp, Coffee } from 'lucide-react';

export function StaffDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-serif font-light text-brand-900">Staff Dashboard</h1>
          <p className="text-brand-600 font-serif mt-1">Welcome back, manage your tasks and monitor guest experiences</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
          {[
            { icon: Users, label: "Current Guests", value: "24", trend: "+2 today" },
            { icon: Coffee, label: "Active Services", value: "8", trend: "2 pending" },
            { icon: Star, label: "Average Rating", value: "4.8", trend: "+0.2 this week" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-brand-50 rounded-full p-3">
                    <stat.icon className="h-8 w-8 text-brand-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-serif text-brand-600 truncate">
                      {stat.label}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-3xl font-serif text-brand-900">{stat.value}</div>
                      <div className="ml-2 flex items-baseline text-sm font-serif text-brand-600">
                        {stat.trend}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-brand-100">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'overview', name: 'Overview', icon: TrendingUp },
                { id: 'calendar', name: 'Calendar', icon: Calendar },
                { id: 'notifications', name: 'Notifications', icon: Bell }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`${
                    selectedTab === tab.id
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-brand-400 hover:text-brand-600 hover:border-brand-400'
                  } flex items-center px-1 py-4 border-b-2 font-serif text-lg transition-colors duration-200`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-brand-50 rounded-lg p-6">
                  <h3 className="text-xl font-serif text-brand-800 mb-4">Today's Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4 shadow">
                      <h4 className="font-serif text-brand-600 mb-2">Check-ins Today</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-serif text-brand-900">8</span>
                        <span className="text-sm text-brand-600">Expected: 12</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <h4 className="font-serif text-brand-600 mb-2">Service Requests</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-serif text-brand-900">5</span>
                        <span className="text-sm text-brand-600">Priority: 2</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-50 rounded-lg p-6">
                  <h3 className="text-xl font-serif text-brand-800 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { time: '10:30 AM', event: 'New check-in: Room 301' },
                      { time: '09:45 AM', event: 'Feedback received: 5 stars' },
                      { time: '09:15 AM', event: 'Room service request: Room 205' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow">
                        <div className="text-sm font-serif text-brand-600">{activity.time}</div>
                        <div className="text-brand-900 font-serif">{activity.event}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'calendar' && (
              <div className="text-center text-brand-600 font-serif">
                Calendar view coming soon
              </div>
            )}

            {selectedTab === 'notifications' && (
              <div className="text-center text-brand-600 font-serif">
                No new notifications
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}