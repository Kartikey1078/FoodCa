import { useEffect, useState, useRef } from "react";

const backendURL = import.meta.env.VITE_API_URL;

export default function SquarePayment() {
  const cardRef = useRef(null); // container ref
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const initializedRef = useRef(false); // prevent double init in React StrictMode

  useEffect(() => {
    async function loadCard() {
      // In React 18 StrictMode, effects run twice in dev.
      // Guard so we only initialize the Square card once.
      if (initializedRef.current) return;
      initializedRef.current = true;

      if (!cardRef.current) return;

      // Initialize Square Payments
      const payments = window.Square.payments(
        import.meta.env.VITE_SQUARE_APP_ID,
        import.meta.env.VITE_SQUARE_LOCATION_ID
      );

      const cardElement = await payments.card();
      await cardElement.attach(cardRef.current);

      setCard(cardElement);
    }

    loadCard();
  }, []); // empty dependency ensures this runs only once

  const handlePay = async () => {
    if (!card) return alert("Card is not ready");

    // Read amount from selectedPlan stored in localStorage
    const selectedPlanRaw = localStorage.getItem("selectedPlan");
    const selectedPlan = selectedPlanRaw ? JSON.parse(selectedPlanRaw) : null;
    const numericAmount =
      Number(selectedPlan?.attributes?.price ?? selectedPlan?.price) || 0;

    if (!numericAmount) {
      alert("Plan price is missing");
      return;
    }

    const amountMinor = Math.round(numericAmount * 100); // convert to cents

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
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Payment Successful!");
      } else {
        alert("Payment Failed: " + (data.message || JSON.stringify(data.error)));
      }
    } catch (err) {
      console.error(err);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "400px" }}>
      <div
        ref={cardRef}
        style={{
          minHeight: 80,
          border: "1px solid #ccc",
          padding: 16,
          borderRadius: 6,
        }}
      ></div>

      <button
        onClick={handlePay}
        disabled={loading || !card}
        style={{
          marginTop: 12,
          padding: "12px 20px",
          background: "#2563EB",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay ₹121"}
      </button>
    </div>
  );
}
