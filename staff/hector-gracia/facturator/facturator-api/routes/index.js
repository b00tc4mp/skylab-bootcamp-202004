const {env: {SECRET}} = process
const {Router} = require("express")
const {
    addclient,retrieveClient,updateClient,removeClient,retrieveAllClients, addClientDiscount,retrieveClientDiscountList,
    addProduct,retrieveProduct,retrieveAllProducts,
    addProductToDelivery,makeDeliveryFromTemplate, makeEmptyDelivery, removeProductFromDelivery, updateProductInDelivery, retrieveDelivery, retrieveDeliveryList,
    addDeliveryTemplate, retrieveDeliveryTemplate, retrieveAllDeliveryTemplates,addProductToDeliveryTemplate,removeProductFromDeliveryTemplate}= require("./handlers")
const bodyParser= require("body-parser")
const {jwtVerifierExtractor}= require("../middlewares")
const {hanleError}= require("../helpers")
const parseBody= bodyParser.json()
//const verifyExtractJwt= jwtVerifierExtractor(SECRET,hanleError)

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
api.get("/products/:productId",parseBody,retrieveProduct)
api.get("/products",parseBody,retrieveAllProducts)
//Deliveries
api.post("/deliveries/products",parseBody,addProductToDelivery)
api.post("/deliveries/templates",parseBody,makeDeliveryFromTemplate)
api.post("/deliveries",parseBody,makeEmptyDelivery)
api.delete("/deliveries/remove",parseBody,removeProductFromDelivery)
api.patch("/deliveries/products",parseBody,updateProductInDelivery)
api.get("/deliveries/id/:deliveryId",parseBody,retrieveDelivery)
api.get("/deliveries",parseBody,retrieveDeliveryList)
//Templates
api.post("/templates",parseBody,addDeliveryTemplate)
api.get("/templates/:templateId",parseBody,retrieveDeliveryTemplate)
api.get("/templates",parseBody,retrieveAllDeliveryTemplates)
api.post("/templates/products",parseBody,addProductToDeliveryTemplate)
api.delete("/templates/products",parseBody,removeProductFromDeliveryTemplate)

module.exports={
    api
}