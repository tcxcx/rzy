require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLIC);

async function updateTokenBalancesInDatabase(balances) {
    const updates = [];
    const inserts = [];

    for (const [address, balance] of Object.entries(balances)) {
        const floatBalance = parseFloat(balance);

        const { data: existingBalances, error: selectError } = await supabase
            .from('tokenBalances')
            .select('wallet_address, balance')
            .eq('wallet_address', address);

        if (selectError) {
            console.error('Error querying balance:', selectError);
            return;
        }

        if (existingBalances && existingBalances.length > 0) {
            updates.push({
                wallet_address: address,
                balance: floatBalance,
                last_updated: new Date().toISOString()
            });
        } else {
            inserts.push({
                wallet_address: address,
                balance: floatBalance,
                last_updated: new Date().toISOString()
            });
        }
    }

    if (updates.length > 0) {
        const { error: bulkUpdateError } = await supabase
            .from('tokenBalances')
            .upsert(updates);

        if (bulkUpdateError) {
            console.error('Error bulk updating balances:', bulkUpdateError);
            return;
        }
        console.log('Bulk balance updates successful.');
    }

    if (inserts.length > 0) {
        const { error: bulkInsertError } = await supabase
            .from('tokenBalances')
            .insert(inserts, { returning: "minimal" });

        if (bulkInsertError) {
            console.error('Error bulk inserting balances:', bulkInsertError);
            return;
        }
        console.log('Bulk balance inserts successful.');
    }
}

module.exports = { updateTokenBalancesInDatabase };
