import { create } from 'zustand';

const usePromoStore = create((set) => ({
  email: '',
  walletAddress: '',
  redeemedPromo: null,
  setEmail: (email) => set({ email }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  setRedeemedPromo: (promo) => set({ redeemedPromo: promo }),
  clearRedemption: () => set({ email: '', redeemedPromo: null }),
}));

export default usePromoStore;
