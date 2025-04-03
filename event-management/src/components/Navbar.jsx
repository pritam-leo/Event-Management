import React ,{useState,useEffect}from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Menu, X, PartyPopper } from 'lucide-react';

const Navbar = ({user, setUser}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();




  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5001/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null); // Reset user state
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <PartyPopper className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">EventPro</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/decorating" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
              Decorating
            </Link>
            <Link to="/catering" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
              Catering
            </Link>

            {/* Show User Initial or Login Button */}
            {user ? (
  <div className="relative">
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevents closing when clicking the button itself
        setMenuOpen((prev) => !prev); // Toggle menu open state
        console.log("Toggled menuOpen:", !menuOpen);
      }}
      className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full text-lg font-semibold cursor-pointer"
    >
      {user?.firstName?.charAt(0).toUpperCase()}
    </button>

    {/* Dropdown Menu */}
    {menuOpen && (
      <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-50"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    )}
  </div>
): (
              <Link to="/login" className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md">
                Login
              </Link>
            )}
            
          

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/decorating"
                className="block text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Decorating
              </Link>
              <Link
                to="/catering"
                className="block text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Catering
              </Link>
              <Link
                to="/login"
                className="block text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;