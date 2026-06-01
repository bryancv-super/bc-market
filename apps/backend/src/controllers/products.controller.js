const productsService = require('../services/products.service');

async function getProducts(req, res, next) {
  try {
    const products = await productsService.getProducts({
      search: req.query.search,
      category: req.query.category,
      categories: req.query.categories,
    });

    res.json({ success: true, data: { products } });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    res.json({ success: true, data: { product: await productsService.getProduct(req.params.id) } });
  } catch (error) {
    next(error);
  }
}

module.exports = { getProducts, getProduct };
