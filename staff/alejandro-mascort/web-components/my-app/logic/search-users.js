const searchUsers = query => {
    if (query.trim().length) {
        const regExp = new RegExp(query.toLowerCase())
        
        const usersFound = users.filter(user => regExp.test(user.name.toLowerCase()) || regExp.test(user.surname.toLowerCase()) || regExp.test(user.email.toLowerCase()))

        const results = usersFound.map(({name, surname, email}) => ({name, surname, email}))

        return results
    } else return []
}