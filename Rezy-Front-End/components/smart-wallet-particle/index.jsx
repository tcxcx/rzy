import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from '@biconomy/account';
import { Bundler } from '@biconomy/bundler';
import { ChainId } from '@biconomy/core-types';
import {
    DEFAULT_ECDSA_OWNERSHIP_MODULE,
    ECDSAOwnershipValidationModule,
} from '@biconomy/modules';
import { BiconomyPaymaster } from '@biconomy/paymaster';
import { SmartAccount } from '@particle-network/aa';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import useScannerStore from '../../libs/context/useScannerStore';
import styles from '../../styles/Home.module.css';
import Button from '../lunar/Button';
import WalletCard from '../smart-wallet/WalletCard';
const ParticleWallet = () => {
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const setWalletAddress = useScannerStore((state) => state.setWalletAddress);
    const [smartAccount, setSmartAccount] = useState(null);
    const [web3Provider, setWeb3Provider] = useState(null);

    useEffect(() => {
        const localWeb3Provider = new ethers.providers.JsonRpcProvider('https://evm.shibuya.astar.network/');
        setWeb3Provider(localWeb3Provider);

        const bundler = new Bundler({
            bundlerUrl: process.env.NEXT_PUBLIC_BICONOMY_BUNDLER_API,
            chainId: ChainId.ASTAR_TESTNET,
            entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        });

        const paymaster = new BiconomyPaymaster({
            paymasterUrl: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_API,
        });

        const initSmartAccount = new SmartAccount(web3Provider, {
            projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID,
            clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY,
            appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID,
            aaOptions: {
                accountContracts: {
                    BICONOMY: [
                        {
                            version: '2.0.0',
                            chainIds: [81],
                        },
                    ],
                },
                paymasterApiKeys: [{
                    chainId: 81,
                    apiKey: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_API,
                }],
            },
        });

        setSmartAccount(initSmartAccount);
    }, []);

    const connect = async () => {
        if (!smartAccount || !web3Provider) return;

        try {
            setLoading(true);
            const userInfo = await smartAccount;
            console.log('Logged in user:', userInfo);

            const validationModule = await ECDSAOwnershipValidationModule.create({
                signer: web3Provider.getSigner(),
                moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
            });

            let biconomySmartAccount = await BiconomySmartAccountV2.create({
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
                        balanceDisplay={balanceDisplay}
                    />
                </>
            )}
        </main>
    );
};

export default ParticleWallet;



// setLoading(true);
// const userInfo = await smartAccount;
// console.log('Logged in user:', userInfo);
// const web3Provider = new ethers.providers.JsonRpcProvider('https://evm.shibuya.astar.network/');
// setProvider(web3Provider);
// console.log('web3Provider:', web3Provider);
