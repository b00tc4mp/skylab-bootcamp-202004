const {find}=require('../data/users')

module.exports = (req, callback)=>{  
    
    const cookie = req.header('cookie')
    if (!cookie) return callback('user not logged')
    
    const [, userId] = cookie.split('=')
    
    if (!userId) return callback('user not logged')

    find({id:userId}, (error, [user])=>{
        if (error) throw error

        if (user) return callback (null, userId) 
        else return callback('user not logged')
    })
}                      