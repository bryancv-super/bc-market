const bcrypt = require('bcryptjs');
const { PrismaClient, Prisma } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const prisma = new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL),
});

const productImages = {
  'Arroz selecto': 'https://loremflickr.com/320/320/rice?lock=1',
  'Habichuelas rojas': 'https://loremflickr.com/320/320/red,beans?lock=2',
  'Aceite de soya': 'https://loremflickr.com/320/320/cooking,oil?lock=3',
  'Azúcar blanca': 'https://loremflickr.com/320/320/sugar?lock=4',
  'Salsa de tomate': 'https://loremflickr.com/320/320/tomato,sauce?lock=5',
  'Leche entera': 'https://loremflickr.com/320/320/milk?lock=6',
  'Queso cheddar': 'https://loremflickr.com/320/320/cheddar,cheese?lock=7',
  'Yogurt natural': 'https://loremflickr.com/320/320/yogurt?lock=8',
  'Mantequilla con sal': 'https://loremflickr.com/320/320/butter?lock=9',
  'Huevos frescos': 'https://loremflickr.com/320/320/eggs?lock=10',
  'Sal molida': 'https://loremflickr.com/320/320/salt?lock=11',
  'Ajo en pasta': 'https://loremflickr.com/320/320/garlic?lock=12',
  'Café molido': 'https://loremflickr.com/320/320/coffee?lock=13',
  'Pan sobao': 'https://loremflickr.com/320/320/bread?lock=14',
  'Pan de agua': 'https://loremflickr.com/320/320/baguette?lock=15',
  'Galletas de soda': 'https://loremflickr.com/320/320/crackers?lock=16',
  'Manzana roja': 'https://loremflickr.com/320/320/red,apple?lock=17',
  'Guineo maduro': 'https://loremflickr.com/320/320/banana?lock=18',
  'Naranja dulce': 'https://loremflickr.com/320/320/orange,fruit?lock=19',
  'Limón persa': 'https://loremflickr.com/320/320/lime?lock=20',
  Piña: 'https://loremflickr.com/320/320/pineapple?lock=21',
  'Pechuga de pollo': 'https://loremflickr.com/320/320/chicken,breast?lock=22',
  'Carne de res molida': 'https://loremflickr.com/320/320/ground,beef?lock=23',
  'Chuleta de cerdo ahumada': 'https://loremflickr.com/320/320/pork,chop?lock=24',
  'Salami super especial': 'https://loremflickr.com/320/320/salami?lock=25',
  'Cebolla roja': 'https://loremflickr.com/320/320/red,onion?lock=26',
  'Ají morrón': 'https://loremflickr.com/320/320/bell,pepper?lock=27',
  'Tomate barceló': 'https://loremflickr.com/320/320/tomato?lock=28',
  'Papa blanca': 'https://loremflickr.com/320/320/potato?lock=29',
  Zanahoria: 'https://loremflickr.com/320/320/carrot?lock=30',
  'Agua purificada': 'https://loremflickr.com/320/320/water,bottle?lock=31',
  'Jugo de naranja': 'https://loremflickr.com/320/320/orange,juice?lock=32',
  'Refresco de cola': 'https://loremflickr.com/320/320/cola,soda?lock=33',
  'Detergente en polvo': 'https://loremflickr.com/320/320/laundry,detergent?lock=34',
  'Cloro líquido': 'https://loremflickr.com/320/320/cleaning,bottle?lock=35',
  'Papel higiénico': 'https://loremflickr.com/320/320/toilet,paper?lock=36',
  'Jabón de cuaba': 'https://loremflickr.com/320/320/soap?lock=37',
};

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
      passwordHash: bcrypt.hashSync('Password123!', 10),
    },
    create: {
      username: 'Demo User',
      email: 'demo@bcmarket.com',
      passwordHash: bcrypt.hashSync('Password123!', 10),
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
      imageUrl: productImages[product.name] || 'https://loremflickr.com/320/320/grocery?lock=99',
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
