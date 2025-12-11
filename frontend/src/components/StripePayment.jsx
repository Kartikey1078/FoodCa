import React, { useState } from "react";
import axios from "axios";
import AddToCart from "../components/AddToCart";
import ReviewOrderHeader from "../components/ReviewOrderHeader";

const DeliveryForm = () => {
  const [form, setForm] = useState({
    userId: "",
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    couponCode: "",
    deliveryInstruction: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 GET DATA FROM LOCAL STORAGE
    const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));
    const cartItems = JSON.parse(localStorage.getItem("checkout_cart"));
    const amount = Number(localStorage.getItem("checkout_total"));

    console.log("Selected Plan:", selectedPlan);
    console.log("Plan Price:", selectedPlan?.price);
    console.log("Grand Total:", amount);

    if (!selectedPlan || !amount) {
      alert("Plan or Amount missing from cart!");
      return;
    }

    try {
      // 🔥 SAVE DELIVERY DETAILS LOCALLY
      localStorage.setItem("delivery_details", JSON.stringify(form));

      // 🔥 SAVE DELIVERY DETAILS IN DATABASE
      const saveRes = await axios.post(
        "http://localhost:6001/api/deliverydetails",
        form
      );
      console.log("Saved:", saveRes.data);

      // 🔥 CALL STRIPE CHECKOUT
      const stripeRes = await axios.post(
        "http://localhost:6001/api/stripe/create-checkout-session",
        {
          amount,
          planName: selectedPlan.title,
          planPrice: selectedPlan.price,
          cart: cartItems,
          delivery: form,
        }
      );

      // 🔥 OPEN PAYMENT GATEWAY
      window.location.href = stripeRes.data.url;

    } catch (error) {
      alert("Error: " + error.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <>
      <ReviewOrderHeader />

      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-[1.3fr,0.9fr] gap-6">

        {/* LEFT: DELIVERY FORM */}
        <div className="p-6 rounded-2xl shadow-xl bg-white/70 backdrop-blur-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Delivery Details</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* FULL NAME + PHONE NUMBER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-xl"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-xl"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* ADDRESS LINE 1 + ADDRESS LINE 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Address Line 1</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={form.addressLine1}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-xl"
                  placeholder="Street, House No."
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Address Line 2 (optional)</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={form.addressLine2}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-xl"
                  placeholder="Apartment, Landmark"
                />
              </div>
            </div>

            {/* CITY + POSTAL CODE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">City</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-xl bg-white"
                  required
                >
                  <option value="">Select City</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Bengaluru</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                  <option>Pune</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-xl"
                  placeholder="Enter postal code"
                  required
                />
              </div>
            </div>

            {/* COUPON CODE */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Coupon Code (optional)</label>
              <input
                type="text"
                name="couponCode"
                value={form.couponCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 rounded-xl"
                placeholder="Enter coupon code"
              />
            </div>

            {/* DELIVERY INSTRUCTION */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Delivery Instruction</label>
              <select
                name="deliveryInstruction"
                value={form.deliveryInstruction}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 rounded-xl bg-white"
                required
              >
                <option value="">Select Instruction</option>
                <option>Front Door</option>
                <option>Back Door</option>
                <option>Lobby</option>
                <option>Apartment Doorstep</option>
              </select>
            </div>

            {/* TERMS */}
            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={form.acceptTerms}
                onChange={handleChange}
                className="h-5 w-5"
                required
              />
              <label className="text-gray-700 text-sm">I accept the terms & conditions</label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold shadow-md mt-4"
            >
              Continue to Payment
            </button>

          </form>
        </div>

        {/* RIGHT SIDE CART SUMMARY */}
        <div className="lg:mt-0">
          <AddToCart />
        </div>
      </div>
    </>
  );
};

export default DeliveryForm;
