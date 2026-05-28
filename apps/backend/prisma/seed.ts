import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const categories = [
    { name: "Lácteos", slug: "lacteos" },
    { name: "Panadería", slug: "panaderia" },
    { name: "Frutas y Verduras", slug: "frutas-verduras" },
    { name: "Despensa", slug: "despensa" },
    { name: "Bebidas", slug: "bebidas" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const categoryData = await prisma.category.findMany();
  
  const products = [
    { name: "Leche Entera", price: 1.50, unit: "1L", categoryId: categoryData[0].id, imageUrl: "https://via.placeholder.com/150" },
    { name: "Yogurt Natural", price: 2.00, unit: "500g", categoryId: categoryData[0].id, imageUrl: "https://via.placeholder.com/150" },
    { name: "Pan Integral", price: 2.20, unit: "500g", categoryId: categoryData[1].id, imageUrl: "https://via.placeholder.com/150" },
    { name: "Baguette", price: 1.80, unit: "250g", categoryId: categoryData[1].id, imageUrl: "https://via.placeholder.com/150" },
    { name: "Manzanas Rojas", price: 3.00, unit: "1kg", categoryId: categoryData[2].id, imageUrl: "https://via.placeholder.com/150" },
    { name: "Plátanos", price: 1.20, unit: "1kg", categoryId: categoryData[2].id, imageUrl: "https://via.placeholder.com/150" },
    { name: "Arroz Basmati", price: 2.80, unit: "1kg", categoryId: categoryData[3].id, imageUrl: "https://via.placeholder.com/150" },
    { name: "Aceite de Oliva", price: 6.50, unit: "750ml", categoryId: categoryData[3].id, imageUrl: "https://via.placeholder.com/150" },
    { name: "Agua Mineral", price: 0.80, unit: "500ml", categoryId: categoryData[4].id, imageUrl: "https://via.placeholder.com/150" },
    { name: "Jugo de Naranja", price: 3.50, unit: "1L", categoryId: categoryData[4].id, imageUrl: "https://via.placeholder.com/150" },
  ];

  for (const prod of products) {
    await prisma.product.create({
      data: prod,
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
