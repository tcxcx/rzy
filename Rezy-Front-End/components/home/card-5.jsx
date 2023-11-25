
"use client"

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { textVariant } from "../../libs/motion";
import animationData from '../../public/lottie_recycle.json';
import { DotPattern } from "../lunar/DotPattern";
import { SpotlightCard } from "../lunar/SpotlightCard";

export default function Card5() {

    const recycleOptions = {
        animationData,
        loop: true,
        autoplay: true,
    };
    const lottieStyle = {
        width: '150px', // set a specific width
        height: '150px' // set a specific height
    };

    return (
        <motion.div
            variants={textVariant(1.5)}
            className="flex sm:col-start-4 sm:row-start-3 items-center">
            <SpotlightCard
                from="#1cd1c6"
                via="#407cff"
                size={300}
                className="relative mx-auto w-full max-w-2xl rounded-[--radius] bg-white/10 p-8 [--radius:theme(borderRadius.2xl)]">
                <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

                <DotPattern
                    size={32}
                    radius={1.5}
                    offset-x={0}
                    offset-y={0}
                    className="absolute inset-0 h-full w-full fill-white/10 [mask-image:radial-gradient(white,transparent_85%)]"
                />

                <div className="relative flex justify-center items-center h-full">
                    <Lottie {...recycleOptions} style={lottieStyle} />

                    <div className="font-display text-lg font-semibold text-white md:text-2xl">
                        Take care of the planet <br />
                        while earning PET. <br />
                        Trade them for perks<br />
                        in District commerces.
                    </div>
                    {/* Lottie animation centered in the card */}
                </div>
            </SpotlightCard>
        </motion.div>
    )
}

