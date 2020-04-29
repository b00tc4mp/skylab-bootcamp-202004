function followUser(email, selfmail) {
    users.forEach(user => {
        if (user.email === email) {
            for (var i = 0; users.length; i++) {
                if (users[i].email === selfmail) {
                    users[i].folllowing.push(email)
                }
            }

        } else {
            console.log('error')
        }
    })

}