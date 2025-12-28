import { useEffect, useState } from "react";
import { Clock, Flame, Leaf, Heart } from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ---------------- FETCH RECIPES ---------------- */
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/recipes`);
        setRecipes(res.data);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  /* ---------------- SCROLL TRACK ---------------- */
  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScrollY(currentScroll);
      setScrollProgress((currentScroll / docHeight) * 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hideHero = scrollY > 180;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading recipes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================== SCROLL PROGRESS BAR ================== */}
      <div className="fixed top-0 left-0 z-[60] h-[3px] w-full">
        <div
          className="h-full bg-[#0c3836] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ================== HERO ================== */}
      <div
        className={`
          sticky top-0 z-40 transition-all duration-300 ease-out
          ${hideHero
            ? "-translate-y-full opacity-0 blur-md pointer-events-none"
            : "translate-y-0 opacity-100"}
        `}
      >
        <div className="relative bg-[#0c3836] px-6 py-24 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

          {/* Grain */}
          <div className="absolute inset-0 opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Floating Veggies */}
          <span className="absolute left-10 top-16 animate-float text-4xl">🌿</span>
          <span className="absolute right-16 top-24 animate-float-delayed text-4xl">🥕</span>
          <span className="absolute left-1/4 bottom-20 animate-float-slow text-4xl">🍅</span>
          <span className="absolute right-1/3 bottom-28 animate-float text-4xl">🥦</span>
          <span className="absolute left-1/2 top-10 animate-float-delayed text-4xl">🍋</span>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#145b57]/60 via-transparent to-black/40" />

          <div className="relative max-w-4xl mx-auto">
            <p className="mb-4 text-xs tracking-widest uppercase text-white/70">
              Fresh • Chef-crafted • Subscription Meals
            </p>

            <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-serif leading-tight">
              Meals that feel like <br />
              <span className="italic text-[#e6f4f1]">
                home, warmth & comfort
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-white/80">
              Cooked slowly, portioned thoughtfully — designed to nourish,
              satisfy and quietly wake up your hunger.
            </p>
          </div>
        </div>
      </div>

      {/* ================== RECIPES ================== */}
      <div className="px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto space-y-24">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 rounded-3xl shadow-sm"
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-[420px] object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                  {recipe.title}
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {recipe.description}
                </p>

                <div className="flex gap-6 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-2">
                    <Clock size={16} /> {recipe.cookTime} mins
                  </span>
                  <span className="flex items-center gap-2">
                    <Flame size={16} /> {recipe.calories} kcal
                  </span>
                  {recipe.isVeg && (
                    <span className="flex items-center gap-2 text-green-600">
                      <Leaf size={16} /> Veg
                    </span>
                  )}
                </div>

                {/* INGREDIENTS */}
                <div className="mb-5 rounded-2xl bg-gray-50 p-5">
                  <h3 className="font-medium mb-2">Ingredients</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {recipe.ingredients?.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </div>

                {/* INSTRUCTIONS (HARDCODED) */}
                <div className="mb-6 rounded-2xl bg-[#f7faf9] p-5">
                  <h3 className="font-medium mb-3">Cooking Instructions</h3>

                  <ol className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="font-semibold text-[#0c3836]">1.</span>
                      Heat a pan on medium flame and add a little oil or ghee.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-[#0c3836]">2.</span>
                      Add the prepared ingredients and sauté gently for 2–3 minutes.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-[#0c3836]">3.</span>
                      Add spices or seasoning as per taste and stir well.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-[#0c3836]">4.</span>
                      Cover and cook on low flame until everything is tender.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-[#0c3836]">5.</span>
                      Finish with fresh herbs and serve warm.
                    </li>
                  </ol>
                </div>

                {/* WHY YOU'LL LOVE IT */}
                <div className="rounded-2xl bg-gray-50 p-5">
                  <h3 className="font-medium mb-2">Why You’ll Love It</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {recipe.highlights?.map((h, idx) => (
                      <span key={idx} className="flex items-center gap-2">
                        <Heart size={14} className="text-red-500" /> {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================== FLOAT ANIMATIONS ================== */}
      <style>
        {`
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float 7s ease-in-out infinite 1s; }
          .animate-float-slow { animation: float 9s ease-in-out infinite; }

          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </div>
  );
}
