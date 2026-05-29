export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  unit: string;
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

export const mockProducts: Product[] = [
  { id: "product-1", name: "Arroz selecto", category: "Despensa", price: "RD$ 85.00", unit: "libra" },
  { id: "product-2", name: "Leche entera", category: "Lacteos", price: "RD$ 72.00", unit: "litro" },
  { id: "product-3", name: "Huevos frescos", category: "Basicos", price: "RD$ 210.00", unit: "carton" },
  { id: "product-4", name: "Pan sobao", category: "Panaderia", price: "RD$ 95.00", unit: "unidad" },
  { id: "product-5", name: "Manzana roja", category: "Frutas", price: "RD$ 38.00", unit: "unidad" },
  { id: "product-6", name: "Pechuga de pollo", category: "Carnes", price: "RD$ 165.00", unit: "libra" },
];

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
  return mockProducts.find((product) => product.id === productId) ?? mockProducts[0];
}
