require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const logPh = require('./log-ph')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { Ph } } = require('aquaponics-data')

describe('logic -log -ph', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let ph

    beforeEach(() =>
        Ph.deleteMany()
            .then(() => {
                return ph = random()
            })
    )

    it('should succeed on correct input', () =>
        logPh(ph)
            .then(() => Ph.find())
            .then(phLogs => {
                
                expect(phLogs.length).to.equal(1)

                const [phLog] = phLogs

                expect(phLog.ph).to.equal(ph)
                expect(phLog.ph).to.be.a('number')
                expect(phLog.date).to.be.an.instanceof(Date)
                expect(phLog.date).to.exist
            })
    )

    it('should fail on wrong input', () => {
        expect( () => {
           logPh(true)
        }).to.throw(TypeError, `${true} is not a number`)
    })

    it('should fail on wrong input', () => {
        expect( () => {
           logPh(undefined)
        }).to.throw(TypeError, `${undefined} is not a number`)
    })

    it('should fail on wrong input', () => {
        expect( () => {
           logPh('hello')
        }).to.throw(TypeError, `${'hello'} is not a number`)
    })

    afterEach(async() =>await Ph.deleteMany())
    
    after(async()=>await mongoose.disconnect)
})



