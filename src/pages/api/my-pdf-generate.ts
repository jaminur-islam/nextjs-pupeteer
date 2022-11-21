const pdfGenerate = require("../../utils/pdfGenerate")
const {onSendEmail}= require("../../utils/sendEmail")
export default async function (req, res) {
  try{
    const generatePdf = await pdfGenerate()
  await onSendEmail(generatePdf , "jaminurislam250@gmail.com")
  res.setHeader('Content-Type', 'application/pdf')
  res.send(generatePdf)
  }catch(err){
    res.send("not right")
  }
}