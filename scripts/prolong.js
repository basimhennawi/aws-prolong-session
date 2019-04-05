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
const dropdownMenuSelector = '#dashboard > div.cwdb-dashboard.cwdb-page > div.cwdb-toolbar > div.cwdb-refresh-controls.btn-group > div > div > span';
const autoRefreshSelector = '#dashboard > div.cwdb-dashboard.cwdb-page > div.cwdb-toolbar > div.cwdb-refresh-controls.btn-group > div.cwui-dropdown > ul > li:nth-child(1) > label > span';

const page = null;

exports.open = () => {
    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: '/usr/bin/chromium-browser',
            args: ['--start-fullscreen']
        });

        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(awsConsoleUrl);

        // Wait for account ID input
        await page.waitForSelector(accountIdSelector);

        // Set account ID input
        await page.click(accountIdSelector);
        await page.type(accountId);

        // Navigate from FIRST to LOGIN
        await Promise.all([
            page.waitForNavigation({ timeout: 60000 }),
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
            page.waitForNavigation({ timeout: 60000 }),
            page.click(siginSelector),
        ]);

        await page.waitForSelector(servicesTabSelector);
        
        // Navigate directly to MainDashboard
        await page.goto(dashboardUrl);

        prolong();
    })();
};

exports.prolong = () => {
    (async () => {
        try {
            await page.reload();
            console.log('Prolonged successfully for another 12 hours!');
        } catch (e) {
            console.log("Prolonging the session by reloading the page failed.")
        }
        try {
            await page.waitForSelector(arrowSelector);
            await page.click(arrowSelector);
        } catch (e) {
            console.log("Left arrow element from the side menu not found.")
        }
        try {
            await page.waitForSelector(dropdownMenuSelector);
            await page.click(dropdownMenuSelector);
            await page.waitForSelector(autoRefreshSelector);
            await page.click(autoRefreshSelector);
            await page.waitFor(1000);
            await page.click(dropdownMenuSelector);
        } catch (e) {
            console.log("Dropdown menu from the top right menu not found.")
        }
        try {
            await page.waitForSelector(twelveHoursRangeSelector);
            await page.click(twelveHoursRangeSelector);
        } catch (e) {
            console.log("12h range element not found.")
        }
    })();
};
