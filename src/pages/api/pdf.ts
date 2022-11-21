const pdfGenerate = require("../../utils/pdfGenerate")
export default async function (req, res) {
  const  pdf = await pdfGenerate()
  res.setHeader('Content-Type', 'application/pdf')
  res.send(pdf)

  
}