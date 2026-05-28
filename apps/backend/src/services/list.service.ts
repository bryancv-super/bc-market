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

export const getShoppingListById = async (listId: string) => {
  return await prisma.shoppingList.findUnique({
    where: { id: listId },
    include: {
      items: {
        include: {
          product: true,
        },
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

  return await prisma.shoppingList.delete({
    where: { id: listId },
  });
};

export const addProductToList = async (listId: string, productId: string, quantity: number = 1) => {
  const item = await prisma.shoppingListItem.findFirst({
    where: {
      shoppingListId: listId,
      productId: productId,
    },
  });

  if (item) {
    return await prisma.shoppingListItem.update({
      where: { id: item.id },
      data: { quantity: { increment: quantity } },
    });
  }

  return await prisma.shoppingListItem.create({
    data: {
      shoppingListId: listId,
      productId: productId,
      quantity,
    },
  });
};

export const toggleItemChecked = async (itemId: string) => {
  const item = await prisma.shoppingListItem.findUnique({
    where: { id: itemId },
  });

  if (!item) throw new Error("Item not found");

  return await prisma.shoppingListItem.update({
    where: { id: itemId },
    data: { checked: !item.checked },
  });
};

export const removeItemFromList = async (itemId: string) => {
  return await prisma.shoppingListItem.delete({
    where: { id: itemId },
  });
};
