const puppeteer = require('puppeteer');

(async () => {
  // const URL = 'https://www.serversus.work/';
  const URL = 'https://www.yahoo.co.jp/';

  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // const html = await page.content();

  // const ret = await page.evaluate(() => {
  //   return document.querySelectorAll('.article-list li')[0].textContent;
  // });
  // console.log(ret);

  const ret = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section ul article a')).map(
      m => {
        return {
          title: m.textContent,
          href: m.href
        }
      }
    );
  });
  
  ret.map(m => {
    console.log(m.title);
    console.log(m.href + "\n")
  });

  await browser.close();
})();
