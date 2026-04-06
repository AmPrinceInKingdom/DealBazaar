import Link from "next/link";
import { Flame, Truck, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-red-100 bg-[linear-gradient(180deg,#fff1f3_0%,#ffffff_70%)]">
      <div className="container-custom py-12 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b11226] shadow-sm">
              <Flame size={14} />
              Trending Product Deals
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
              Discover stylish products
              <span className="block text-[#b11226]">and order directly</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
              Deal Bazaar helps you showcase trending products in a clean,
              modern way. Customers can open a product page and contact you
              directly through WhatsApp, Instagram, TikTok, or Facebook.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#products" className="btn-primary min-w-[180px]">
                Shop Now
              </Link>

              <Link
                href="#products"
                className="inline-flex min-w-[180px] items-center justify-center rounded-2xl border border-red-200 bg-white px-5 py-3 font-semibold text-[#b11226] transition hover:bg-[#fff1f3]"
              >
                Featured Deals
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff1f3] text-[#b11226]">
                  <Truck size={18} />
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  Worldwide Shipping
                </p>
                <p className="mt-1 text-xs leading-6 text-gray-500">
                  Fast product showcase for global buyers.
                </p>
              </div>

              <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff1f3] text-[#b11226]">
                  <ShieldCheck size={18} />
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  Simple Ordering
                </p>
                <p className="mt-1 text-xs leading-6 text-gray-500">
                  Buyers contact you directly without a complex checkout.
                </p>
              </div>

              <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff1f3] text-[#b11226]">
                  <Flame size={18} />
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  Social Traffic Ready
                </p>
                <p className="mt-1 text-xs leading-6 text-gray-500">
                  Built for TikTok, Instagram, and Facebook promotion.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="card relative overflow-hidden p-4 md:p-6">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-red-100 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-red-50 blur-3xl" />

              <div className="relative grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
                    alt="Wireless earbuds"
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-900">
                      Wireless Earbuds
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#b11226]">
                      $19.99
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80"
                    alt="Smart watch"
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-900">
                      Smart Watch
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#b11226]">
                      $29.99
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm sm:col-span-2">
                  <div className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b11226]">
                        Deal Bazaar
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-gray-900">
                        Clean product showcase for fast social selling
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        Share product links and let customers contact you
                        directly.
                      </p>
                    </div>

                    <div className="hidden rounded-2xl bg-[#b11226] px-4 py-3 text-sm font-bold text-white md:block">
                      Shop Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}