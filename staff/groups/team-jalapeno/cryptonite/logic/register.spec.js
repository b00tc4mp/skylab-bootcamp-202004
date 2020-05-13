
describe('register ', ()=>{
    let name,surname, email, password

    beforeEach( ()=> {
        name = names.random()
        name = name.toLowerCase()
        surname = surnames.random()
        email = `${name.split('').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    it('should succeed with correct credentials', done => { 
        register(name, surname, email, password, error =>{
            if (error) return done(new Error(error.message))
            
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            `{ "username": "${email}", "password": "${password}"}`,
            { 'Content-type': 'application/json' },
            (error, status, response) => {

                const {token} = JSON.parse(response)

                
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { Authorization: `Bearer ${token}` },
                (error, status, response) => {
                    
                    if(error) return done(new Error(error.message))
                

                    const user = JSON.parse(response)

                    expect(user.name).to.be.equal(name)
                    expect(user.surname).to.be.equal(surname)
                    expect(user.username).to.be.equal(email)
                    expect(user.password).to.be.undefined

                    done()
                })
            })
        })
    })

    it('should fail with alredy existing username', done => {
        
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/',
            `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}"}`,
            { 'Content-type': 'application/json' },
            (error, status, response) => {


            register(name, surname, email, password, (error, status, response) => {
                
                expect(error).to.exist
                expect(error.message).to.equal(`user with username \"${email}\" already exists`)
                expect(status === 201).to.be.false

                done()
            })
        })
    })

    afterEach(done => {

        const body = JSON.stringify({ username: email, password })
        const headers = { 'Content-type': 'application/json' }
        const url = 'https://skylabcoders.herokuapp.com/api/v2/users/auth'

        call('POST', url, body, headers, (error, status, response) => {
            if (error) return done(new Error(error.message))
    
            if (status === 200) {

                const { token } = JSON.parse(response)

                call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{ "password": "${password}" }`,
                {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                (error, status, body) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 204) return done(new Error(`undexpected status ${status}`))
        
                    done()
                })
            } else return done(new Error(`unexpected status ${status}`))
        })
    })
})

