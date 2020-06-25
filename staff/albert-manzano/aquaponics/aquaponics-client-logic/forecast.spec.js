require('dotenv').config()
global.fetch = require('node-fetch')
const { expect } = require('chai');

const forecast = require('./forecast')

describe('forecast', () => {
       describe('should succed automactically', () =>
        it('should succeed on correct user id', async () => {
            const { temp, temp_max, temp_min, main, wind } = await forecast(0);

            expect(temp).to.exist
            expect(temp_max).to.exist
            expect(temp_min).to.exist
            expect(main).to.exist
            expect(wind).to.exist
        })
    )
})