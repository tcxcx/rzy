const { updateTokenBalancesInDatabase } = require('../backend/tokenBalances/databaseHelpers'); // Adjust the path as needed

// Sample token balances (mock data)

const mockTokenBalances = {
    '0xAddress1': '1000',
    '0xAddress2': '500',
    '0xAddress3': '200'
};

async function testUpdateTokenBalances() {
    console.log('Updating token balances in database...');
    await updateTokenBalancesInDatabase(mockTokenBalances);
    console.log('Token balances updated successfully.');
}

testUpdateTokenBalances();
