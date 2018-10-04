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

let isValidEmail = (email)=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} 

module.exports = (email, password, appname, callback)=>{
    if(!isValidEmail(email)){
        const error="Invalid email";
        return callback(error);
    }
    if(!password){
        return callback("Password cannot be empty");
    }
    let transporter = generateTransporter(email, password);
    let mailOpts = mailOptions(email, appname)
    transporter.sendMail(mailOpts, (error, info) => {
       return callback(error, info);
    });
}