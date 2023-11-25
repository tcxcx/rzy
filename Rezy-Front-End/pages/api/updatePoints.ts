import { NFT, ThirdwebSDK } from '@thirdweb-dev/react';

import { LOYALTY_CARD_CONTRACT_ADDRESS } from '../../config/contracts';

export default async function updateLoyaltyCard(
  nft: NFT,
  loyaltyCardPoints: number,
  nftTokenId: string,
) {
  try {
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.PRIVATE_KEY,
      {
        rpc: ['https://evm.shibuya.astar.network/'],
        chainId: 81,
        nativeCurrency: {
          symbol: 'SBY',
          name: 'Shibuya',
          decimals: 18,
        },
        slug: 'shibuya',
      },
      {
        clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
      },
    );
    console.log('SDK created');

    const loyaltyContract = await sdk.getContract(
      LOYALTY_CARD_CONTRACT_ADDRESS,
    );

    const metadata = {
      ...nft.metadata,
      attributes: [
        {
          trait_type: 'Points',
          value: loyaltyCardPoints + 10,
        },
      ],
    };

    if (true) {
      const updateNFT = await loyaltyContract.erc721.update(
        nftTokenId,
        metadata,
      );
      alert('Points updated successfully');
    } else {
      alert("You can't update points for this card");
      return { error: "You can't update points for this card" };
    }
    return { success: 'points updated!' };
  } catch (error) {
    console.error(error);
  }
}
