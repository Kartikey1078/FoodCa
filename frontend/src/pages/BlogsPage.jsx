import { useEffect, useState } from "react";
import { Calendar, ArrowRight, Sparkles, Clock, TrendingUp, Eye } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const BlogsPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Scroll hooks for parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const fetchBlogs = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/blogs?page=${pageNum}`);
      
      if (pageNum === 1) {
        setBlogs(res.data.data);
      } else {
        setBlogs((prev) => [...prev, ...res.data.data]);
      }
      setHasMore(res.data.hasMore);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, [API_BASE_URL]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(nextPage);
  };

  // --- Animations ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 18 } 
    },
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 min-h-screen overflow-hidden font-sans selection:bg-emerald-200 selection:text-emerald-900 pb-24">
      
      {/* --- Enhanced Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dot Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: "radial-gradient(#059669 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px"
          }}
        />
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-teal-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-slate-50 via-emerald-50/20 to-transparent" />
      </div>

      <div className="relative z-1 px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
        
        {/* --- Compact Hero Section --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center mb-16 rounded-[40px] py-16 sm:py-20 px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 shadow-2xl"
        >
          {/* Animated Floating Orbs */}
          <motion.div style={{ y: y1 }} className="absolute top-[-15%] left-[-5%] w-72 h-72 bg-emerald-500/20 rounded-full blur-[80px]" />
          <motion.div style={{ y: y2 }} className="absolute bottom-[-15%] right-[-5%] w-80 h-80 bg-teal-400/15 rounded-full blur-[90px]" />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-sm font-semibold mb-5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Latest Insights</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              The Wellness
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mt-1">
                Journal
              </span>
            </h1>

            <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Explore the science of living well. Expert articles on nutrition, movement, and mindful living.
            </p>
          </div>
        </motion.section>

        {/* --- Stats Bar --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-emerald-200/50">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-700">{blogs.length}+ Articles</span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-emerald-200/50">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-700">Expert Verified</span>
            </div>
          </div>
        </motion.div>

        {/* --- Error State --- */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-10"
          >
            <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl border border-red-200 shadow-lg flex items-center gap-2">
              <span>⚠️ {error}</span>
            </div>
          </motion.div>
        )}

        {/* --- Blog Grid --- */}
        {loading && page === 1 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white/60 rounded-3xl h-[420px] animate-pulse shadow-lg border border-slate-200"></div>
            ))}
          </div>
        ) : (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                variants={cardVariants}
                className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-slate-200 hover:shadow-2xl hover:border-emerald-300/60 transition-all duration-500 hover:-translate-y-2"
                onClick={() => navigate(`/blogs/${blog._id}`)}
                whileHover="hover"
              >
                {/* Featured Badge for first 3 */}
                {index < 3 && (
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Featured
                  </div>
                )}

                {/* Image Container */}
                <div className="h-52 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 group-hover:from-black/50 transition-all duration-500" />
                  
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    variants={{
                      hover: { scale: 1.08 }
                    }}
                    transition={{ duration: 0.7 }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 relative flex flex-col">
                  {/* Date & Read Time */}
                  <div className="flex items-center justify-between text-xs font-semibold mb-3 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span className="text-emerald-600">5 min read</span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  <p className="text-slate-600 line-clamp-2 mb-6 text-sm leading-relaxed">
                    {blog.excerpt}
                  </p>

                  {/* Animated Button */}
                  <div className="flex items-center text-emerald-700 font-bold text-sm group-hover:text-emerald-600 transition-colors">
                    <span className="relative">
                      READ MORE
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <motion.span
                      variants={{
                        hover: { x: 4 }
                      }}
                    >
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.section>
        )}

        {/* --- Load More Button --- */}
        {hasMore && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="relative flex items-center gap-2">
                {loading ? "Loading..." : "Load More Articles"}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </motion.div>
        )}

        {/* --- End Message --- */}
        {!hasMore && blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 shadow-lg">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-700 font-semibold text-sm">You've reached the end! 🎉</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;