import fs from 'fs';//ADDED3
import lighthouse from 'lighthouse';//ADDED4

import puppeteer from 'puppeteer'; 

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();//same page is used to open
const page = await browser.newPage();//opening a new tab

const list = [


];


// Navigate the page to a URL.
await page.goto('https://101045330.github.io/desn3035-e5');//redirection

// Set screen size.
//await page.setViewport({width: 1080, height: 1024});//dimension of viewport
await page.setViewport({width: 320, height: 600});//dimension of viewport //ADDED2

await page.waitForNetworkIdle();//ADDED1
await page.screenshot({
    path: "auto_screenshot.png"
})
// Type into search box.
await page.locator('.devsite-search-field').fill('automate beyond recorder');//find a section and ass search string

// Wait and click on first result.
await page.locator('.devsite-result-item-link').click();

// Locate the full title with a unique string.
const textSelector = await page
  .locator('text/Customize and automate')
  .waitHandle();
const fullTitle = await textSelector?.evaluate(el => el.textContent);//get,set title

// Print the full title.
console.log('The title of this blog post is "%s".', fullTitle);//print title


const options = {
    output: 'html'
};
const runnerResult = await lighthouse('https://101045330.github.io/desn3035-e5', options, undefined,page);


const reportHtml = runnerResult.report;
fs.writeFileSync('auto_report.html', reportHtml);

await browser.close();