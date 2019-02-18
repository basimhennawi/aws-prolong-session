const CronJob = require('cron').CronJob;
const prolong = require('./prolong');

let count = 0;

module.exports = () => {
    prolong();
    new CronJob('* * */10 * * *', function() {
        console.log('Job runs now for ' + ++count + ' time(s)');
        prolong();
    }, null, true, 'America/Los_Angeles');
};
