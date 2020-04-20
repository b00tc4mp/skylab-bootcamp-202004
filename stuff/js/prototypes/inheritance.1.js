function Product() {
}

console.log(Product.prototype)

// internally, js does the following

Product.prototype = Object.create(Object.prototype) // parent type => Object
Product.prototype.constructor = Product

console.log(Product.prototype)

// so in case you decide to create a new sub-type, you may repeat the same process, but pointing to the parent type

function DangerousProduct() {
}

DangerousProduct.prototype = Object.create(Product.prototype) // parent type => Product
DangerousProduct.prototype.constructor = DangerousProduct