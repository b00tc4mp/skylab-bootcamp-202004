require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const logTemperature = require('./log-temperature')
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { Temperature } } = require('aquaponics-data')

describe('logic -log -temperature', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let temperature

    beforeEach(() =>
        Temperature.deleteMany()
            .then(() => {
                return temperature =(Math.floor(Math.random()*20))
            })
    )

    it('should succeed on correct input', () =>
        logTemperature(temperature)
            .then(() => Temperature.find())
            .then(temperatureLogs => {
                
                expect(temperatureLogs.length).to.equal(1)

                const [temperatureLog] = temperatureLogs

                expect(temperatureLog.temperature).to.equal(temperature)
                expect(temperatureLog.temperature).to.be.a('number')
                expect(temperatureLog.date).to.be.an.instanceof(Date)
                expect(temperatureLog.date).to.exist
            })
    )

    it('should fail on wrong input', () => {
        expect( () => {
           logTemperature(true)
        }).to.throw(TypeError, `${true} is not a number`)
    })

    it('should fail on wrong input', () => {
        expect( () => {
           logTemperature(undefined)
        }).to.throw(TypeError, `${undefined} is not a number`)
    })

    it('should fail on wrong input', () => {
        expect( () => {
           logTemperature('hello')
        }).to.throw(TypeError, `${'hello'} is not a number`)
    })

    afterEach(() => Temperature.deleteMany())
    
    after(mongoose.disconnect)
})


