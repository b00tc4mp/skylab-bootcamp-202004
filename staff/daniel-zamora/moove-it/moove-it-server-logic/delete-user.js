require('misc-commons/polyfills/string')
const {utils: { Email }, errors: { UnexistenceError, CredentialsError }} = require('misc-commons')

module.exports = (email, password, userId) => {
    String.validate.notVoid(userId)
    Email.validate(email)
    String.validate.notVoid(password)
    
    return new Promise((resolve, reject)=>{
        find({ email }, (error, users) => {
            if (error) return reject(error)
    
            const [user] = users
            
            if (!user) return reject(new UnexistenceError(`user with e-mail ${email} does not exist`))
    
            if (user.password !== password || user.id !== userId) return reject(new CredentialsError('wrong password'))
    
            remove(userId, error=>{
                if (error) return reject(error)
                
                resolve()
            })
        })
    })   
}