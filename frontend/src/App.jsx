import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PlansPage from "./pages/PlansPage";
import RecipesPage from "./pages/RecipesPage";
import BlogsPage from "./pages/BlogsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Checkout from "./pages/Checkout";
import DeliveryForm from "./pages/DeliveryForm";
import Payments from "./pages/Payments";
import PaymentSuccess from "./components/PaymentSuccess";

const App = () => {
  const centeredWrapper =
    "relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b]";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/delivery-form" element={<DeliveryForm />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/success" element={<PaymentSuccess />} />


        {/* Centered Clerk SignIn */}
        <Route
          path="/sign-in/*"
          element={
            <div className={centeredWrapper}>
              {/* Animated premium background orbs */}
              <div className="pointer-events-none absolute -top-40 -left-32 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
              <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl animate-pulse" />
              <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

              {/* Glassmorphism card for Clerk SignIn */}
              <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl">
                <SignIn routing="path" path="/sign-in" />
              </div>
            </div>
          }
        />

        {/* Centered Clerk SignUp */}
        <Route
          path="/sign-up/*"
          element={
            <div className={centeredWrapper}>
              {/* Animated premium background orbs */}
              <div className="pointer-events-none absolute -top-40 -left-32 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
              <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl animate-pulse" />
              <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

              {/* Glassmorphism card for Clerk SignUp */}
              <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl">
                <SignUp routing="path" path="/sign-up" />
              </div>
            </div>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
