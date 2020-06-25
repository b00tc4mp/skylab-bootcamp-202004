const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[#$^+=!*()@%&:]).{8,}/
// 1mayus 1num 8 minlength
const Password = {
    isPassword(password) {
        return PASSWORD_REGEX.test(password)
    }
}

Password.validate = function (password) {
    if (!this.isPassword(password)) throw new Error(`${password} does not have 1 mayus and 1 number or length`)
}.bind(Password)


module.exports = Password