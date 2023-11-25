import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'sonner';
import useScannerStore from '../../libs/context/useScannerStore';
import useStepperStore from '../../libs/context/useStepperStore';
import { usePostCartData } from '../../pages/api/usePostCartData';
import CartList from '../cart/CartList';
import ButtonNext from '../lunar/ButtonNext';
import Scanner from './Scanner';
function ScannerModal() {
    const { postCartData, isLoading, error } = usePostCartData();
    const router = useRouter();
    const {
        isScanning, product, isProductRecognized, closeScannerModal,
        onDetected, addToCart, toggleScanning
    } = useScannerStore();


    const handleAddToCart = () => {
        if (product) {
            addToCart(product.Id);
            toggleScanning();
            toast.success('Item added to cart successfully!');
        }
    };


    const { nextStep } = useStepperStore();


    const handleClaim = async () => {
        await postCartData();
        closeScannerModal();
        nextStep();
        if (error) {
            toast.error('Error: ' + error.message);
        }
    };



    const handleScanMore = () => {
        closeScannerModal();
        toggleScanning();
    };

    if (!isScanning && !isProductRecognized && !product) return null;

    const modalStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    };


    const modalContentStyle = {
        position: 'relative',
        backgroundColor: '#000',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: 'auto',
        overflow: 'auto',
        padding: '24px',
        border: '1px c #00ff6a',
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 20 // Ensure it is above other elements
    };

    const scannerContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    };

    return (
        <div style={modalStyle}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={closeScannerModal}
                    style={closeButtonStyle}
                    className="flex items-center text-white uppercase hover:text-basement-green font-basement"
                >
                    Close | X
                </button>
                <div className='relative w-full'>

                    {isScanning && <Scanner onDetected={onDetected} />}
                </div >
                {isProductRecognized && product && (
                    <>
                        <h2>Product Recognized</h2>
                        <p>Your product: {product.Brand}</p>
                        <img
                            src={product.image ? product.image : 'https://via.placeholder.com/300/09f/fff.png'}
                            alt="product"
                            style={{ height: '300px', width: '350px' }}
                        />
                        <div className="flex justify-center mt-4">
                            <ButtonNext onClick={handleAddToCart} text={"Add to Cart"} />
                            <ButtonNext onClick={handleScanMore} text={"Scan more"} />
                        </div>
                    </>
                )}
                {!isProductRecognized && !isScanning && (
                    <p>This product is not recognized by Rezy currently.</p>
                )}
                <div className="flex justify-center mt-4">
                    <ButtonNext onClick={handleClaim} text={"Checkout"} />
                </div>
            </div>
            <CartList />
        </div>
    );
}

export default ScannerModal;
