import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Users, 
  LineChart, 
  ArrowRight, 
  Menu, 
  X, 
  Star, 
  TrendingUp, 
  Clock,
  Brain,
  Sparkles,
  BarChart,
  Zap,
  Shield,
  Coffee
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Feedback Assistant",
      description: "Our intelligent system analyzes guest feedback in real-time, providing actionable insights to improve service quality instantly."
    },
    {
      icon: Zap,
      title: "Smart Request Routing",
      description: "Automatically directs guest requests to the right department, ensuring swift response times and efficient service delivery."
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into guest satisfaction, service performance, and operational efficiency through intuitive visualizations."
    },
    {
      icon: Sparkles,
      title: "Predictive Service",
      description: "Anticipates guest needs based on historical data and preferences, enabling proactive service delivery."
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Faster Response Times",
      description: "90% of guest requests are addressed within 5 minutes"
    },
    {
      icon: Shield,
      title: "Enhanced Guest Privacy",
      description: "Secure, encrypted communication channels for guest peace of mind"
    },
    {
      icon: Coffee,
      title: "Personalized Experience",
      description: "Tailored service recommendations based on guest preferences"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&q=80"
            alt="Kuriftu Resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-serif font-semibold text-white tracking-wide flex items-center">
                <Star className="h-8 w-8 mr-2" />
                Kuriftu+
              </div>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className="hidden md:flex items-center space-x-8">
                <Link to="/chat" className="text-white hover:text-brand-200 transition font-serif text-lg">Live Support</Link>
                <Link to="/feedback" className="text-white hover:text-brand-200 transition font-serif text-lg">Guest Feedback</Link>
                <Link 
                  to="/signin"
                  className="px-6 py-2 text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition font-serif text-lg"
                >
                  Staff Portal
                </Link>
              </div>
            </div>

            {isMenuOpen && (
              <div className="md:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-lg">
                <div className="flex flex-col space-y-4 px-6 py-8">
                  <Link to="/chat" className="text-white hover:text-brand-200 transition font-serif text-xl">Live Support</Link>
                  <Link to="/feedback" className="text-white hover:text-brand-200 transition font-serif text-xl">Guest Feedback</Link>
                  <Link 
                    to="/signin"
                    className="px-6 py-2 text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition font-serif text-xl text-center"
                  >
                    Staff Portal
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Content */}
        <div className={`relative container mx-auto px-6 pt-32 text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-7xl font-serif font-light text-white mb-8 leading-tight">
            Welcome to<br />Kuriftu+
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-serif">
            Experience luxury hospitality enhanced with instant communication, personalized service, and seamless experience management.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              to="/signin"
              className="bg-white text-brand-900 px-12 py-4 rounded-full shadow-lg hover:bg-opacity-90 transition transform hover:scale-105 font-serif text-lg border-2 border-white hover:text-black"
            >
              Sign In/Up
            </Link>
            <Link
              to="/feedback"
              className="bg-transparent border-2 border-white text-white px-12 py-4 rounded-full shadow-lg hover:bg-white hover:text-black transition transform hover:scale-105 font-serif text-lg"
            >
              Share Feedback
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-brand-900">Elevating Your Kuriftu Experience</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="bg-brand-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-brand-600" />
                </div>
                <h3 className="text-2xl font-serif mb-4 text-brand-800">{feature.title}</h3>
                <p className="text-lg text-brand-600 font-serif">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <section className="py-24 bg-brand-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif text-brand-900 mb-8">Experience Next-Generation Hospitality</h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-lg shadow-md">
                      <benefit.icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-brand-800 mb-2">{benefit.title}</h3>
                      <p className="text-brand-600 font-serif">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80"
                  alt="Platform Preview"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-brand-600 text-white px-6 py-3 rounded-full shadow-lg">
                  <p className="font-serif">Live Demo Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-brand-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-serif mb-2">98%</div>
              <div className="text-xl font-serif text-brand-200">Guest Satisfaction</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-serif mb-2">15min</div>
              <div className="text-xl font-serif text-brand-200">Average Response Time</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-serif mb-2">4.9/5</div>
              <div className="text-xl font-serif text-brand-200">Guest Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80"
            alt="Background Pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-brand-900">Ready to Transform Your Guest Experience?</h2>
          <p className="text-xl text-brand-600 mb-12 font-serif max-w-2xl mx-auto">
            Join Kuriftu+ to deliver exceptional hospitality powered by cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/signin"
              className="group bg-brand-600 text-white px-8 py-4 rounded-full hover:bg-brand-700 transition transform hover:scale-105 font-serif text-lg flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/chat"
              className="px-8 py-4 border-2 border-brand-600 text-brand-600 rounded-full hover:bg-brand-50 transition transform hover:scale-105 font-serif text-lg"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-serif mb-4">Kuriftu+</h3>
              <p className="text-brand-200 font-serif">
                Enhancing your Kuriftu Resort experience through seamless digital connection.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-4">Quick Links</h4>
              <ul className="space-y-2 font-serif">
                <li><Link to="/signin" className="text-brand-200 hover:text-white transition">Sign In/Up</Link></li>
                <li><Link to="/feedback" className="text-brand-200 hover:text-white transition">Share Feedback</Link></li>
                <li><Link to="/signin" className="text-brand-200 hover:text-white transition">Staff Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-4">Contact</h4>
              <ul className="space-y-2 text-brand-200 font-serif">
                <li>Kuriftu Resort</li>
                <li>Addis Ababa, Ethiopia</li>
                <li>+251 123 456 789</li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-brand-200 hover:text-white transition">Instagram</a>
                <a href="#" className="text-brand-200 hover:text-white transition">Facebook</a>
                <a href="#" className="text-brand-200 hover:text-white transition">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-brand-800 text-center text-brand-200">
            <p>&copy; 2024 Kuriftu+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}