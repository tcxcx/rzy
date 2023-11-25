import { create } from 'zustand';

const useStepperStore = create((set) => ({
  currentStep: 0,
  steps: [
    { label: 'Details', completed: false },
    { label: 'Scan', completed: false },
    { label: 'Payment', completed: false },
  ],
  setCurrentStep: (stepIndex) => set(() => ({ currentStep: stepIndex })),
  setStepCompleted: (stepIndex, completed) =>
    set((state) => ({
      steps: state.steps.map((step, index) =>
        index === stepIndex ? { ...step, completed } : step,
      ),
    })),
  nextStep: () =>
    set((state) => {
      const nextIndex = state.currentStep + 1;
      // Ensure we don't go beyond the last step
      return {
        currentStep:
          nextIndex < state.steps.length ? nextIndex : state.currentStep,
      };
    }),
  prevStep: () =>
    set((state) => ({
      currentStep: state.currentStep > 0 ? state.currentStep - 1 : 0,
    })),

  resetSteps: () =>
    set(() => ({
      currentStep: 0,
      steps: [
        { label: 'Details', completed: false },
        { label: 'Scan', completed: false },
        { label: 'Payment', completed: false },
      ],
    })),

  walletAddress: null,
  setWalletAddress: (address) => {
    console.log("Setting wallet address in context:", address);
    set(() => ({ walletAddress: address }));
  },

  setWalletConnected: (connected) => {
    console.log("Setting wallet connection status in context:", connected);
    set(() => ({ isWalletConnected: connected }));
  },
}));


export default useStepperStore;
