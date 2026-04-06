import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="container-custom py-8 md:py-10">
      <section className="rounded-[24px] border border-red-100 bg-[#fff7f8] p-5 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b11226]">
          Deal Bazaar
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
          Have a question about a product or want to place an order? Contact us
          directly through WhatsApp or social media for a fast response.
        </p>
      </section>

      <section className="grid gap-6 py-8 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900">Get in touch</h2>
          <p className="mt-2 text-sm leading-7 text-gray-500">
            We are focused on making product ordering simple and direct for
            social media customers.
          </p>

          <div className="mt-6 space-y-4">
            <a
              href="https://wa.me/94722493533"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-red-100 bg-[#fff7f8] p-4 transition hover:border-red-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b11226] text-white">
                <Phone size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-500">+94 72 249 3533</p>
              </div>
            </a>

            <a
              href="mailto:dealbazaar.pvt@gmail.com"
              className="flex items-center gap-3 rounded-2xl border border-red-100 bg-[#fff7f8] p-4 transition hover:border-red-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b11226] text-white">
                <Mail size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-sm text-gray-500">
                  dealbazaar.pvt@gmail.com
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-[#fff7f8] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b11226] text-white">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Location</p>
                <p className="text-sm text-gray-500">Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900">Quick contact</h2>
          <p className="mt-2 text-sm leading-7 text-gray-500">
            Use any of the platforms below to contact Deal Bazaar directly.
          </p>

          <div className="mt-6 space-y-3">
            <a
              href="https://wa.me/94722493533"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              Chat on WhatsApp
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-2xl border border-red-200 bg-white px-5 py-3 text-center font-semibold text-[#b11226] transition hover:bg-[#fff1f3]"
            >
              Contact on Instagram
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-2xl border border-red-200 bg-white px-5 py-3 text-center font-semibold text-[#b11226] transition hover:bg-[#fff1f3]"
            >
              Contact on TikTok
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-2xl border border-red-200 bg-white px-5 py-3 text-center font-semibold text-[#b11226] transition hover:bg-[#fff1f3]"
            >
              Contact on Facebook
            </a>
          </div>

          <div className="mt-6 rounded-2xl border border-red-100 bg-[#fff7f8] p-4 text-sm leading-7 text-gray-600">
            Need to browse products first?{" "}
            <Link href="/products" className="font-semibold text-[#b11226]">
              View all products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}