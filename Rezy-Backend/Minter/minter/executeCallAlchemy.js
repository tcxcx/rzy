// executeCallAlchemy.js

const axios = require('axios');
const { callAlchemy } = require('./interfaces.js');

async function fetchWalletAddress() {
  try {
    const response = await axios.get('https://rezy-products.onrender.com/external/wallet-address');  //This can be set to localhost for localtesting//
    const walletAddress = response.data.walletAddress;
    if (walletAddress && walletAddress.startsWith('0x')) {
      return walletAddress.substring(2); // Extract the address excluding '0x'
    } else {
      throw new Error('Invalid wallet address format');
    }
  } catch (error) {
    console.error('Error fetching wallet address:', error.message || error);
    return null;
  }
}

async function fetchAmount() {
  try {
    const response = await axios.get('https://rezy-products.onrender.com/external/cart-data/total-entries');//This can be set to localhost for localtesting// 
    const amount = response.data.amount;
    if (!isNaN(amount)) {
      return BigInt(amount);
    } else {
      throw new Error('Invalid amount value');
    }
  } catch (error) {
    console.error('Error fetching amount:', error.message || error);
    return null;
  }
}

async function execute() {
  try {
    const walletAddress = await fetchWalletAddress();
    const amount = await fetchAmount();

    if (walletAddress && amount !== null) {
      const result = await callAlchemy(walletAddress.toString(), amount.toString());
      console.log('Result:', result);
    } else {
      console.log('Unable to fetch wallet address or amount.');
    }
  } catch (error) {
    console.error('Error:', error.message || error);
  }
}

module.exports = {
  execute, // Export the execute function for external use
};
