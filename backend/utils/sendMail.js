const nodemailer = require("nodemailer");

const sendMail = async (options) => {

    const transport = nodemailer.createTransport({

        host: `${process.env.SMTP_HOST}`,
        port: `${process.env.SMTP_PORT}`,

        auth: {

            user: `${process.env.SMTP_EMAIL}`,

            pass: `${process.env.SMTP_PASSWORD}`

        }

    })

    const messages = {
        from: `${process.env.SMTP_EMAIL_FROM}`,
        to: options.email,
        subject: options.subject,
        html: options.message,

    };

    await transport.sendMail(messages)

}

module.exports=sendMail