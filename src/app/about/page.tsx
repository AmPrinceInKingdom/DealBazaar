import Link from "next/link";
import { Globe, Package, Smartphone } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="container-custom py-8 md:py-10">
      <section className="rounded-[24px] border border-red-100 bg-[#fff7f8] p-5 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b11226]">
          About Deal Bazaar
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Simple social-commerce product showcase
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
          Deal Bazaar is a simple modern product showcase website built to
          promote products through TikTok, Instagram, Facebook, and direct
          messaging. Customers can view product details and contact the seller
          directly to order.
        </p>
      </section>

      <section className="grid gap-6 py-8 md:grid-cols-3">
        <div className="card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f3] text-[#b11226]">
            <Smartphone size={22} />
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Social Media Ready
          </h2>
          <p className="mt-2 text-sm leading-7 text-gray-500">
            Built to bring traffic from TikTok, Instagram, and Facebook directly
            into product pages.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f3] text-[#b11226]">
            <Package size={22} />
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Product Focused
          </h2>
          <p className="mt-2 text-sm leading-7 text-gray-500">
            The site focuses on products first, so visitors can quickly browse,
            search, and open product details.
          </p>
        </div>

        <div className="card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f3] text-[#b11226]">
            <Globe size={22} />
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Worldwide Reach
          </h2>
          <p className="mt-2 text-sm leading-7 text-gray-500">
            Deal Bazaar is designed for worldwide product promotion with direct
            seller communication.
          </p>
        </div>
      </section>

      <section className="card p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900">How it works</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-red-100 bg-[#fff7f8] p-4">
            <p className="text-sm font-semibold text-[#b11226]">01</p>
            <h3 className="mt-2 font-bold text-gray-900">Discover products</h3>
            <p className="mt-2 text-sm leading-7 text-gray-500">
              Visitors browse products from the homepage or products page.
            </p>
          </div>

          <div className="rounded-2xl border border-red-100 bg-[#fff7f8] p-4">
            <p className="text-sm font-semibold text-[#b11226]">02</p>
            <h3 className="mt-2 font-bold text-gray-900">Open details page</h3>
            <p className="mt-2 text-sm leading-7 text-gray-500">
              Each product has its own shareable details page for social traffic.
            </p>
          </div>

          <div className="rounded-2xl border border-red-100 bg-[#fff7f8] p-4">
            <p className="text-sm font-semibold text-[#b11226]">03</p>
            <h3 className="mt-2 font-bold text-gray-900">Contact directly</h3>
            <p className="mt-2 text-sm leading-7 text-gray-500">
              Customers contact Deal Bazaar directly through WhatsApp or social
              media to order.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/products" className="btn-primary">
            Explore Products
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-white px-5 py-3 font-semibold text-[#b11226] transition hover:bg-[#fff1f3]"
          >
            Contact Deal Bazaar
          </Link>
        </div>
      </section>
    </main>
  );
}