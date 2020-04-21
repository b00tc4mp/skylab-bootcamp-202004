function retrieveUser(email){ debugger

    const user = users.find(function (user) {
        return user.email === email
    })


    return user
}