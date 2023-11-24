require('dotenv').config();
const getAllTokenBalances = require('./getAllTokenBalances');
const { updateTokenBalancesInDatabase } = require('./databaseHelpers'); // You'll write this function

async function updateBalances() {
    try {
      console.log('Fetching token balances...');
        const balances = await getAllTokenBalances();
        console.log('Updating token balances in database...');
        await updateTokenBalancesInDatabase(balances); // Update balances in your database
        console.log('Token balances updated successfully');
    } catch (error) {
        console.error('Error updating token balances:', error);
    }
}

module.exports = updateBalances;
