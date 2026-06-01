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

function parseCategories(category?: string | null, categories?: string | null) {
  return String(categories || category || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function getProducts(
  filters: { search?: string | null; category?: string | null; categories?: string | null } = {},
) {
  const prisma = getPrisma();
  const search = String(filters.search || "").trim();
  const categories = parseCategories(filters.category, filters.categories);

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      AND: [
        ...(search
          ? [
              {
                OR: [
                  { name: { contains: search, mode: "insensitive" as const } },
                  { category: { name: { contains: search, mode: "insensitive" as const } } },
                ],
              },
            ]
          : []),
        ...(categories.length > 0
          ? [
              {
                OR: categories.map((category) => ({
                  category: { name: { equals: category, mode: "insensitive" as const } },
                })),
              },
            ]
          : []),
      ],
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
