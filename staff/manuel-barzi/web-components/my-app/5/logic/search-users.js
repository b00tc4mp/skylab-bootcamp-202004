function searchUsers(query) {
    // TODO find users matching query in name, surname, email

    const _users = users.filter(function(user) {
        // TODO match user.name contains query || user.surname contains query || ...
    })

    // TODO sanitize: create new objects of users without password

    // TODO return _users
}