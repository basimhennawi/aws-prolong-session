const CronJob = require('cron').CronJob;
const prolong = require('./prolong');

let count = 0;

module.exports = () => {
    prolong(); // Run once in the beginning
    new CronJob('0 */11 * * 1-5', function() { // Run every 11 hours Mon-Fri
        console.log('Job runs now for ' + ++count + ' time(s)');
        prolong();
    }, null, true, 'America/Los_Angeles');
};
