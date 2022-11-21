import edgeChromium from 'chrome-aws-lambda'

// Importing Puppeteer core as default otherwise
// it won't function correctly with "launch()"
import puppeteer from 'puppeteer-core'

// You may want to change this if you're developing
// on a platform different from macOS.
// See https://github.com/vercel/og-image for a more resilient
// system-agnostic options for Puppeteeer.
const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

export default async function (req, res) {
  // Edge executable will return an empty string locally.
  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE
  
  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  })
  
  const page = await browser.newPage()
  await page.goto('https://github.com')
  // await browser.close()
  
  res.send('hello')
}








/* import edgeChromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
import path from "path"
export default async function handler(req, res) {
  const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const executablePath = await edgeChromium.executablePath
  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  })
    // const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setContent(`<div> sagor sago ssagor sagor </div>`);
    await page.setViewport({
      width: 595,
      height: 842,
      deviceScaleFactor: 1,
    });
    await page.addStyleTag({ content: "@page { size: A4 landscape; }" });
    await page.pdf({
      path: path.join(__dirname, "../../../../public/pdf", "tests.pdf"),
      printBackground: true,
      margin: {
        top: "340px",
        right: "30px",
        bottom: "0px",
        left: "30px",
      },
    });
    await browser.close();    
  res.status(200).json({ name: 'John Doe' })
 
} */