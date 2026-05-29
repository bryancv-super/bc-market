import { AuthUser } from "@/lib/server/auth";
import { createHttpError } from "@/lib/server/http";
import { getPrisma } from "@/lib/server/prisma";

const DEMO_EMAIL = "demo@bcmarket.com";

async function getUserId(authUser: AuthUser | null) {
  if (authUser?.id) {
    return authUser.id;
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });

  if (!user) {
    throw createHttpError(500, "Demo user is missing. Run the database seed script.");
  }

  return user.id;
}

function serializeList(list: {
  id: string;
  name: string;
  items: Array<{ id: string; productId: string; quantity: number; checked: boolean }>;
}) {
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

async function findOwnedList(listId: string, authUser: AuthUser | null) {
  const prisma = getPrisma();
  const userId = await getUserId(authUser);
  const list = await prisma.shoppingList.findFirst({
    where: { id: listId, userId },
    include: { items: true },
  });

  if (!list) {
    throw createHttpError(404, "List not found");
  }

  return list;
}

export async function getLists(authUser: AuthUser | null) {
  const prisma = getPrisma();
  const userId = await getUserId(authUser);
  const lists = await prisma.shoppingList.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return lists.map(serializeList);
}

export async function getList(id: string, authUser: AuthUser | null) {
  const list = await findOwnedList(id, authUser);
  return serializeList(list);
}

export async function createList(payload: Record<string, unknown>, authUser: AuthUser | null) {
  const prisma = getPrisma();
  const userId = await getUserId(authUser);
  const name = String(payload.name || "").trim();

  if (!name) {
    throw createHttpError(400, "List name is required");
  }

  const list = await prisma.shoppingList.create({
    data: { name, userId },
    include: { items: true },
  });

  return serializeList(list);
}

export async function updateList(id: string, payload: Record<string, unknown>, authUser: AuthUser | null) {
  const prisma = getPrisma();
  const list = await findOwnedList(id, authUser);
  const name = String(payload.name || "").trim();

  if (!name) {
    throw createHttpError(400, "List name is required");
  }

  const updatedList = await prisma.shoppingList.update({
    where: { id: list.id },
    data: { name },
    include: { items: true },
  });

  return serializeList(updatedList);
}

export async function addItem(listId: string, payload: Record<string, unknown>, authUser: AuthUser | null) {
  const prisma = getPrisma();
  const list = await findOwnedList(listId, authUser);
  const productId = String(payload.productId || "");
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw createHttpError(404, "Product not found");
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

export async function updateItem(
  listId: string,
  itemId: string,
  payload: Record<string, unknown>,
  authUser: AuthUser | null,
) {
  const prisma = getPrisma();
  const list = await findOwnedList(listId, authUser);
  const item = await prisma.shoppingListItem.findFirst({
    where: { id: itemId, shoppingListId: list.id },
  });

  if (!item) {
    throw createHttpError(404, "List item not found");
  }

  const data: { quantity?: number; checked?: boolean } = {};

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

export async function removeItem(listId: string, itemId: string, authUser: AuthUser | null) {
  const prisma = getPrisma();
  const list = await findOwnedList(listId, authUser);
  const item = await prisma.shoppingListItem.findFirst({
    where: { id: itemId, shoppingListId: list.id },
  });

  if (!item) {
    throw createHttpError(404, "List item not found");
  }

  await prisma.shoppingListItem.delete({ where: { id: item.id } });
  return getList(list.id, authUser);
}

export async function deleteList(listId: string, authUser: AuthUser | null) {
  const prisma = getPrisma();
  const list = await findOwnedList(listId, authUser);
  await prisma.shoppingList.delete({ where: { id: list.id } });
}
