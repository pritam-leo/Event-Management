import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Mail, Phone, Clock, MapPin } from 'lucide-react';


const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const bookingDetails = location.state;

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    date: '',
    time: '',
    venue: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const bookingData = {
      ...formData,
      packageName: bookingDetails.package.name,
      packageDetails: bookingDetails.package.details,
      packagePrice: bookingDetails.package.price,
      category: bookingDetails.category,
    };
  
    try {
      const response = await fetch('https://backend-my-event-management.vercel.app/api/users/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Booking submitted successfully!');
        navigate('/'); 
      } else {
        alert(`Failed to submit booking: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">No package selected</h2>
          <p className="mt-2 text-gray-600">Please select a package first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="mt-2 text-gray-600">
              You're booking the {bookingDetails.package.name} for {bookingDetails.category}
            </p>
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <p className="text-purple-700 font-semibold">Package Details:</p>
              <p className="text-purple-600">{bookingDetails.package.details}</p>
              <p className="mt-2 text-purple-700 font-semibold">Price: ${bookingDetails.package.price}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Event Date
                </label>
                <div className="mt-1 relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Event Time
                </label>
                <div className="mt-1 relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                Venue Address
              </label>
              <div className="mt-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
                Special Requests
              </label>
              <div className="mt-1">
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={4}
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Any special requirements or requests..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
