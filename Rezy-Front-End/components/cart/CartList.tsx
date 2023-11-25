'use client';

import useScannerStore from '../../libs/context/useScannerStore';
import CartItem from './CartItem';
export default function CartList(): JSX.Element {
  const { cart } = useScannerStore();

  return (
    <div className="flex flex-col gap-2 m-2">
      {cart.length === 0 ? (
        <div className="flex text-center justify-between p-4 glassmorphism border-2 border-gray-bg divide-y">
          <p> No products currently in cart</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {cart.map((item) => (
            <CartItem key={item.Id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
