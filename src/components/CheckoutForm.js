// /components/CheckoutForm.js
"use client";

import { useState } from "react";

export default function CheckoutForm({ amount }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Payment initialization failed");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 flex items-center justify-center min-h-screen">
      <div className="w-full">
        {/* Optional: Add order summary or product details here */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 text-black">
            Order Summary
          </h2>
          <p className="text-gray-600">Total: ${amount}</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}
