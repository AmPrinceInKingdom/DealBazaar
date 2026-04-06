"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCardItem from "@/components/product/ProductCardItem";
import { getProductsFromDb } from "@/lib/products";
import { Product } from "@/types/product";

export default function ProductsClientPage() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProductsFromDb();
      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const categories = useMemo(() => {
    const allCategories = products.map((product) => product.category);
    return ["All", ...Array.from(new Set(allCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return (
    <main className="container-custom py-6 md:py-10">
      <section className="rounded-[24px] border border-red-100 bg-[#fff7f8] p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b11226]">
              Deal Bazaar
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              All Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Search karala oyata galapena siyalu products balanna.
            </p>
          </div>

          <div className="w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search all products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-red-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b11226]"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? "border-[#b11226] bg-[#b11226] text-white"
                  : "border-red-200 bg-white text-[#b11226] hover:bg-[#fff1f3]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="pt-8">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Matching Products
          </h2>

          <div className="rounded-2xl border border-red-200 bg-[#fff7f8] px-4 py-2 text-sm font-medium text-[#b11226]">
            {filteredProducts.length} items found
          </div>
        </div>

        {loading ? (
          <div className="card p-8 text-center text-gray-500">
            Loading products...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCardItem
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                slug={product.slug}
              />
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center text-gray-500">
            No products found for your search.
          </div>
        )}
      </section>
    </main>
  );
}