import { useState, useEffect } from 'react';
import {
  Sparkles,
  Package,
  Star,
  Truck,
  Shield,
  ChevronRight,
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
} from 'lucide-react';
import './index.css';

// Product data for demonstration
const featuredProducts = [
  {
    id: 1,
    name: 'Saffron Threads',
    category: 'Premium',
    price: 89.99,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1615485500607-1758f56c0c8d?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Ceylon Cinnamon',
    category: 'Spices',
    price: 24.99,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001eefc?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Cardamom Pods',
    category: 'Premium',
    price: 42.5,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1596040033221-a1f4f8a8c233?w-400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Turmeric Powder',
    category: 'Essentials',
    price: 18.99,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop',
  },
];

const benefits = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Free Shipping',
    description: 'On orders over $50',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Quality Guarantee',
    description: '100% authentic spices',
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: 'Secure Packaging',
    description: 'Freshness guaranteed',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Premium Selection',
    description: 'Hand-picked quality',
  },
];

function App() {
  const [cartCount, setCartCount] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock add to cart function
  const addToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    alert(`Added ${productName} to cart!`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white">
      {/* Navigation Bar - Advanced Responsive Design */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ParadiseSpice
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Products', 'Categories', 'About', 'Contact'].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 hover:scale-105 transform"
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            {/* Search & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search spices..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              <button className="relative p-2 hover:bg-amber-50 rounded-full transition-colors">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="p-2 hover:bg-amber-50 rounded-full transition-colors">
                <User className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
              {['Home', 'Products', 'Categories', 'About', 'Contact'].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-700 hover:text-amber-600 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                )
              )}
              <div className="pt-4 border-t">
                <input
                  type="text"
                  placeholder="Search spices..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Advanced Gradients & Animations */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-amber-200/20 via-orange-100/10 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6 animate-pulse">
              🎉 Exclusive Launch Offer
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-linear-to-r from-amber-600 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                World's Finest
              </span>
              <br />
              <span className="text-gray-900">Spices & Herbs</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Discover exotic flavors from around the globe. Authentic,
              sustainably sourced, and delivered fresh to your kitchen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3.5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                Shop Collection
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button className="px-8 py-3.5 border-2 border-amber-500 text-amber-600 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid - Advanced Grid Layout */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-linear-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-amber-600">{benefit.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Advanced Card Design */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured Spices
              </h2>
              <p className="text-gray-600">
                Hand-selected premium quality from around the world
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-2 mt-4 md:mt-0">
              {['all', 'premium', 'spices', 'essentials'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-200"
              >
                {/* Product Image with Overlay */}
                <div className="relative overflow-hidden">
                  <div className="h-56 bg-linear-to-br from-amber-50 to-orange-50" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.category === 'Premium'
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {product.category}
                    </span>
                  </div>

                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Star className="w-5 h-5 text-amber-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    Premium quality, direct from source
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">/ 100g</span>
                    </div>

                    <button
                      onClick={() => addToCart(product.name)}
                      className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Advanced Background Effects */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-amber-500/10 via-orange-400/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join 10,000+ chefs and home cooks who trust ParadiseSpice for
              their culinary adventures.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative max-w-md mx-auto sm:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email for exclusive offers"
                  className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
                />
                <button className="absolute right-2 top-2 px-6 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-200">
                  Subscribe
                </button>
              </div>

              <button className="px-8 py-4 border-2 border-amber-500 text-amber-600 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300">
                View All Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Advanced Layout */}
      <footer className="bg-gray-900 text-white pt-12 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ParadiseSpice</span>
              </div>
              <p className="text-gray-400 mb-6">
                Bringing the world's finest spices to your kitchen since 2025.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'youtube'].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <span className="sr-only">{social}</span>
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  'Shop All',
                  'Best Sellers',
                  'New Arrivals',
                  'Seasonal Spices',
                  'Gift Sets',
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {[
                  'Contact Us',
                  'FAQ',
                  'Shipping Info',
                  'Returns',
                  'Wholesale',
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <ul className="space-y-3 text-gray-400">
                <li>📍 123 Spice Street, Colombo, Sri Lanka</li>
                <li>📞 +94 77 123 4567</li>
                <li>✉️ hello@paradisespice.com</li>
                <li>🕒 Mon-Fri: 9AM-6PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} ParadiseSpice. All rights reserved.
            </p>
            <p className="mt-2">Designed with ❤️ for spice lovers worldwide</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

export default App;
