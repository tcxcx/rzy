"use client"

import Button from '../lunar/Button';
import { GridPattern } from "../lunar/GridPattern";
import { SpotlightCard } from "../lunar/SpotlightCard";
const WalletCard = ({ address, smartAccount, goToNextStep, balance, balanceDisplay }) => {
    const gridBlocks = [
        [2, 5],
        [3, 1],
        [4, 3],
    ]

    return (
        <div className="flex sm:col-start-1 sm:col-span-2 sm:row-start-3">

            <SpotlightCard
                from="#1cd1c6"
                via="#407cff"
                size={200}
                className="relative mx-auto w-full max-w-4xl rounded-[--radius] bg-white/10 p-8 [--radius:theme(borderRadius.2xl)]">
                <div className="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-800/90"></div>

                <GridPattern
                    size={64}
                    offsetX={0}
                    offsetY={0}
                    className="absolute -top-1/2 right-0 h-[200%] w-2/3 skew-y-12 stroke-white/10 stroke-[2] [mask-image:linear-gradient(-85deg,black,transparent)]">
                    {gridBlocks.map(([row, column], index) => (
                        <GridPattern.Block
                            key={index}
                            row={row}
                            column={column}
                            className="fill-white/2.5 transition duration-500 hover:fill-white/5"
                        />
                    ))}
                </GridPattern>

                <div className="relative flex flex-col w-full">
                    <div className="font-display text-lg p-2 text-left font-semibold text-white font-belgro md:text-xl">
                        My Rezy Smart Account Address
                    </div>
                    <div className="text-xl font-bold  text-center font-basement text-basement-green">
                        {address}
                    </div>
                    {balanceDisplay}
                    {smartAccount && (
                        <div className="p-2">
                            <Button text="Start" onClick={goToNextStep} />
                        </div>
                    )}
                </div>

            </SpotlightCard>
        </div>
    )
}
export default WalletCard;
