"use client"

import { motion } from 'framer-motion';
import { textVariant } from "../../libs/motion";

import { GridPattern } from "../lunar/GridPattern";
import { SpotlightCard } from "../lunar/SpotlightCard";

export default function Card3() {
    const petPrice = "$1.50"; // Replace with actual PET price if needed

    return (
        <motion.div
            variants={textVariant(1.4)}
            className="flex sm:col-start-4 sm:row-start-2 sm:row-span-1 items-center">
            <SpotlightCard
                from="#1cd1c6"
                via="#407cff"
                size={300}
                className="relative mx-auto w-full max-w-2xl rounded-[--radius] bg-white/10 p-8 [--radius:theme(borderRadius.2xl)]">
                <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

                <GridPattern
                    offsetX={0}
                    offsetY={0}
                    size={64}
                    className="absolute -inset-px h-full w-full stroke-white/10 stroke-[4] [mask-image:radial-gradient(white,transparent_70%)] [stroke-dasharray:5_6] [stroke-dashoffset:10]">
                </GridPattern>

                {/* Flex container for text and price */}
                <div className="relative flex items-center justify-between w-full">
                    {/* Text to the left */}
                    <div className="font-display text-lg font-semibold text-white font-belgro">
                        PET price
                    </div>

                    {/* Price to the right */}
                    <div className="font-display text-lg font-semibold text-basement-green font-belgro">
                        {petPrice}
                    </div>
                </div>
            </SpotlightCard>
        </motion.div>
    )
}
