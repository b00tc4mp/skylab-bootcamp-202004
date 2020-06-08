require("dotenv").config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express= require("express")
const {name, version}= require("./package.json")
const {mongoose} = require("facturator-data")
const {cors}= require("./middlewares")
const {api}= require("./routes")
try{
    mongoose.connect(MONGODB_URL)
    .then(()=>{
        const app = express()
        app.use(cors)
        
        //Main
        app.use("/api",api)

        //other
        app.get("*",(req,res)=>{
            res.status(404).send("Direction not found")
        })
        app.listen(PORT,()=>{console.info(`server ${name} ${version} running on port ${PORT}`)})

        process.on("SIGINT",()=>{
            mongoose.disconnect()
                .finally(()=>{
                    setTimeout(() => {
                        process.exit()
                    }, 500)
                })
        })
    })
    .catch(error=>{
        console.log(error)
    })
    
}catch(error){
    console.log(error)
}