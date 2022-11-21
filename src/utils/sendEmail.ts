import sendEmail from "@sendgrid/mail";

async function onSendEmail(pdfFile, email) {
  let attachment = pdfFile
  attachment = pdfFile.toString("base64");
  // console.log(pdfFile.toString())

  return new Promise((resolve, reject) => {
    sendEmail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
    const msg = {
      from: process.env.NEXT_PUBLIC_SENDGRID_EMAIL,
      to: email,
      subject: "Employee work schedule",
      text: "A job description is a useful, plain-language tool that explains the tasks, duties, function and responsibilities of a position",
      attachments: [
        {
          content: attachment,
          filename: "employee.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
      html: "<strong> Employee schedule </strong>",
    };
    sendEmail
      .send(msg)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

module.exports = { onSendEmail };
