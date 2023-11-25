'use client';

import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import Quagga from '../../components/quagga/index.js';
import useHoverEffect from '../../hooks/useHoverEffect.js';
import useStepperStore from '../../libs/context/useStepperStore.js';
import { staggerContainer, textVariant } from "../../libs/motion.js";
import s from './step1.module.scss';

// const URL = "https://backend-products-scan.onrender.com:3500";
const URL = 'http://localhost:3500';
// https://codesandbox.io/s/quaggajs-on-react-eexx8
function Scan({ goToNextStep }) {
    // styling variables
    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);
    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);

    // quagga variables

    const [product, setProduct] = useState({});
    const [open, setOpen] = useState(false);
    const { currentStep } = useStepperStore();
    const [isLoading, setIsLoading] = useState(false);


    // const handleScanWebCam = (code) => {
    //     const foundProduct = products.find(item => item.Id === code);
    //     if (foundProduct) {
    //         setProduct(foundProduct);
    //         setOpen(true);
    //         sendScanDataToBackend(code);
    //     }
    // };

    // const sendScanDataToBackend = (barcode) => {
    //     fetch(`${URL}/scan`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ barcode }),
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log('Success:', data))
    //         .catch(error => console.error('Error:', error));
    // };

    const handleAccept = () => {
        goToNextStep();
    };

    return (
        <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className={s.content}>
            <motion.h1
                variants={textVariant(0.1)}
                className={s.title}>
                <div className={`font-basement ${s.studioRezy} `} ref={rezyRef}>
                    Step 2
                </div>
                <div className={s.subtitle} ref={titleRef}>
                    Scan the barcode on your plastic bottle.
                    <br />
                </div>

                <div className={s.subtitle} ref={titleRef2}>
                    Wait for popup, confirm and submit transaction.
                </div>
            </motion.h1>

            {isLoading && <div>Loading camera...</div>}

            <motion.div
                className='justify-center text-center'
                variants={textVariant(0.2)}>

                <div id="scanner-container">
                    <Quagga />
                </div>
            </motion.div>

        </motion.section>

    );
}

export default Scan;
