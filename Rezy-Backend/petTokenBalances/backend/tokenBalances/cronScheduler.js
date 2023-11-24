const cron = require('node-cron');
const updateBalances = require('./updateTokenBalances');

function startCronJob() {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running updateBalances task...');
    await updateBalances();
    console.log('updateBalances task completed.');
  }, {
    scheduled: true,
    timezone: "America/New_York"
  });

  console.log('Cron job scheduled.');
}

module.exports = startCronJob;
