'use client';

import { Application } from '@splinetool/runtime';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import useHoverEffect from '../../hooks/useHoverEffect';
import { staggerContainer, textVariant } from "../../libs/motion";
import { SectionTitle, SectionTitleFade, SectionWrapper } from "../lunar/Section";
export function RezyCup() {
    const router = useRouter();

    const titleRef = useRef(null);
    const rezyRef = useRef(null);
    const titleRef2 = useRef(null);


    useHoverEffect(titleRef);
    useHoverEffect(rezyRef);
    useHoverEffect(titleRef2);


    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const app = new Application(canvasRef.current);
            app.load('https://prod.spline.design/hs3LAJD0Ufs5aGHJ/scene.splinecode');
        }
    }, []);

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className="relative"
            viewport={{ once: false, amount: 0.1 }}
        >
            <SectionWrapper>
                <motion.div
                    variants={textVariant(0.2)}

                    className="flex flex-col items-center justify-center">

                    <h1 className="group text-center font-display text-3xl font-light leading-tight lg:text-5xl z-10">

                        <SectionTitle >

                            <div className='font-basement uppercase' ref={rezyRef}>
                                🏆Rezy Cup 2027🏆
                            </div>
                            <SectionTitleFade>
                                <div className='font-basement text-xl p-4 uppercase' ref={titleRef}>
                                    Prizes
                                </div>
                            </SectionTitleFade>
                        </SectionTitle>
                    </h1>

                    <motion.div
                        variants={textVariant(0.4)}
                        className="relative mx-auto w-full z-10">
                        <div className="relative flex flex-col items-center justify-center w-full h-full p-4">
                            <div className="flex w-full mx-auto p-4">
                                <canvas ref={canvasRef} className="relative top-0 left-0 w-full h-full z-1" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </SectionWrapper>
        </motion.div>
    )
}
