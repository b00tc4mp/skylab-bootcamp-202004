function searchUsers(query) {
    query = query.toLowerCase();
    
    const filteredUsers = users.filter(function(user) {
        const { name, surname, email } = user;

        return name.toLowerCase().includes(query) || surname.toLowerCase().includes(query) || email.toLowerCase().includes(query)
    })

    const sanitizedUsers = filteredUsers.map(function(user) {
        const { name, surname, email } = user;

        return { name, surname, email}
    })

    return sanitizedUsers;
}