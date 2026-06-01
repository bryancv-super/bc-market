"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchLists,
  fetchProducts,
  createRemoteList,
  updateRemoteListName,
  deleteRemoteList,
  addItemToList,
  updateListItem,
  removeListItem,
} from "@/lib/api/market";
import { mockUser, Product, ShoppingList } from "@/lib/mock/data";

type AppState = {
  user: typeof mockUser;
  products: Product[];
  lists: ShoppingList[];
  createList: (name: string) => ShoppingList;
  createListWithProduct: (name: string, productId: string, quantity: number) => void;
  addProductToList: (listId: string, productId: string, quantity?: number) => void;
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
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchLists().then(setLists);
  }, []);

  const value = useMemo<AppState>(() => {
    function createList(name: string) {
      const tempList = { id: `temp-${Date.now()}`, name, items: [] };
      setLists((current) => [tempList, ...current]);
      createRemoteList(name).then((newList) => {
        setLists((current) => current.map((list) => (list.id === tempList.id ? newList : list)));
      });
      return tempList;
    }

    function createListWithProduct(name: string, productId: string, quantity: number) {
      const normalizedQuantity = Math.max(1, quantity);
      const tempList = {
        id: `temp-${Date.now()}`,
        name,
        items: [{ id: `temp-item-${Date.now()}`, productId, quantity: normalizedQuantity, checked: false }],
      };

      setLists((current) => [tempList, ...current]);
      createRemoteList(name)
        .then((newList) => addItemToList(newList.id, productId, normalizedQuantity))
        .then((updatedList) => {
          setLists((current) => current.map((list) => (list.id === tempList.id ? updatedList : list)));
        });
    }

    function addProductToList(listId: string, productId: string, quantity = 1) {
      const list = lists.find((l) => l.id === listId);
      if (!list) return;
      const existingItem = list.items.find((item) => item.productId === productId);
      const normalizedQuantity = Math.max(1, quantity);

      if (existingItem) {
        updateItemQuantity(listId, existingItem.id, existingItem.quantity + normalizedQuantity);
        return;
      }

      setLists((current) =>
        current.map((l) =>
          l.id === listId
            ? {
                ...l,
                items: [...l.items, { id: `temp-${Date.now()}`, productId, quantity: normalizedQuantity, checked: false }],
              }
            : l,
        ),
      );
      addItemToList(listId, productId, normalizedQuantity).then((updatedList) => {
        setLists((current) => current.map((l) => (l.id === listId ? updatedList : l)));
      });
    }

    function toggleItem(listId: string, itemId: string) {
      const list = lists.find((l) => l.id === listId);
      const item = list?.items.find((i) => i.id === itemId);
      if (!item) return;

      const newChecked = !item.checked;
      setLists((current) =>
        current.map((l) =>
          l.id === listId
            ? {
                ...l,
                items: l.items.map((i) => (i.id === itemId ? { ...i, checked: newChecked } : i)),
              }
            : l,
        ),
      );
      updateListItem(listId, itemId, { checked: newChecked }).then((updatedList) => {
        setLists((current) => current.map((l) => (l.id === listId ? updatedList : l)));
      });
    }

    function updateItemQuantity(listId: string, itemId: string, quantity: number) {
      const newQuantity = Math.max(1, quantity);
      setLists((current) =>
        current.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) =>
                  item.id === itemId ? { ...item, quantity: newQuantity } : item,
                ),
              }
            : list,
        ),
      );
      updateListItem(listId, itemId, { quantity: newQuantity }).then((updatedList) => {
        setLists((current) => current.map((l) => (l.id === listId ? updatedList : l)));
      });
    }

    function replaceListItems(listId: string, items: ShoppingList["items"]) {
      // Optamos por actualizar el UI y no disparar múltiples requests bulk por ahora.
      // Ya que replaceListItems solo se usa si hubiera DnD o similar, 
      // lo mantenemos local hasta recargar.
      setLists((current) => current.map((list) => (list.id === listId ? { ...list, items } : list)));
    }

    function removeItem(listId: string, itemId: string) {
      setLists((current) =>
        current.map((list) =>
          list.id === listId ? { ...list, items: list.items.filter((item) => item.id !== itemId) } : list,
        ),
      );
      removeListItem(listId, itemId).then((updatedList) => {
        setLists((current) => current.map((l) => (l.id === listId ? updatedList : l)));
      });
    }

    function clearList(listId: string) {
      const list = lists.find((l) => l.id === listId);
      if (!list) return;
      setLists((current) => current.map((l) => (l.id === listId ? { ...l, items: [] } : l)));
      // Para limpiar toda la lista, hacemos llamadas individuales o la recreamos
      Promise.all(list.items.map((item) => removeListItem(listId, item.id))).then(() => {
        fetchLists().then(setLists);
      });
    }

    function updateListName(listId: string, name: string) {
      setLists((current) => current.map((list) => (list.id === listId ? { ...list, name } : list)));
      updateRemoteListName(listId, name).then((updatedList) => {
        setLists((current) => current.map((l) => (l.id === listId ? updatedList : l)));
      });
    }

    function deleteList(listId: string) {
      setLists((current) => current.filter((list) => list.id !== listId));
      deleteRemoteList(listId);
    }

    return {
      user: mockUser,
      products,
      lists,
      createList,
      createListWithProduct,
      addProductToList,
      toggleItem,
      updateItemQuantity,
      replaceListItems,
      removeItem,
      clearList,
      updateListName,
      deleteList,
    };
  }, [lists, products]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }
  return context;
}
