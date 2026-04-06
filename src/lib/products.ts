import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

function mapDbProduct(item: any): Product {
  const images = item.images || [];

  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    price: item.price,
    oldPrice: item.old_price || "",
    description: item.description,
    category: item.category,
    inStock: item.in_stock,
    image: images[0] || "",
    imageLinks: images.slice(1),
    storageImages: [],
    images,
  };
}

export async function getProductsFromDb(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error(error);
    return [];
  }

  return data.map(mapDbProduct);
}

export async function findProductBySlug(
  slug: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return mapDbProduct(data);
}

export function getAllImages(product: Product): string[] {
  const images: string[] = [];

  if (product.image) {
    images.push(product.image);
  }

  if (product.imageLinks?.length) {
    images.push(...product.imageLinks);
  }

  if (product.images?.length) {
    return product.images;
  }

  return images;
}