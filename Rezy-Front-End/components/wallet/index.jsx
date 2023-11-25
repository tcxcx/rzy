import {
    ConnectWallet,
    ThirdwebProvider,
    coinbaseWallet,
    darkTheme,
    embeddedWallet,
    localWallet,
    metamaskWallet,
    rainbowWallet,
    useAddress,
    useConnect,
    useSigner,
} from "@thirdweb-dev/react";
import { useEffect } from 'react';
import useStepperStore from '../../libs/context/useStepperStore.js';
export default function AccountAbsWallet() {
    const { setWalletConnected, setWalletAddress } = useStepperStore();
    const signer = useSigner();
    const address = useAddress();
    const connect = useConnect();


    // Effect to handle when the address changes (wallet connects/disconnects)
    useEffect(() => {
        if (address) {
            setWalletConnected(true);
            setWalletAddress(address);
        } else {
            setWalletConnected(false);
            setWalletAddress(null);
        }
    }, [address, setWalletConnected, setWalletAddress]);
    // Optionally, if you need to perform actions when the signer changes, use the following effect

    return (
        <ThirdwebProvider
            activeChain={{
                chainId: 81,
                rpc: ["https://evm.shibuya.astar.network/"],
                nativeCurrency: {
                    decimals: 18,
                    name: "Shibuya",
                    symbol: "SBY",
                },
                shortName: "shibuya-testnet",
                slug: "shibuya",
                testnet: true,
                chain: "Shibuya",
                name: "Shibuya Testnet",
            }}
            clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
            autoConnect={true}
            supportedWallets={[
                metamaskWallet(),
                coinbaseWallet({ recommended: true }),
                localWallet(),
                embeddedWallet(),
                rainbowWallet(),
            ]}
        >
            <ConnectWallet
                className="font-bold hover:text-basement-green"
                theme={darkTheme({
                    colors: {
                        accentText: "#00ff6a",
                        accentButtonBg: "#00ff6a",
                    },
                })}
                btnTitle={"Connect Wallet"}
                modalTitle={"REZY"}
                switchToActiveChain={true}
                dropdownPosition={{
                    side: "left",
                    align: "center",
                }}
                modalSize={"wide"}
                welcomeScreen={{
                    title: "Let's recyle, one block at a time. ",
                }}
                modalTitleIconUrl={""}
            />
        </ThirdwebProvider>
    );
}
