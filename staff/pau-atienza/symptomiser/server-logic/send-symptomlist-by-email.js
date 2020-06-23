require('dotenv').config()
require('commons/polyfills/string')

const nodemailer = require("nodemailer");
const {env: { EMAIL_PASSWORD: PASSWORD, EMAIL_ADRESS: ACCOUNT}} = process

module.exports =  async (email, text, html)=>{
    String.validate.notVoid(email)
    String.validate.notVoid(text)
    String.validate.notVoid(html)
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: ACCOUNT,
            pass: PASSWORD
        }
    })
   
    let info = await transporter.sendMail({
        from: `Symptomiser App ${ACCOUNT}`, 
        to: email, 
        subject: "Your Symptom List", 
        text: text, 
        html: html, 
    })

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}