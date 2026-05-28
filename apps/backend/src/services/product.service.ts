import prisma from "../lib/prisma";

export const getProducts = async (filters: { categoryId?: string; search?: string }) => {
  const { categoryId, search } = filters;
  
  return await prisma.product.findMany({
    where: {
      isActive: true,
      ...(categoryId && { categoryId }),
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    include: {
      category: true,
    },
  });
};

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
  if (!product) throw new Error("Product not found");
  return product;
};

export const createProduct = async (data: any) => {
  return await prisma.product.create({
    data,
  });
};

export const updateProduct = async (id: string, data: any) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};
