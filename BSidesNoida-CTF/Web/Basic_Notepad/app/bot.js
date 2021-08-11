const puppeteer = require('puppeteer');

const browser_options = {
    headless: true,
    args: [
        '--no-sandbox',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-extensions',
        '--disable-gpu',
        '--disable-sync',
        '--disable-translate',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-first-run',
        '--safebrowsing-disable-auto-update'
    ],
};

const cookies = [{
  'name': 'auth',
  'value': 'YWRtaW46djNyeTUzY3IzdFA0c3N3MHJkZGRk'
}];

async function visit(msg,token){
    const browser = await puppeteer.launch(browser_options);
    const page = await browser.newPage();

    
    await page.goto('http://127.0.0.1:9999/');
    await page.setCookie(...cookies);
    await page.goto('http://127.0.0.1:9999/');
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.goto('http://127.0.0.1:9999/review?msg='+msg+'&token='+token, {
        waitUntil: 'networkidle2'
    });
    console.log("bot visted")
    await page.waitForTimeout(4000)

    await browser.close();
};

module.exports = { visit };
