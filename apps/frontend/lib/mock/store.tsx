"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { mockLists, mockProducts, mockUser, Product, ShoppingList } from "@/lib/mock/data";

type AppState = {
  user: typeof mockUser;
  products: Product[];
  lists: ShoppingList[];
  createList: (name: string) => ShoppingList;
  addProductToList: (listId: string, productId: string) => void;
  toggleItem: (listId: string, itemId: string) => void;
  updateItemQuantity: (listId: string, itemId: string, quantity: number) => void;
  replaceListItems: (listId: string, items: ShoppingList["items"]) => void;
  removeItem: (listId: string, itemId: string) => void;
  clearList: (listId: string) => void;
  updateListName: (listId: string, name: string) => void;
  deleteList: (listId: string) => void;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState(mockLists);

  const value = useMemo<AppState>(() => {
    function createList(name: string) {
      const list = { id: `${Date.now()}`, name, items: [] };
      setLists((current) => [list, ...current]);
      return list;
    }

    function addProductToList(listId: string, productId: string) {
      setLists((current) =>
        current.map((list) => {
          if (list.id !== listId) {
            return list;
          }

          const existingItem = list.items.find((item) => item.productId === productId);

          if (existingItem) {
            return {
              ...list,
              items: list.items.map((item) =>
                item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }

          return {
            ...list,
            items: [
              ...list.items,
              {
                id: `item-${Date.now()}`,
                productId,
                quantity: 1,
                checked: false,
              },
            ],
          };
        }),
      );
    }

    function toggleItem(listId: string, itemId: string) {
      setLists((current) =>
        current.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) =>
                  item.id === itemId ? { ...item, checked: !item.checked } : item,
                ),
              }
            : list,
        ),
      );
    }

    function updateItemQuantity(listId: string, itemId: string, quantity: number) {
      setLists((current) =>
        current.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) =>
                  item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item,
                ),
              }
            : list,
        ),
      );
    }

    function replaceListItems(listId: string, items: ShoppingList["items"]) {
      setLists((current) => current.map((list) => (list.id === listId ? { ...list, items } : list)));
    }

    function removeItem(listId: string, itemId: string) {
      setLists((current) =>
        current.map((list) =>
          list.id === listId ? { ...list, items: list.items.filter((item) => item.id !== itemId) } : list,
        ),
      );
    }

    function clearList(listId: string) {
      setLists((current) => current.map((list) => (list.id === listId ? { ...list, items: [] } : list)));
    }

    function updateListName(listId: string, name: string) {
      setLists((current) => current.map((list) => (list.id === listId ? { ...list, name } : list)));
    }

    function deleteList(listId: string) {
      setLists((current) => current.filter((list) => list.id !== listId));
    }

    return {
      user: mockUser,
      products: mockProducts,
      lists,
      createList,
      addProductToList,
      toggleItem,
      updateItemQuantity,
      replaceListItems,
      removeItem,
      clearList,
      updateListName,
      deleteList,
    };
  }, [lists]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }
  return context;
}
