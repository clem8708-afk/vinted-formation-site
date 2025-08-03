import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";

const stripePromise = loadStripe("pk_test_51Rs2g2CX8MG8wIGVEw87DP5HvHxKhOwYhABknLqWmWBP145mLqDbjQxUrG4naVdX50mqM2zmlh9uDUAO1ZzQqvXx00CroDd8ne"); // Remplace par ta clé publique Stripe

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) alert(result.error.message);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-200 to-purple-400 p-8"
    >
      <h1 className="text-5xl font-bold mb-6 text-white text-center">
        Formation Ultra Complète Achat-Revente sur Vinted
      </h1>
      <p className="mb-8 max-w-xl text-center text-white">
        Apprends à dégager un revenu important en achetant et revendant sur Vinted,
        même sans expérience.
      </p>
      <input
        type="email"
        placeholder="Ton email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 rounded px-4 py-3 w-80 text-gray-800"
      />
      <button
        onClick={handleCheckout}
        disabled={loading || !email}
        className="bg-white text-purple-600 font-bold rounded px-6 py-3 w-80 hover:bg-purple-100 transition disabled:o
