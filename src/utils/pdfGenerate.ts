import edgeChromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

const LOCAL_CHROME_EXECUTABLE = '/usr/bin/google-chrome-stable'
 
 module.exports = async function pdfGenerate () {


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
     const pdf = await page.pdf({
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
     return pdf

 }catch(err){
  console.log(err)
 }
  
}

