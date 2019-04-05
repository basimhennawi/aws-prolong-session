const CronJob = require('cron').CronJob;
const {open, prolong} = require('./prolong');

let count = 0;

module.exports = () => {
    open(); // Run once in the beginning
    // new CronJob('0 */11 * * 1-5', function() { // Run every 11 hours Mon-Fri
    // '0 0 * ? * MON,TUE,WED,THU,FRI *' // At second :00 of minute :00 of every hour, on every Monday, Tuesday, Wednesday, Thursday and Friday, every month
    new CronJob('0/30 * * ? * MON,TUE,WED,THU,FRI *', function() { // Run every 10 seconds
        console.log('Job runs now for ' + ++count + ' time(s)');
        prolong();
    }, null, true, 'America/Los_Angeles');
};
