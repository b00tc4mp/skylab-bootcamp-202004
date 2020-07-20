require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveWorkGroup= require('./retrieve-solo-work-group')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')

describe('logic - retrieve solo work Group', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, workGroupName, workGroupId

    beforeEach(() =>
        User.deleteMany()
        .then(()=>WorkGroup.deleteMany())
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                workGroupName = "dreamTeam"  
            })
    )
   
    describe('when user already exists', async() => {
        beforeEach(async() =>{
            const workGroup = await WorkGroup.create({name:workGroupName, creator:'5ed1204ee99ccf6fae798abf'})
            workGroupId= workGroup._id
            const user= await User.create({name, surname, email, password, workGroupPref: workGroupId})
            userId = user._id.toString()
            })

        it('should succeed on correct data', async () =>{
            const result = await retrieveWorkGroup(userId)

            expect(result).to.not.be.undefined
            expect(result._id.toString()).to.equal(workGroupId.toString())
            expect(result.name).to.equal(workGroupName)


                
        })
        it('should fail when user does not exist', () => {
            
            const userId = '5ed1204ee99ccf6fae798aaf'
             return retrieveWorkGroup(userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId } does not exist`)
                })
        })

    })

 
    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()
    
    })

    after(mongoose.disconnect)
})