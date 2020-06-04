describe("search-users", () => {
    let query, name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@gmail.com`
        password = passwords.random()
    })

    describe("when users exists", () => {
        beforeEach((done) => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/',
                `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
                { 'Content-type': 'application/json' },
                (error, status, body)
            )
        })
    })
})