const bcrypt = require('bcryptjs');
const { PrismaClient, Prisma } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const prisma = new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL),
});

const products = [
  { name: 'Arroz selecto', category: 'Despensa', slug: 'despensa', price: '85.00', unit: 'libra' },
  { name: 'Leche entera', category: 'Lacteos', slug: 'lacteos', price: '72.00', unit: 'litro' },
  { name: 'Huevos frescos', category: 'Basicos', slug: 'basicos', price: '210.00', unit: 'carton' },
  { name: 'Pan sobao', category: 'Panaderia', slug: 'panaderia', price: '95.00', unit: 'unidad' },
  { name: 'Manzana roja', category: 'Frutas', slug: 'frutas', price: '38.00', unit: 'unidad' },
  { name: 'Pechuga de pollo', category: 'Carnes', slug: 'carnes', price: '165.00', unit: 'libra' },
];

async function main() {
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@bcmarket.com' },
    update: {
      username: 'Demo User',
      passwordHash: bcrypt.hashSync('password123', 10),
    },
    create: {
      username: 'Demo User',
      email: 'demo@bcmarket.com',
      passwordHash: bcrypt.hashSync('password123', 10),
    },
  });

  const createdProducts = [];

  for (const product of products) {
    const category = await prisma.category.upsert({
      where: { slug: product.slug },
      update: { name: product.category },
      create: { name: product.category, slug: product.slug },
    });

    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name },
    });

    const data = {
      name: product.name,
      price: new Prisma.Decimal(product.price),
      unit: product.unit,
      isActive: true,
      categoryId: category.id,
    };

    const savedProduct = existingProduct
      ? await prisma.product.update({ where: { id: existingProduct.id }, data })
      : await prisma.product.create({ data });

    createdProducts.push(savedProduct);
  }

  await prisma.shoppingList.deleteMany({ where: { userId: demoUser.id } });

  await prisma.shoppingList.create({
    data: {
      name: 'Compras de la semana',
      userId: demoUser.id,
      items: {
        create: createdProducts.slice(0, 3).map((product, index) => ({
          productId: product.id,
          quantity: index === 0 ? 2 : 1,
          checked: index === 2,
        })),
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
