/* eslint-disable no-restricted-syntax */
const puppeteer = require('puppeteer');

const roomName = 'puppetTest';
const host = 'localhost:3006';
const pageNumber = 18;
const pageCount = 0;

(async function puppetTest() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`http://${host}/`);
  const anonyButton = await page.$x("//*[text() = '익명으로 로그인']");
  await anonyButton[0].click();
  const newRoom = await page.$x("//*[text() = '+ new Room();']");
  await newRoom[0].click();
  await page.type('input', roomName);
  const input = await page.$x("//*[text() = 'create();']");
  await input[0].click();
  for await (const a of new Array(pageNumber)) {
    const page = await browser.newPage();
    await page.goto(`http://${host}/`);
    const anonyButton = await page.$x("//*[text() = '익명으로 로그인']");
    await anonyButton[0].click();
    await page.waitForXPath('//*[@id="root"]/div/div[2]/div[2]');
    const roomToEnter = await page.$x('//*[@id="root"]/div/div[2]/div[2]');
    await roomToEnter[0].click();
  }
  console.log('done!');
}());
