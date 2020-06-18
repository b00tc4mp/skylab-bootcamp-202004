module.exports={
    //Client
    addClient:require("./add-client"),
    retrieveClient:require("./retrieve-client"),
    updateClient: require("./update-client"),
    removeClient: require("./remove-client"),
    retrieveAllClients: require("./retrieve-all-clients"),
    addClientDiscount: require("./add-client-discount"),
    retrieveClientDiscountList: require("./retrieve-client-discount-list"),
    //Product
    addProduct: require("./add-product"),
    retrieveProduct:require("./retrieve-product"),
    retrieveAllProducts: require("./retrieve-all-products"),

    //Delivery
    addProductToDelivery:require("./add-product-to-delivery"),
    makeDeliveryFromTemplate:require("./make-delivery-from-template"),
    makeEmptyDelivery: require("./make-empty-delivery"),
    removeProductFromDelivery: require("./remove-product-from-delivery"),
    updateProductInDelivery: require("./update-product-in-delivery"),
    retrieveDelivery:require("./retrieve-delivery"),
    retrieveDeliveryList:require("./retrieve-delivery-list"),

    //Template
    addDeliveryTemplate: require("./add-delivery-template"),
    retrieveDeliveryTemplate: require("./retrieve-delivery-template")
}