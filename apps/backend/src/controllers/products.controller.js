const productsService = require('../services/products.service');

function getProducts(req, res) {
  const products = productsService.getProducts({
    search: req.query.search,
    category: req.query.category,
  });

  res.json({ success: true, data: { products } });
}

function getProduct(req, res, next) {
  try {
    res.json({ success: true, data: { product: productsService.getProduct(req.params.id) } });
  } catch (error) {
    next(error);
  }
}

module.exports = { getProducts, getProduct };
