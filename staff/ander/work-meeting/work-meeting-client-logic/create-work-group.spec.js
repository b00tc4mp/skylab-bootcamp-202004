require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const createWorkGroup = require('./create-work-group')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')

describe('logic - create work group', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, workGroupName

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

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => userId = user.id) //no seria _id
        )

        it('should succeed on correct user id', async () =>{
            const result =await createWorkGroup(workGroupName, userId)
            console.log(result)

                expect(result).to.be.undefined  
            const workGroups= await WorkGroup.find()
                expect(workGroups.length).to.equal(1) 
            const [workGroup] = workGroups
            expect(workGroup.name).to.equal(workGroupName)
            console.log(userId, workGroup.creator)
            
            expect(workGroup.creator.toString()).to.equal(userId)
            //comprobar que guarda en el user la referencia
            const user = await User.findById(userId)
            
            expect(user.workGroupPref.toString()).to.equal(workGroup._id.toString())
            expect(user.workGroups.length).to.equal(1)

                
        })
    })

    it('should fail when user does not exist', () => {
        const userId = '5ed1204ee99ccf6fae798aef'
            console.log(workGroupName, userId)
        return createWorkGroup(workGroupName, userId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user ${userId} not exist`)
            })
    })

    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()
    
    })

    after(mongoose.disconnect)
})