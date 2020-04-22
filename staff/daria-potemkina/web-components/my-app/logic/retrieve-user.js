function retrieveUser(email){
    if(typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if(!EMAIL_REGEX.test(email)) throw new Error(email + ' does not match the format')

    const user = users.find(function(user){return user.email === email})

    return user
}