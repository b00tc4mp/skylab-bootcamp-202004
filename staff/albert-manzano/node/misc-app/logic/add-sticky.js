require('../utils/polyfills/string')
require('../utils/polyfills/function')
require('../utils/polyfills/json')
const { users: { find } } = require('../data')

module.exports = ( userId ,{message}, callback) => {
    if (message) {
        
        String.validate.notVoid(userId)

        String.validate.notVoid(message)
        Function.validate(callback)
        
        find({id:userId}, (error, [user])=> {
           
            if(error) return callback (error)
            if(!user) return callback(new Error('something wrong happen'))
            
            let text=message.replace(/\r?\n|\r/g, " ")
            
            message = text.split('+').join(' ')
            
            const sticky = { message, userId }

            const idSticky = uid()
        
            const file = `${idSticky}.json`
        
            sticky.idSticky = idSticky
              
            fs.writeFile(path.join(__dirname, '..', 'data', 'stickies',file), JSON.prettify(sticky), error => {
                if (error) return callback(error)
                
                callback(null, idSticky)
            })
        })
    } else {
        throw new Error('sticky input empty')
    }

  
}