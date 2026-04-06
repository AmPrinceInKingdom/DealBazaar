"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { uploadProductImage } from "@/lib/storage";

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    price: "",
    oldPrice: "",
    image: "",
    description: "",
    inStock: true,
  });

  const [imageLinks, setImageLinks] = useState<string[]>(["", "", "", "", ""]);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const checked = "checked" in e.target ? e.target.checked : false;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageLinkChange(index: number, value: string) {
    const updated = [...imageLinks];
    updated[index] = value;
    setImageLinks(updated);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).slice(0, 5);

    setUploadFiles(files);
    setUploadPreviews(files.map((file) => URL.createObjectURL(file)));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const trimmedSlug = form.slug.trim().toLowerCase();

    if (
      !form.name.trim() ||
      !trimmedSlug ||
      !form.category.trim() ||
      !form.price.trim() ||
      !form.image.trim() ||
      !form.description.trim()
    ) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const cleanLinkImages = imageLinks
      .map((img) => img.trim())
      .filter(Boolean)
      .slice(0, 5);

    let uploadedImageUrls: string[] = [];

    try {
      if (uploadFiles.length > 0) {
        uploadedImageUrls = await Promise.all(
          uploadFiles.slice(0, 5).map((file) => uploadProductImage(file))
        );
      }

      const allImages = [
        form.image.trim(),
        ...cleanLinkImages,
        ...uploadedImageUrls,
      ].slice(0, 10);

      const { error } = await supabase.from("products").insert([
        {
          name: form.name.trim(),
          slug: trimmedSlug,
          price: form.price.trim(),
          old_price: form.oldPrice.trim() || null,
          description: form.description.trim(),
          category: form.category.trim(),
          in_stock: form.inStock,
          image: form.image.trim(),
          images: allImages,
        },
      ]);

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Image upload failed."
      );
      setLoading(false);
    }
  }

  return (
    <main className="container-custom py-8 md:py-10">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b11226]">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Add New Product
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Main image 1 + link images 5 + uploaded images 5
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="card max-w-4xl space-y-6 p-5 md:p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-[#b11226]"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="mini-projector"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-[#b11226]"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-[#b11226]"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="$49.99"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-[#b11226]"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Old Price</label>
            <input
              name="oldPrice"
              value={form.oldPrice}
              onChange={handleChange}
              placeholder="$59.99"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-[#b11226]"
            />
          </div>

          <div className="flex items-center gap-2 pt-8">
            <input
              id="inStock"
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
            />
            <label htmlFor="inStock" className="font-medium">
              In Stock
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-[#b11226]"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Main Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/main-image.jpg"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-[#b11226]"
          />
        </div>

        <div>
          <label className="mb-3 block font-medium">
            Extra Image Links (up to 5)
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            {imageLinks.map((link, index) => (
              <input
                key={index}
                value={link}
                onChange={(e) => handleImageLinkChange(index, e.target.value)}
                placeholder={`Image Link ${index + 1}`}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-[#b11226]"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="mb-3 block font-medium">
            Upload Extra Images (up to 5)
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-[#b11226] file:px-4 file:py-2 file:text-white"
          />

          {uploadPreviews.length > 0 ? (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {uploadPreviews.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-red-100 bg-[#fff7f8]"
                >
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="h-20 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </div>
        ) : null}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </main>
  );
}