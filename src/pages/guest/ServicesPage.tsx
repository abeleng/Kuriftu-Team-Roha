import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Utensils, 
  Space as Spa, 
  Waves, 
  Calendar, 
  MapPin, 
  Star, 
  ArrowRight, 
  Clock,
  Users,
  Heart
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  category: 'dining' | 'wellness' | 'activities' | 'events';
  image: string;
  price: string;
  rating: number;
  location?: string;
  duration?: string;
  capacity?: string;
  featured?: boolean;
}

const services: Service[] = [
  {
    id: '1',
    title: 'Traditional Ethiopian Spa Treatment',
    description: 'Experience authentic Ethiopian wellness traditions with our signature spa treatment combining ancient techniques and local herbs.',
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80',
    price: '$120',
    rating: 4.9,
    duration: '90 minutes',
    featured: true
  },
  {
    id: '2',
    title: 'Lake Tana Sunset Cruise',
    description: 'Sail across the historic Lake Tana while enjoying breathtaking views of monasteries and the setting sun.',
    category: 'activities',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80',
    price: '$75 per person',
    rating: 4.8,
    duration: '2 hours',
    capacity: 'Up to 12 guests'
  },
  {
    id: '3',
    title: 'Authentic Ethiopian Fine Dining',
    description: 'Savor the finest Ethiopian cuisine prepared by our master chefs using local ingredients and traditional recipes.',
    category: 'dining',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80',
    price: '$85 per person',
    rating: 4.9,
    location: 'Main Restaurant',
    featured: true
  },
  {
    id: '4',
    title: 'Traditional Coffee Ceremony',
    description: 'Learn the art of traditional Ethiopian coffee ceremony from our expert baristas.',
    category: 'activities',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80',
    price: '$45',
    duration: '1.5 hours',
    capacity: 'Up to 8 guests'
  },
  {
    id: '5',
    title: 'Ethiopian Cultural Night',
    description: 'Experience traditional Ethiopian music, dance, and cuisine in one unforgettable evening.',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
    price: '$95',
    rating: 4.9,
    location: 'Main Hall',
    capacity: 'Up to 100 guests',
    featured: true
  },
  {
    id: '6',
    title: 'Sunrise Yoga by Lake Tana',
    description: 'Start your day with an energizing yoga session overlooking the serene Lake Tana.',
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80',
    price: '$25',
    duration: '60 minutes',
    rating: 4.7
  }
];

export function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Service['category']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = [
    { id: 'all', label: 'All Experiences', icon: Star },
    { id: 'dining', label: 'Dining', icon: Utensils },
    { id: 'wellness', label: 'Wellness', icon: Spa },
    { id: 'activities', label: 'Activities', icon: Waves },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFeatured = !showFeaturedOnly || service.featured;
    return matchesCategory && matchesSearch && matchesFeatured;
  });

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&q=80"
          alt="Kuriftu Experiences"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-serif font-light mb-4">Discover Ethiopian Luxury</h1>
            <p className="text-xl font-serif">Curated experiences that celebrate our heritage</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-brand-200 rounded-lg bg-white shadow-sm focus:ring-brand-500 focus:border-brand-500 font-serif"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full font-serif transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-brand-600 text-white'
                    : 'bg-white text-brand-600 hover:bg-brand-50'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.label}</span>
              </button>
            ))}
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`flex items-center space-x-2 px-6 py-2 rounded-full font-serif transition-colors ${
                showFeaturedOnly
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-brand-600 hover:bg-brand-50'
              }`}
            >
              <Star className="h-5 w-5" />
              <span>Featured</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-serif text-brand-900">{service.rating}</span>
                  </div>
                </div>
                {service.featured && (
                  <div className="absolute top-4 left-4 bg-brand-600/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-serif text-white">Featured</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif text-brand-900 mb-2">{service.title}</h3>
                <p className="text-brand-600 font-serif mb-4">{service.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-brand-600">
                    <span className="font-serif">{service.price}</span>
                    {service.duration && (
                      <span className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.duration}
                      </span>
                    )}
                  </div>
                  {service.location && (
                    <div className="flex items-center text-sm text-brand-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{service.location}</span>
                    </div>
                  )}
                  {service.capacity && (
                    <div className="flex items-center text-sm text-brand-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{service.capacity}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/services/${service.id}`}
                    className="flex-1 bg-brand-600 text-white py-2 px-4 rounded-full font-serif hover:bg-brand-700 transition flex items-center justify-center space-x-2"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button className="p-2 border border-brand-200 rounded-full text-brand-600 hover:bg-brand-50 transition">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}