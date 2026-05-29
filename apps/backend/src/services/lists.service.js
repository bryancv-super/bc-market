const { randomUUID } = require('crypto');
const { lists, products } = require('../data/mock-data');
const { createHttpError } = require('../utils/http-error');

function getLists() {
  return lists;
}

function getList(id) {
  const list = lists.find((item) => item.id === id);

  if (!list) {
    throw createHttpError(404, 'List not found');
  }

  return list;
}

function createList(payload) {
  const name = String(payload.name || '').trim();

  if (!name) {
    throw createHttpError(400, 'List name is required');
  }

  const list = { id: randomUUID(), name, items: [] };
  lists.unshift(list);
  return list;
}

function addItem(listId, payload) {
  const list = getList(listId);
  const product = products.find((item) => item.id === payload.productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  const existingItem = list.items.find((item) => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += Number(payload.quantity || 1);
    return list;
  }

  list.items.push({
    id: randomUUID(),
    productId: product.id,
    quantity: Math.max(1, Number(payload.quantity || 1)),
    checked: false,
  });

  return list;
}

function updateItem(listId, itemId, payload) {
  const list = getList(listId);
  const item = list.items.find((currentItem) => currentItem.id === itemId);

  if (!item) {
    throw createHttpError(404, 'List item not found');
  }

  if (payload.quantity !== undefined) {
    item.quantity = Math.max(1, Number(payload.quantity));
  }

  if (payload.checked !== undefined) {
    item.checked = Boolean(payload.checked);
  }

  return list;
}

function removeItem(listId, itemId) {
  const list = getList(listId);
  const itemIndex = list.items.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) {
    throw createHttpError(404, 'List item not found');
  }

  list.items.splice(itemIndex, 1);
  return list;
}

function deleteList(listId) {
  const listIndex = lists.findIndex((list) => list.id === listId);

  if (listIndex === -1) {
    throw createHttpError(404, 'List not found');
  }

  lists.splice(listIndex, 1);
}

module.exports = {
  getLists,
  getList,
  createList,
  addItem,
  updateItem,
  removeItem,
  deleteList,
};
