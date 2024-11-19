const nodemailer = require("nodemailer");

const sendMail = async (options) => {

   

    const transport = nodemailer.createTransport({

        host: ``,
        port: 2525,

        auth: {
            user: ``,
            pass: ``
        }

    })

    // var transport = nodemailer.createTransport({

    //     host: "sandbox.smtp.mailtrap.io",

    //     port: 2525,

    //     auth: {

    //         user: "f5bc2c1f06120c",

    //         pass: "********d494"

    //     }

    // });

    console.log("hello")

    const messages = {
        from: "noreply@shopit.com",
        to: options.to,
        subject: options.subject,
        html: options.message,

    };

    await transport.sendMail(messages)

}

module.exports = sendMail