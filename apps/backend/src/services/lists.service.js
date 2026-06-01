const { getPrisma } = require('../lib/prisma');
const { createHttpError } = require('../utils/http-error');

const DEMO_EMAIL = 'demo@bcmarket.com';

async function getUserId(authUser) {
  if (authUser?.id) {
    return authUser.id;
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });

  if (!user) {
    throw createHttpError(500, 'Demo user is missing. Run the database seed script.');
  }

  return user.id;
}

function serializeList(list) {
  return {
    id: list.id,
    name: list.name,
    items: list.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      checked: item.checked,
    })),
  };
}

async function findOwnedList(listId, authUser) {
  const prisma = getPrisma();
  const userId = await getUserId(authUser);
  const list = await prisma.shoppingList.findFirst({
    where: { id: listId, userId },
    include: { items: true },
  });

  if (!list) {
    throw createHttpError(404, 'List not found');
  }

  return list;
}

async function getLists(authUser) {
  const prisma = getPrisma();
  const userId = await getUserId(authUser);
  const lists = await prisma.shoppingList.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return lists.map(serializeList);
}

async function getList(id, authUser) {
  const list = await findOwnedList(id, authUser);
  return serializeList(list);
}

async function createList(payload, authUser) {
  const prisma = getPrisma();
  const userId = await getUserId(authUser);
  const name = String(payload.name || '').trim();

  if (!name) {
    throw createHttpError(400, 'List name is required');
  }

  const list = await prisma.shoppingList.create({
    data: { name, userId },
    include: { items: true },
  });

  return serializeList(list);
}

async function addItem(listId, payload, authUser) {
  const prisma = getPrisma();
  const list = await findOwnedList(listId, authUser);
  const product = await prisma.product.findUnique({ where: { id: payload.productId } });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  await prisma.shoppingListItem.upsert({
    where: {
      shoppingListId_productId: {
        shoppingListId: list.id,
        productId: product.id,
      },
    },
    create: {
      shoppingListId: list.id,
      productId: product.id,
      quantity: Math.max(1, Number(payload.quantity || 1)),
      checked: false,
    },
    update: {
      quantity: { increment: Math.max(1, Number(payload.quantity || 1)) },
    },
  });

  return getList(list.id, authUser);
}

async function updateItem(listId, itemId, payload, authUser) {
  const prisma = getPrisma();
  const list = await findOwnedList(listId, authUser);
  const item = await prisma.shoppingListItem.findFirst({
    where: { id: itemId, shoppingListId: list.id },
  });

  if (!item) {
    throw createHttpError(404, 'List item not found');
  }

  const data = {};

  if (payload.quantity !== undefined) {
    data.quantity = Math.max(1, Number(payload.quantity));
  }

  if (payload.checked !== undefined) {
    data.checked = Boolean(payload.checked);
  }

  await prisma.shoppingListItem.update({
    where: { id: item.id },
    data,
  });

  return getList(list.id, authUser);
}

async function removeItem(listId, itemId, authUser) {
  const prisma = getPrisma();
  const list = await findOwnedList(listId, authUser);
  const item = await prisma.shoppingListItem.findFirst({
    where: { id: itemId, shoppingListId: list.id },
  });

  if (!item) {
    throw createHttpError(404, 'List item not found');
  }

  await prisma.shoppingListItem.delete({ where: { id: item.id } });
  return getList(list.id, authUser);
}

async function deleteList(listId, authUser) {
  const prisma = getPrisma();
  const list = await findOwnedList(listId, authUser);
  await prisma.shoppingList.delete({ where: { id: list.id } });
}

module.exports = {
  getLists,
  getList,
  createList,
  addItem,
  updateItem,
  removeItem,
  deleteList,
  serializeList,
};
