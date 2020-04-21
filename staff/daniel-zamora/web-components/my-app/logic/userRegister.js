function userRegister(email,surname,email,password) {
    const actual = users.find(function(actual){
        return user.email === email
    })
    if (actual) { throw new Error ('The email already exist');
    }else {
        users.push({name, surname, email, password,});
    }
}
