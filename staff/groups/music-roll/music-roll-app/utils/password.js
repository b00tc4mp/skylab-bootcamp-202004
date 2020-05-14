const Password = (() => {

    const PASSWORD_REGEX = /(?=(.[0-9]))((?=.[A-Za-z0-9])(?=.[A-Z])(?=.[a-z]))^.{8,}$/
    
    return {
        isPassword(password) {
            return PASSWORD_REGEX.test(password)
        },

        validate(password) {
            if (!this.isPassword(password)) throw new Error("password don't have the minimum requisits")
        }
    }
})()