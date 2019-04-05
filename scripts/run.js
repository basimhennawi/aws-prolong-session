const CronJob = require('cron').CronJob;
const {open, prolong} = require('./prolong');

module.exports = () => {
    open().then(prolong); // Run once in the beginning
    new CronJob('0 * * * *', prolong, null, true, 'America/Los_Angeles');
};
