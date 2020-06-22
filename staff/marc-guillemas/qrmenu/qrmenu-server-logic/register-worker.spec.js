require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {Establishment} } = require('qrmenu-data')
const registerWorker = require('./register-worker')
const {random} = Math
const bcrypt = require('bcryptjs')
const {expect} = require('chai')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')

describe('server-logic register worker', () => {
    before(() => mongoose.connect(MONGODB_URL).then(()=> Establishment.deleteMany()))

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
        beforeEach(() => 
            bcrypt.hash(password, 10)
                    .then(hash =>  Establishment.create({establishment, nif, staff: [{email, role: 'owner', password: hash}]}))
                    .then(_establishment => {
                        establishmentId = _establishment.id
                        workerId = _establishment.staff[0].id
                    })                
        )
        
        
        it('should succed on register worker', async() => { 
            await registerWorker(establishmentId, workerId, newEmail, role, _password)
                // .then(() => {debugger
                //     return Establishment.findById(establishmentId)
                // })
                // .then(({staff}) => {debugger
                //     return staff.find(_worker => _worker.email === newEmail &&  _worker.role === role)
                // })
                // .then(worker => {
                //     debugger
                //     expect(worker.email).to.exist
                //     expect(worker.email).to.be.a('string')
                //     expect(worker.email).to.equal(newEmail)
                //     expect(worker.role).to.exist
                //     expect(worker.role).to.be.a('string')
                //     expect(worker.role).to.equal(role)

                //     return bcrypt.compare(_password, worker.password)
                //         .then(match => {
                //             expect(worker.password).to.exist
                //             expect(worker.password).to.be.a('string')
                //             expect(match).to.exist
                //             expect(match).to.be.true
                //         })

                // })
               
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
    })

    after(() => mongoose.disconnect().then(() => Establishment.deleteMany()))
})