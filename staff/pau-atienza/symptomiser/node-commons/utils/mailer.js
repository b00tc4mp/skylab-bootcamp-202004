const nodemailer = require("nodemailer");

module.exports = (service, user, pass) => {
    const transporter = nodemailer.createTransport({
        service,
        auth: {
            user,
            pass
        }
    })

    return {
        send(options) {
            return transporter.sendMail(options)
        }
    }
}