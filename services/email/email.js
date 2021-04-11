const nodemailer = require('nodemailer')
exports.sendMail = (RECEIVER_EMAIL, subject, body, links) => {
    let mailConfig;
    const SENDER_EMAIL = process.env.EMAIL_ID;

    mailConfig = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: SENDER_EMAIL,
            pass: process.env.EMAIL_PASS
        }
    };


    const transporter = nodemailer.createTransport(mailConfig);

    transporter.sendMail({
        from: SENDER_EMAIL,
        to: RECEIVER_EMAIL,
        subject: subject,
        text: body
    }, (err, info) => {
        if (info)
            console.log(info);
        if (err)
            console.log(err)
    })
}