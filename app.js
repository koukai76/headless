const puppeteer = require('puppeteer');
const mysql = require('mysql2');
// require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  ssl: {
    rejectUnauthorized: true,
  },
});

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({ results: results, fields: fields });
    });
  });
};

(async () => {
  const URL = 'https://www.serversus.work/';
  // const URL = 'https://www.yahoo.co.jp/';

  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });

  // const html = await page.content();

  const ret = await page.evaluate(() => {
    return document.querySelectorAll('.article-list li')[0].textContent;
  });

  await query('UPDATE users SET first_name = ? WHERE id = ?', [
    ret,
    1,
  ]);
  
  const ret2 = await query('SELECT * FROM users WHERE id = 1');
  console.log(ret2.results[0].first_name);
  console.log(ret2.results[0].first_name === ret);
  
  connection.end()
  
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

  await browser.close();
})();
