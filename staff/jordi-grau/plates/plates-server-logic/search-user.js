require('plates-commons/polyfills/string')
require('plates-commons/utils/email')
const {utils: { Email }, errors: { DuplicityError, VoidError, UnexsitenceError } } = require('plates-commons')
const {mongoose, models: { User }} = require('plates-data')

/**
 * function makes a search on db, with passed query. Returns user's email.
 * @param {email} email 
 * 
 * @throws error if a no valid type of email is passed.
 * @throws error if user's email is not registered in db.
 */
module.exports = (email) => {
    
    String.validate.notVoid(email)
    Email.validate(email)
    

    return(async () => {
        
        if(!email) throw new VoidError('Please type an e-mail')
        
        const user = await User.findOne({email})

        if(!user) throw new UnexsitenceError(`user with e-mail ${email} does not exist`)

        return user.email
         
        
    })()


}