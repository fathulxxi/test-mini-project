import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  total: 0,
  loading: false,
  error: null,
  searchQuery: '',
  setProducts: (products, total) => set({ products, total }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  updateProduct: (id, updated) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    })),
  removeProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
}));

export default useProductStore;
