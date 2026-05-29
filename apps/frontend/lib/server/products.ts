import { getPrisma } from "@/lib/server/prisma";
import { createHttpError } from "@/lib/server/http";

function serializeProduct(product: {
  id: string;
  name: string;
  price: unknown;
  unit: string;
  imageUrl: string | null;
  category: { name: string };
}) {
  return {
    id: product.id,
    name: product.name,
    category: product.category.name,
    price: `RD$ ${Number(product.price).toFixed(2)}`,
    unit: product.unit,
    imageUrl: product.imageUrl,
  };
}

export async function getProducts(filters: { search?: string | null; category?: string | null } = {}) {
  const prisma = getPrisma();
  const search = String(filters.search || "").trim();
  const category = String(filters.category || "").trim();

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { category: { name: { contains: search, mode: "insensitive" } } },
            ],
          }
        : {}),
      ...(category ? { category: { name: { equals: category, mode: "insensitive" } } } : {}),
    },
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return products.map(serializeProduct);
}

export async function getProduct(id: string) {
  const prisma = getPrisma();
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  return serializeProduct(product);
}
