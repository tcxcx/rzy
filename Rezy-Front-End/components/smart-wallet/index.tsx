import {
  BiconomySmartAccountV2,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from '@biconomy/account';
import { Bundler, IBundler } from '@biconomy/bundler';
import { ChainId } from '@biconomy/core-types';
import {
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
  ECDSAOwnershipValidationModule,
} from '@biconomy/modules';
import { ParticleAuthModule, ParticleProvider } from '@biconomy/particle-auth';
import { BiconomyPaymaster, IPaymaster } from '@biconomy/paymaster';
import { useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { LOYALTY_CARD_CONTRACT_ADDRESS } from '../../config/contracts';
import useScannerStore from '../../libs/context/useScannerStore';
import styles from '../../styles/Home.module.css';
import Button from '../lunar/Button';
import WalletCard from './WalletCard';
const BiconomyParticleWallet = ({ goToNextStep, balance, balanceDisplay }) => {
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);

  // const shibuyaNetwork = {
  //   name: 'shibuya',
  //   chainId: 81,
  //   _defaultProvider: (providers) =>
  //     new providers.JsonRpcProvider('https://evm.shibuya.astar.network/'),
  // };

  const [provider, setProvider] = useState<ethers.providers.Provider | null>(
    null,
  );

  const setWalletAddress = useScannerStore((state) => state.setWalletAddress);

  const particle = new ParticleAuthModule.ParticleNetwork({
    appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID,
    chainId: ChainId.ASTAR_TESTNET,
    projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID,
    clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY,
    wallet: {
      displayWalletEntry: false,
      defaultWalletEntryPosition: ParticleAuthModule.WalletEntryPosition.BR,
    },
    // chainName: "Shibuya Testnet",
  });

  const bundler: IBundler = new Bundler({
    bundlerUrl: process.env.NEXT_PUBLIC_BICONOMY_BUNDLER_API,
    chainId: ChainId.ASTAR_TESTNET,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  });

  const paymaster: IPaymaster = new BiconomyPaymaster({
    paymasterUrl: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_API,
  });

  const { contract } = useContract(LOYALTY_CARD_CONTRACT_ADDRESS);
  const { data: nfts, isLoading: nftsLoading } = useOwnedNFTs(
    contract,
    address,
  );

  const connect = async () => {
    try {
      setLoading(true);
      const userInfo = await particle.auth.login();
      console.log('Logged in user:', userInfo);
      const particleProvider = new ParticleProvider(particle.auth);
      const web3Provider = new ethers.providers.Web3Provider(
        particleProvider,
        // shibuyaNetwork,
        'any',
      );
      setProvider(web3Provider);

      const validationModule = await ECDSAOwnershipValidationModule.create({
        signer: web3Provider.getSigner(),
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
      });

      const biconomySmartAccount = await BiconomySmartAccountV2.create({
        chainId: ChainId.ASTAR_TESTNET,
        bundler: bundler,
        paymaster: paymaster,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: validationModule,
        activeValidationModule: validationModule,
      });
      setAddress(await biconomySmartAccount.getAccountAddress());
      setSmartAccount(biconomySmartAccount);
      setWalletAddress(await biconomySmartAccount.getAccountAddress());
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  console.log('nparticle wallet info', particle);
  console.log('Biconomy Account Details', {
    isInstanceOfBiconomySmartAccountV2:
      smartAccount instanceof BiconomySmartAccountV2,
    chainId: smartAccount?.chainId,
    validationModule: smartAccount?.defaultValidationModule,
    activeValidationModule: smartAccount?.activeValidationModule,
    entryPointAddress: smartAccount?.entryPointAddress,
    bundler: smartAccount?.bundler,
    paymaster: smartAccount?.paymaster,
    accountAddress: smartAccount?.accountAddress,
  });
  console.log(
    'biconomySmartAccount',
    smartAccount && smartAccount instanceof BiconomySmartAccountV2,
  );

  return (
    <main className={styles.main}>
      {!loading && !address && (
        <div className="pt-4">
          <Button text="Connect Wallet" onClick={connect} />
        </div>
      )}
      {loading && <p>Loading Smart Account...</p>}
      {address && (
        <>
          <WalletCard
            address={address}
            balance={balance}
            smartAccount={smartAccount}
            goToNextStep={goToNextStep}
            balanceDisplay={balanceDisplay} // Pass it down to WalletCard
          />
          {/* // nft points minter would go here. Not working due to Particle auth not accepting custom chains. */}
          {/* {!nftsLoading &&
            (nfts && nfts.length > 0 ? (
              nfts.map((nft) => (
                <NFTCard
                  key={nft.metadata.id}
                  nft={nft}
                  tokenID={nft.metadata.id}
                />
              ))
            ) : (
              <>
                <p>No Loyalty Card</p>
                {smartAccount && provider && (
                  <Minter
                    smartAccount={smartAccount}
                    address={address}
                    provider={provider}
                  />
                )}
              </>
            ))} */}
        </>
      )}
    </main>
  );
};

export default BiconomyParticleWallet;
