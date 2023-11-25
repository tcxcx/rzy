import React from 'react';
import useStepperStore from '../../libs/context/useStepperStore';

const StepperR = () => {
    const { steps, currentStep, setCurrentStep } = useStepperStore();

    const handleStepClick = (stepIndex) => {
        if (stepIndex <= currentStep || steps[stepIndex - 1].completed) {
            setCurrentStep(stepIndex);
        }
    };

    return (
        <div className='mt-24 relative'>
            <h2 className="sr-only">Steps</h2>
            <div className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200">
                <ol className="grid grid-cols-3 text-sm font-medium">
                    {steps.map((step, index) => {
                        const isCurrentStep = currentStep === index;
                        const isCompleted = step.completed || currentStep > index;

                        return (
                            <li
                                key={step.label}
                                onClick={() => handleStepClick(index)}
                                className={`relative flex flex-col items-center justify-center text-center ${isCurrentStep ? 'text-indigo-700 font-bold' : 'text-gray-500'
                                    }`}
                            >
                                <span
                                    className={`flex items-center justify-center h-10 w-10 rounded-full ${isCompleted ? 'bg-basement-green' : 'bg-gray-600'
                                        } text-white mb-2`}
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                                <span className="hidden sm:block font-basement">{step.label}</span>
                                <svg
                                    className={`h-6 w-6 sm:hidden ${isCurrentStep ? 'text-indigo-700' : 'text-gray-500'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
};

export default StepperR;
