describe('tweets', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    it('should retieve tweets', done => {
        
        registerUser(name, surname, email, password, error => {
            authenticateUser(email, password, (error, token) => {
                let text = 'this is a tweet'
                tweet(token, text, (error, newTweet) => {
                    expect(newTweet.text).to.equal(text)
                    done()
                })
            })
        })
    }).timeout(5000)

})