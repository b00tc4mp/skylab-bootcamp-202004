require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const addPetition= require('./add-petition')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')

describe('logic - add petition', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, workGroupName, workGroupId

    beforeEach(() =>{
    debugger
        User.deleteMany()
        .then(()=>WorkGroup.deleteMany())
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                workGroupName = "dreamTeam"
            })
    })
   
    describe('when user already exists', () => {
        debugger
        beforeEach(async()=>{
            /* User.create({ name, surname, email, password })
                .then(user => userId = user.id) 
                .then(() => WorkGroup.create({name:workGroupName, creator: userId, petitions:[] })) 
                .then(workGroup => workGroupId = workGroup.id)  */
            const _user= { name, surname, email, password }
            const user =await User.create(_user)
            userId = user.id
            const workGroup= await WorkGroup.create({name:workGroupName, creator: userId, petitions:[] })
            workGroupId=workGroup.id
       })

        it('should succeed on correct user id', async () =>{
            debugger
            const result = await addPetition(workGroupId, userId)

            expect(result).to.be.undefined  
            const workGroups= await WorkGroup.find()
    
            expect(workGroups.length).to.equal(1) 
            const [workGroup] = workGroups
            expect(workGroup.petitions.length).to.equal(1)
            expect(workGroup.creator.toString()).to.equal(userId)
           
          
            expect(workGroup.petitions[0].user.toString()).to.equal(userId)

                
        })

        it('should fail when user does not exist', () => {
            
            const userId = '5ed1204ee99ccf6fae798aaf'
            console.log(workGroupId, userId) 
             return addPetition(workGroupId, userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user ${userId} not exist`)
                })
        })

        it('should fail when work group does not exist', () => {
            const workGroupId = '5ed1204ee99ccf6fae798aef'
            console.log(workGroupId, userId)
            return addPetition(workGroupId, userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`workgroup with id ${workGroupId} not exist`)
                })
        })
    })

 
    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()
    
    })

    after(mongoose.disconnect)
})