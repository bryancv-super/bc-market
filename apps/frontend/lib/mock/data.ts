import { productImageUrls } from "@/lib/products/images";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  imageUrl: string;
};

export type ShoppingListItem = {
  id: string;
  productId: string;
  quantity: number;
  checked: boolean;
};

export type ShoppingList = {
  id: string;
  name: string;
  items: ShoppingListItem[];
};

export const mockUser = {
  id: "user-1",
  name: "Nombre completo",
  email: "ejemplo@correo.com",
};

const productBase: Array<Omit<Product, "imageUrl">> = [
  // Despensa
  { id: "product-1", name: "Arroz selecto", category: "Despensa", price: "RD$ 85.00", unit: "libra" },
  { id: "product-7", name: "Habichuelas rojas", category: "Despensa", price: "RD$ 65.00", unit: "libra" },
  { id: "product-8", name: "Aceite de soya", category: "Despensa", price: "RD$ 210.00", unit: "botella" },
  { id: "product-9", name: "Azúcar blanca", category: "Despensa", price: "RD$ 35.00", unit: "libra" },
  { id: "product-10", name: "Salsa de tomate", category: "Despensa", price: "RD$ 45.00", unit: "lata" },
  // Lácteos
  { id: "product-2", name: "Leche entera", category: "Lácteos", price: "RD$ 72.00", unit: "litro" },
  { id: "product-11", name: "Queso cheddar", category: "Lácteos", price: "RD$ 150.00", unit: "libra" },
  { id: "product-12", name: "Yogurt natural", category: "Lácteos", price: "RD$ 60.00", unit: "unidad" },
  { id: "product-13", name: "Mantequilla con sal", category: "Lácteos", price: "RD$ 85.00", unit: "barra" },
  // Básicos
  { id: "product-3", name: "Huevos frescos", category: "Básicos", price: "RD$ 210.00", unit: "cartón" },
  { id: "product-14", name: "Sal molida", category: "Básicos", price: "RD$ 20.00", unit: "libra" },
  { id: "product-15", name: "Ajo en pasta", category: "Básicos", price: "RD$ 75.00", unit: "frasco" },
  { id: "product-16", name: "Café molido", category: "Básicos", price: "RD$ 180.00", unit: "paquete" },
  // Panadería
  { id: "product-4", name: "Pan sobao", category: "Panadería", price: "RD$ 95.00", unit: "unidad" },
  { id: "product-17", name: "Pan de agua", category: "Panadería", price: "RD$ 5.00", unit: "unidad" },
  { id: "product-18", name: "Galletas de soda", category: "Panadería", price: "RD$ 45.00", unit: "paquete" },
  // Frutas
  { id: "product-5", name: "Manzana roja", category: "Frutas", price: "RD$ 38.00", unit: "unidad" },
  { id: "product-19", name: "Guineo maduro", category: "Frutas", price: "RD$ 8.00", unit: "unidad" },
  { id: "product-20", name: "Naranja dulce", category: "Frutas", price: "RD$ 15.00", unit: "unidad" },
  { id: "product-21", name: "Limón persa", category: "Frutas", price: "RD$ 12.00", unit: "unidad" },
  { id: "product-22", name: "Piña", category: "Frutas", price: "RD$ 120.00", unit: "unidad" },
  // Carnes
  { id: "product-6", name: "Pechuga de pollo", category: "Carnes", price: "RD$ 165.00", unit: "libra" },
  { id: "product-23", name: "Carne de res molida", category: "Carnes", price: "RD$ 210.00", unit: "libra" },
  { id: "product-24", name: "Chuleta de cerdo ahumada", category: "Carnes", price: "RD$ 185.00", unit: "libra" },
  { id: "product-25", name: "Salami super especial", category: "Carnes", price: "RD$ 225.00", unit: "libra" },
  // Vegetales
  { id: "product-26", name: "Cebolla roja", category: "Vegetales", price: "RD$ 45.00", unit: "libra" },
  { id: "product-27", name: "Ají morrón", category: "Vegetales", price: "RD$ 65.00", unit: "libra" },
  { id: "product-28", name: "Tomate barceló", category: "Vegetales", price: "RD$ 35.00", unit: "libra" },
  { id: "product-29", name: "Papa blanca", category: "Vegetales", price: "RD$ 30.00", unit: "libra" },
  { id: "product-30", name: "Zanahoria", category: "Vegetales", price: "RD$ 25.00", unit: "libra" },
  // Bebidas
  { id: "product-31", name: "Agua purificada", category: "Bebidas", price: "RD$ 75.00", unit: "botellón" },
  { id: "product-32", name: "Jugo de naranja", category: "Bebidas", price: "RD$ 110.00", unit: "litro" },
  { id: "product-33", name: "Refresco de cola", category: "Bebidas", price: "RD$ 65.00", unit: "litro" },
  // Limpieza
  { id: "product-34", name: "Detergente en polvo", category: "Limpieza", price: "RD$ 120.00", unit: "funda" },
  { id: "product-35", name: "Cloro líquido", category: "Limpieza", price: "RD$ 55.00", unit: "galón" },
  { id: "product-36", name: "Papel higiénico", category: "Limpieza", price: "RD$ 180.00", unit: "paquete" },
  { id: "product-37", name: "Jabón de cuaba", category: "Limpieza", price: "RD$ 45.00", unit: "pasta" },
];

export const mockProducts: Product[] = productBase.map((product) => ({
  ...product,
  imageUrl: productImageUrls[product.name] ?? productImageUrls["Arroz selecto"],
}));

export const mockLists: ShoppingList[] = [
  {
    id: "1",
    name: "Lista",
    items: [
      { id: "item-1", productId: "product-1", quantity: 2, checked: false },
      { id: "item-2", productId: "product-2", quantity: 1, checked: false },
      { id: "item-3", productId: "product-3", quantity: 1, checked: true },
    ],
  },
  { id: "2", name: "Lista", items: [] },
  { id: "3", name: "Lista", items: [] },
];

export function getProduct(productId: string) {
  return mockProducts.find((product) => product.id === productId);
}
