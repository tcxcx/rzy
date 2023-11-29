const { ThirdwebSDK } = require ("@thirdweb-dev/sdk/evm");

const sdk = ThirdwebSDK.fromPrivateKey("6f4201c4d51cf541707293ce9068160b681ee58c57bdbbe09592e2151007d6d2", {
        // === Required information for connecting to the network === \\
        chainId: 81, // Chain ID of the network
        // Array of RPC URLs to use
        rpc: ["https://evm.shibuya.astar.network/"],

        // === Information for adding the network to your wallet (how it will appear for first time users) === \\
        // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
        nativeCurrency: {
          decimals: 18,
          name: "Shibuya Network",
          symbol: "SBY",
        },
        shortName: "shibuya", // Display value shown in the wallet UI
        slug: "shibuya", // Display value shown in the wallet UI
        testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
        chain: "astar-shibuya", // Name of the network
        name: "astar-shibuya", // Name of the network
      }, {
  
  secretKey: "BlpfiR-V9HI21PwZzgcsw3GZ0Zq3DGaai9sN3ieSN2ZLyLSFgFb6t0EbLOU3NThRZKIij16Ws5C5Zn2QQ154Pg", // Use secret key if using on the server, get it from dashboard settings
});

//This is the minting process controller using Thirdweb SDK//

const callAlchemy = async (wallet,amount,) => {
  const contract = await sdk.getContract("0xEe3B5E2002F804c804FE751E24231A55792bcDF1");

 const data = await contract.call("mintTo", wallet, amount);
 console.log(data);
  return data;
}
module.exports = { callAlchemy };
