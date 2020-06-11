require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {Establishment} } = require('qrmenu-data')
const registerWorker = require('./register-worker')
const {random} = Math
const bcrypt = require('bcryptjs')
const {expect} = require('chai')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')

describe.only('server-logic register worker', () => {
    before(() => mongoose.connect(MONGODB_URL).then(()=> Establishment.deleteMany()))

    let establishment, nif, email, password, name, surname, role, _password, establishmentId

    beforeEach(()=>{
        establishment = `establishment-${random()}`
        nif =  generateNIF()
        email = `e-${random()}@mail.com`
        password = `password${random()}`
        name = `name-${random()}`
        role = 'chef'
        surname = `surname-${random()}`
        _password = `password-${random()}`

    })

    describe('when the establishment exists', ()=>{
        beforeEach(() => 
            bcrypt.hash(password, 10)
                    .then(hash =>  Establishment.create({establishment, nif, email, password: hash}))
                    .then(_establishment => establishmentId = _establishment._id.toString())                
        )
        
        
        it.only('should succed on register worker', () => 
            registerWorker(establishmentId, name, surname, role, _password)
                .then(() => {debugger
                    return Establishment.findById(establishmentId)
                })
                .then(({staff}) => {debugger
                    return staff.find(_worker => _worker.name === name && _worker.surname === surname && _worker.role === role)
                })
                .then(worker => {
                    debugger
                    expect(worker.name).to.exist
                    expect(worker.name).to.be.a('string')
                    expect(worker.name).to.equal(name)
                    expect(worker.surname).to.exist
                    expect(worker.surname).to.be.a('string')
                    expect(worker.surname).to.equal(surname)
                    expect(worker.role).to.exist
                    expect(worker.role).to.be.a('string')
                    expect(worker.role).to.equal(role)

                    return bcrypt.compare(_password, worker.password)
                        .then(match => {
                            expect(worker.password).to.exist
                            expect(worker.password).to.be.a('string')
                            expect(match).to.exist
                            expect(match).to.be.true
                        })

                })
                
                    
        )
    })

    after(() => mongoose.disconnect().then(()=> Establishment.deleteMany()))
})