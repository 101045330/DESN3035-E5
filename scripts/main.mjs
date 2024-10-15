import fs from 'fs';//ADDED3
import lighthouse from 'lighthouse';//ADDED4

import puppeteer from 'puppeteer'; 

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();//same page is used to open
const page = await browser.newPage();//opening a new tab

const list = [


];


// Navigate the page to a URL.
await page.goto('https://101045330.github.io/DESN3035-E5/');//redirection

// Set screen size.
//await page.setViewport({width: 1080, height: 1024});//dimension of viewport
await page.setViewport({width: 320, height: 600});//dimension of viewport //ADDED2

await page.waitForNetworkIdle();//ADDED1
await page.screenshot({
    path: "auto_screenshot.png"
})
// Type into search box.

const options = {
    output: 'html'
};
const runnerResult = await lighthouse('https://101045330.github.io/DESN3035-E5/', options, undefined,page);


const reportHtml = runnerResult.report;
fs.writeFileSync('auto_report.html', reportHtml);

await browser.close();