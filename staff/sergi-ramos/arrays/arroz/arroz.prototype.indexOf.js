Arroz.prototype.indexOf = function (element, index) {
if(index === undefined){
    index = 0
}
    for (var i = index; i < this.length; i++) {
        if (element === this[i])
            return true
    }
    return -1
}



