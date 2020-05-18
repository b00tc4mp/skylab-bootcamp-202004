describe('retrieve-tweets', () => {
   
    describe('when user already exist', () => {
        let name, surname, email, password, user

        beforeEach(() => {
            users.length = 0

            name = names.random()
            surname = surnames.random()
            email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
            password = passwords.random()
            user = { name, surname, email, password }
            users.push(user)
        })

        it('should succeed on existing users', () => {
            
            
            tweet(email, 'hola')

            expect(user.tweets).to.exist
            expect(user.tweets).to.have.length(1)

            const tweets = retrieveTweets(email)

            expect(tweets).to.have.length(1)
            expect(tweets[0].text).to.equal(user.tweets[0].text)
            expect(tweets[0].date instanceof Date).to.equal(true)
            expect(tweets[0].date).to.equal(user.tweets[0].date)
        })
    })
})