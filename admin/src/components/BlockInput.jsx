import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const BlockInput = ({ label, placeholder, values = [], onAdd, onRemove }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  return (
    <div className="space-y-2">
      <label className="label">{label}</label>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="input-field flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-3 rounded-lg"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {values.map((item, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 bg-gray-100 border px-3 py-1 rounded-full text-sm"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlockInput;
