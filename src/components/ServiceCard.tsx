import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  price: string;
  rating?: number;
  duration?: string;
  location?: string;
  inChat?: boolean;
  onBook?: () => void;
  onLearnMore?: () => void;
}

export function ServiceCard({
  title,
  description,
  image,
  price,
  rating,
  duration,
  location,
  inChat = false,
  onBook,
  onLearnMore
}: ServiceCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${!inChat && 'transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'}`}>
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {rating && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-serif text-brand-900">{rating}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif text-brand-900 mb-2">{title}</h3>
        <p className="text-brand-600 font-serif mb-4">{description}</p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-brand-600">
            <span className="font-serif">{price}</span>
            {duration && (
              <span className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {duration}
              </span>
            )}
          </div>
          {location && (
            <div className="flex items-center text-sm text-brand-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onBook}
            className="flex-1 bg-brand-600 text-white py-2 px-4 rounded-full font-serif hover:bg-brand-700 transition flex items-center justify-center space-x-2"
          >
            <span>Book Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onLearnMore}
            className="px-4 py-2 border border-brand-200 rounded-full text-brand-600 font-serif hover:bg-brand-50 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}