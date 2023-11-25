import { Button, Card, CardFooter, CardHeader, Image, useDisclosure } from "@nextui-org/react";
import React from "react";
import useRedemptionStore from "../../libs/context/useRedemptionStore";
import useScannerStore from "../../libs/context/useScannerStore";
import EmailInputModal from "../modals/EmailInputModal";
import { promos } from "./promoData";

const CardPromo = () => {
    const { setRedeemedPromo } = useRedemptionStore((state) => ({
        setRedeemedPromo: state.setRedeemedPromo
    }));
    const walletAddress = useScannerStore((state) => state.walletAddress);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('opaque')
    const backdrops = ["opaque", "blur", "transparent"];

    const handleRedeemClick = (promo, backdrop) => {
        setRedeemedPromo({ ...promo, walletAddress });
        setBackdrop(backdrop)
        onOpen();
    };

    return (
        <>
            <div className="gap-2 grid grid-cols-12 grid-rows-2 px-8 rounded-3xl">
                {promos.map((promo, index) => (
                    <Card isFooterBlurred key={index} className={`col-span-12 ${promo.colSpan} ${promo.show} h-[300px]`}>
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                            <p className="text-xs text-basement-green font-basement uppercase font-bold">{promo.title}</p>
                            <h4 className="text-white/90 font-basement text-xl">{promo.subtitle}</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            isZoomed
                            alt={promo.subtitle}
                            className="z-0 w-full h-full object-cover "
                            src={promo.imageSrc}
                        />
                        <CardFooter className="absolute bg-white/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                            <div className="flex flex-grow gap-2 items-center">
                                <Image
                                    alt={promo.businessName}
                                    className="rounded-full w-10 h-10 bg-black"
                                    src={promo.iconSrc}
                                />
                                <div className="flex flex-col">
                                    <p className="text-xs text-black/80">{promo.businessName}</p>
                                    <p className="text-sm text-black/80">{promo.tokens} PETs</p>
                                </div>
                            </div>
                            <Button className="hover:bg-basement-green p-2 hover:text-black text-basement-green transition font-basement" radius="full" size="sm" onClick={() => handleRedeemClick(promo)}>Redeem </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <EmailInputModal backdrop={backdrop} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    );
};

export default CardPromo;
