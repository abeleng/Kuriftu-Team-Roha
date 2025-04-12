import { useParams, Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Star, 
  ArrowLeft,
  Coffee,
  Phone,
  Mail,
  MapPin,
  Check,
  X,
  Heart
} from 'lucide-react';

interface GuestProfile {
  id: string;
  name: string;
  room: {
    number: string;
    type: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  booking: {
    checkIn: string;
    checkOut: string;
    nights: number;
  };
  preferences: string[];
  specialRequests: string[];
  upsellResponses: {
    service: string;
    status: 'accepted' | 'declined';
    price?: string;
  }[];
  chatPreview: {
    timestamp: string;
    message: string;
  }[];
  satisfaction: {
    overall: number;
    lastFeedback: string;
    lastRating: number;
  };
}

const mockGuestProfiles: Record<string, GuestProfile> = {
  '1': {
    id: '1',
    name: 'Meskerem Tadesse',
    room: {
      number: '301',
      type: 'Lake View Suite'
    },
    contact: {
      email: 'meskerem.t@example.com',
      phone: '+251 911 234 567',
      address: 'Addis Ababa, Ethiopia'
    },
    booking: {
      checkIn: '2024-03-15',
      checkOut: '2024-03-20',
      nights: 5
    },
    preferences: [
      'Lake View',
      'Early Check-in',
      'Traditional Coffee Service',
      'Quiet Room'
    ],
    specialRequests: [
      'Extra pillows',
      'Daily traditional coffee ceremony',
      'Late checkout requested'
    ],
    upsellResponses: [
      {
        service: 'Airport Pickup',
        status: 'accepted',
        price: '$50'
      },
      {
        service: 'Spa Package',
        status: 'accepted',
        price: '$120'
      },
      {
        service: 'Premium Wi-Fi',
        status: 'declined'
      }
    ],
    chatPreview: [
      {
        timestamp: '2024-03-15 14:30',
        message: 'Thank you for arranging the early check-in.'
      },
      {
        timestamp: '2024-03-15 16:45',
        message: 'Could you please schedule the coffee ceremony for tomorrow morning?'
      }
    ],
    satisfaction: {
      overall: 4.8,
      lastFeedback: 'Exceptional service and beautiful lake views. The traditional coffee ceremony was a highlight.',
      lastRating: 5
    }
  },
  '2': {
    id: '2',
    name: 'Birhanu Kassa',
    room: {
      number: '405',
      type: 'Garden Suite'
    },
    contact: {
      email: 'birhanu.k@example.com',
      phone: '+251 922 345 678',
      address: 'Bahir Dar, Ethiopia'
    },
    booking: {
      checkIn: '2024-03-16',
      checkOut: '2024-03-22',
      nights: 6
    },
    preferences: [
      'Garden View',
      'Quiet Room',
      'Vegetarian Meals'
    ],
    specialRequests: [
      'Vegetarian menu options',
      'Extra towels',
      'Daily newspaper'
    ],
    upsellResponses: [
      {
        service: 'Dinner Reservation',
        status: 'accepted',
        price: '$85'
      },
      {
        service: 'Guided Tour',
        status: 'declined'
      }
    ],
    chatPreview: [
      {
        timestamp: '2024-03-16 12:15',
        message: 'Is it possible to have dinner served in my room tonight?'
      }
    ],
    satisfaction: {
      overall: 4.5,
      lastFeedback: 'Great attention to dietary preferences. Very comfortable stay.',
      lastRating: 4
    }
  }
};

export function GuestProfilePage() {
  const { id } = useParams();
  const guest = id ? mockGuestProfiles[id] : null;

  if (!guest) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-brand-900">Guest not found</h2>
          <Link to="/guests" className="text-brand-600 hover:text-brand-700 mt-4 inline-block">
            Return to guest list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/guests" className="text-brand-600 hover:text-brand-700">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-light text-brand-900">Guest Profile</h1>
              <p className="text-brand-600 font-serif mt-1">Manage guest information and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-brand-100 rounded-full p-4">
                    <User className="h-8 w-8 text-brand-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-brand-900">{guest.name}</h2>
                    <p className="text-brand-600 font-serif">
                      {guest.room.type} - Room {guest.room.number}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-brand-600">
                  <Mail className="h-5 w-5" />
                  <span className="font-serif">{guest.contact.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-brand-600">
                  <Phone className="h-5 w-5" />
                  <span className="font-serif">{guest.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-brand-600">
                  <MapPin className="h-5 w-5" />
                  <span className="font-serif">{guest.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-serif text-brand-900 mb-4">Booking Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brand-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-brand-600 mb-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-serif">Check-in</span>
                  </div>
                  <p className="text-lg font-serif text-brand-900">{guest.booking.checkIn}</p>
                </div>
                <div className="bg-brand-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-brand-600 mb-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-serif">Check-out</span>
                  </div>
                  <p className="text-lg font-serif text-brand-900">{guest.booking.checkOut}</p>
                </div>
                <div className="bg-brand-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-brand-600 mb-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-serif">Length of Stay</span>
                  </div>
                  <p className="text-lg font-serif text-brand-900">{guest.booking.nights} nights</p>
                </div>
              </div>
            </div>

            {/* Preferences & Requests */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-serif text-brand-900 mb-4">Preferences & Requests</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-brand-600 mb-2">Guest Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    {guest.preferences.map((pref, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-serif"
                      >
                        <Coffee className="h-4 w-4 mr-1" />
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-brand-600 mb-2">Special Requests</h4>
                  <div className="space-y-2">
                    {guest.specialRequests.map((request, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-2 text-brand-900 font-serif"
                      >
                        <div className="h-2 w-2 bg-brand-600 rounded-full" />
                        <span>{request}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-serif text-brand-900">Recent Communications</h3>
                <button className="text-brand-600 hover:text-brand-700 font-serif">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {guest.chatPreview.map((chat, index) => (
                  <div key={index} className="bg-brand-50 rounded-lg p-4">
                    <p className="text-brand-900 font-serif mb-2">{chat.message}</p>
                    <p className="text-sm text-brand-600 font-serif">{chat.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Satisfaction Score */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-serif text-brand-900 mb-4">Guest Satisfaction</h3>
              <div className="text-center">
                <div className="text-4xl font-serif text-brand-900 mb-2">
                  {guest.satisfaction.overall.toFixed(1)}
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-6 w-6 ${
                        index < guest.satisfaction.overall
                          ? 'text-yellow-400 fill-current'
                          : 'text-brand-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-brand-600 font-serif">
                  {guest.satisfaction.lastFeedback}
                </p>
              </div>
            </div>

            {/* Upsell Responses */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-serif text-brand-900 mb-4">Service Responses</h3>
              <div className="space-y-4">
                {guest.upsellResponses.map((response, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-brand-50 rounded-lg">
                    <div>
                      <p className="font-serif text-brand-900">{response.service}</p>
                      {response.price && (
                        <p className="text-sm text-brand-600 font-serif">{response.price}</p>
                      )}
                    </div>
                    {response.status === 'accepted' ? (
                      <div className="flex items-center text-green-600">
                        <Check className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <X className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}