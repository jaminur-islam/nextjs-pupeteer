import edgeChromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
import path from "path"
export default async function handler(req, res) {
  const LOCAL_CHROME_EXECUTABLE = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE
  
  const browser = await puppeteer.launch({
    executablePath,
    args: ["--no-sandbox",
		"--disable-setuid-sandbox"],
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
        top: "40px",
        right: "30px",
        bottom: "0px",
        left: "30px",
      },
    });
    await browser.close();    
  res.status(200).json({ name: 'John Doe' })
 
}