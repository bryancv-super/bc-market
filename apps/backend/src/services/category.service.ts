import prisma from "../lib/prisma";

export const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
};

export const createCategory = async (data: { name: string; slug: string }) => {
  return await prisma.category.create({
    data,
  });
};

export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};
