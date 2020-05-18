describe('tweet', () => {
    let email, text
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

        it('should succeed on existing users', () => {
            debugger
            tweet(email, 'Hola Mundo')
            
            const user = users.find(user => user.email === email)

            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).to.equal(password)

            expect(user.tweets).to.exist
            expect(user.tweets).to.have.length(1)

            const [_tweets] = user.tweets.text
            expect(_tweets).to.equal(text)
            expect(user.tweets.date instanceof Date).to.equal(true)
        })
    })

    it("should return an error email is not a string", function(){
        const email = 'pauatienza@hotmail.com'
        const text = 'khaoulatanane@hotmail.com'
        expect(() => tweet(123, text)).to.throw(TypeError, 'pauatienza@hotmail.com is not a string') 
        expect(() => tweet(email, 123)).to.throw(TypeError, '123 is not a string') 

    })

    it("should return an error the email does not pass the criteria", function(){
        const text = 'khaoulatanane@hotmail.com'
        expect(() => tweet('123', text)).to.throw(Error, '123 is not an e-mail') 
        
    })
})