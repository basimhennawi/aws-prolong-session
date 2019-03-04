const puppeteer = require('puppeteer');

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
const arrowSelector = '#gwt-debug-toggleButton';
const dropdownMenuSelector = '#dashboard > div.cwdb-dashboard.cwdb-page > div.cwdb-toolbar > div.cwdb-refresh-controls.btn-group > div > div';
const autoRefreshSelector = '#dashboard > div.cwdb-dashboard.cwdb-page > div.cwdb-toolbar > div.cwdb-refresh-controls.btn-group > div > ul > li:nth-child(1) > label > input[type="checkbox"]';

module.exports = () => {
    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: '/usr/bin/chromium-browser',
            args: ['--start-fullscreen']
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(awsConsoleUrl);

        // Wait for account ID input
        await page.waitForSelector(accountIdSelector);

        // Set account ID input
        await page.click(accountIdSelector);
        await page.type(accountId);

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
        await page.click(usernameSelector);
        await page.type(username);
        await page.click(passwordSelector);
        await page.type(password);

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
        await page.click(arrowSelector);
        await page.click(dropdownMenuSelector);
        await page.waitFor(1500);
        await page.click(autoRefreshSelector);
        await page.waitFor(1500);
        await page.click(dropdownMenuSelector);
    })();
};
