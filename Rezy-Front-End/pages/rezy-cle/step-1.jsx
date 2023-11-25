'use client';

import { useAddress } from "@thirdweb-dev/react";
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
// import AccountAbsWallet from '../../components/wallet/index.jsx';
import BalanceDisplay from "../../components/smart-wallet/BalanceDisplay.jsx";
import BiconomyParticleWallet from '../../components/smart-wallet/index.tsx';
import useHoverEffect from '../../hooks/useHoverEffect.js';
import useScannerStore from '../../libs/context/useScannerStore';
import { staggerContainer, textVariant } from '../../libs/motion.js';
import s from './step1.module.scss';

export default function Details({ goToNextStep }) {
    const address = useAddress();
    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);
    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const walletAddress = useScannerStore((state) => state.walletAddress);
    const tokenBalance = useScannerStore((state) => state.tokenBalance);
    const handleNext = () => {
        // Check if the wallet is not connected or the address is not available
        // will uncomment this when we have a wagmi hook with config and thirdweb working together


        // if (!isWalletConnected || !address) {
        //     console.log("Wallet not connected or address not available");
        //     return; // Exit the function if the condition is met
        // }
        goToNextStep(); // Proceed to the next step if the conditions are false
    };


    return (
        <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className={s.content}
        >
            <motion.h1 variants={textVariant(0.1)} className={s.title}>
                <div className={`font-basement ${s.studioRezy} `} ref={rezyRef}>
                    Step 1
                </div>
                <div className={`font-basement ${s.subtitle} `} ref={titleRef}>
                    Monetize your plastic bottles (PET).
                </div>

            </motion.h1>
            <motion.div
                className="justify-center text-center font-aeonik"
                variants={textVariant(0.2)}
            >

                <div className="p-12 font-aeonik">
                    <div className="justify-center items-center space-x-1">
                        <BiconomyParticleWallet
                            balance={balance}
                            balanceDisplay={<BalanceDisplay />}
                            className={s.titleText2}
                            ref={titleRef2} goToNextStep={goToNextStep} />
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
}
