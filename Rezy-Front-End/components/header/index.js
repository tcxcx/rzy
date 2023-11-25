import { Link } from '@studio-freight/compono';
import cn from 'clsx';
import { Navigation } from 'components/navigation';
import { useStore } from 'libs/store';
import Image from 'next/image';
import { forwardRef } from 'react';
import useStepperStore from '../../libs/context/useStepperStore';
import Cart from '../cart/Cart';
import s from './header.module.scss';

export const Header = forwardRef((_, ref) => {
  const [isNavOpened, setIsNavOpened] = useStore(
    ({ isNavOpened, setIsNavOpened }) => [isNavOpened, setIsNavOpened],
  );
  const { setCurrentStep } = useStepperStore();

  const goToStep2 = () => {
    setCurrentStep(2);
  };
  return (
    <header className={s.header} ref={ref}>
      <Navigation />
      <div className={cn('layout-block', s.head)}>
        <button
          className="font-basement"
          onClick={() => {
            setIsNavOpened(!isNavOpened);
          }}
        >
          MENU
        </button>

        {/* Logo container with hover effect */}
        <div className={s.logoContainer}>
          <Link href="/" className="link px-4">
            <div className={s.logoImageContainer}>
              <Image
                src="/images/R.png"
                alt="Logo"
                width={75}
                height={75}
                objectFit="contain"
                className={s.logoImage} // This will have the hover effect
              />
              <Image
                src="/images/2.png"
                alt="Logo Alternative"
                width={75}
                height={75}
                objectFit="contain"
                className={s.logoImageAlt} // This starts with opacity 0
              />
            </div>
          </Link>
        </div>

        <div className="uppercase font-basement flex">
          <Link
            href="/rezy-cle"
            className="link px-4"
            onClick={() => useStepperStore.getState().resetSteps()}
          >
            Dapp
          </Link>
          <Link onClick={goToStep2} href="/rezy-cle" className="link px-4">
            <Cart />
          </Link>
          <Link href="/_debug/orchestra" target="_blank" className="link px-4">
            debug
          </Link>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
