import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Palette, Award, Clock, Check, DollarSign } from 'lucide-react';

const Decorating = () => {
  
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePackageSelect = (categoryTitle, pkg) => {
    setSelectedPackage({ category: categoryTitle, package: pkg });
  };

  const handleBookNow = () => {
    if (selectedPackage) {
      navigate('/booking', { state: selectedPackage });
    }
  };

  const decorationStyles = [
    {
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      title: "Wedding Decorations",
      description: "Transform your special day into a magical experience",
      features: [
        "Custom floral arrangements",
        "Elegant table settings",
        "Backdrop and arch design",
        "Lighting installation",
        "Aisle decorations",
        "Chair and table dressing"
      ],
      pricing: [
        { name: "Classic Package", price: "2,500", details: "Basic wedding setup (up to 100 guests)" },
        { name: "Elegant Package", price: "4,500", details: "Premium decorations (up to 150 guests)" },
        { name: "Luxury Package", price: "7,500", details: "Full-service design (up to 200 guests)" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      title: "Corporate Events",
      description: "Professional and elegant settings for business events",
      features: [
        "Brand-aligned designs",
        "Stage and podium setup",
        "Digital displays",
        "Seating arrangements",
        "Registration area",
        "Networking spaces"
      ],
      pricing: [
        { name: "Standard Setup", price: "1,500", details: "Basic corporate decor (up to 50 people)" },
        { name: "Professional Package", price: "3,000", details: "Enhanced setup (up to 100 people)" },
        { name: "Executive Package", price: "5,000", details: "Premium design (up to 200 people)" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d",
      title: "Birthday Parties",
      description: "Colorful and themed decorations for all ages",
      features: [
        "Theme customization",
        "Balloon arrangements",
        "Photo booth setup",
        "Party favors",
        "Cake table design",
        "Activity stations"
      ],
      pricing: [
        { name: "Fun Package", price: "500", details: "Basic party setup (up to 20 guests)" },
        { name: "Deluxe Package", price: "1,000", details: "Enhanced decor (up to 40 guests)" },
        { name: "Ultimate Package", price: "2,000", details: "Premium experience (up to 60 guests)" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80")'
        }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Event Decoration Services</h1>
            <p className="text-xl">Creating stunning environments for your special occasions</p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Decoration Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {decorationStyles.map((style, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={style.image} 
                alt={style.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{style.title}</h3>
                <p className="text-gray-600 mb-6">{style.description}</p>
                
                {/* Features */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-lg mb-2">Features</h4>
                  {style.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-lg mb-2">Pricing Packages</h4>
                  {style.pricing.map((pkg, idx) => (
                    <div 
                      key={idx} 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPackage?.category === style.title && 
                        selectedPackage?.package.name === pkg.name
                          ? 'border-purple-500 bg-purple-50'
                          : 'hover:border-purple-500'
                      }`}
                      onClick={() => handlePackageSelect(style.title, pkg)}
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
                    selectedPackage?.category === style.title
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleBookNow}
                  disabled={selectedPackage?.category !== style.title}
                >
                  {selectedPackage?.category === style.title ? 'Book Now' : 'Select a Package'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Decoration Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Book your preferred date and time</p>
            </div>
            <div className="text-center">
              <Palette className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Custom Themes</h3>
              <p className="text-gray-600">Personalized decoration themes</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Top-quality materials and designs</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">On-Time Setup</h3>
              <p className="text-gray-600">Punctual and efficient service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Event?</h2>
          <p className="text-xl mb-8">Contact us for a free consultation and quote</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Decorating;
