require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {Establishment} } = require('qrmenu-data')
const registerWorker = require('./register-worker')
const {random} = Math
const bcrypt = require('bcryptjs')
const {expect} = require('chai')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const { UnexistenceError } = require('qrmenu-commons/errors')

describe('server-logic register worker', () => {
    before(async() => {
        await mongoose.connect(MONGODB_URL)
        await Establishment.deleteMany()
     })

    let establishment, nif, email, password, newEmail, role, _password, establishmentId, workerId

    beforeEach(()=>{
        establishment = `establishment-${random()}`
        nif =  generateNIF()
        email = `e-${random()}@mail.com`
        password = `password${random()}`

        newEmail = `e-${random()}@mail.com`
        role = 'chef'
        _password = `password-${random()}`
    })

    describe('when the establishment exists', ()=>{
        beforeEach(async() => {
            const hash = await bcrypt.hash(password, 10)
            const _establishment =  await Establishment.create({establishment, nif, staff: [{email, role: 'owner', password: hash}]})
              
            establishmentId = _establishment.id
            workerId = _establishment.staff[0].id
                              
        })
        
        
        it('should succed on register worker', async() => { 
            await registerWorker(establishmentId, workerId, newEmail, role, _password)
               
            const {staff} = await Establishment.findById(establishmentId)
               
            
            const worker = staff.find(_worker => _worker.email === newEmail &&  _worker.role === role)
  
                
            expect(worker.email).to.exist
            expect(worker.email).to.be.a('string')
            expect(worker.email).to.equal(newEmail)
            expect(worker.role).to.exist
            expect(worker.role).to.be.a('string')
            expect(worker.role).to.equal(role)

            const match = await bcrypt.compare(_password, worker.password)
             
            expect(worker.password).to.exist
            expect(worker.password).to.be.a('string')
            expect(match).to.exist
            expect(match).to.be.true
               
        })


        it('should fail on wrong establishment id', async() => {
            try {
                await registerWorker("5eedfc3256012e6c3dbb7cbe", workerId, newEmail, role, _password)
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal("Establishment with id 5eedfc3256012e6c3dbb7cbe does not exist")
            }          
        })
    })

    after(async() => {
        await Establishment.deleteMany()
        await mongoose.disconnect()
    })
})