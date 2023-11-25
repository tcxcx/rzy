import { motion } from 'framer-motion';
import { useRouter } from 'next/router'; // Correctly import useRouter from next/router
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import CartList from '../../components/cart/CartList';
import CustomCheckbox from '../../components/checkbox/index.jsx';
import Button from '../../components/lunar/Button';
import useHoverEffect from '../../hooks/useHoverEffect.js';
import useScannerStore from '../../libs/context/useScannerStore.js';
import { staggerContainer, textVariant } from "../../libs/motion.js";
import s from './step1.module.scss';


function Token() {
    const [open, setOpen] = useState(false);
    const { cart, resetCart } = useScannerStore();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const router = useRouter();
    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);

    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);

    const ACCEPTED_ORIGINS = [
        'https://minteador.onrender.com',
        'https://minteador.onrender.com/triggerScript',
        'https://minteador.onrender.com/triggerScript/',
        'https://localhost:3000',
        'https://localhost:3000/',
        'https://localhost:4000',
        'https://localhost:5000',
        'https://localhost:5002',
        'https:/rezy.lat',
    ];


    const handleSubmitRedeem = async () => {
        const endpoint = 'https://minteador.onrender.com/triggerScript';

        if (!ACCEPTED_ORIGINS.includes(endpoint)) {
            console.error("Endpoint is not in the accepted origins list");
            toast.error("Endpoint is not allowed");
            return;
        }

        if (isConfirmed && cart.length > 0) {
            try {
                console.log("Redemption process started");
                const response = await fetch(endpoint, {
                    method: 'POST',
                    redirect: 'follow'
                });

                const result = await response.text();
                if (response.ok) {
                    console.log("Redemption successful, server response:", result);
                    toast.success('Redemption successful!');
                    resetCart();
                    router.push('/');
                } else {
                    console.error("Redemption failed, server response:", result);
                    throw new Error(`Redemption failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error during redemption:", error);
                toast.error('Error during redemption: ' + error.message);
            }
        } else if (!cart || cart.length <= 0) {
            console.error("Redemption error: No items in cart");
            toast.error("Redemption error: No items in cart");
        } else {
            console.error("Redemption error: Confirmation not checked");
            toast.error("Redemption error: Confirmation not checked");
        }
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
                    Step 3
                </div>
                <div className={s.subtitle} ref={titleRef}>
                    Recycle now to get your PET tokens.
                    <br />
                </div>

            </motion.h1>
            <motion.div
                className='justify-center text-center self-center p-4'
                variants={textVariant(0.2)}>
                <CartList />
                <div className="mt-4 justify-between self-center ">
                    <CustomCheckbox
                        checked={isConfirmed}
                        onChange={(event) => setIsConfirmed(event.target.checked)}
                        label="I confirm I have deposited the bottles."
                    />
                </div>

                <div className="p-4 justify-between self-center ">
                    <Button text="Submit Claim"
                        onClick={handleSubmitRedeem}
                        disabled={!isConfirmed} />
                </div>
            </motion.div>
        </motion.section>

    );
}

export default Token;
