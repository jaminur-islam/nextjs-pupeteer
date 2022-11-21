// api/run.js
import edgeChromium from 'chrome-aws-lambda'

// Importing Puppeteer core as default otherwise
// it won't function correctly with "launch()"
import puppeteer from 'puppeteer-core'
import path from "path"
// You may want to change this if you're developing
// on a platform different from macOS.
// See https://github.com/vercel/og-image for a more resilient
// system-agnostic options for Puppeteeer.
const LOCAL_CHROME_EXECUTABLE = '/usr/bin/google-chrome-stable'

export default async function (req, res) {
 
 try{
   // Edge executable will return an empty string locally.
   const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE
  
   const browser = await puppeteer.launch({
     executablePath,
     args: edgeChromium.args,
     headless: true,
   })
   const page = await browser.newPage();
   await page.setContent(`<div> sagor </div>`);
     await page.setViewport({
       width: 595,
       height: 842,
       deviceScaleFactor: 1,
     });
     await page.addStyleTag({ content: "@page { size: A4 landscape; }" });
     await page.pdf({
       path: "test.pdf",
       format: "A4",
       printBackground: true,
       margin: {
         top: "40px",
         right: "30px",
         bottom: "0px",
         left: "30px",
       },
     });
     await browser.close();
  res.send('hello')

 }catch(err){
  console.log(err)
  res.status(500).json({message: "error"})
 }
  
}