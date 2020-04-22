function searchUsers(query) {
    const regExp = new RegExp(query.toLowerCase())
    
    const usersFound = users.filter(user => regExp.test(user.name.toLowerCase()) || regExp.test(user.surname.toLowerCase()) || regExp.test(user.email.toLowerCase()))

    return usersFound
}