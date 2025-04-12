import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Star, 
  Phone, 
  Mail, 
  Clock, 
  Check, 
  Send, 
  User,
  MessageSquare,
  Plus,
  Settings,
  LogOut,
  Copy,
  CheckCircle,
  Ban,
  Mic,
  AlertCircle,
  X,
  Menu,
  Bell,
  HelpCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'guest' | 'staff';
  timestamp: Date;
  isRead: boolean;
}

interface Guest {
  id: string;
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: 'checked-in' | 'arriving' | 'checked-out';
  image?: string;
  lastActive: string;
  unreadCount: number;
  isTyping?: boolean;
  lastMessagePreview?: string;
}

const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'Liya Tesfaye',
    room: '301',
    checkIn: '2024-03-15',
    checkOut: '2024-03-20',
    status: 'checked-in',
    lastActive: '2 min ago',
    unreadCount: 3
  },
  {
    id: '2',
    name: 'Kebede Alemu',
    room: '405',
    checkIn: '2024-03-16',
    checkOut: '2024-03-22',
    status: 'arriving',
    lastActive: '15 min ago',
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Samrawit Getachew',
    room: '205',
    checkIn: '2024-03-14',
    checkOut: '2024-03-19',
    status: 'checked-in',
    lastActive: '1 hour ago',
    unreadCount: 1
  },
  {
    id: '4',
    name: 'Haile Fikru',
    room: '402',
    checkIn: '2024-03-15',
    checkOut: '2024-03-21',
    status: 'checked-in',
    lastActive: '30 min ago',
    unreadCount: 2
  }
];

const mockMessages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      content: 'Hello, I\'d like to book a traditional coffee ceremony for tomorrow morning.',
      sender: 'guest',
      timestamp: new Date(2024, 2, 15, 14, 30),
      isRead: true
    },
    {
      id: '2',
      content: 'I\'ll check the availability for tomorrow morning and get back to you shortly.',
      sender: 'staff',
      timestamp: new Date(2024, 2, 15, 14, 32),
      isRead: true
    },
    {
      id: '3',
      content: 'We have an opening at 10 AM for the traditional coffee ceremony. Would that work for you?',
      sender: 'staff',
      timestamp: new Date(2024, 2, 15, 14, 35),
      isRead: true
    },
    {
      id: '4',
      content: 'That would be perfect! Yes, please book it for me.',
      sender: 'guest',
      timestamp: new Date(2024, 2, 15, 14, 37),
      isRead: false
    }
  ],
  '2': [
    {
      id: '1',
      content: 'Good evening, I was wondering about the spa treatments available tomorrow?',
      sender: 'guest',
      timestamp: new Date(2024, 2, 15, 18, 30),
      isRead: true
    },
    {
      id: '2',
      content: 'We have several treatments available. Our signature Ethiopian herbal massage is highly recommended.',
      sender: 'staff',
      timestamp: new Date(2024, 2, 15, 18, 32),
      isRead: true
    }
  ]
};

