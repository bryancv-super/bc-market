"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { mockLists, mockProducts, mockUser, ShoppingList } from "@/lib/mock/data";

type AppState = {
  user: typeof mockUser;
  products: typeof mockProducts;
  lists: ShoppingList[];
  createList: (name: string) => void;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState(mockLists);

  const value = useMemo<AppState>(
    () => ({
      user: mockUser,
      products: mockProducts,
      lists,
      createList: (name: string) => {
        setLists((current) => [{ id: `${Date.now()}`, name, items: [] }, ...current]);
      },
    }),
    [lists],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }
  return context;
}
