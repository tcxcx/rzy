import { create } from 'zustand';

const useRedemptionStore = create((set) => ({
  email: '',
  redeemedPromo: null,
  setEmail: (email) => set({ email }),
  setRedeemedPromo: (promo) => set({ redeemedPromo: promo }),
  clearRedemption: () => set({ email: '', redeemedPromo: null }),
}));

export default useRedemptionStore;
