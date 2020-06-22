require('dotenv').config()
global.fetch = require('node-fetch')
const { expect } = require('chai');

const forecastDays = require('./forecast-days');

describe('forecast', () => {
       describe('should succed automactically', () =>
        it('should succeed on correct user id', async () => {
            const { temp1,main1,temp2,main2,temp3,main3 } = await forecastDays(0);
            console.log(temp1,main1,temp2,main2,temp3,main3)
            expect(temp1).to.exist
            expect(main1).to.exist
            expect(temp2).to.exist
            expect(main2).to.exist
            expect(temp3).to.exist
            expect(main3).to.exist
        })
    )
})