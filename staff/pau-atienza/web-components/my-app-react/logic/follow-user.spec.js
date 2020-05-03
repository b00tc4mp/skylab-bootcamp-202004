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

                expect(user.follows).to.exist
                expect(user.follows).to.have.length(1)

                const [_following] = user.follows
                expect(_following).to.equal(following)
            })

            describe('when following is already followed', () => {
                beforeEach(() => {
                    const user = users.find(user => user.email === email)

                    user.follows = [following]
                })

                it('should succeed and following become unfollowed', () => {
                    toggleFollowUser(email, following)

                    const user = users.find(user => user.email === email)

                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)

                    expect(user.follows).to.exist
                    expect(user.follows).to.have.length(0)
                })
            })
        })

        describe('when following does not exist', () => {
            beforeEach(() => following = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`)

            it('should fail alerting following user e-mail does not exist', () =>
                expect(() => {toggleFollowUser(email, following)}).to.throw(Error, `The user with e-mail ${following} does not exist`)
            )
        })
    })

    describe('when user does not exist', () => {
        beforeEach(() => {
            email = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`

            following = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`
        })

        it('should fail alerting user e-mail does not exist', () =>
            expect(() => toggleFollowUser(email, following)).to.throw(Error, `The user with e-mail ${following} does not exist`)
        )
    })

    it("should return an error email is not a string", function(){
        let email = 'pauatienza@hotmail.com'
        let following = 'khaoulatanane@hotmail.com'
        expect(() => toggleFollowUser(123, following)).to.throw(TypeError, '123 is not a string') 
        expect(() => toggleFollowUser(email, 123)).to.throw(TypeError, '123 is not a string') 

    })

    it("should return an error the email does not pass the criteria", function(){
        let email = 'pauatienza@hotmail.com'
        let following = 'khaoulatanane@hotmail.com'
        expect(() => toggleFollowUser('123', following)).to.throw(Error, '123 is not an e-mail') 
        expect(() => toggleFollowUser(email, '123')).to.throw(Error, '123 is not an e-mail')
    })
})