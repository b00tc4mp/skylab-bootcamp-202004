function searchUser(query) {


    if(!query.trim().length) throw new Error('query is empty or blank')

    const user = users.filter(function (user) {
        return user.name === query || user.email === query || user.surname === query
    })
    return user
}