import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isCheckoutPage = location.pathname.startsWith("/checkout");

  const { cartCount, scrollToCart } = useCart();
 
  const links = [
    { to: "/", icon: "/home.svg", label: "Home", end: true },
    { to: "/plans", icon: "/money-wings 1.svg", label: "Plans" },
    { to: "/recipes", icon: "/salad 1.svg", label: "Recipes" },
    { to: "/blogs", icon: "/Blogs.svg", label: "Blogs" },
  ];

  const getLinkClasses = ({ isActive }) =>
    `flex flex-col items-center ${isActive ? "text-BM_Green" : "text-gray-600"}`;

  const handleCartClick = () => {
    // If not on checkout page, navigate to checkout
    if (!isCheckoutPage) {
      navigate("/checkout");
    } else {
      // If already on checkout page, scroll to cart
      scrollToCart();
    }
    setMenuOpen(false);
  };

  const CartIndicator = ({ className = "" }) => (
    <button
      type="button"
      onClick={handleCartClick}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-BM_Green transition ${className}`}
      aria-label="View cart"
    >
      <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l1.6 9M9 21h6"
        />
      </svg>

      { 
      cartCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] px-1 py-0.5 text-[11px] font-bold text-white bg-BM_Green rounded-full">
          {cartCount}
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-4 py-4 bg-white shadow-md sticky top-0 z-10">
        
        {/* Logo (Left Side) */}
        <Link to="/">
          <img
            src="/logo/BalancedMealLogo.png"
            alt="Logo"
            className="w-auto h-[40px]"
          />
        </Link>

        {/* Spacer */}
        <div className="flex-1 md:flex hidden" />

        {/* Desktop Links (Centered) */}
        <div className="hidden md:flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={getLinkClasses}>
              <img src={link.icon} alt={link.label} className="w-5 h-5 mb-1" />
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side - Clerk User */}
        <div className="hidden md:flex items-center space-x-4">
          <CartIndicator />
          {/* Show user button when signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* Show Sign In button when signed out */}
          <SignedOut>
            <Link
              to="/sign-in"
              className="text-sm px-4 py-2 bg-BM_Green text-white rounded-full"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <CartIndicator />
          <button onClick={() => setMenuOpen(!menuOpen)}>
          <img src="/menu.svg" className="w-6 h-6" alt="menu" />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md py-4">
          <ul className="flex flex-col items-center space-y-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={getLinkClasses}
                onClick={() => setMenuOpen(false)}
              >
                <img src={link.icon} className="w-5 h-5 mb-1" alt={link.label} />
                {link.label}
              </NavLink>
            ))}

            {/* Mobile Clerk options */}
            <li>
              <CartIndicator className="w-12 h-12" />
            </li>
            <li>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
            <li>
              <SignedOut>
                <Link
                  to="/sign-in"
                  className="text-sm px-4 py-2 bg-BM_Green text-white rounded-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              </SignedOut>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t py-3 flex justify-around z-50">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-BM_Green" : "text-gray-600"}`
            }
          >
            <img src={link.icon} className="w-5 h-5 mb-1" alt={link.label} />
            <span className="text-xs">{link.label}</span>
          </NavLink>
        ))}

        <CartIndicator />

        {/* Mobile user button */}
        <div className="flex flex-col items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in" className="text-xs text-BM_Green">
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
    </>
  );
};

export default Navbar;
