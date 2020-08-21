require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')
const changeWorkGroupPref= require('./change-work-group-pref')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')
const context = require('./context')
context.API_URL = API_URL


describe('logic - change work group pref', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, workGroupName, workGroupId, token

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

    describe('change-work-group-pref', () => {
        describe('asynchronous paths', () => {
       
        beforeEach(async() =>{
            debugger
            const user = await User.create({ name, surname, email, password })
            userId = user.id
            token= await jwtPromised.sign({sub:userId},  JWT_SECRET, {expiresIn: '1d'})
            context.storage={ token }

            const workGroup= await WorkGroup.create({name: workGroupName, creator: userId })
            workGroupId = workGroup.id
       } )
     
        it('should succeed on correct user id', async () =>{
            const result = await changeWorkGroupPref(workGroupId)
            
            expect(result).to.equal(undefined)
            
            const {workGroupPref} = await User.findById(userId)
            debugger
            expect(workGroupPref.toString()).to.equal(workGroupId)                
        })
        
        
        it('should fail when user does not exist', () => {
           return User.deleteMany()
            .then(()=>changeWorkGroupPref(workGroupId))
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        })
        it('should fail when work group does not exist', () => {
            
            return WorkGroup.deleteMany()
            .then(()=>changeWorkGroupPref(workGroupId))
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)
                })
        })
        })
        describe('synchronous paths', () => {
            it('should fail on a non-string workgroupId', () => {
                
                workGroupId= random()
                expect(()=>changeWorkGroupPref(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= undefined
                expect(()=>changeWorkGroupPref(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= null
                expect(()=>changeWorkGroupPref(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= []
                expect(()=>changeWorkGroupPref(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= {}
                expect(()=>changeWorkGroupPref(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= false
                expect(()=>changeWorkGroupPref(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= ''
                expect(()=>changeWorkGroupPref(workGroupId)).to.throw(Error, `string is empty or blank`)
                
                workGroupId= '    '
                expect(()=>changeWorkGroupPref(workGroupId)).to.throw(Error, `string is empty or blank`)
               
            })
            
        });
    });
        

    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()
    
    })

    after(mongoose.disconnect)
})