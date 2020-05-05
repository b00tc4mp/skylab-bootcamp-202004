// function retive(token, callback) {
//     if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

//     if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

//     call('GET','https://skylabcoders.herokuapp.com/api/v2/users', undefined, {'Authorization':`Bearer ${token}`}, (error, status, body) => {
//         if(error) return callback(error)

//         if(status === 200){
//             const user = JSON.parse(body)
//             callback(undefined, user)
//         }else {
//             const {error} = JSON.parse(body)
//             callback(console.error(error, undefined)
//             )
//         }
//     })
// }

describe('retrive user', function(){
    let name , surname, password, username
    
    it('should succeed on correct data', done => {
        registerUser(name, surname, email, password, error => {
            expect(error).to.be.undefined

        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
        `{ "name": "${name}, "surname": "${surname}","username": "${username}", "password": "${password}" }`,
        { 'Content-type': 'application/json'}, (error, status, body) => {
            expect(error).to.be.undefined
            expect(status).to.equal(201)
        
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                `{ "username": "${username}", "password": "${password}" }`,
                { 'Content-type': 'application/json' },
                (error, status, body) => {
                    expect(error).to.be.undefined
                    expect(status).to.equal(200)

                    const { token } = JSON.parse(body)

                    expect(token).to.exist

                    retive(token, (error, userInfo) => {

                        expect(error).to.be.undefined
                        expect(userInfo).to.be.an('object')

                        expect(userInfo.username).to.exist
                        expect(userInfo.name).to.exist
                        expect(userInfo.surname).to.exist

                        expect(userInfo.username).to.be.a('string')
                        expect(userInfo.name).to.be.a('string')
                        expect(userInfo.surname).to.be.a('string')

                        expect(userInfo.username).to.equal(username)
                        expect(userInfo.name).to.equal(name)
                        expect(userInfo.surname).to.equal(surname)


                    })
                })
            })
        })
    })
})