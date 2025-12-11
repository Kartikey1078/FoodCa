import React, { useState, useEffect } from "react";
import axios from "axios";

// ENV BASE URL
const API_BASE = `${import.meta.env.VITE_API_URL}/plans`;

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    tag: "",
    borderColor: "border-[#0a413a]",
    numberOfMeals: "",
    extraMealPrice: "",
    features: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch Plans
  const fetchPlans = async () => {
    try {
      const res = await axios.get(API_BASE);
      setPlans(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Input Handler
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Create / Update
  const handleSubmit = async () => {
    const planData = {
      title: formData.title,
      price: Number(formData.price),
      tag: formData.tag || null,
      borderColor: formData.borderColor,
      numberOfMeals: Number(formData.numberOfMeals),
      extraMealPrice: Number(formData.extraMealPrice),
      features: formData.features.split(",").map((f) => f.trim()),
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/${editingId}`, planData);
      } else {
        await axios.post(API_BASE, planData);
      }

      fetchPlans();
      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // Delete
  const deletePlan = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchPlans();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Edit
  const editPlan = (plan) => {
    setEditingId(plan._id);

    setFormData({
      title: plan.title,
      price: plan.price,
      tag: plan.tag || "",
      borderColor: plan.borderColor,
      numberOfMeals: plan.numberOfMeals,
      extraMealPrice: plan.extraMealPrice || "",
      features: plan.features.join(", "),
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      tag: "",
      borderColor: "border-[#0a413a]",
      numberOfMeals: "",
      extraMealPrice: "",
      features: "",
    });
    setEditingId(null);
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* TITLE */}
      <h2 className="text-4xl font-extrabold text-[#0a413a] mb-10 tracking-tight">
        {editingId ? "Update Plan" : "Create a New Plan"}
      </h2>

      {/* FORM CONTAINER */}
      <div className="bg-white/90 backdrop-blur shadow-2xl rounded-3xl p-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* INPUTS */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Plan Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Premium Plan"
              className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:ring-2 focus:ring-[#0a413a] focus:border-[#0a413a] shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 49"
              className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:ring-2 focus:ring-[#0a413a] focus:border-[#0a413a] shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Tag</label>
            <input
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="e.g. POPULAR"
              className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:ring-2 focus:ring-[#0a413a] focus:border-[#0a413a] shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Meals Included</label>
            <input
              name="numberOfMeals"
              type="number"
              value={formData.numberOfMeals}
              onChange={handleChange}
              placeholder="e.g. 12 meals"
              className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:ring-2 focus:ring-[#0a413a] focus:border-[#0a413a] shadow-sm"
            />
          </div>

          {/* EXTRA MEAL PRICE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Extra Meal Price</label>
            <input
              name="extraMealPrice"
              type="number"
              value={formData.extraMealPrice}
              onChange={handleChange}
              placeholder="e.g. 30"
              className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:ring-2 focus:ring-[#0a413a] focus:border-[#0a413a] shadow-sm"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Features</label>
            <input
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="e.g. Free delivery, Fresh meals..."
              className="border border-gray-300 rounded-xl px-4 py-2.5 w-full focus:ring-2 focus:ring-[#0a413a] focus:border-[#0a413a] shadow-sm"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSubmit}
            className="bg-[#0a413a] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-[#08332d] active:scale-[0.98] transition"
          >
            {editingId ? "Update Plan" : "Create Plan"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl font-semibold shadow hover:bg-gray-300 active:scale-[0.98] transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* PLANS LIST */}
      <h3 className="text-3xl font-semibold mt-12 mb-6 text-[#0a413a]">Existing Plans</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="relative bg-white shadow-xl rounded-2xl border border-gray-200 p-6 transition hover:shadow-2xl hover:-translate-y-1"
          >
            {plan.tag && (
              <span className="absolute right-4 top-4 bg-[#0a413a] text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow">
                {plan.tag}
              </span>
            )}

            <h4 className="text-xl font-bold text-gray-800">{plan.title}</h4>

            <p className="text-3xl font-bold text-[#0a413a] mt-3">
              ${plan.price}
              <span className="text-sm text-gray-500"> / month</span>
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {plan.numberOfMeals} meals included
            </p>

            {/* EXTRA MEAL PRICE DISPLAY */}
            {plan.extraMealPrice > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                Extra meal: ${plan.extraMealPrice}
              </p>
            )}

            <ul className="mt-4 space-y-1.5">
              {plan.features.map((f, i) => (
                <li key={i} className="text-gray-700 text-sm flex items-center gap-2">
                  <span className="text-[#0a413a] text-lg">•</span> {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => editPlan(plan)}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 active:scale-[0.98]"
              >
                Edit
              </button>

              <button
                onClick={() => deletePlan(plan._id)}
                className="px-4 py-1.5 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 active:scale-[0.98]"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;
