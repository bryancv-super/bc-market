export const categoryImageUrls: Record<string, string> = {
  Frutas: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=320&q=80",
  Vegetales: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=320&q=80",
  Lácteos: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=320&q=80",
  Carnes: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=320&q=80",
  Panadería: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=320&q=80",
  Despensa: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=320&q=80",
  Básicos: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=320&q=80",
  Bebidas: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=320&q=80",
  Limpieza: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=320&q=80",
};

export function getProductImageUrl(category?: string, imageUrl?: string | null) {
  return imageUrl || (category ? categoryImageUrls[category] : null) || categoryImageUrls.Despensa;
}
