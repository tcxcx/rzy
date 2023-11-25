'use client';

import { Application } from '@splinetool/runtime';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import useHoverEffect from '../../hooks/useHoverEffect';
import { staggerContainer, textVariant } from "../../libs/motion";
import { SectionTitle, SectionTitleFade, SectionWrapper } from "../lunar/Section";
import TokyoTorch3D from '../marquee-brands/TokyoTorch3D';
export function TokyoAirWrapper() {
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

                    <h1 className="group text-center font-display text-3xl font-light leading-tight lg:text-5xl z-10 py-4">

                        <SectionTitle >

                            <div className='font-basement uppercase' ref={rezyRef}>
                                Launching 2027
                            </div>
                            <SectionTitleFade>
                                <div className='font-basement text-xl p-4 uppercase' ref={titleRef}>
                                    Tokyo Torch Tower
                                </div>
                            </SectionTitleFade>
                        </SectionTitle>
                        <div
                            className="relative mx-auto w-full p-10">
                            <TokyoTorch3D className="flexbox  items-center justify-center  w-full h-full " />
                        </div>

                    </h1>


                </motion.div>
            </SectionWrapper>
        </motion.div>
    )
}
