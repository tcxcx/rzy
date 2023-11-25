import { ScanBarcodeIcon } from 'lucide-react';
import React from 'react';
import useScannerStore from '../../libs/context/useScannerStore';
import useStepperStore from '../../libs/context/useStepperStore';
export default function Cart() {
    const { cart, resetCart } = useScannerStore();
    const { setCurrentStep } = useStepperStore();
    const handleCartClick = () => {
        setCurrentStep(2); // Set the current step to 2 (index of the third step)
    };

    React.useEffect(() => {
        if (cart.length === 0) {
            resetCart();
        }
    }, [cart, resetCart]);

    return (
        <div className="relative px-2 group flex justify-center text-center cursor-pointer" onClick={handleCartClick}>
            <ScanBarcodeIcon className="group-hover:text-basement-green" />
            <span className="absolute top-3 right-1 text-sm text-basement-green group-hover:text-white transform translate-x-1/2 -translate-y-1/2">{cart.length}</span>
        </div>
    );
}
