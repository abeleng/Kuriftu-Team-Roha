import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: string;
  rating: number;
  location?: string;
  duration?: string;
  capacity?: string;
  featured?: boolean;
  gallery?: string[];
  highlights?: string[];
  includes?: string[];
  schedule?: string[];
}

// This would typically come from an API
const service: Service = {
  id: '1',
  title: 'Traditional Ethiopian Spa Treatment',
  description: 'Immerse yourself in the ancient healing traditions of Ethiopia with our signature spa treatment. This transformative experience combines time-honored techniques with locally sourced herbs and oils, offering a unique journey of relaxation and rejuvenation.',
  category: 'wellness',
  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80',
  price: '$120',
  rating: 4.9,
  duration: '90 minutes',
  location: 'Kuriftu Spa',
  capacity: 'Individual sessions',
  featured: true,
  gallery: [
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80'
  ],
  highlights: [
    'Traditional Ethiopian massage techniques',
    'Locally sourced aromatic oils',
    'Stress relief and deep relaxation',
    'Experienced wellness practitioners'
  ],
  includes: [
    'Pre-treatment consultation',
    'Herbal tea ceremony',
    'Access to relaxation lounge',
    'Complimentary spa products'
  ],
  schedule: [
    '9:00 AM - 10:30 AM',
    '11:00 AM - 12:30 PM',
    '2:00 PM - 3:30 PM',
    '4:00 PM - 5:30 PM'
  ]
};

export function ServiceDetailPage() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (service.gallery?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (service.gallery?.length || 0) - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        {service.gallery && (
          <>
            <img
              src={service.gallery[currentImageIndex]}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-6">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-serif">Back to Experiences</span>
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-serif text-brand-900 mb-2">{service.title}</h1>
                <div className="flex items-center space-x-4 text-brand-600">
                  <span className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    {service.rating} rating
                  </span>
                  {service.location && (
                    <span className="flex items-center">
                      <MapPin className="h-5 w-5 mr-1" />
                      {service.location}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 border border-brand-200 rounded-full text-brand-600 hover:bg-brand-50 transition">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 border border-brand-200 rounded-full text-brand-600 hover:bg-brand-50 transition">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="text-lg font-serif text-brand-600 leading-relaxed">
              {service.description}
            </p>

            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-brand-900">Experience Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                    <Star className="h-5 w-5 text-brand-600" />
                    <span className="font-serif text-brand-800">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-brand-900">What's Included</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ul className="space-y-3">
                  {service.includes?.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 font-serif text-brand-800">
                      <div className="h-2 w-2 bg-brand-600 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-serif text-brand-900">{service.price}</span>
                  <div className="flex items-center space-x-2 text-brand-600">
                    <Clock className="h-5 w-5" />
                    <span className="font-serif">{service.duration}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-serif text-brand-600 mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400 h-5 w-5" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent font-serif"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-serif text-brand-600 mb-2">
                    Available Times
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {service.schedule?.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-4 rounded-lg font-serif text-sm transition ${
                          selectedTime === time
                            ? 'bg-brand-600 text-white'
                            : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-brand-600 text-white py-3 rounded-full hover:bg-brand-700 transition transform hover:scale-105 font-serif text-lg flex items-center justify-center space-x-2">
                  <span>Book Experience</span>
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <p className="text-sm text-brand-600 text-center font-serif">
                  Free cancellation up to 24 hours before the experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}