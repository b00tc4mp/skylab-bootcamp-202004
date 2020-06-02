require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongo } = require('../data')
const updateUser = require('./update-user')
const { random } = Math
const { expect } = require('chai')
const { UnexistenceError, CredentialsError, ForbiddenError } = require('../errors')


describe.only('logic - update user', () => {
    let users

    before(() =>
        mongo.connect(MONGODB_URL).then(connection => {
        users = connection.db().collection('users')
        })
    )
    
    let name, surname, email, password, oldPassword, userId

    beforeEach( () => 
        users.deleteMany()
            .then( () => {

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )
    

    describe('when user already exists', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }

            return users.insertOne(user)
                .then(user => userId = user.insertedId.toString())
            })
       

        it('should succeed on correct credentials', () => {
            let data = ({name: "newName", surname: "newSurname"})

            return updateUser(userId, data)
                .then(message=>{
                    expect(message).to.exist
                    return users.findOne({_id: mongo.ObjectId(userId)})
                })
                .then(user => { //No me devuelve bien el user
            
                    expect(user.name).to.equal("newName")
                    expect(user.surname).to.equal("newSurname")
                    expect(user.email).to.equal(email) 
                }) 
        })

        // it('should succeed if user attempts to change password and oldPassword is correct', () => {
        //     let data = {"password": "123", oldPassword: password}
            
        //     return updateUser(userId, data)
        //         .then((user)=>{ debugger
        //             expect(user.name).to.equal(name)
        //             expect(user.surname).to.equal(surname)
        //             expect(user.email).to.equal(email)
                    
        //             fs.readFile(path.join(__dirname, "..","data", "users", `${userId}.json`), (error, data)=>{
        //                 data = JSON.parse(data)
        //                 expect(data.password).to.equal("123")
        //             })
        //         })
        //         .catch(error=>{throw error})
        // })

        // it('should fail if user attempts to change password and no oldPassword is introduced', () => {
        //     let data = {password: "123"}
        //     try{
        //         updateUser(userId, data)
        //             .then(()=>{throw new Error("Should not be here")})

        //     }catch(error){
        //         expect(error).to.be.an.instanceOf(CredentialsError)
        //         expect(error.message).to.equal("oldPassword is required")
        //     }
        // })

        // it('should fail if user attempts to change email', () => {
        //     let data = {email: "123@abc.com"}
        //     try{
        //         updateUser(userId, data)
        //             .then(()=>{throw new Error("Should not be here")})
                    
        //     }catch(error){
        //         expect(error).to.be.an.instanceOf(ForbiddenError)
        //         expect(error.message).to.equal("Email cannot be updated")
        //     }
        // })

        it('should fail when incorrect credencials are introduced', () => {
            try{
                updateUser(userId, 1)
                    .then(()=>{throw new Error("Should not be here")})        
            }catch(error){
                expect(error).to.be.an.instanceOf(TypeError)
                
                expect(error.message).to.equal("1 is not a JSON")
            }

            try{
                updateUser(1, {name: "123"})
                    .then(()=>{throw new Error("Should not be here")})        
            }catch(error){
                expect(error).to.be.an.instanceOf(TypeError)
                
                expect(error.message).to.equal("1 is not a string")
            }
        })
    })

    // describe('when user does not exist', ()=>{
    //     it('should fail when user does not exist', () =>{ 
    //         let userId = uid()

    //         return updateUser(userId, {name, surname})
    //             .then(()=>{throw new Error("Should throw error")})
    //             .catch(error=>{
    //                 expect(error).to.be.an.instanceof(Error)
    //             })
    //         })
    // })
        
    afterEach(() => users.deleteMany()
)
    after(() => mongo.disconnect())
})
