const puppeteer = require('puppeteer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.HOST100,
  database: process.env.DATABASE100,
  user: process.env.USER100,
  password: process.env.PASSWORD100,
  ssl: {
    rejectUnauthorized: true,
  },
});

// const query = (sql, params) => {
//   return new Promise((resolve, reject) => {
//     connection.query(sql, params, (err, results, fields) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       resolve({ results: results, fields: fields });
//     });
//   });
// };

(async () => {
  console.log(await connection.getMaxListeners());
  
  // const URL = 'https://www.serversus.work/';
  const URL = 'https://www.yahoo.co.jp/';

  // const browser = await puppeteer.launch({});
  // const page = await browser.newPage();
  // await page.goto(URL, { waitUntil: 'networkidle0' });

  // const html = await page.content();

  // const ret = await page.evaluate(() => {
  //   return document.querySelectorAll('.article-list li')[0].textContent;
  // });
  // console.log(ret);

  // const ret = await page.evaluate(() => {
  //   return Array.from(document.querySelectorAll('section ul article a')).map(
  //     m => {
  //       return {
  //         title: m.textContent,
  //         href: m.href,
  //       };
  //     }
  //   );
  // });

  // ret.map(m => {
  //   console.log(m.title);
  //   console.log(m.href + '\n');
  // });

  // await browser.close();

  //   const ret2 = await query('SELECT * FROM users');
  //   console.log(ret2.results);
})();
