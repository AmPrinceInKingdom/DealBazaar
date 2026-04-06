"use client";

import Link from "next/link";
import { Search, Heart, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = search.trim();

    if (!trimmed) {
      router.push("/products");
      setMobileMenuOpen(false);
      return;
    }

    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    setMobileMenuOpen(false);
  }

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-red-200 bg-white/95 backdrop-blur">
      <div className="border-b border-red-100 bg-[#fff1f3]">
        <div className="container-custom flex items-center justify-center py-2 text-center text-xs font-semibold tracking-wide text-[#b11226] md:text-sm">
          Hot deals • Trending products • Order directly via WhatsApp
        </div>
      </div>

      <div className="container-custom flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#b11226] text-sm font-bold text-white shadow-[0_12px_24px_rgba(177,18,38,0.28)]">
            DB
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-[#b11226] md:text-xl">
              Deal Bazaar
            </p>
            <p className="text-xs text-gray-500">Social shopping deals</p>
          </div>
        </Link>

        <form
          onSubmit={handleSearch}
          className="mx-6 hidden flex-1 md:flex md:max-w-xl"
        >
          <div className="flex w-full items-center rounded-2xl border border-red-200 bg-[#fff7f8] px-4 py-3 shadow-sm">
            <Search size={18} className="text-[#b11226]" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </form>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-[#b11226] transition hover:bg-[#fff1f3] md:inline-flex"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-[#b11226] transition hover:bg-[#fff1f3] md:inline-flex"
          >
            Products
          </Link>

          <Link
            href="/contact"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-[#b11226] transition hover:bg-[#fff1f3] md:inline-flex"
          >
            Contact
          </Link>

          <Link
            href="/about"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-[#b11226] transition hover:bg-[#fff1f3] md:inline-flex"
          >
            About
          </Link>

          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-[#fff7f8] text-[#b11226] md:inline-flex"
          >
            <Heart size={18} />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-[#fff7f8] text-[#b11226] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-red-100 bg-white md:hidden">
          <div className="container-custom py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex w-full items-center rounded-2xl border border-red-200 bg-[#fff7f8] px-4 py-3 shadow-sm">
                <Search size={18} className="text-[#b11226]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
              </div>
            </form>

            <div className="space-y-2">
              <Link
                href="/"
                onClick={closeMenu}
                className="block rounded-2xl border border-red-100 bg-[#fff7f8] px-4 py-3 font-semibold text-[#b11226]"
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={closeMenu}
                className="block rounded-2xl border border-red-100 bg-[#fff7f8] px-4 py-3 font-semibold text-[#b11226]"
              >
                Products
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="block rounded-2xl border border-red-100 bg-[#fff7f8] px-4 py-3 font-semibold text-[#b11226]"
              >
                Contact
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="block rounded-2xl border border-red-100 bg-[#fff7f8] px-4 py-3 font-semibold text-[#b11226]"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}