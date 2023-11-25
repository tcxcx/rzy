'use client';

import { motion } from 'framer-motion';
import { useRef } from "react";
import useHoverEffect from '../../hooks/useHoverEffect';
import { staggerContainer, textVariant } from "../../libs/motion";
import {
    SectionBadge,
    SectionDescription,
    SectionHeadingHighlighted,
    SectionTitle,
    SectionTitleFade,
    SectionWrapperRounded,
} from "../lunar/Section";
import CardPromo from "./CardPromo";
const promos = [
    // Array of promo objects
    {
        title: "Your day your way",
        subtitle: "Your checklist for better sleep",
        imageSrc: "/images/pod-hotel.webp",
        iconSrc: "/images/R.png",
        businessName: "Tokyo Pod Hotels",
        tokens: 4,
        alt: "Relaxing app background",
        iconAlt: "Breathing app icon",
    },
    // More promo objects
];

export function SecondaryFeatures() {

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
            viewport={{ once: false, amount: 0.1 }}
        >
            <SectionWrapperRounded>
                <motion.div
                    variants={textVariant(0.25)}
                    className=" grid gap-4 lg:grid-cols-1 lg:gap-8">
                    <SectionHeadingHighlighted>
                        <SectionBadge>District perks</SectionBadge>
                        <SectionTitle ref={titleRef}>
                            <div ref={titleRef}>
                                Love a good deal?
                            </div>
                            <SectionTitleFade>
                                <div ref={titleRef2}>
                                    PET&apos;s got you covered
                                </div>
                            </SectionTitleFade>
                        </SectionTitle>

                        <SectionDescription>
                            <motion.div
                                ref={rezyRef}>
                                Rezy partners with the best brands to get you exclusive deals
                                on the things you love. Earn points and PET tokens for every recycling action.
                            </motion.div>
                        </SectionDescription>
                    </SectionHeadingHighlighted>
                    <CardPromo promos={promos} />
                </motion.div>
            </SectionWrapperRounded>
        </motion.div>
    )
}
