const bcrypt = require('bcryptjs');
const { PrismaClient, Prisma } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const prisma = new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL),
});

const products = [
  { name: 'Arroz selecto', category: 'Despensa', slug: 'despensa', price: '85.00', unit: 'libra' },
  { name: 'Habichuelas rojas', category: 'Despensa', slug: 'despensa', price: '65.00', unit: 'libra' },
  { name: 'Aceite de soya', category: 'Despensa', slug: 'despensa', price: '210.00', unit: 'botella' },
  { name: 'Azúcar blanca', category: 'Despensa', slug: 'despensa', price: '35.00', unit: 'libra' },
  { name: 'Salsa de tomate', category: 'Despensa', slug: 'despensa', price: '45.00', unit: 'lata' },
  { name: 'Leche entera', category: 'Lácteos', slug: 'lacteos', price: '72.00', unit: 'litro' },
  { name: 'Queso cheddar', category: 'Lácteos', slug: 'lacteos', price: '150.00', unit: 'libra' },
  { name: 'Yogurt natural', category: 'Lácteos', slug: 'lacteos', price: '60.00', unit: 'unidad' },
  { name: 'Mantequilla con sal', category: 'Lácteos', slug: 'lacteos', price: '85.00', unit: 'barra' },
  { name: 'Huevos frescos', category: 'Básicos', slug: 'basicos', price: '210.00', unit: 'cartón' },
  { name: 'Sal molida', category: 'Básicos', slug: 'basicos', price: '20.00', unit: 'libra' },
  { name: 'Ajo en pasta', category: 'Básicos', slug: 'basicos', price: '75.00', unit: 'frasco' },
  { name: 'Café molido', category: 'Básicos', slug: 'basicos', price: '180.00', unit: 'paquete' },
  { name: 'Pan sobao', category: 'Panadería', slug: 'panaderia', price: '95.00', unit: 'unidad' },
  { name: 'Pan de agua', category: 'Panadería', slug: 'panaderia', price: '5.00', unit: 'unidad' },
  { name: 'Galletas de soda', category: 'Panadería', slug: 'panaderia', price: '45.00', unit: 'paquete' },
  { name: 'Manzana roja', category: 'Frutas', slug: 'frutas', price: '38.00', unit: 'unidad' },
  { name: 'Guineo maduro', category: 'Frutas', slug: 'frutas', price: '8.00', unit: 'unidad' },
  { name: 'Naranja dulce', category: 'Frutas', slug: 'frutas', price: '15.00', unit: 'unidad' },
  { name: 'Limón persa', category: 'Frutas', slug: 'frutas', price: '12.00', unit: 'unidad' },
  { name: 'Piña', category: 'Frutas', slug: 'frutas', price: '120.00', unit: 'unidad' },
  { name: 'Pechuga de pollo', category: 'Carnes', slug: 'carnes', price: '165.00', unit: 'libra' },
  { name: 'Carne de res molida', category: 'Carnes', slug: 'carnes', price: '210.00', unit: 'libra' },
  { name: 'Chuleta de cerdo ahumada', category: 'Carnes', slug: 'carnes', price: '185.00', unit: 'libra' },
  { name: 'Salami super especial', category: 'Carnes', slug: 'carnes', price: '225.00', unit: 'libra' },
  { name: 'Cebolla roja', category: 'Vegetales', slug: 'vegetales', price: '45.00', unit: 'libra' },
  { name: 'Ají morrón', category: 'Vegetales', slug: 'vegetales', price: '65.00', unit: 'libra' },
  { name: 'Tomate barceló', category: 'Vegetales', slug: 'vegetales', price: '35.00', unit: 'libra' },
  { name: 'Papa blanca', category: 'Vegetales', slug: 'vegetales', price: '30.00', unit: 'libra' },
  { name: 'Zanahoria', category: 'Vegetales', slug: 'vegetales', price: '25.00', unit: 'libra' },
  { name: 'Agua purificada', category: 'Bebidas', slug: 'bebidas', price: '75.00', unit: 'botellón' },
  { name: 'Jugo de naranja', category: 'Bebidas', slug: 'bebidas', price: '110.00', unit: 'litro' },
  { name: 'Refresco de cola', category: 'Bebidas', slug: 'bebidas', price: '65.00', unit: 'litro' },
  { name: 'Detergente en polvo', category: 'Limpieza', slug: 'limpieza', price: '120.00', unit: 'funda' },
  { name: 'Cloro líquido', category: 'Limpieza', slug: 'limpieza', price: '55.00', unit: 'galón' },
  { name: 'Papel higiénico', category: 'Limpieza', slug: 'limpieza', price: '180.00', unit: 'paquete' },
  { name: 'Jabón de cuaba', category: 'Limpieza', slug: 'limpieza', price: '45.00', unit: 'pasta' },
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
