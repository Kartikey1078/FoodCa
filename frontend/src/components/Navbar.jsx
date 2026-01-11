import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isCheckoutPage = location.pathname.startsWith("/checkout");
  const { cartCount, scrollToCart } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const links = [
    { to: "/", icon: "/home.svg", label: "Home", end: true },
    { to: "/plans", icon: "/money-wings 1.svg", label: "Plans" },
    { to: "/RecipePage", icon: "/salad 1.svg", label: "Recipes" },
    { to: "/blogs", icon: "/Blogs.svg", label: "Blogs" },
  ];

  const handleCartClick = () => {
    if (!isCheckoutPage) {
      navigate("/checkout");
    } else {
      scrollToCart();
    }
    setMenuOpen(false);
  };

  const CartIndicator = ({ className = "", showLabel = false }) => (
    <button
      type="button"
      onClick={handleCartClick}
      className={`relative group ${className}`}
      aria-label="View cart"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-BM_Green/5 hover:border-BM_Green transition-all duration-300">
        <svg
          className="w-5 h-5 text-gray-700 group-hover:text-BM_Green transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l1.6 9M9 21h6"
          />
        </svg>
      </div>
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[11px] font-bold text-white bg-BM_Green rounded-full shadow-md animate-in zoom-in-50 duration-200">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
      {showLabel && <span className="text-xs mt-1">Cart</span>}
    </button>
  );

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-lg py-3" : "shadow-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <img
                src="/logo/BalancedMealLogo.png"
                alt="Balanced Meal"
                className={`transition-all duration-300 ${
                  scrolled ? "h-9" : "h-10"
                } group-hover:scale-105`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-BM_Green/10 text-BM_Green"
                        : "text-gray-700 hover:bg-gray-100 hover:text-BM_Green"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <img
                        src={link.icon}
                        alt=""
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isActive ? "scale-110" : ""
                        }`}
                      />
                      <span className="font-medium text-sm">{link.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-3">
              <CartIndicator />
              <SignedIn>
                <div className="flex items-center gap-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <SignedOut>
                <Link
                  to="/sign-in"
                  className="px-5 py-2 bg-BM_Green text-white rounded-full font-medium text-sm hover:bg-BM_Green/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>

            {/* Mobile Right Section */}
            <div className="flex lg:hidden items-center gap-3">
              <CartIndicator />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                      menuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                      menuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                      menuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content jump */}
      <div className={scrolled ? "h-[60px]" : "h-[68px]"} />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <img
              src="/logo/BalancedMealLogo.png"
              alt="Balanced Meal"
              className="h-8"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {links.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-BM_Green/10 text-BM_Green"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img src={link.icon} alt="" className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t space-y-3">
            <SignedIn>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <UserButton afterSignOutUrl="/" />
                <span className="text-sm text-gray-600">My Account</span>
              </div>
            </SignedIn>
            <SignedOut>
              <Link
                to="/sign-in"
                className="block w-full px-4 py-3 bg-BM_Green text-white rounded-xl font-medium text-center hover:bg-BM_Green/90 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive ? "text-BM_Green" : "text-gray-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`transition-transform duration-200 ${
                      isActive ? "scale-110" : ""
                    }`}
                  >
                    <img src={link.icon} alt="" className="w-6 h-6 mb-1" />
                  </div>
                  <span className="text-[10px] font-medium">{link.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-BM_Green rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <div className="flex flex-col items-center justify-center min-w-[60px]">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <span className="text-[10px] font-medium text-gray-500 mt-1">
                Account
              </span>
            </SignedIn>
            <SignedOut>
              <Link
                to="/sign-in"
                className="flex flex-col items-center py-2 px-3"
              >
                <div className="w-6 h-6 mb-1 rounded-full bg-BM_Green/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-BM_Green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-BM_Green">
                  Sign In
                </span>
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Bottom navigation spacer for mobile */}
      <div className="lg:hidden h-[25px]" />
    </>
  );
};

export default Navbar;