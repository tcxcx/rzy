import { useEffect } from 'react';
import useStepperStore from '../libs/context/useStepperStore.js';

// This is a mock function, replace it with your actual wallet disconnect listener
const useWalletDisconnect = () => {
  const { resetSteps } = useStepperStore();

  useEffect(() => {
    const handleWalletDisconnect = () => {
      // Logic to handle wallet disconnection
      resetSteps(); // Reset the stepper to step 0
    };

    // Add your wallet disconnection event listener here
    // For example: wallet.on('disconnect', handleWalletDisconnect);

    return () => {
      // Clean up the event listener when the component unmounts
      // For example: wallet.off('disconnect', handleWalletDisconnect);
    };
  }, [resetSteps]);
};

export default useWalletDisconnect;
