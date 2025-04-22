import { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  Gift, 
  Calendar, 
  MessageSquare, 
  Check,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'guest' | 'staff';
  timestamp: Date;
  isRead: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'message' | 'promotion' | 'booking';
  timestamp: Date;
  isRead: boolean;
}

export function MessagesPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'notifications'>('chat');
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'messages' | 'promotions'>('all');

  // Mock data for chat messages
  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      content: 'Welcome to Kuriftu Resort! How may I assist you today?',
      sender: 'staff',
      timestamp: new Date(2024, 2, 15, 9, 30),
      isRead: true,
    },
    {
      id: '2',
      content: 'I\'d like to book a spa treatment for tomorrow afternoon.',
      sender: 'guest',
      timestamp: new Date(2024, 2, 15, 9, 32),
      isRead: true,
    },
    {
      id: '3',
      content: 'I\'ll check the availability and get back to you shortly.',
      sender: 'staff',
      timestamp: new Date(2024, 2, 15, 9, 33),
      isRead: true,
    },
    {
      id: '4',
      content: 'We have an opening at 2 PM for a 90-minute traditional massage. Would that work for you?',
      sender: 'staff',
      timestamp: new Date(2024, 2, 15, 9, 35),
      isRead: true,
    },
  ];

  // Mock data for notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Spa Booking Confirmed',
      message: 'Your spa treatment is confirmed for tomorrow at 2 PM.',
      type: 'booking',
      timestamp: new Date(2024, 2, 15, 9, 40),
      isRead: false,
    },
    {
      id: '2',
      title: 'Weekend Special',
      message: 'Enjoy 20% off on all spa treatments this weekend.',
      type: 'promotion',
      timestamp: new Date(2024, 2, 15, 8, 0),
      isRead: true,
    },
    {
      id: '3',
      title: 'Dinner Reservation',
      message: 'Your table is reserved for tonight at 7 PM.',
      type: 'booking',
      timestamp: new Date(2024, 2, 14, 15, 30),
      isRead: true,
    },
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (notificationFilter === 'all') return true;
    if (notificationFilter === 'messages') return notification.type === 'booking';
    return notification.type === 'promotion';
  });

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {};
    
    messages.forEach(message => {
      const date = message.timestamp.toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-6 w-6 text-brand-600" />;
      case 'promotion':
        return <Gift className="h-6 w-6 text-brand-600" />;
      default:
        return <Bell className="h-6 w-6 text-brand-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-brand-600 hover:text-brand-700">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-serif font-light text-brand-900">Messages & Notifications</h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-1 border-b-2 font-serif text-lg transition-colors duration-200 ${
                activeTab === 'chat'
                  ? 'border-brand-600 text-brand-900'
                  : 'border-transparent text-brand-600 hover:text-brand-900 hover:border-brand-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Chat History</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-serif text-lg transition-colors duration-200 ${
                activeTab === 'notifications'
                  ? 'border-brand-600 text-brand-900'
                  : 'border-transparent text-brand-600 hover:text-brand-900 hover:border-brand-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'chat' ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 space-y-8">
              {Object.entries(groupMessagesByDate(chatMessages)).map(([date, messages]) => (
                <div key={date}>
                  <div className="text-center mb-6">
                    <span className="bg-brand-50 text-brand-600 px-4 py-1 rounded-full text-sm font-serif">
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'guest' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-sm rounded-2xl px-6 py-3 ${
                            message.sender === 'guest'
                              ? 'bg-brand-600 text-white'
                              : 'bg-brand-50 text-brand-900'
                          }`}
                        >
                          <p className="font-serif text-lg">{message.content}</p>
                          <div className="flex items-center justify-end mt-2 space-x-2">
                            <p className="text-xs opacity-75">
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            {message.sender === 'guest' && message.isRead && (
                              <Check className="h-4 w-4 text-brand-200" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Notification Filters */}
            <div className="flex space-x-4">
              {['all', 'messages', 'promotions'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setNotificationFilter(filter as any)}
                  className={`px-6 py-2 rounded-full font-serif transition-colors ${
                    notificationFilter === filter
                      ? 'bg-brand-600 text-white'
                      : 'bg-white text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="divide-y divide-brand-100">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-brand-50 transition-colors ${
                      !notification.isRead ? 'bg-brand-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-100 rounded-full p-2">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-serif text-brand-900">
                              {notification.title}
                            </h3>
                            <p className="text-brand-600 font-serif mt-1">
                              {notification.message}
                            </p>
                          </div>
                          <span className="text-sm text-brand-600">
                            {notification.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        {!notification.isRead && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                              New
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}