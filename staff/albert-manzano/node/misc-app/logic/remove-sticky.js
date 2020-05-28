require('../utils/polyfills/string')
const fs = require('fs')
const path = require('path')
const { users: { find } } = require('../data')

module.exports = (userId, idSticky, callback)=>{

    String.validate.notVoid(userId)
    String.validate.notVoid(idSticky)
    String.validate.notVoid(idSticky)
    

    find({id:userId}, (error, [user])=> {
            
        if(error) return callback (error)
        if(!user) return callback(new Error('something wrong happen'))

        // find({stickieId}, 'stickies', (error, [stickie]) => { 
        //     if (error) return callback(error)
        //     if (!stickie) return callback(new Error(`this ${stickieId} does not exist`))

 
        fs.unlink(path.join(__dirname, '..', 'data', 'stickies',`${idSticky}.json`), error => {
            if (error) return callback(error)
    
            return callback(null, "succes")
        })
    })

}