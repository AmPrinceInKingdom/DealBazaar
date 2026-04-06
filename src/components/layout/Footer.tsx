import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-red-100 bg-[#fff7f8]">
      <div className="container-custom py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#b11226] font-bold text-white">
                DB
              </div>

              <div>
                <p className="text-lg font-bold text-[#b11226]">
                  Deal Bazaar
                </p>
                <p className="text-xs text-gray-500">
                  Social shopping deals
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              Discover trending products and order directly via WhatsApp. Fast,
              simple, and worldwide shipping available.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Quick Links</h3>

            <div className="space-y-2 text-sm">
              <Link
                href="/"
                className="block text-gray-600 hover:text-[#b11226]"
              >
                Home
              </Link>

              <Link
                href="/products"
                className="block text-gray-600 hover:text-[#b11226]"
              >
                Products
              </Link>

              <Link
                href="/contact"
                className="block text-gray-600 hover:text-[#b11226]"
              >
                Contact
              </Link>

              <Link
                href="/about"
                className="block text-gray-600 hover:text-[#b11226]"
              >
                About
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Contact Us</h3>

            <div className="space-y-3">
              <a
                href="https://wa.me/94722493533"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#b11226]"
              >
                <Phone size={16} />
                WhatsApp: +94 72 249 3533
              </a>

              <a
                href="mailto:dealbazaar.pvt@gmail.com"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#b11226]"
              >
                <Mail size={16} />
                dealbazaar.pvt@gmail.com
              </a>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-[#b11226]"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm4.25 5.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm6.25-.88a1.13 1.13 0 1 0 0 2.25 1.13 1.13 0 0 0 0-2.25zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                  </svg>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-[#b11226]"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.5 9H15V6h-1.5C11.57 6 10 7.57 10 9.5V11H8v3h2v7h3v-7h2.11l.39-3H13V9.5c0-.28.22-.5.5-.5z" />
                  </svg>
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-[#b11226]"
                  aria-label="TikTok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 3c.3 1.7 1.7 3 3.5 3V9c-1.3 0-2.5-.4-3.5-1.1V16a5 5 0 1 1-5-5c.3 0 .7 0 1 .1V14a2 2 0 1 0 2 2V3h2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-red-100 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Deal Bazaar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}