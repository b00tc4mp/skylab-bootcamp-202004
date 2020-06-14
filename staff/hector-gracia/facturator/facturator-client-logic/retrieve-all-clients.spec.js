require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const retrieveAllClients= require("./retrieve-all-clients")
const {random}= Math
const {mongoose, models:{Client}}= require("facturator-data")

describe("retrieveAllUsers",()=>{
    before(()=>mongoose.connect(MONGODB_URL))
    
})