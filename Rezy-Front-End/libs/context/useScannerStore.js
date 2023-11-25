import { create } from 'zustand';
import productList from '../../config/products.json';

const useScannerStore = create((set) => ({
  isLoading: false,
  isScanning: false,
  product: null,
  isProductRecognized: false,
  products: productList,
  walletAddress: null,
  tokenBalance: 0,
  lastUpdated: null,
  cart: [],

  setWalletAddress: (address) => set({ walletAddress: address }),
  setTokenBalance: (balance, lastUpdated = new Date().toISOString()) =>
    set({ tokenBalance: balance, lastUpdated }),

  toggleScanning: () =>
    set((state) => ({
      isScanning: !state.isScanning,
      product: null,
      isProductRecognized: false,
    })),

  addToCart: (productId) =>
    set((state) => {
      const productToAdd = state.products.find((p) => p.Id === productId);
      if (productToAdd) {
        return { cart: [...state.cart, productToAdd] };
      }
      return {};
    }),

  resetCart: () =>
    set((state) => {
      if (state.cart.length > 0) {
        return { cart: [] };
      }
      return state;
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.Id !== productId),
    })),

  onDetected: (result) =>
    set((state) => {
      const matchedProduct = state.products.find((p) => p.Id === result);
      if (matchedProduct) {
        return {
          product: matchedProduct,
          isProductRecognized: true,
          isScanning: false,
        };
      }
      return { isProductRecognized: false, isScanning: false };
    }),

  closeScannerModal: () => set({ isScanning: false }),
}));

export default useScannerStore;
