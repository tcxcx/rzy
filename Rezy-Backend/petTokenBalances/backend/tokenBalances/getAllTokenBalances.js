const { ThirdwebSDK } = require('@thirdweb-dev/sdk');

// Constants
const BATCH_SIZE = 1024; // Reduced batch size
const DELAY_MS = 1000; // One-second delay between batches

// Environment Variables
const ethereumProviderUrl = 'https://sepolia.drpc.org';
const clientId = process.env.CLIENT_ID_THIRDWEB;
const secretKey = process.env.SECRET_KEY_THIRDWEB;
const contractAddress = '0x83b7E345922Af6c54B3f71Dbf0e1517b2b8EB863';

// Initialize Thirdweb SDK
const sdk = new ThirdwebSDK(ethereumProviderUrl, {
    clientId,
    secretKey
});

// Function to get all token balances
async function getAllTokenBalances() {
    try {
        const contract = await sdk.getContract(contractAddress);
        const latestBlock = await sdk.provider.getBlockNumber();
        let startBlock = 0; // Adjust the start block as needed
        const balances = {};

        // Fetch events in batches
        while (startBlock <= latestBlock) {
            const endBlock = Math.min(startBlock + BATCH_SIZE, latestBlock);
            const mintEvents = await contract.events.getEvents("TokensMinted", {
                fromBlock: startBlock,
                toBlock: endBlock
            });

            // Process mint events
            for (const event of mintEvents) {
                const address = event.data.mintedTo;
                if (!balances[address]) {
                    const balance = await contract.call("balanceOf", [address]);
                    balances[address] = balance.toString();
                }
            }

            // Delay between batches to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));

            // Prepare for the next batch
            startBlock = endBlock + 1;
        }

        console.log('Token Balances:', balances);
        return balances;
    } catch (error) {
        console.error('Error fetching token balances:', error);
        return {};
    }
}

module.exports = getAllTokenBalances;




    // const { ThirdwebSDK } = require('@thirdweb-dev/sdk');

    // // Your Ethereum provider URL
    // const ethereumProviderUrl = 'https://sepolia.drpc.org';
    // const BATCH_SIZE = 10000;

    // // Your Thirdweb client ID and secret key
    // const clientId = process.env.CLIENT_ID_THIRDWEB;
    // const secretKey = process.env.SECRET_KEY_THIRDWEB;

    // // Initialize the SDK with your client ID and secret key
    // const sdk = new ThirdwebSDK(ethereumProviderUrl, {
    //     clientId,
    //     secretKey
    // });

    // // Your contract address
    // const contractAddress = '0x83b7E345922Af6c54B3f71Dbf0e1517b2b8EB863';

    // async function getAllTokenBalances() {
    //     try {
    //         const contract = await sdk.getContract(contractAddress);
    //         const mintEvents = await contract.events.getEvents("TokensMinted");
    //         const addresses = new Set(mintEvents.map(event => event.data.mintedTo));

    //         // Fetch balances for each address
    //         const balances = {};
    //         for (const address of addresses) {
    //             const balance = await contract.call("balanceOf", [address]);
    //             balances[address] = balance.toString();
    //         }

    //         console.log('Token Balances:', balances);
    //         return balances;
    //     } catch (error) {
    //         console.error('Error fetching token balances:', error);
    //         return {};
    //     }
    // }

    // module.exports = getAllTokenBalances;

