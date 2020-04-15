"use estrict"


Arroz.prototype.includes = function (searchElement, fromIndex = 0) {
    
    for (var i = fromIndex; i < this.length; i++)
    if(this[i] === searchElement ) return true
         
    return false
}