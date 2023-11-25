import { PayloadToSign721withQuantity, ThirdwebSDK } from '@thirdweb-dev/react';
import { NextApiRequest, NextApiResponse } from 'next';
import { LOYALTY_CARD_CONTRACT_ADDRESS } from '../../config/contracts';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { address } = JSON.parse(req.body);
    if (!process.env.PRIVATE_KEY) {
      return new Error('PRIVATE_KEY not set');
    }

    const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, {
      rpc: ['https://evm.shibuya.astar.network/'],
      chainId: 81,
      nativeCurrency: {
        symbol: 'SBY',
        name: 'Shibuya',
        decimals: 18,
      },
      slug: 'shibuya',
    });
    const LoyaltyCardContract = await sdk.getContract(
      LOYALTY_CARD_CONTRACT_ADDRESS,
    );

    const payload: PayloadToSign721withQuantity = {
      to: address,
      metadata: {
        name: 'Loyalty Card Tokyo Torch Tower',
        description:
          'This is non-transferrable Rezy Loyalty Tokyo Torch Tower Card for ${address}',
        image:
          'https://ee15244aad2d3370346d179c83b8e8b4.ipfscdn.io/ipfs/QmVqfEqBHZ5asraS71rFVutzmZrwtfcxxcimfWtXmnnYxy',
        attributes: {
          trait_type: 'Points',
          value: '0',
        },
      },
    };

    const signedPayload =
      await LoyaltyCardContract.erc721.signature.generate(payload);

    return res
      .status(200)
      .json({ signedPayload: JSON.parse(JSON.stringify(signedPayload)) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
