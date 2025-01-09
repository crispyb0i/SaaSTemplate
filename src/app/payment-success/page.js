// /app/payment-success/page.js (Frontend)
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [isValidPayment, setIsValidPayment] = useState(null);

  useEffect(() => {
    if (!session_id) {
      router.push("/");
      return;
    }

    const validatePayment = async () => {
      try {
        const res = await fetch(
          `/api/validate-session?session_id=${session_id}`
        );
        const data = await res.json();

        if (!data.isValidPayment) {
          router.push("/");
        } else {
          setIsValidPayment(true);
        }
      } catch (error) {
        console.error("Error validating payment:", error);
        router.push("/");
      }
    };

    validatePayment();
  }, [session_id, router]);

  if (isValidPayment === null) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mt-4">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
