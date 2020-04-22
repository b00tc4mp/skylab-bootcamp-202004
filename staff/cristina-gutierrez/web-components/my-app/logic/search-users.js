function searchUsers(query) {
    query = query.toLowerCase();
    
    const _users = users.filter(function(user) {
        const { name, surname, email } = user;

        return name.toLowerCase().includes(query) || surname.toLowerCase().includes(query) || email.toLowerCase().includes(query)
    })

    const __users = users.map(function(user) {
        const { name, surname, email } = user;

        return { name, surname, email}
    })

    return __users;
}