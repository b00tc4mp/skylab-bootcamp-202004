// const jwt = require('jsonwebtoken')
// const SECRET = 'my secret'

// module.exports = ( req, res, next) =>{

//     const [, token] = req.header('authorization').split(' ')
    
//     if(!token) new Error(error.message)
//     else  { 
//         const { sub: userId } = jwt.verify(token, SECRET) 
        
        
//         return userId
//     }
//     next() 
// }