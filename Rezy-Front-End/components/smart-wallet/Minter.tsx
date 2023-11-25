import { BiconomySmartAccountV2 } from '@biconomy/account';
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from '@biconomy/paymaster';
import { ThirdwebSDK, useContract } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { toast } from 'sonner';
import { LOYALTY_CARD_CONTRACT_ADDRESS } from '../../config/contracts';
import Button from '../lunar/Button';
// Shibuya
const nftAddress = '0x226F3Ef817C616a91D74DDB17EA9707166Dcd02C';

interface Props {
  smartAccount: BiconomySmartAccountV2;
  address: string;
  provider: ethers.providers.Provider;
}

const Minter: React.FC<Props> = ({ smartAccount, address, provider }) => {
  const [minted, setMinted] = useState(false);
  const { contract } = useContract(LOYALTY_CARD_CONTRACT_ADDRESS);

  const metadata = {
    name: 'Loyalty Card Tokyo Torch Tower',
    description:
      'This is non-transferrable Rezy Loyalty Tokyo Torch Tower Card for ${address}',
    image:
      'https://ee15244aad2d3370346d179c83b8e8b4.ipfscdn.io/ipfs/QmVqfEqBHZ5asraS71rFVutzmZrwtfcxxcimfWtXmnnYxy',
    attributes: {
      trait_type: 'Points',
      value: '0',
    },
  };
  const handleMint = async () => {
    // const contract = new ethers.Contract(nftAddress, abi, provider);
    try {
      toast.success('Minting your NFT...');
      const sdk = new ThirdwebSDK(provider);
      const LoyaltyCardContract = await sdk.getContract(
        LOYALTY_CARD_CONTRACT_ADDRESS,
      );

      // Fetching signed payload from your server
      const response = await fetch('/api/generate-sig', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      const { signedPayload } = await response.json();
      console.log({ signedPayload });
      const minTx =
        await LoyaltyCardContract.erc721.signature.mint(signedPayload);

      const txDataString = minTx.toString();

      console.log(minTx);
      const tx1 = {
        to: nftAddress,
        data: txDataString,
      };
      console.log('here before userop');
      let userOp = await smartAccount.buildUserOp([tx1]);
      console.log({ userOp });
      const biconomyPaymaster =
        smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
      let paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
        smartAccountInfo: {
          name: 'BICONOMY',
          version: '2.0.0',
        },
      };
      const paymasterAndDataResponse =
        await biconomyPaymaster.getPaymasterAndData(
          userOp,
          paymasterServiceData,
        );

      userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
      const userOpResponse = await smartAccount.sendUserOp(userOp);
      console.log('userOpHash', userOpResponse);
      const { receipt } = await userOpResponse.wait(1);
      console.log('txHash', receipt.transactionHash);
      setMinted(true);
      toast.success(
        `Success! Here is your transaction:${receipt.transactionHash} `,
      );
    } catch (err: any) {
      console.error(err);
      console.log(err);
    }
  };
  return (
    <>
      {address && <Button text="Mint NFT" onClick={handleMint} />}
      {minted && (
        <a href={`https://shibuya.subscan.io/account/${address}`}>
          {' '}
          Click to view minted nfts for smart account
        </a>
      )}
    </>
  );
};

export default Minter;
