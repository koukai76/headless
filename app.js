const puppeteer = require('puppeteer');

(async () => {
  const URL = 'https://www.serversus.work/';

  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // const html = await page.content();

  const ret = await page.evaluate(() => {
    return document.querySelectorAll('.article-list li')[0].textContent;
  });

  console.log(ret);

  await browser.close();
})();
