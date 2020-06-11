const {env: {SECRET}} = process
const {Router} = require("express")
const {
    addclient,retrieveClient,updateClient,removeClient,retrieveAllClients, addClientDiscount,retrieveClientDiscountList,
    addProduct,retrieveProduct,retrieveAllProducts,
    addProductToDelivery,makeDeliveryFromTemplate, makeEmptyDelivery, removeProductFromDelivery, updateProductInDelivery, retrieveDelivery, retrieveDeliveryList}= require("./handlers")
const bodyParser= require("body-parser")
const {jwtVerifierExtractor}= require("../middlewares")
const {hanleError}= require("../helpers")
const parseBody= bodyParser.json()
const verifyExtractJwt= jwtVerifierExtractor(SECRET,hanleError)

const api= new Router
//Clients
api.post("/clients",parseBody,addclient)
api.get("/clients/:clientId",parseBody,retrieveClient)
api.get("/clients",parseBody,retrieveAllClients)
api.post("/clients/update",parseBody,updateClient)
api.delete("/clients/remove",parseBody,removeClient)
api.post("/clients/discounts",parseBody,addClientDiscount)
api.get("/clients/discount",parseBody,retrieveClientDiscountList)
//Products
api.post("/products",parseBody,addProduct)
api.get("/products",parseBody,retrieveProduct)
api.get("/products/all",parseBody,retrieveAllProducts)
//Deliveries
api.post("/deliveries/products",parseBody,addProductToDelivery)
api.post("/deliveries/templates",parseBody,makeDeliveryFromTemplate)
api.post("/deliveries",parseBody,makeEmptyDelivery)
api.delete("/delieveries/products",parseBody,removeProductFromDelivery)
api.patch("/deliveries/products",parseBody,updateProductInDelivery)
api.get("/deliveries",parseBody,retrieveDelivery)
api.get("/deliveries/all",parseBody,retrieveDeliveryList)

module.exports={
    api
}