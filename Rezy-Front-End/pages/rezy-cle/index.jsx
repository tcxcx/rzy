import { Layout } from 'layouts/default';
import s from './step1.module.scss';
// import  { Grid }  from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import StepperR from '../../components/stepper/Stepper.jsx';
import useStepperStore from '../../libs/context/useStepperStore.js';
import { textVariant } from '../../libs/motion.js';
import Details from './step-1.jsx';
import Scan from './step-2.jsx';
import Token from './step-3.jsx';
const StepContent = ({ stepIndex, children }) => {
    const { currentStep } = useStepperStore();
    return currentStep === stepIndex ? children : null;
};

export default function Home() {
    const { nextStep, setStepCompleted, currentStep, resetSteps } = useStepperStore();

    const goToNextStep = () => {
        setStepCompleted(currentStep, true); // Set the current step as completed
        nextStep(); // Go to the next step based on the updated current step
    };

    useEffect(() => {
        resetSteps();
    }, [resetSteps]);


    return (
        <Layout theme="dark" className={s.home}>
            <motion.h1 variants={textVariant(0.1)} className={s.title}>
                <StepperR />
            </motion.h1>
            <StepContent stepIndex={0}>
                <Details goToNextStep={() => goToNextStep(currentStep)} />
            </StepContent>
            <StepContent stepIndex={1}>
                <Scan goToNextStep={() => goToNextStep(currentStep)} />
            </StepContent>
            <StepContent stepIndex={2}>
                <Token goToNextStep={() => goToNextStep(currentStep)} />
            </StepContent>
        </Layout>
    );
}

export async function getStaticProps() {
    return {
        props: {
            id: 'home',
        },
    };
}
