import React, { useState } from 'react';
import { Utensils, Users, Clock, ChefHat, Check, Star, DollarSign, Heart, X } from 'lucide-react';

const Catering = () => {
  const [selectedPackage, setSelectedPackage] = useState(null); // Fixed initialization
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const handlePackageSelect = (categoryTitle, pkg) => {
    setSelectedPackage({ category: categoryTitle, package: pkg });
  };

  const handleBookNow = () => {
    if (selectedPackage) {
      setShowBookingSuccess(true);
      setTimeout(() => {
        setShowBookingSuccess(false);
        setSelectedPackage(null);
      }, 3000);
    }
  };

  const menuCategories = [
    {
      image: "https://images.unsplash.com/photo-1555244162-803834f70033",
      title: "Corporate Catering",
      description: "Professional catering for business events and meetings",
      features: [
        "Customized corporate menus",
        "Professional service staff",
        "Flexible delivery times",
        "Corporate billing options",
        "Last-minute ordering available",
        "Eco-friendly packaging"
      ],
      pricing: [
        { name: "Basic Package", price: "25", details: "per person (min. 20 people)" },
        { name: "Premium Package", price: "45", details: "per person (min. 15 people)" },
        { name: "Executive Package", price: "75", details: "per person (min. 10 people)" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826",
      title: "Wedding Catering",
      description: "Elegant dining experiences for your special day",
      features: [
        "Personalized menu planning",
        "Full-service staff",
        "Custom cake design",
        "Bar service available",
        "Table settings and linens",
        "Tasting sessions included"
      ],
      pricing: [
        { name: "Silver Package", price: "85", details: "per person (min. 50 people)" },
        { name: "Gold Package", price: "125", details: "per person (min. 40 people)" },
        { name: "Platinum Package", price: "175", details: "per person (min. 30 people)" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b",
      title: "Private Events",
      description: "Customized menus for intimate gatherings",
      features: [
        "Flexible menu options",
        "Personal chef service",
        "Theme-based menus",
        "Dietary accommodations",
        "Setup and cleanup",
        "Custom plating options"
      ],
      pricing: [
        { name: "Intimate Gathering", price: "55", details: "per person (min. 10 people)" },
        { name: "Celebration Package", price: "95", details: "per person (min. 15 people)" },
        { name: "Luxury Experience", price: "150", details: "per person (min. 8 people)" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showBookingSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
          <div className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span>Booking successful! We'll contact you soon.</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80")'
        }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Professional Catering Services</h1>
            <p className="text-xl">Exquisite cuisine for your memorable events</p>
          </div>
        </div>
      </div>

      {/* Menu Categories with Enhanced Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Catering Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                
                {/* Features */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-lg mb-2">Features</h4>
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-lg mb-2">Pricing Packages</h4>
                  {category.pricing.map((pkg, idx) => (
                    <div 
                      key={idx} 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPackage?.category === category.title && 
                        selectedPackage?.package.name === pkg.name
                          ? 'border-purple-500 bg-purple-50'
                          : 'hover:border-purple-500'
                      }`}
                      onClick={() => handlePackageSelect(category.title, pkg)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">{pkg.name}</span>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-purple-600" />
                          <span className="text-xl font-bold text-purple-600">{pkg.price}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{pkg.details}</p>
                    </div>
                  ))}
                </div>

                <button 
                  className={`w-full py-2 px-4 rounded-md transition duration-300 ${
                    selectedPackage?.category === category.title
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleBookNow}
                  disabled={selectedPackage?.category !== category.title}
                >
                  {selectedPackage?.category === category.title ? 'Book Now' : 'Select a Package'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Catering</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <ChefHat className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Expert Chefs</h3>
              <p className="text-gray-600">Professional culinary team</p>
            </div>
            <div className="text-center">
              <Utensils className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Custom Menus</h3>
              <p className="text-gray-600">Tailored to your preferences</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Any Size Event</h3>
              <p className="text-gray-600">From intimate to large gatherings</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Punctual Service</h3>
              <p className="text-gray-600">Always on time, every time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Preview */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Sample Menu Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Appetizers</h3>
            <ul className="space-y-2">
              <li>Bruschetta with Fresh Tomatoes</li>
              <li>Mini Crab Cakes</li>
              <li>Stuffed Mushrooms</li>
              <li>Shrimp Cocktail</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Main Courses</h3>
            <ul className="space-y-2">
              <li>Grilled Salmon with Herbs</li>
              <li>Beef Tenderloin</li>
              <li>Chicken Marsala</li>
              <li>Vegetable Lasagna</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Desserts</h3>
            <ul className="space-y-2">
              <li>Chocolate Mousse</li>
              <li>Tiramisu</li>
              <li>Fresh Fruit Tart</li>
              <li>Cheesecake Bites</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Menu?</h2>
          <p className="text-xl mb-8">Contact us for a customized catering quote</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100">
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catering;