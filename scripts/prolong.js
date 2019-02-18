const puppeteer = require('puppeteer-firefox');

const awsConsoleUrl = 'https://console.aws.amazon.com/console/home';

const accountId = process.env['ACCOUNT_ID'];
const username = process.env['USER'];
const password = process.env['PASSWORD'];
const dashboardUrl = process.env['URL'] || 'https://eu-central-1.console.aws.amazon.com/cloudwatch/home?region=eu-central-1#dashboards:name=MainDashboard';

const accountIdSelector = '#resolving_input';
const nextSelector = '#next_button';
const usernameSelector = '#username';
const passwordSelector = '#password';
const siginSelector = '#signin_button';
const servicesTabSelector = '#nav-servicesMenu > div.nav-elt-label';
const twelveHoursRangeSelector = '#dashboard > div.cwdb-dashboard.cwdb-page > div.cwdb-toolbar > div.awsui.cwui.cwdb-daterange-picker > div > div > span > ul > li:nth-child(3) > a';

module.exports = () => {
    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized']
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto(awsConsoleUrl);

        // Wait for account ID input
        await page.waitForSelector(accountIdSelector);

        // Set account ID input
        await page.type(accountIdSelector, accountId);
        await page.waitFor(2000);

        // Navigate from FIRST to LOGIN
        await Promise.all([
            page.waitForNavigation(),
            page.click(nextSelector),
        ]);

        // Wait for login inputs
        await Promise.all([
            page.waitForSelector(usernameSelector),
            page.waitForSelector(passwordSelector),
        ]);

        // Set login input
        await page.type(usernameSelector, username);
        await page.type(passwordSelector, password);

        // Navigate from LOGIN to HOME
        await Promise.all([
            page.waitForNavigation(),
            page.click(siginSelector),
        ]);

        await page.waitForSelector(servicesTabSelector);
        
        // Navigate directly to MainDashboard
        await page.goto(dashboardUrl);
        await page.waitForSelector(twelveHoursRangeSelector);
        await page.click(twelveHoursRangeSelector);
    })();
};
