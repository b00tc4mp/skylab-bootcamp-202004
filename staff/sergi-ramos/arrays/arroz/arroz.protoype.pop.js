Arroz.prototype.pop = function () {

    
    var deletedValue = this[this.length - 1]
    var newArray = this
    this = new Arroz()
    for (var i = 0; i < this.length - 1; i++) {
        this[i] = newArray[i]

    }

    this.length = this.length - 1


    return deletedValue
}





