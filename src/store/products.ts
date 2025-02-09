import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  title: string;
  image: string;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (title: string, image: string) => void;
  deleteProduct: (id: number) => void;
  lastFetched: number | null;
}

const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      lastFetched: null,
      setProducts: (products) =>
        set({
          products,
          lastFetched: Date.now(),
        }),
      addProduct: (title, image) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              id: Date.now(),
              title,
              image,
            },
          ],
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
    }),
    {
      name: "products-storage",
    },
  ),
);

export default useProductStore;
