const { products } = require('../data/mock-data');
const { createHttpError } = require('../utils/http-error');

function getProducts(filters = {}) {
  const search = String(filters.search || '').trim().toLowerCase();
  const category = String(filters.category || '').trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);
    const matchesCategory = !category || product.category.toLowerCase() === category;

    return product.isActive && matchesSearch && matchesCategory;
  });
}

function getProduct(id) {
  const product = products.find((item) => item.id === id);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  return product;
}

module.exports = { getProducts, getProduct };
