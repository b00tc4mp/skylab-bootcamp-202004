Arroz.prototype.join = function(separator) {
    var result = "";

    for(var i = 0; i < this.length; i++) {
        if(i = 0){
            result = result + this[i]  
        }else{
            result = result + separator + this[i]
        }
    }

    return result;
}