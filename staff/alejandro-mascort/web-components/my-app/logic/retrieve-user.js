function retrieveUser(email) {
    const user = users.find(user => user.email === email)

    return user
}