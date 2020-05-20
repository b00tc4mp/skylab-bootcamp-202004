describe('toggleFollowUser', () => {
    let email, following

    describe('when user already exist', () => {
        let name, surname, password

        beforeEach(() => {
            users.length = 0

            name = names.random()
            surname = surnames.random()
            email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
            password = passwords.random()

            users.push({ name, surname, email, password })
        })

        describe('when following already exists', () => {
            beforeEach(() => {
                const name = names.random(),
                    surname = surnames.random(),
                    email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`,
                    password = passwords.random()

                users.push({ name, surname, email, password })

                following = email
            })

            it('should succeed on existing users', () => {
                toggleFollowUser(email, following)

                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)

                expect(user.following).to.exist
                expect(user.following).to.have.length(1)

                const [_following] = user.following
                expect(_following).to.equal(following)
            })

            describe('when following is already followed', () => {
                beforeEach(() => {
                    const user = users.find(user => user.email === email)

                    user.following = [following]
                })

                it('should succeed and following become unfollowed', () => {
                    toggleFollowUser(email, following)

                    const user = users.find(user => user.email === email)

                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)

                    expect(user.following).to.exist
                    expect(user.following).to.have.length(0)
                })
            })
        })

        describe('when following does not exist', () => {
            beforeEach(() => following = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`)

            it('should fail alerting following user e-mail does not exist', () =>
                expect(() => toggleFollowUser(email, following)).to.throw(Error, `user with e-mail ${following} not found`)
            )
        })
    })

    describe('when user does not exist', () => {
        beforeEach(() => {
            email = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`

            following = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`
        })

        it('should fail alerting user e-mail does not exist', () =>
            expect(() => toggleFollowUser(email, following)).to.throw(Error, `user with e-mail ${email} not found`)
        )
    })
})