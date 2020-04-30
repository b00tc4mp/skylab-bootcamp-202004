function searchUsers(query) {
    query = query.toLowerCase()

    // TODO call to retrieve all users
    // TODO filter users by query criteria
    // TODO return filtered users

    const _users = users.filter(function (user) {
        const { name, surname, email } = user

        return name.toLowerCase().includes(query) || surname.toLowerCase().includes(query) || email.toLowerCase().includes(query)
    })
}