function searchUsers(query) {
    query = query.toLowerCase()

    const _users = users.filter(function (user) {
        const { name, surname, email } = user

        return name.toLowerCase().includes(query) || surname.toLowerCase().includes(query) || email.toLowerCase().includes(query)
    })

    // const __users = _users.map(function(user) {
    const __users = _users.map(function ({ name, surname, email }) {
        // const { name, surname, email } = user

        return { name, surname, email }
    })

    return __users
}