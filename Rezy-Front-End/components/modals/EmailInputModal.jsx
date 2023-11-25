import { Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import useRedemptionStore from "../../libs/context/useRedemptionStore";
import useScannerStore from "../../libs/context/useScannerStore.js";
import useRedeemPromo from "../../pages/api/useRedeemPromo.js";
import Button from "../lunar/Button";
import { MailIcon } from './MailIcon.jsx';
const EmailInputModal = ({ isOpen, onClose }) => {
    const { walletAddress, tokenBalance } = useScannerStore.getState();
    const { email, setEmail, redeemedPromo, setRedeemedPromo } = useRedemptionStore();
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [localEmail, setLocalEmail] = useState(email); // Initialize with email from the store
    const { redeemPromo } = useRedeemPromo();

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setLocalEmail(newEmail);
        setEmail(newEmail);
    };

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);
    };

    const handleSubmit = async () => {
        if (isCheckboxChecked && localEmail && redeemedPromo) {
            if (!redeemedPromo) {
                console.error("Promo details not found");
                return;
            }
            setRedeemedPromo({ ...redeemedPromo, email: localEmail });
            console.log("Redeeming promo:", redeemedPromo);
            await redeemPromo();
            onClose();
        } else {
            console.error("Please check the checkbox and provide an email before submitting.");
        }
    };
    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 20
    };
    if (!redeemedPromo) {
        return null;
    }
    return (
        <>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/25 backdrop-opacity-20"
                }}
            >
                <ModalContent className="bg-black-tr">
                    <button
                        onClick={onClose}
                        style={closeButtonStyle}
                        className="flex items-center text-white uppercase hover:text-basement-green font-basement"
                    >
                        Close | X
                    </button>
                    <ModalHeader className="flex flex-col gap-1 font-basement text-basement-green">Redeem Promo</ModalHeader>

                    <ModalBody className="font-aeonik text-white">
                        <div className="font-aeonik text-white flex">
                            <div className="w-1/2 flex flex-col">
                                <div className="mb-auto">
                                    <p className="text-xs text-basement-green font-basement uppercase font-bold">{redeemedPromo.title}</p>
                                    <p className="text-white/90 font-basement text-xl">{redeemedPromo.subtitle}</p>
                                </div>

                                <div className="flex items-center justify-center">
                                    <Image
                                        alt={redeemedPromo.businessName}
                                        className="rounded-full"
                                        src={redeemedPromo.iconSrc}
                                        width={24} // Adjust as needed
                                        height={24} // Adjust as needed
                                    />
                                    <p className="text-xs text-white/80 ml-2">{redeemedPromo.businessName}</p>
                                </div>

                                <div className="mt-2 text-center">
                                    <p className="text-lg text-basement-green font-basement">{redeemedPromo.tokens} PETs</p>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <Image
                                    priority
                                    src={redeemedPromo.imageSrc}
                                    alt={redeemedPromo.subtitle}
                                    width={500}
                                    height={300}
                                    layout="responsive"
                                    className="rounded-b-xl rounded-t-xl bg-black-tr"
                                />
                            </div>
                        </div>
                        <Input
                            autoFocus
                            endContent={
                                <MailIcon className="text-2xl text-basement-green pointer-events-none flex-shrink-0" />
                            }
                            label="Email"
                            placeholder="Enter your email"
                            variant="bordered"
                            value={email}
                            onChange={handleEmailChange}
                            classNames={{
                                label: "text-xs font-basement text-basement-green pb-8",
                            }}

                        />
                        <div className="flex py-2 px-1 justify-center">
                            <Checkbox
                                checked={isCheckboxChecked}
                                onChange={handleCheckboxChange}
                                classNames={{
                                    label: "text-xs font-basement text-white",
                                }}
                            >
                                Are you sure you want to redeem this promo?
                            </Checkbox>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button text="Submit" onClick={handleSubmit} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EmailInputModal;
