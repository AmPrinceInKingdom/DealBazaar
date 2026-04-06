"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";
import { findProductBySlug, getAllImages } from "@/lib/products";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;

      setLoading(true);

      const foundProduct = await findProductBySlug(slug);
      setProduct(foundProduct);

      if (foundProduct) {
        const images = getAllImages(foundProduct);
        setSelectedImage(images[0] || foundProduct.image);
      }

      setLoading(false);
    }

    loadProduct();
  }, [slug]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    return getAllImages(product);
  }, [product]);

  if (loading) {
    return (
      <main className="container-custom py-8 md:py-10">
        <div className="card p-8 text-center text-gray-500">
          Loading product...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container-custom py-8 md:py-10">
        <div className="card p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <p className="mt-2 text-gray-500">
            The product you are looking for is not available.
          </p>
        </div>
      </main>
    );
  }

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/products/${product.slug}`
      : `/products/${product.slug}`;

  const whatsappMessage = `Hi Deal Bazaar, I want this product:
Product: ${product.name}
Price: ${product.price}
Link: ${productUrl}`;

  const whatsappLink = `https://wa.me/94722493533?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main className="container-custom py-8 md:py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left side - Gallery */}
        <div>
          <div className="overflow-hidden rounded-[22px] border border-red-100 bg-white shadow-sm">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="h-[300px] w-full object-cover sm:h-[380px] md:h-[460px]"
            />
          </div>

          {galleryImages.length > 0 ? (
            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
              {galleryImages.slice(0, 10).map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`overflow-hidden rounded-xl border transition ${
                    selectedImage === image
                      ? "border-[#b11226] ring-2 ring-[#b11226]/20"
                      : "border-red-100 hover:border-red-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-20 w-full object-cover sm:h-24"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Right side - Info */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b11226]">
            {product.category}
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-[#b11226] md:text-3xl">
              {product.price}
            </span>

            {product.oldPrice ? (
              <span className="text-lg text-gray-400 line-through">
                {product.oldPrice}
              </span>
            ) : null}
          </div>

          <div className="mt-5 rounded-2xl border border-red-100 bg-[#fff7f8] p-4">
            <p className="text-sm leading-7 text-gray-600">
              {product.description}
            </p>
          </div>

          <div className="mt-5 space-y-2 text-sm text-gray-500">
            <p>Worldwide shipping available</p>
            <p>Estimated delivery: 7–15 days</p>
            <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
            <p>
              Total images:{" "}
              <span className="font-semibold text-[#b11226]">
                {galleryImages.slice(0, 10).length}
              </span>
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary block w-full text-center"
            >
              Order via WhatsApp
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
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-2xl border border-red-200 bg-white px-5 py-3 text-center font-semibold text-[#b11226] transition hover:bg-[#fff1f3]"
            >
              Contact on Facebook
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-2xl border border-red-200 bg-white px-5 py-3 text-center font-semibold text-[#b11226] transition hover:bg-[#fff1f3]"
            >
              Contact on TikTok
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}