function profileChange(token, updates,callback) {
    if(!interests) throw new Error('Please choose at least one interest')
    let user={}
    if(name)user.name=name;
    if(surname)user.surname=surname;
    if(email)user.email=email;
    if(interests)user.categories=interests;
    if(country)user.country=country;
   
    
    if(password){
        user.password=password;
        if(oldPassword)user.oldPassword=oldPassword;
    }
  
    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users',JSON.stringify(updates),
    { 'Content-type': 'application/json' , 'Authorization': `Bearer ${token}`}, 
    (error, status, body) => {
    if (error) return callback(error)

    if (status === 204){
         callback(undefined)
         console.log(user)
    } else {
            const { error } = JSON.parse(body)
            callback(new Error(error))
        }

    })
}