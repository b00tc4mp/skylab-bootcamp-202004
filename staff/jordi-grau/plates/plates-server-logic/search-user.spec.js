require('dotenv').config()
const  { mongooose , models:{User}}  = require('plates-data')
const {  env: {TEST_MONGODB_URL: MONGODB_URL} } = process


describe('search user', () =>{


    it('should succeed on correct data', async() =>{


    })

    it('should fail on wrong data', async () =>{

    })
})