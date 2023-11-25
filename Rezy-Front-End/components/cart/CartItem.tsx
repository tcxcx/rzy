import { Trash } from 'lucide-react';
import useScannerStore from '../../libs/context/useScannerStore';

function CartItem({
  item,
}: {
  item: {
    Id: string;
    Brand: string;
    volume: string;
    material: string;
    image: string;
  };
}): JSX.Element {
  const { removeFromCart } = useScannerStore();

  return (
    <li className="flex justify-between p-4 glassmorphism border-2 border-gray-bg text-center divide-y">
      <img
        src={item.image}
        alt={item.Brand}
        style={{ height: '48px', marginRight: '10px' }}
      />
      <span className="flex-1 text-center self-center px-4">
        {item.Brand} - {item.material} - {item.volume}
      </span>
      <button
        type="button"
        className="hover:text-basement-green"
        title="Delete this item"
        onClick={() => removeFromCart(item.Id)}
      >
        <Trash />
      </button>
    </li>
  );
}

export default CartItem;
