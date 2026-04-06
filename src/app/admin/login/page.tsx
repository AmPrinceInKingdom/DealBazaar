"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#fff5f6] py-10">
      <div className="container-custom">
        <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-medium text-[#b11226]">
              Deal Bazaar Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to manage your products
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="dealbazaaradmin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#b11226]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#b11226]"
                required
              />
            </div>

            {errorMessage ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            ) : null}

            <button type="submit" className="btn-primary w-full py-3">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-4 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-[#b11226] hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}