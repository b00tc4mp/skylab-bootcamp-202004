function updateUser (token, newData, callback){
    if(typeof newData !== 'object') throw new TypeError (`field ${newData} is not and object`)
    String.validate.notVoid(token)
    Function.validate(callback)
    
    const keys = Object.keys(newData)
    
    const VALID_FIELDS = ['name', 'surname', 'email', 'password', 'oldPassword']
    
    keys.forEach(key => {
        if(!VALID_FIELDS.includes(key)) throw new Error(`property ${key} is not allowed`)
    })

    const {password, oldPassword} = newData

    if (password !== '' &&  oldPassword === '') {
        return callback(new Error ('You have to indicate your old password'))
    } else if(password !== '' && oldPassword !== '') { 
        String.validate.notVoid(password)
        String.validate.notVoid(oldPassword)
    } else {        
    for (const key in newData) {
        if (key === 'email') newData[key].trim() === '' ? delete newData[key] : Email.validate(newData[key]);
        else newData[key].trim() === '' ? delete newData[key] : String.validate.notVoid(newData[key])
    }
}  


    
    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify(newData), 
    { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
     (error, status, body)=> {
         if (error) return callback(error)

         if (status === 204){
         callback(undefined, 'All changes has been updated')
         
         }else {
             const { error } = JSON.parse(body)

             callback(new Error(error))
         }
     })
}