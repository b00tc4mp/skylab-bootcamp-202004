function searchUsers(query) {
    // TODO find users matching query in name, surname, email

    if(!query) return []

    let _users = users.filter(function(user) {
        return user.name.includes(query) || user.email.includes(query) || user.surname.includes(query)
        // TODO match user.name contains query || user.surname contains query || ...
    })

    _users = _users.map(({name, surname, email}) => {
        return {name, surname, email}
    })

    // TODO sanitize: create new objects of users without password

    return _users
    // TODO return _users
}