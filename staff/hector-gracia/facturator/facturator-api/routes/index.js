const {env: {SECRET}} = process
const {Router} = require("express")
const {addclient,retrieveClient,updateClient,removeClient}= require("./handlers")
const bodyParser= require("body-parser")
const {jwtVerifierExtractor}= require("../middlewares")
const {hanleError}= require("../helpers")
const parseBody= bodyParser.json()
const verifyExtractJwt= jwtVerifierExtractor(SECRET,hanleError)

const api= new Router

api.post("/clients",parseBody,addclient)
api.get("/clients/:clientId",parseBody,retrieveClient)
api.post("/clients/update",parseBody,updateClient)
api.delete("/clients/remove",parseBody,removeClient)

module.exports={
    api
}