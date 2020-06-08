const EMAIL_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[#$^+=!*()@%&:]).{8,}/
// 1mayus 1num 8 minlength
const Email = {
    isEmail(email) {
        return EMAIL_REGEX.test(email)
    }
}

Email.validate = function (email) {
    if (!this.isEmail(email)) throw new Error(`${email} is not an e-mail`)
}.bind(Email)


module.exports = Email