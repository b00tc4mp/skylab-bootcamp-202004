require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
require('coohappy-commons/polyfills/number')
const { errors: { UnexistenceError }, utils: { Email } } = require('coohappy-commons')
const { models: { User} } = require('coohappy-data')
const { mongoose: { ObjectId } } = require('coohappy-data')
const nodemailer = require('nodemailer')

module.exports = ((userId, html, email) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(html)
    String.validate.notVoid(email)
    Email.validate(email)

    return User.findOne({ _id: ObjectId(userId) }, { __v: 0, password: 0, foodList: 0, laundry: 0}).lean()
    .then(user => {
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);
        
        (async () => {
      
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'coohappyapp@gmail.com',
                    pass: 'coohappy2020'
                }
            })
        
            let info = await transporter.sendMail({
                from: 'Sergi Ramos coohappyapp@gmail.com', // sender address
                to: `coohappyapp@gmail.com`, // list of receivers
                subject: "Food list", // Subject line
                text: "", // plain text body
                html: `${html}`, // html body
            })

        })().catch(console.error)
    })
})