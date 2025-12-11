import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { CartProvider } from "./context/CartContext.jsx";
import { PlanProvider } from "./context/PlanContext.jsx";

 // Import your Publishable Key
 const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

 if (!PUBLISHABLE_KEY) {
   throw new Error('Add your Clerk Publishable Key to the .env file')
 }

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <PlanProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </PlanProvider>
    </ClerkProvider>
  </BrowserRouter>
);
