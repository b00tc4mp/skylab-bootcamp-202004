function updateUser (token, newData, callback){
    if(typeof newData !== 'object') throw new TypeError (`field ${newData} is not and object`)
    String.validate.notVoid(token)
    Function.validate(callback)

    const {name, surname, email, password, oldPassword} = newData

    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    Email.validate(email)
    String.validate.notVoid(password)
    String.validate.notVoid(oldPassword)

    const keys = Object.keys(newData)

    const VALID_FIELDS = ['name', 'surname', 'email', 'password', 'oldPassword']

    keys.forEach(key => {
        if(!VALID_FIELDS.includes(key)) throw new Error(`property ${key} is not allowed`)
    })
    
    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/', JSON.stringify(newData), 
    { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/jason'},
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