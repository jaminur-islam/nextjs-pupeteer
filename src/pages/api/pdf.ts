import puppeteer from 'puppeteer-core'
import chromium from 'chrome-aws-lambda'
const LOCAL_CHROME_EXECUTABLE = '/usr/bin/chromium-browser'

export default async function handler(req, res) {
  // const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE
  const browser = await puppeteer.launch({
    args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
  })

  const page = await browser.newPage()
  await page.goto('https://github.com')
  
  res.status(200).json({ name: 'John Doe' })
}
