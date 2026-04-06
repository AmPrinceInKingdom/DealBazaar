"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProductsFromDb } from "@/lib/products";
import { Product } from "@/types/product";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const data = await getProductsFromDb();
    setProducts(data);
    setLoading(false);
  }

  async function handleDelete(productId: string) {
    const ok = window.confirm("Do you want to delete this product?");
    if (!ok) return;

    setDeletingId(productId);

    const { error } = await supabase.from("products").delete().eq("id", productId);

    setDeletingId(null);

    if (error) {
      alert(error.message);
      return;
    }

    await loadProducts();
  }

  return (
    <main className="container-custom py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Add Product
        </Link>
      </div>

      {loading ? (
        <div className="card p-6 text-center text-gray-500">Loading...</div>
      ) : products.length === 0 ? (
        <div className="card p-6 text-center text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />

                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.category}</div>
                  <div className="text-sm font-medium text-red-600">
                    {product.price}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="rounded-lg border px-3 py-1"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="rounded-lg border border-red-200 px-3 py-1 text-red-600"
                >
                  {deletingId === product.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}