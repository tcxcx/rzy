import { useState } from 'react';
import { toast } from 'sonner';
import useScannerStore from '../../libs/context/useScannerStore';

export const usePostCartData = () => {
  const { cart, walletAddress, resetCart } = useScannerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postCartData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const requestBody = { cart, walletAddress };
      const response = await fetch('https://rezy-products.onrender.com/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to post cart data');
      }

      console.log('This is the sent request body:', requestBody);
      console.log('This is the sent cart:', cart);

      toast.success(
        'Checkout successful! Your PET tokens are underway upon arrival at our facility!',
      );
    } catch (error) {
      setError(error.message);
      toast.error('Error during checkout: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { postCartData, isLoading, error };
};
