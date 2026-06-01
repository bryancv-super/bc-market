const { getPrisma } = require('../lib/prisma');
const { createHttpError } = require('../utils/http-error');

function serializeProduct(product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category.name,
    price: `RD$ ${Number(product.price).toFixed(2)}`,
    unit: product.unit,
    imageUrl: product.imageUrl,
  };
}

function parseCategories(category, categories) {
  return String(categories || category || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

async function getProducts(filters = {}) {
  const prisma = getPrisma();
  const search = String(filters.search || '').trim();
  const categories = parseCategories(filters.category, filters.categories);

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      AND: [
        ...(search
          ? [
              {
                OR: [
                  { name: { contains: search, mode: 'insensitive' } },
                  { category: { name: { contains: search, mode: 'insensitive' } } },
                ],
              },
            ]
          : []),
        ...(categories.length > 0
          ? [
              {
                OR: categories.map((category) => ({
                  category: { name: { equals: category, mode: 'insensitive' } },
                })),
              },
            ]
          : []),
      ],
    },
    include: { category: true },
    orderBy: { name: 'asc' },
  });

  return products.map(serializeProduct);
}

async function getProduct(id) {
  const prisma = getPrisma();
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  return serializeProduct(product);
}

module.exports = { getProducts, getProduct, serializeProduct };
