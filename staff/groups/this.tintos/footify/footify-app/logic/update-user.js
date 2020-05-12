function updateUser (token, newData, callback){
    if(typeof newData !== 'object') throw new TypeError (`field ${newData} is not and object`)
    String.validate.notVoid(token)
    Function.validate(callback)
    
    const keys = Object.keys(newData)
    
    const VALID_FIELDS = ['name', 'surname', 'email', 'password', 'oldPassword']
    
    keys.forEach(key => {
        if(!VALID_FIELDS.includes(key)) throw new Error(`property ${key} is not allowed`)
    })

    for (const key in newData) {
        if (key === 'email') newData[key].trim() === '' ? delete newData[key] : Email.validate(newData[key]);
        else newData[key].trim() === '' ? delete newData[key] : String.validate.notVoid(newData[key])
    }
    
    let {oldPassword} = newData
    
    // name.trim() === '' ? name = undefined : String.validate.notVoid(name)
    // surname.trim() === '' ? surname = undefined : String.validate.notVoid(surname)
    // email.trim() === '' ? email = undefined : Email.validate(name)
    // password.trim() === '' ? password = undefined : String.validate.notVoid(password)
    // oldPassword.trim() === '' ? oldPassword = undefined : String.validate.notVoid(oldPassword)



    if(typeof oldPassword === 'undefined') {
        return callback(new Error ('You have to indicate your old password'))
    } else  String.validate.notVoid(oldPassword)


    
    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify(newData), 
    { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
     (error, status, body)=> {
         if (error) return callback(error)

         if (status === 204){
         callback()
         
         }else {
             const { error } = JSON.parse(body)

             callback(new Error(error))
         }
     })
}