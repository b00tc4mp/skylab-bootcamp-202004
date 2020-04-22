function searchUser(query) {


    const user = users.filter(function (user) {
        return user.name === query || user.email === query || user.surname === query
    })

    const usersFound = user.map(function({name, surname, email}){
        return {name, surname, email}
    })

    return usersFound
}