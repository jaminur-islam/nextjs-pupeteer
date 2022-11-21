import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
import path from "path"
export default async function handler(req, res) {
  console.log(path.join(__dirname, "../../../../public/pdf", "test.pdf"))
    const options = process.env.AWS_REGION
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless
        }
      : {
          args: [],
          executablePath:
            process.platform === 'win32'
              ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
              : process.platform === 'linux'
              ? '/usr/bin/google-chrome'
              : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        };
    const browser = await puppeteer.launch(options);
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
        top: "40px",
        right: "30px",
        bottom: "0px",
        left: "30px",
      },
    });
    await browser.close();    
  res.status(200).json({ name: 'John Doe' })
 
}