"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProductCardItem from "@/components/product/ProductCardItem";
import { getProductsFromDb } from "@/lib/products";
import { Product } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
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

  const categories = useMemo(() => {
    const allCategories = products.map((product) => product.category);
    return ["All", ...Array.from(new Set(allCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeCategory === "All") return true;
      return product.category === activeCategory;
    });
  }, [products, activeCategory]);

  return (
    <main>
      <section className="border-b border-red-100 bg-white">
        <div className="container-custom py-6 md:py-8">
          <div className="rounded-[24px] border border-red-100 bg-[#fff7f8] p-4 shadow-sm md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b11226]">
                  Deal Bazaar
                </p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                  Browse Products Instantly
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Site ekata awama kelinma products balanna puluwan.
                </p>
              </div>

              <Link href="/products" className="btn-primary w-full sm:w-auto">
                View All Products
              </Link>
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
          </div>
        </div>
      </section>

      <section className="container-custom py-8 md:py-12">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b11226]">
              Product Showcase
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Trending products from Deal Bazaar
            </h2>
          </div>

          <div className="hidden rounded-2xl border border-red-200 bg-[#fff7f8] px-4 py-2 text-sm font-medium text-[#b11226] md:block">
            Fast • Clean • Social Ready
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
            No products found in this category.
          </div>
        )}
      </section>
    </main>
  );
}