export function StaffChatPage() {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedGuest?.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredGuests = mockGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedGuest) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'staff',
      timestamp: new Date(),
      isRead: true
    };

    mockMessages[selectedGuest.id] = [
      ...(mockMessages[selectedGuest.id] || []),
      message
    ];

    setNewMessage('');
    scrollToBottom();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const copyConversation = () => {
    if (!selectedGuest) return;
    const messages = mockMessages[selectedGuest.id] || [];
    const conversationText = messages
      .map(msg => `${msg.sender}: ${msg.content} (${msg.timestamp.toLocaleString()})`)
      .join('\n');
    navigator.clipboard.writeText(conversationText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const markAsResolved = () => {
    setIsResolved(!isResolved);
  };

  const toggleBlocked = () => {
    setIsBlocked(!isBlocked);
  };

  const navigateToGuestProfile = (guestId: string) => {
    navigate(`/guests/${guestId}`);
  };

  return (
    <div className="min-h-screen bg-brand-50 flex">
      {/* Left Sidebar - Chat List */}
      <div className="w-80 bg-white border-r border-brand-100 h-screen overflow-y-auto">
        <div className="p-6 border-b border-brand-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-serif text-brand-700">Kuriftu+</h1>
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-brand-50 rounded-full transition"
              >
                <Menu className="h-6 w-6 text-brand-600" />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <button className="w-full px-4 py-2 text-left text-brand-600 hover:bg-brand-50 flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-brand-600 hover:bg-brand-50 flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-brand-600 hover:bg-brand-50 flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Support</span>
                  </button>
                  <div className="border-t border-brand-100 my-1"></div>
                  <button 
                    onClick={() => navigate('/signin')}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-brand-100 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent font-serif bg-brand-50"
            />
          </div>
        </div>

        <div className="divide-y divide-brand-100">
          {filteredGuests.map((guest) => (
            <button
              key={guest.id}
              onClick={() => setSelectedGuest(guest)}
              className={`w-full p-4 text-left hover:bg-brand-50 transition ${
                selectedGuest?.id === guest.id ? 'bg-brand-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="bg-brand-100 rounded-full p-2">
                    <User className="h-6 w-6 text-brand-600" />
                  </div>
                  {guest.status === 'checked-in' && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-serif text-brand-900 truncate">
                      {guest.name}
                    </h3>
                    {guest.unreadCount > 0 && (
                      <span className="bg-brand-600 text-white text-xs rounded-full px-2 py-1">
                        {guest.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-brand-600 truncate">
                    {guest.lastMessagePreview || `Room ${guest.room}`}
                  </p>
                  <p className="text-xs text-brand-400 mt-1">
                    {guest.isTyping ? (
                      <span className="flex items-center text-brand-600">
                        <span className="mr-2">typing</span>
                        <span className="flex space-x-1">
                          <span className="w-1 h-1 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-1 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-1 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </span>
                      </span>
                    ) : (
                      guest.lastActive
                    )}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {selectedGuest ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-brand-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-brand-50 rounded-full p-2">
                    <User className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif text-brand-900">
                      {selectedGuest.name}
                    </h2>
                    <p className="text-sm text-brand-600">
                      Room {selectedGuest.room} • {selectedGuest.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyConversation}
                    className={`p-2 rounded-lg transition ${
                      isCopied ? 'bg-green-50 text-green-600' : 'hover:bg-brand-50 text-brand-600'
                    }`}
                    title="Copy Conversation"
                  >
                    {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={markAsResolved}
                    className={`p-2 rounded-lg transition ${
                      isResolved ? 'bg-green-50 text-green-600' : 'hover:bg-brand-50 text-brand-600'
                    }`}
                    title="Mark as Resolved"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={toggleBlocked}
                    className={`p-2 rounded-lg transition ${
                      isBlocked ? 'bg-red-50 text-red-600' : 'hover:bg-brand-50 text-brand-600'
                    }`}
                    title="Block User"
                  >
                    <Ban className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigateToGuestProfile(selectedGuest.id)}
                    className="ml-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition font-serif"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-accent-50">
              {mockMessages[selectedGuest.id]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xl rounded-2xl px-6 py-3 ${
                      message.sender === 'staff'
                        ? 'bg-brand-600 text-white'
                        : 'bg-white text-brand-900'
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
                      {message.sender === 'staff' && message.isRead && (
                        <Check className="h-4 w-4 text-brand-200" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-brand-100 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`p-3 rounded-full transition ${
                    isRecording
                      ? 'bg-red-50 text-red-600 animate-pulse'
                      : 'hover:bg-brand-50 text-brand-600'
                  }`}
                >
                  <Mic className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-brand-100 rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-600 focus:border-transparent font-serif bg-brand-50"
                />
                <button
                  type="submit"
                  className="bg-brand-600 text-white rounded-full p-3 hover:bg-brand-700 transition"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-accent-50">
            <div className="text-center">
              <div className="bg-white rounded-full p-6 mb-4 inline-block">
                <MessageSquare className="h-12 w-12 text-brand-600" />
              </div>
              <h2 className="text-2xl font-serif text-brand-900 mb-2">Welcome to Live Chat</h2>
              <p className="text-brand-600 font-serif">
                Select a conversation to start responding to guests
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}