
'use client';

import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import useHoverEffect from '../../hooks/useHoverEffect';
import { staggerContainer, textVariant } from "../../libs/motion";
import s from './home.module.scss';

const TitlesContainer = () => {

    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);

    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);


    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
        >
            <motion.h1
                variants={textVariant(0.5)}
                className={s.title}
            >
                <motion.div
                    variants={textVariant(0.6)}
                    className={`font-basement ${s.studioRezy} `}
                    ref={rezyRef}
                >
                    Rezy
                </motion.div>

                <motion.div
                    variants={textVariant(0.8)}
                    className={`font-aeonik ${s.titleText} `} ref={titleRef}>
                    Blockchain-powered community recycling.
                </motion.div>
                <motion.div
                    variants={textVariant(1)}
                    className={`font-aeonik ${s.titleText2} `} ref={titleRef2}>
                    Transforming waste management, one block at a time.
                </motion.div>
            </motion.h1>
        </ motion.div>

    );
};

export default TitlesContainer;

