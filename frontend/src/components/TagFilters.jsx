import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://food-ca-xa3o.vercel.app/api/tags";

const TagFilters = ({ onTagSelect }) => {
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("All");

  // Load tags from API
  const loadTags = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) {
        const apiTags = res.data.data.map((tag) => tag.name);
        setTags(["All", ...apiTags]); // Include "All" by default
      }
    } catch (err) {
      console.error("Failed to load tags:", err);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  const handleSelect = (tag) => {
    const newTag = tag === activeTag ? "All" : tag;
    setActiveTag(newTag);
    onTagSelect && onTagSelect(newTag);
  };

  return (
    <div className="z-0 w-full bg-gradient-to-r from-[#f8fcfb] to-[#eef7f6] py-4 px-4 shadow-md sticky top-0 z-20 border-b border-[#d5e7e4]">
      <div className="z-0 flex flex-wrap gap-3 justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleSelect(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
              ${
                activeTag === tag
                  ? "bg-[#0a413a] text-white shadow-xl shadow-[#0a413a40]"
                  : "bg-white text-[#0a413a] border border-[#d2e5e1] shadow-sm hover:shadow-md hover:bg-[#f2faf9]"
              }
            `}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilters;
