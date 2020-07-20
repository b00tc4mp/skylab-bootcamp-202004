// como hago para crear la peticion sin usar otras logicas?
//manualmente creando un objeto con las propiedades que quiero

//(userId, workGroupId, petitionId, status)
// crear user
// id/token => auth
// crear group
// crear other user
// authenticate 
// aceptar 
require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const updatePetition= require('./update-petition')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')

describe('logic - update petition', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, workGroupName, workGroupId, petitionId, status

    beforeEach(() =>
        User.deleteMany()
        .then(()=>WorkGroup.deleteMany())
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                workGroupName = "dreamTeam"
                petitionId= "5efb2178d37ce13d39ad87d6"
                status= "accepted"
            })
    )
    
    describe('when user,workGroup and petitions already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => userId = user.id) 
                .then(() => WorkGroup.create({name:workGroupName, creator: userId, petitions:[{
                    status : "pending",
                    _id : petitionId,
                    user : userId}]
                 })) 
                .then(workGroup => workGroupId = workGroup.id) 
        )

        it('should succeed on correct petition', async () =>{
            const result = await updatePetition(userId, workGroupId, petitionId, status)
            
            expect(result).to.be.undefined  
            const workGroups= await WorkGroup.find()
            const [workGroup] = workGroups
            const {petitions} = workGroup
            expect(workGroup.petitions.length).to.equal(1)
            expect(petitions.length).to.equal(1)
            expect(petitions[0].status).to.equal("accepted")
            expect(workGroup.petitions[0].user.toString()).to.equal(userId)

                
        })

        it('should fail when user does not exist', () => {
            
            const userId = '5ed1204ee99ccf6fae798aaf'
             return updatePetition(userId, workGroupId, petitionId, status)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with Id: ${userId} dont exist`)
                })
        })

        it('should fail when work group does not exist', () => {
            const workGroupId = '5ed1204ee99ccf6fae798aef'
            return updatePetition(userId, workGroupId, petitionId, status)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`workGroup with Id: ${workGroupId} dont exist`)
                })
        })

        it('should fail when petition does not exist', () => {
            const petitionId = '5ed1204ee99ccf6fae798aef'
            return updatePetition(userId, workGroupId, petitionId, status)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`petition with Id: ${petitionId} not exist`)
                })
        })
    })

 
    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()
    
    })

    after(async ()=> await mongoose.disconnect)
})
