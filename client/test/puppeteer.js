/* eslint-disable no-restricted-syntax */
const puppeteer = require('puppeteer');

const roomName = 'puppetTest';
const host = 'localhost:3006';
const pageNumber = 18;
const pageCount = 0;

(async function puppetTest() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://${host}/`);
  // await page.content()
  await page.click('a + div');
  // await page.screenshot({path: 'screenshot.png'});
  const newRoom = await page.$x("//*[text() = '+ new Room();']");
  await newRoom[0].click();
  await page.type('input', roomName);
  const input = await page.$x("//*[text() = 'create();']");
  await input[0].click();
  // await page.waitForSelector('canvas');
  // await browser.close();
  for await (const a of new Array(pageNumber)) {
    const page = await browser.newPage();
    await page.goto(`http://${host}/`);
    await page.click('a + div');
    await page.waitForXPath('//*[@id="root"]/div/div[2]/div[2]');
    const roomToEnter = await page.$x('//*[@id="root"]/div/div[2]/div[2]');
    await roomToEnter[0].click();
  }
  console.log('done!');
}());
