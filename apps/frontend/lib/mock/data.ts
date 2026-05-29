export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
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
  { id: "product-1", name: "Producto", category: "Categoria", price: "RD$ 0.00" },
  { id: "product-2", name: "Producto", category: "Categoria", price: "RD$ 0.00" },
  { id: "product-3", name: "Producto", category: "Categoria", price: "RD$ 0.00" },
];

export const mockLists: ShoppingList[] = [
  {
    id: "1",
    name: "Lista",
    items: [
      { id: "item-1", productId: "product-1", quantity: 0, checked: false },
      { id: "item-2", productId: "product-2", quantity: 0, checked: false },
      { id: "item-3", productId: "product-3", quantity: 0, checked: false },
    ],
  },
  { id: "2", name: "Lista", items: [] },
  { id: "3", name: "Lista", items: [] },
];

export function getProduct(productId: string) {
  return mockProducts.find((product) => product.id === productId) ?? mockProducts[0];
}
