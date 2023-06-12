
import { randomUUID } from "crypto";
import {Browser, PuppeteerLaunchOptions} from "puppeteer";
import path from "path";

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());
function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('')
        }, time * 1000)
    })
}


(async function() {
    console.log('开始');

    // const proxy = await getProxy(1)
    // console.log(proxy);
    
    
    const options: PuppeteerLaunchOptions = {
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        userDataDir: `run/${1}`,
    };
    const browser: Browser = await puppeteer.launch(options);

    const page = await browser.newPage()

    await page.goto("https://accounts.forefront.ai/sign-up");
    await page.setViewport({width: 1920, height: 1080});
    await page.waitForSelector('#emailAddress-field');
    await page.click('#emailAddress-field')

    await page.waitForSelector('.cl-rootBox > .cl-card > .cl-main > .cl-form > .cl-formButtonPrimary')
    await page.click('.cl-rootBox > .cl-card > .cl-main > .cl-form > .cl-formButtonPrimary')
    
    // const mailbox = CreateEmail(TempEmailType.TempEmail)
    // const mailAddress = await mailbox.getMailAddress()
    // console.log('申请邮件地址' + mailAddress, { label: 'CreateToken' })
    
    await page.keyboard.type('finnwu160@163.com', {delay: 10});
    await page.keyboard.press('Enter');


    await sleep(5)

    await page.screenshot({
        path: path.resolve(__dirname, './public/3.png')
    })

    console.log('已截图');
    
})()