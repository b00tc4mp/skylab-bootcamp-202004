function loginUser(email, password) {

    const user = users.find(function (user) {
        return user.email === email && user.password === password
    })
    
    if(!user) throw new Error('wrong credentials')
}