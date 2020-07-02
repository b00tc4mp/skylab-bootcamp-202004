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
    addProduct: require("./add-product"),

    //Delivery
    retrieveDelivery: require("./retrieve-delivery"),
    retrieveAllDeliveries: require("./retrieve-delivery-list"),
    addProductToDelivery: require("./add-product-to-delivery"),
    removeProductFromDelivery: require("./remove-product-from-delivery"),
    makeEmptyDelivery: require("./make-empty-delivery"),
    makeDeliveryFromTemplate: require("./make-delivery-from-template"),
    //Template
    addDeliveryTemplate: require("./add-delivery-template"),
    retrieveAllDeliveryTemplates: require("./retrieve-all-delivery-templates"),
    retrieveDeliveryTemplate: require("./retrieve-delivery-template"),
    addProductToDeliveryTemplate: require("./add-product-to-delivery-template"),
    removeProductFromDeliveryTemplate: require("./remove-product-from-delivery-template"),
    //Printing
    makeDeliveryNote: require("./make-delivery-note")
}