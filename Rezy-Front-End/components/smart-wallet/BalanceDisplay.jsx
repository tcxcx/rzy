import { useContract, useTokenBalance } from '@thirdweb-dev/react';
import React, { useEffect } from 'react';
import { PET_ERC20_CONTRACT_ADDRESS } from '../../config/contracts';
import useScannerStore from '../../libs/context/useScannerStore';


function BalanceDisplay() {
    const walletAddress = useScannerStore((state) => state.walletAddress);
    const { contract } = useContract(PET_ERC20_CONTRACT_ADDRESS);
    const tokenBalance = useScannerStore((state) => state.tokenBalance);
    const setTokenBalance = useScannerStore((state) => state.setTokenBalance);

    const { data: balance, isLoading, error } = useTokenBalance(contract, walletAddress);

    // Update the Zustand store when balance changes
    useEffect(() => {
        if (balance) {
            setTokenBalance(balance.displayValue);
        }
    }, [balance, setTokenBalance]);

    console.log("walletAddress and PET balance", walletAddress, tokenBalance);
    let content;
    if (isLoading) {
        content = <span>Loading...</span>;
    } else if (error) {
        content = <span>Error: {error.message}</span>;
    } else if (balance) {
        content = <span>{balance.displayValue} {balance.symbol}</span>;
    } else {
        content = <span>Balance not available</span>;
    }

    return (
        <div className='text-lg inline-block py-4'>
            <h1 className='font-basement'>My Balance is: <span className='text-basement-green'>{content}</span></h1>
        </div>
    );
}

export default BalanceDisplay;
