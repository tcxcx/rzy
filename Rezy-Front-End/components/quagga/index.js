import React from 'react';
import useScannerStore from '../../libs/context/useScannerStore';
import Button from '../lunar/Button';
import ScannerModal from './ScannerModal';

export default function Quagga() {
  const { isScanning, toggleScanning, product, isProductRecognized } =
    useScannerStore();

  return (
    <div>
      <Button onClick={toggleScanning} text={isScanning ? 'Stop' : 'Start'} />
      <ScannerModal />
    </div>
  );
}
