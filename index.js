"use strict";
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let generateTransporter = (email, password)=>{
    return nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: email,
            pass: password
        },
        tls: { ciphers: 'SSLv3' }
    })
}

let mailOptions = (email, appname)=>{
    return  {
        from: email, 
        to: email,
        subject: 'New Login on your Office365 Account', 
        text: 'Dear User\n  Someone just logged on '+appname+' with your details. Please if it not you, kindly change you office365 account password.\nRegards \n Office365 NodeJs Autheticator.', // plain text body
        html: '<p>Dear User, </p><p>Someone just logged on '+appname+' with your details. Please if it not you, kindly change you office365 account password</p><br /><p>Regards </p><p>Office365 NodeJs Autheticator</p>', // plain text body
      };
}

module.exports = (email, password, appname, callback)=>{
    let transporter = generateTransporter(email, password);
    let mailOptions = mailOptions(email, appname)
    transporter.sendMail(mailOptions, (error, info) => {
       callback(error, info);
       /// next(('Message %s sent: %s', info.messageId, info.response));
    });
}