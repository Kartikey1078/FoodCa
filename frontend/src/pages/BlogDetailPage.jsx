import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/blogs/${id}`);
        setBlog(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, API_BASE_URL]);

  if (loading) return <p className="text-center mt-20">Loading blog...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!blog) return null;

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-green-700 font-semibold hover:underline"
      >
        &larr; Back to Blogs
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-8">
          {blog.category && (
            <span className="text-sm text-green-700 font-semibold mb-2 inline-block">
              {blog.category}
            </span>
          )}
          <h1 className="text-3xl font-jakarta font-extrabold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center text-gray-400 text-sm mb-6">
            <span>{new Date(blog.date).toLocaleDateString()}</span>
            {blog.tags?.length > 0 && (
              <span className="ml-4">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-green-700 font-semibold mr-2"
                  >
                    #{tag}
                  </span>
                ))}
              </span>
            )}
          </div>
          <p className="text-gray-700 font-inter whitespace-pre-line">
            {blog.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
