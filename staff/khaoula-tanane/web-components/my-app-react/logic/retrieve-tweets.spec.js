describe('retrieve-tweets', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    it('should retrieve tweets', done => {
        
        registerUser(name, surname, email, password, error => {
            authenticateUser(email, password, (error, token) => {
                let text = 'this is a tweet'
                tweet(token, text, (error, newTweet) => {
                    retrieveTweets(token, (error, tweets ) => {
                        expect(tweets.length).to.equal(1)
                        expect(tweets[0].text).to.equal(text)
                        done()
                    }) 
                })
            })
        })
    }).timeout(5000)
})