const searchUser = (query) => {

    const user = users.filter((user) => {
        return user.name === query || user.email === query || user.surname === query
    })

    const usersFound = user.map(({name, surname, email}) => {
        return {name, surname, email}
    })

    return usersFound
}