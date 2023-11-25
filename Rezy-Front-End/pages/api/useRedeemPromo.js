import useRedemptionStore from '../../libs/context/useRedemptionStore'; // Adjust the path as needed
import useScannerStore from '../../libs/context/useScannerStore'; // Adjust the path as needed

const useRedeemPromo = () => {
  const redeemPromo = async () => {
    const { walletAddress, tokenBalance } = useScannerStore.getState();
    const { email, redeemedPromo } = useRedemptionStore.getState();

    if (!walletAddress || !redeemedPromo) {
      console.error('Missing wallet address or promo details');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/redeem-promo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_address: walletAddress,
          businessName: redeemedPromo.businessName,
          tokens: redeemedPromo.tokens,
          email: email,
          tokenBalance: tokenBalance,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to redeem promo');
      }

      const responseData = await response.json();
      console.log('Promo redeemed successfully:', responseData);
      // Handle any post-redeem actions here
    } catch (error) {
      console.error('Error redeeming promo:', error);
    }
  };

  return { redeemPromo };
};

export default useRedeemPromo;
