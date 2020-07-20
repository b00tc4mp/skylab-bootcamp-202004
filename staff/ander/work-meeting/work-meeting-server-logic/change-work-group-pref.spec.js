require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const changeWorkGroupPref= require('./change-work-group-pref')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')

describe('logic - change work group pref', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, workGroupName, workGroupId

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                workGroupName = "dreamTeam"
            })
    )

    describe('when user already exists', () => {
        beforeEach(async() =>{
            const user = await User.create({ name, surname, email, password })
            userId = user.id
            const workGroup= await WorkGroup.create({name: workGroupName, creator: userId })
            workGroupId = workGroup.id
       } )
     
        it('should succeed on correct user id', async () =>{
            const result = await changeWorkGroupPref( userId, workGroupId)
            
            expect(result).to.equal(undefined)
            // tira la base 
            const {workGroupPref} = await User.findById(userId)
            console.log(workGroupPref)
            expect(workGroupPref.toString()).to.equal(workGroupId)                
        })
        
        //es npm run test:coverage (el newyork npm instalado) newyork se llama asi el npm
       
        
        it('should fail when user does not exist', () => {
            const userId = '5ed1204ee99ccf6fae798aef'
    
            changeWorkGroupPref( userId, workGroupId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with Id ${userId} not exist`)
                })
        })
        it('should fail when work group does not exist', () => {
            const workGroupId = '5ed1204ee99ccf6fae798aef'
    
            changeWorkGroupPref( userId, workGroupId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`workgroup with Id ${workGroupId} not exist`)
                })
        })
        })
        

    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()
    
    })

    after(async ()=> await mongoose.disconnect)
})