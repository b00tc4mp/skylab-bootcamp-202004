function retrieveUser(email) {
    if(typeof email !== 'string') throw new TypeError(email + 'its a string')
    if(!EMAIL_REGEX.test(email)) throw new Error(email + ' is not a e-mail')

const user = users.find(function(user){return user.email === email})

return user

}
