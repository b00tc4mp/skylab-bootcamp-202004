Arroz.prototype.pop = function(array){
    var lastOne = this[this.length-1]
    this.length = this.length-1
    return lastOne
} 