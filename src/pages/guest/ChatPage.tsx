import { useState, useEffect, useRef } from 'react';
import { Send, Settings, X, Plus, MessageSquare, LogOut, Moon, Volume2, Languages, Mic, StopCircle, ArrowLeft, Bed, Space as Spa, Car, UtensilsCrossed, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type Message = {
  id: string;
  sender: 'user' | 'staff';
  text: string;
  timestamp: Date;
  isRead: boolean;
};

interface ServiceSuggestion {
  id: string;
  icon: typeof Bed;
  label: string;
  message: string;
  priority: {
    spa: number;
    restaurant: number;
    checkin: number;
    default: number;
  };
}

const serviceSuggestions: ServiceSuggestion[] = [
  {
    id: 'room-service',
    icon: Bed,
    label: 'Room Service',
    message: "I'd like to request room service.",
    priority: { spa: 2, restaurant: 3, checkin: 2, default: 1 }
  },
  {
    id: 'spa',
    icon: Spa,
    label: 'Spa Booking',
    message: "I'd like to book a spa appointment.",
    priority: { spa: 1, restaurant: 4, checkin: 3, default: 2 }
  },
  {
    id: 'transfer',
    icon: Car,
    label: 'Airport Transfer',
    message: "I need to arrange airport transfer.",
    priority: { spa: 5, restaurant: 5, checkin: 1, default: 3 }
  },
  {
    id: 'restaurant',
    icon: UtensilsCrossed,
    label: 'Restaurant',
    message: "I'd like to make a restaurant reservation.",
    priority: { spa: 3, restaurant: 1, checkin: 4, default: 4 }
  },
  {
    id: 'housekeeping',
    icon: Sparkles,
    label: 'Housekeeping',
    message: "I'd like to request housekeeping service.",
    priority: { spa: 4, restaurant: 2, checkin: 5, default: 5 }
  }
];

// Mock responses for different user inputs
const mockResponses: Record<string, string[]> = {
  default: [
    "How may I assist you today?",
    "I'll be happy to help you with that.",
    "Let me check that for you right away.",
    "Is there anything else you need assistance with?"
  ],
  checkout: [
    "We hope you had a wonderful stay with us! To complete your check-out, I'll just need to confirm a few things:\n\nWould you like us to email your final bill?\n\nAny feedback on your stay? We'd love to hear it!\n\nFeel free to let me know if you need any help with anything else, or if you want us to arrange transport for you. Safe travels! ✨"
  ],
  "email-bill": [
    "Thanks for the lovely feedback! We're so happy to hear that you had a great stay with us! 💖 I'll go ahead and email your bill to [Guest Email]. 📧"
  ],
  wifi: [
    "I'm sorry to hear that. Our team has been notified and is working to resolve your WiFi issue promptly. Thank you for your patience."
  ]
};

const getResponseForMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('check out') || lowerMessage.includes('checkout')) {
    return mockResponses.checkout[0];
  }
  if (lowerMessage.includes('email') && lowerMessage.includes('bill')) {
    return mockResponses["email-bill"][0];
  }
  if (lowerMessage.includes('wifi')) {
    return mockResponses.wifi[0];
  }
  return mockResponses.default[Math.floor(Math.random() * mockResponses.default.length)];
};

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const getCurrentContext = (): 'spa' | 'restaurant' | 'checkin' | 'default' => {
    const path = location.pathname;
    if (path.includes('spa')) return 'spa';
    if (path.includes('restaurant')) return 'restaurant';
    if (path.includes('checkin')) return 'checkin';
    return 'default';
  };

  const sortedSuggestions = [...serviceSuggestions].sort((a, b) => {
    const context = getCurrentContext();
    return a.priority[context] - b.priority[context];
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: "Welcome to Kuriftu+ 👋 How may I assist you during your stay?",
      sender: 'staff',
      timestamp: new Date(),
      isRead: true
    };
    setMessages([welcomeMessage]);
  }, []);

  const simulateTyping = async () => {
    setIsTyping(true);
    const typingDuration = Math.random() * 2000 + 1000;
    await new Promise(resolve => setTimeout(resolve, typingDuration));
    setIsTyping(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    await simulateTyping();

    const response = getResponseForMessage(userMessage.text);

    const staffMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'staff',
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [...prev, staffMessage]);
  };

  const handleServiceSelect = async (suggestion: ServiceSuggestion) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion.message,
      sender: 'user',
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [...prev, userMessage]);
    await simulateTyping();

    const response = getResponseForMessage(suggestion.message);

    const staffMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'staff',
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [...prev, staffMessage]);
  };

  const startNewChat = () => {
    setMessages([{
      id: '1',
      text: "Welcome to Kuriftu+ 👋 How may I assist you during your stay?",
      sender: 'staff',
      timestamp: new Date(),
      isRead: true
    }]);
  };

  return (
    <div className="min-h-screen bg-brand-50 flex">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-20 ${
        isSidebarOpen ? 'w-80' : 'w-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-brand-100">
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-center space-x-2 bg-brand-600 text-white py-3 px-4 rounded-lg hover:bg-brand-700 transition"
            >
              <Plus className="h-5 w-5" />
              <span className="font-serif">New Chat</span>
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-serif text-brand-600 mb-2">Recent Chats</h3>
            <div className="space-y-2">
              {messages.length > 0 && (
                <button className="w-full text-left p-3 rounded-lg hover:bg-brand-50 transition group">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5 text-brand-600" />
                    <span className="font-serif text-brand-900 truncate">Current Chat</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Settings Section */}
          <div className="border-t border-brand-100 p-4 space-y-4">
            <div className="space-y-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition"
              >
                <div className="flex items-center space-x-3">
                  <Moon className="h-5 w-5 text-brand-600" />
                  <span className="font-serif text-brand-900">Dark Mode</span>
                </div>
                <div className={`w-10 h-6 rounded-full transition ${darkMode ? 'bg-brand-600' : 'bg-brand-200'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    darkMode ? 'translate-x-5' : 'translate-x-1'
                  } mt-1`} />
                </div>
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition"
              >
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-brand-600" />
                  <span className="font-serif text-brand-900">Sound</span>
                </div>
                <div className={`w-10 h-6 rounded-full transition ${soundEnabled ? 'bg-brand-600' : 'bg-brand-200'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    soundEnabled ? 'translate-x-5' : 'translate-x-1'
                  } mt-1`} />
                </div>
              </button>

              <div className="p-3">
                <div className="flex items-center space-x-3 mb-2">
                  <Languages className="h-5 w-5 text-brand-600" />
                  <span className="font-serif text-brand-900">Language</span>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full mt-2 border border-brand-200 rounded-lg p-2 font-serif text-brand-900"
                >
                  <option value="en">English</option>
                  <option value="am">Amharic</option>
                </select>
              </div>
            </div>

            <Link
              to="/signin"
              className="w-full flex items-center justify-center space-x-2 p-3 text-brand-600 hover:bg-brand-50 rounded-lg transition"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-serif">Exit Chat</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Header */}
        <div className="bg-white shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-full hover:bg-brand-50 transition text-brand-600"
              >
                <MessageSquare className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-serif font-light text-brand-900">Guest Support</h1>
                <p className="text-brand-600 font-serif mt-1">Connect with our staff</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Service Suggestions */}
            <div className="p-6 border-b border-brand-100">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {sortedSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleServiceSelect(suggestion)}
                    className="flex flex-col items-center p-4 rounded-xl bg-[#F5F1EC] hover:bg-[#EBDDC8] transition-all duration-300 group"
                  >
                    <suggestion.icon className="h-8 w-8 text-[#A35C44] group-hover:text-[#CDAA7D] transition-colors duration-300" />
                    <span className="mt-2 text-[#2E2E2E] font-serif text-sm text-center">
                      {suggestion.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="h-[calc(100vh-500px)] overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-6 py-3 ${
                      message.sender === 'user'
                        ? 'bg-brand-600 text-white'
                        : 'bg-brand-50 text-brand-900'
                    }`}
                  >
                    <p className="font-serif text-lg">{message.text}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-brand-50 rounded-xl px-6 py-3 flex space-x-2">
                    <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                    <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-brand-100 p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsRecording(true);
                    // Simulate voice input after 3 seconds
                    setTimeout(() => {
                      setIsRecording(false);
                      const voiceMessage: Message = {
                        id: Date.now().toString(),
                        text: "My WiFi isn't working",
                        sender: 'user',
                        timestamp: new Date(),
                        isRead: true
                      };
                      setMessages(prev => [...prev, voiceMessage]);
                      
                      // Simulate AI response after a short delay
                      setTimeout(() => {
                        const aiResponse: Message = {
                          id: (Date.now() + 1).toString(),
                          text: mockResponses.wifi[0],
                          sender: 'staff',
                          timestamp: new Date(),
                          isRead: true
                        };
                        setMessages(prev => [...prev, aiResponse]);
                      }, 1000);
                    }, 3000);
                  }}
                  className={`p-3 rounded-full transition ${
                    isRecording
                      ? 'bg-red-50 text-red-600 animate-pulse'
                      : 'hover:bg-brand-50 text-brand-600'
                  }`}
                >
                  {isRecording ? <StopCircle className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
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
                  <Send className="h-6 w-6" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Recording Modal */}
      {isRecording && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center relative">
            <button
              onClick={() => setIsRecording(false)}
              className="absolute top-4 left-4 text-white/80 hover:text-white transition"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            {/* Voice Visualization */}
            <div className="w-48 h-48 relative mb-8">
              <div className="absolute inset-0 bg-brand-600/20 rounded-full animate-ping" />
              <div className="absolute inset-4 bg-brand-600/30 rounded-full animate-ping animation-delay-150" />
              <div className="absolute inset-8 bg-brand-600/40 rounded-full animate-ping animation-delay-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Mic className="h-12 w-12 text-white" />
              </div>
            </div>

            <p className="text-white/90 font-serif text-xl mb-8 animate-fade-in">
              Listening... Speak your request
            </p>

            <button
              onClick={() => setIsRecording(false)}
              className="px-8 py-3 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
            >
              <StopCircle className="h-5 w-5" />
              <span className="font-serif">Stop Recording</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}