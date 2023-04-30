import { createTransport } from 'nodemailer'

export const sendEmail = async (
  to: string,
  url: string,
  txt: string,
  subject: string,
  html: string
) => {
  const smtpTransport = createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })
  try {
    return smtpTransport.sendMail({
      from: 'PayShop',
      to,
      subject,
      html
    })
  } catch (e) {
    console.log(e)
    return e
  }
}
