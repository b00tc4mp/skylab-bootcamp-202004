module.exports={
    //Misc
    context: require('./context'),

    //Client
    retrieveAllClients: require("./retrieve-all-clients"),
    updateClient: require("./update-client"),
    addClient: require("./add-client"),
    removeClient: require("./remove-client"),
    //Product
    retrieveAllProducts: require("./retrieve-all-products"),

    //Delivery
    retrieveDelivery: require("./retrieve-delivery"),
    //Template

    //Printing
    makeDeliveryNote: require("./make-delivery-note")
}