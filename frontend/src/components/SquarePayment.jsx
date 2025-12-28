import { useEffect, useState, useRef } from "react";
import { CHECKOUT_TOTAL_UPDATED_EVENT } from "../utils/cartStorage";
const backendURL = import.meta.env.VITE_API_URL;

export default function SquarePayment({ formData, onValidationErrors,onPaymentSuccess }) {
  const cardRef = useRef(null);
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0); // ✅ dynamic checkout total
  const [errors, setErrors] = useState({});
  const initializedRef = useRef(false);

  // -------------------- INIT SQUARE CARD --------------------
  useEffect(() => {
    async function loadCard() {
      if (initializedRef.current) return;
      initializedRef.current = true;

      if (!cardRef.current) return;

      const payments = window.Square.payments(
        import.meta.env.VITE_SQUARE_APP_ID,
        import.meta.env.VITE_SQUARE_LOCATION_ID
      );

      const cardElement = await payments.card();
      await cardElement.attach(cardRef.current);

      setCard(cardElement);
    }

    loadCard();
  }, []);

  // -------------------- READ checkout_total --------------------
  useEffect(() => {
    const updateAmount = () => {
      const storedTotal = localStorage.getItem("checkout_total");
      setAmount(storedTotal ? Number(storedTotal) : 0);
    };

    // Handle custom event for same-tab updates
    const handleCheckoutTotalUpdate = (event) => {
      const newTotal = event.detail?.total ?? 0;
      setAmount(newTotal);
    };

    updateAmount(); // initial load
    
    // Listen to storage event (for cross-tab updates)
    window.addEventListener("storage", updateAmount);
    
    // Listen to custom event (for same-tab updates)
    window.addEventListener(CHECKOUT_TOTAL_UPDATED_EVENT, handleCheckoutTotalUpdate);

    return () => {
      window.removeEventListener("storage", updateAmount);
      window.removeEventListener(CHECKOUT_TOTAL_UPDATED_EVENT, handleCheckoutTotalUpdate);
    };
  }, []);

  // -------------------- VALIDATE FORM --------------------
  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName || formData.fullName.trim() === "") {
      newErrors.fullName = "Full name is required";
    }

    if (!formData?.phoneNumber || formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData?.addressLine1 || formData.addressLine1.trim() === "") {
      newErrors.addressLine1 = "Address line 1 is required";
    }

    if (!formData?.city || formData.city.trim() === "") {
      newErrors.city = "City is required";
    }

    if (!formData?.postalCode || formData.postalCode.trim() === "") {
      newErrors.postalCode = "Postal code is required";
    }

    if (!formData?.deliveryInstruction || formData.deliveryInstruction.trim() === "") {
      newErrors.deliveryInstruction = "Delivery instruction is required";
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms & conditions";
    }

    setErrors(newErrors);
    // Notify parent component of validation errors (empty object if valid)
    if (onValidationErrors) {
      onValidationErrors(newErrors);
    }
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  // -------------------- COLLECT ORDER DATA FROM LOCALSTORAGE --------------------
  const collectOrderData = () => {
    try {
      // Get delivery details
      const deliveryDetails = JSON.parse(
        localStorage.getItem("delivery_details") || "{}"
      );

      // Get cart items (checkout_cart or foodapp_cart)
      const cartItems = JSON.parse(
        localStorage.getItem("checkout_cart") ||
        localStorage.getItem("foodapp_cart") ||
        "[]"
      );

      // Get selected plan
      const selectedPlan = JSON.parse(
        localStorage.getItem("selectedPlan") || "{}"
      );

      // Get checkout total
      const checkoutTotal = Number(
        localStorage.getItem("checkout_total") || 0
      );

      // Calculate order details
      const totalMeals = cartItems.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      );

      const planInfo = {
        title: selectedPlan?.attributes?.plan_title || selectedPlan?.title || "",
        minMeals: Number(
          selectedPlan?.attributes?.minimum_meal_count ||
          selectedPlan?.numberOfMeals ||
          0
        ),
        price: Number(
          selectedPlan?.attributes?.price || selectedPlan?.price || 0
        ),
        extraMealPrice: Number(
          selectedPlan?.attributes?.extra_meal_price ||
          selectedPlan?.extraMealPrice ||
          0
        ),
      };

      const effectiveExtraMealPrice =
        totalMeals >= 10 ? 11.9 : planInfo.extraMealPrice;
      const extraMeals =
        totalMeals > planInfo.minMeals ? totalMeals - planInfo.minMeals : 0;
      const extraMealCost = extraMeals * effectiveExtraMealPrice;
      const planPrice = planInfo.price;

      return {
        // Delivery details
        fullName: formData?.fullName || deliveryDetails?.fullName || "",
        phoneNumber: formData?.phoneNumber || deliveryDetails?.phoneNumber || "",
        addressLine1: formData?.addressLine1 || deliveryDetails?.addressLine1 || "",
        addressLine2: formData?.addressLine2 || deliveryDetails?.addressLine2 || "",
        city: formData?.city || deliveryDetails?.city || "",
        postalCode: formData?.postalCode || deliveryDetails?.postalCode || "",
        couponCode: formData?.couponCode || deliveryDetails?.couponCode || "",
        deliveryInstruction:
          formData?.deliveryInstruction ||
          deliveryDetails?.deliveryInstruction ||
          "",
        // Order details
        cartItems,
        planInfo,
        totalMeals,
        extraMeals,
        extraMealCost,
        planPrice,
        grandTotal: checkoutTotal || planPrice + extraMealCost,
      };
    } catch (error) {
      console.error("Error collecting order data:", error);
      return null;
    }
  };

  // -------------------- HANDLE PAYMENT --------------------
  const handlePay = async () => {
    // Validate form first
    const validation = validateForm();
    if (!validation.isValid) {
      // Scroll to first error field
      const firstErrorField = Object.keys(validation.errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    if (!card) {
      alert("Card is not ready");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Checkout total is missing");
      return;
    }

    // Collect all order data from localStorage
    const orderData = collectOrderData();
    if (!orderData) {
      alert("Error collecting order data. Please try again.");
      return;
    }

    const amountMinor = Math.round(amount * 100); // cents / paise

    setLoading(true);

    try {
      const tokenResult = await card.tokenize();

      if (tokenResult.status !== "OK") {
        alert("Tokenization failed");
        setLoading(false);
        return;
      }

      const res = await fetch(`${backendURL}/square/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: tokenResult.token,
          amount: amountMinor,
          orderData, // Send all order data
        }),
      });

      const data = await res.json();

      if (data.success) {
        // alert("Payment Successful!");
        // Clear localStorage after successful payment
        localStorage.removeItem("checkout_cart");
        localStorage.removeItem("checkout_total");
        localStorage.removeItem("delivery_details");
        localStorage.removeItem("foodapp_cart");
        // Optionally clear selectedPlan if needed
        // localStorage.removeItem("selectedPlan");
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      } else {
        alert(
          "Payment Failed: " +
            (data.message || JSON.stringify(data.error))
        );
      }
    } catch (err) {
      console.error(err);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- UI --------------------
  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      {/* Error Messages */}
      {Object.keys(errors).length > 0 && (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            borderRadius: 8,
            color: "#991B1B",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
            Please fill in the following fields:
          </div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
            {Object.entries(errors).map(([field, message]) => (
              <li key={field} style={{ marginBottom: 4 }}>
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        ref={cardRef}
        style={{
          minHeight: 80,
          border: "1px solid #ccc",
          padding: 16,
          borderRadius: 6,
        }}
      />

      <button
        onClick={handlePay}
        disabled={loading || !card || amount <= 0}
        style={{
          marginTop: 12,
          width: "100%",
          padding: "12px 20px",
          background: "#2563EB",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: loading || amount <= 0 ? "not-allowed" : "pointer",
          opacity: loading || amount <= 0 ? 0.6 : 1,
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {loading ? "Processing..." : `Pay ₹${amount.toFixed(2)}`}
      </button>
    </div>
  );
}
