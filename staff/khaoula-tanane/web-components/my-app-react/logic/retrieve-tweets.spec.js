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

            let tweets = retrieveTweets(email)

            expect(tweets).to.have.length(1)
            expect(tweets[0].text).to.equal(user.tweets[0].text)
            expect(tweets[0].date instanceof Date).to.equal(true)
            expect(tweets[0].date).to.equal(user.tweets[0].date)
        })
    })

    // it("should return an error email is not a string", function(){
    //     let email = 'pauatienza@hotmail.com'
    //     let text = 'khaoulatanane@hotmail.com'
    //     expect(() => tweet(123, text)).to.throw(TypeError, 'pauatienza@hotmail.com is not a string') 
    //     expect(() => tweet(email, 123)).to.throw(TypeError, '123 is not a string') 

    // })

    // it("should return an error the email does not pass the criteria", function(){
    //     let text = 'khaoulatanane@hotmail.com'
    //     expect(() => tweet('123', text)).to.throw(Error, '123 is not an e-mail') 
        
    // })
})