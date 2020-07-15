require("dotenv").config()
const registerUser = require('./register-user')
const{env:{MONGODB_URL}}=process
const{mongo}=require("../misc-data")

mongo.connect(MONGODB_URL)
    .then(()=>{
        try{
            return registerUser("Fula","Nito","fulanito@gmail.com","123123123")
                .then(()=> console.log("OK"))
                .catch(error=> console.error("KO async",error))
        }catch(error){
            console.error("KO sync",error)
        }
    })