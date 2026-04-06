import { Product } from "@/types/product";

const STORAGE_KEY = "dealbazaar_products";

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getAllImages(product: Product): string[] {
  const images: string[] = [];

  if (product.image) images.push(product.image);

  if (product.imageLinks?.length) {
    images.push(...product.imageLinks);
  }

  if (product.storageImages?.length) {
    images.push(...product.storageImages);
  }

  return images;
}

export const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    price: "$25",
    description: "High quality wireless headphones",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?q=80&w=1200",
    imageLinks: [],
    storageImages: [],
  },
];