import prisma from "../lib/prisma";

export const createShoppingList = async (userId: string, name: string) => {
  return await prisma.shoppingList.create({
    data: {
      userId,
      name,
    },
  });
};

export const getUserShoppingLists = async (userId: string) => {
  return await prisma.shoppingList.findMany({
    where: { userId },
    include: {
      _count: {
        select: { items: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getShoppingListById = async (listId: string, userId: string) => {
  return await prisma.shoppingList.findUnique({
    where: { id: listId, userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
};

export const updateShoppingList = async (listId: string, userId: string, data: { name?: string }) => {
  const list = await prisma.shoppingList.findUnique({
    where: { id: listId },
  });

  if (!list || list.userId !== userId) {
    throw new Error("List not found or unauthorized");
  }

  return await prisma.shoppingList.update({
    where: { id: listId },
    data,
  });
};

export const deleteShoppingList = async (listId: string, userId: string) => {
  const list = await prisma.shoppingList.findUnique({
    where: { id: listId },
  });

  if (!list || list.userId !== userId) {
    throw new Error("List not found or unauthorized");
  }

  return await prisma.$transaction(async (tx) => {
    await tx.shoppingListItem.deleteMany({
      where: { shoppingListId: listId },
    });

    return tx.shoppingList.delete({
      where: { id: listId },
    });
  });
};

export const addProductToList = async (
  userId: string,
  listId: string,
  productId: string,
  quantity: number = 1,
) => {
  const list = await prisma.shoppingList.findUnique({
    where: { id: listId },
  });

  if (!list || list.userId !== userId) {
    throw new Error("List not found or unauthorized");
  }

  const safeQuantity = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;

  const item = await prisma.shoppingListItem.findFirst({
    where: {
      shoppingListId: listId,
      productId: productId,
    },
  });

  if (item) {
    return await prisma.shoppingListItem.update({
      where: { id: item.id },
      data: { quantity: { increment: safeQuantity } },
      include: { product: true },
    });
  }

  return await prisma.shoppingListItem.create({
    data: {
      shoppingListId: listId,
      productId: productId,
      quantity: safeQuantity,
    },
    include: { product: true },
  });
};

export const toggleItemChecked = async (itemId: string, userId: string) => {
  const item = await prisma.shoppingListItem.findUnique({
    where: { id: itemId },
    include: { shoppingList: true },
  });

  if (!item || item.shoppingList.userId !== userId) throw new Error("Item not found or unauthorized");

  return await prisma.shoppingListItem.update({
    where: { id: itemId },
    data: { checked: !item.checked },
  });
};

export const removeItemFromList = async (itemId: string, userId: string) => {
  const item = await prisma.shoppingListItem.findUnique({
    where: { id: itemId },
    include: { shoppingList: true },
  });

  if (!item || item.shoppingList.userId !== userId) throw new Error("Item not found or unauthorized");

  return await prisma.shoppingListItem.delete({
    where: { id: itemId },
  });
};
