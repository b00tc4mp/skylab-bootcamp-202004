function Product(type, id, name) {
    this.type = type
    this.id = id
    this.name = name
}

Product.prototype.toString = function () { return 'Product { type: ' + this.type + ', id: ' + this.id + ', name: ' + this.name + ' }' }

function ColoredProduct(type, id, name, color) {
    /*this.type = type
    this.id = id
    this.name = name*/
    // Product.apply(this, [type, id, name])
    //Product.call(this, type, id, name) // WTF? and WTF is .apply?

    this.color = color
}

ColoredProduct.prototype = Object.create(Product.prototype)
ColoredProduct.prototype.constructor = ColoredProduct

ColoredProduct.prototype.toString = function () { return 'ColoredProduct { type: ' + this.type + ', id: ' + this.id + ', name: ' + this.name + ', color: ' + this.color + ' }' }

var cocacola = new Product('edible', 'cc-123', 'Coca-Cola')
var cocacolaZero = new Product('edible', 'cc-123-z', 'Coca-Cola Zero')
var levis501 = new ColoredProduct('clothes', 'lv-501', 'Levi\'s 501', 'denim blue')
var vansOldSchool = new ColoredProduct('clothes', 'vns-os', 'Vans Old School', 'black & white')
var macbookPro = new ColoredProduct('electronics', 'apl-mbp', 'Apple MacBook Pro', 'platinum')
var playstation4 = new ColoredProduct('electronics', 'sn-ps', 'Sony Playstation 4', 'white')

var products = [cocacola, cocacolaZero, levis501, vansOldSchool, macbookPro, playstation4]

products.forEach(function (product) { console.log(product.toString()) })

var coloredProducts = products.filter(function (product) { return product instanceof ColoredProduct })

console.table(coloredProducts)