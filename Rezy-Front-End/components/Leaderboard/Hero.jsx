'use client';

import { Application } from '@splinetool/runtime';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import useHoverEffect from '../../hooks/useHoverEffect';
import { staggerContainer, textVariant } from "../../libs/motion";
import Button from "../lunar/Button";
import { SectionTitle, SectionTitleFade, SectionWrapper } from "../lunar/Section";
import MarqueeBrands from '../marquee-brands';
import { RezyCup } from './RezyCup';
import LeaderBoardTable from './index';
export function Hero() {
    const router = useRouter();

    const titleRef = useRef(null);
    const titleRef2 = useRef(null);
    const rezyRef = useRef(null);

    useHoverEffect(titleRef);
    useHoverEffect(titleRef2);
    useHoverEffect(rezyRef);
    const goToDapp = () => {
        router.push('/rezy-cle');
    };

    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const app = new Application(canvasRef.current);
            app.load('https://prod.spline.design/LxAPiHeVABhn1dl1/scene.splinecode');
        }
    }, []);

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className="relative pt-32"
            viewport={{ once: false, amount: 0.1 }}
        >
            <RezyCup />
            <MarqueeBrands />

            <div className="pointer-events-none absolute inset-0 bg-center bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_75%)]"></div>
            <SectionWrapper className="py-8 lg:py-16">
                <motion.div
                    variants={textVariant(0.2)}

                    className="flex flex-col items-center justify-center">
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-1" />

                    <h1 className="group text-center font-display text-3xl font-light leading-tight lg:text-5xl z-10">

                        <SectionTitle ref={titleRef}>
                            <div ref={titleRef}>
                                Leaderboards
                            </div>
                            <SectionTitleFade>
                                <div ref={titleRef2}>
                                    compete with your team to win
                                </div>
                            </SectionTitleFade>
                        </SectionTitle>
                    </h1>

                    <h2 className="mt-8 max-w-sm text-center text-lg text-white/60 lg:text-xl font-aeonik">
                        Rezy makes recycling fun. Compete in the Rezy league and win the Rezy Cup 2024.
                    </h2>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 lg:flex-row">
                        <Button onClick={goToDapp} text="Get started for free" />
                    </div>

                    <motion.div
                        variants={textVariant(0.4)}
                        className="relative mx-auto mt-8 w-full max-w-5xl lg:mt-16 z-10">
                        <div className="absolute -top-8 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-basement-green/25 blur-3xl lg:-top-8 lg:h-[32rem] lg:w-[32rem] lg:blur-[128px]"></div>

                        <div className="relative w-full rounded-2xl bg-gradient-to-b from-white/5 to-white/10 p-2 shadow-2xl shadow-basement-green/10 ring-1 ring-white/10 backdrop-blur-sm lg:rounded-3xl">
                            <div className="h-auto w-full rounded-xl border border-white/10 shadow-md shadow-zinc-950/50 lg:rounded-2xl"
                            >

                            </div>
                            <div className="relative flex flex-col items-center justify-center w-full h-full p-4">
                                <div className="relative w-full max-w-7xl mx-auto">
                                    <LeaderBoardTable />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </SectionWrapper>
        </motion.div>
    )
}
