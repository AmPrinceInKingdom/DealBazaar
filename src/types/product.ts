export type Product = {
  id: string;
  name: string;
  slug: string;

  price: string;
  oldPrice?: string;

  description: string;
  category: string;

  inStock?: boolean;

  // main image
  image: string;

  // gallery images (links)
  imageLinks?: string[];

  // uploaded images (base64 / storage)
  storageImages?: string[];

  // combined images (auto)
  images?: string[];
};