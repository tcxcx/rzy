// Test Script
// tests/getAllTokenBalancesTest.js
const getAllTokenBalances = require('../backend/tokenBalances/getAllTokenBalances');

async function test() {
    const balances = await getAllTokenBalances();
    console.log('All Token Balances:', balances);
}

test();