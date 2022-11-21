const pdfGenerate = require("../../utils/pdfGenerate")
const {onSendEmail}= require("../../utils/sendEmail")
export default async function (req, res) {
  const generatePdf = await pdfGenerate()
  await onSendEmail(generatePdf , "jaminurislam250@gmail.com")
  // res.setHeader('Content-Type', 'application/pdf')
  // res.setHeader("Content-Description", `filename='sagor.pdf'`)
  res.send("good job")
}