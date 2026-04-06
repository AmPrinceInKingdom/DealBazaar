import { Suspense } from "react";
import ProductsClientPage from "./ProductsClientPage";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="container-custom py-6 md:py-10">
          <div className="card p-8 text-center text-gray-500">
            Loading products...
          </div>
        </main>
      }
    >
      <ProductsClientPage />
    </Suspense>
  );
}