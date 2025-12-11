import React, { useState } from "react";
import axios from "axios";

const Payments = () => {
  const [form, setForm] = useState({ name: "", amount: "" });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle payment button click
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const amountNum = Number(form.amount);

      if (amountNum < 1) {
        alert("Minimum payment is CAD 1");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/stripe/create-checkout-session`,
        {
          name: form.name,
          amount: amountNum,
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Payment request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Pay with Stripe (CAD)
        </h2>

        <form onSubmit={handlePayment} className="space-y-4">
          {/* Name Field */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full p-2 border rounded"
          />

          {/* Amount Field */}
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            placeholder="Amount (CAD)"
            type="number"
            min="1"
            className="w-full p-2 border rounded"
          />

          {/* Pay Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {/* Stripe Secure Payment Text */}
        <p className="text-xs text-gray-500 text-center mt-3">
          Secure payment powered by Stripe
        </p>

        {/* Stripe Badge */}
        <div className="flex justify-center mt-2">
          <img
            src="https://storage.googleapis.com/stripe-sample-images/logo-dark.png"
            alt="Stripe Logo"
            className="w-20 opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Payments;
