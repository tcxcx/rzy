import { useState } from 'react';
import useScannerStore from '../libs/context/useScannerStore';
export const usePostCartData = () => {
  const { cart, resetCart } = useScannerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postCartData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3500/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        throw new Error('Failed to post cart data');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { postCartData, isLoading, error };
};
