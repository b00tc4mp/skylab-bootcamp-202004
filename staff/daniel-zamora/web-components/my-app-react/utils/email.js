const Email = (() => {
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return {
        isEmail(email) {
            return EMAIL_REGEX.test(email)
        },

        validate(email) {
            if (!this.isEmail(email)) throw new Error(`${email} is not an e-mail`)
        }
    }
})()