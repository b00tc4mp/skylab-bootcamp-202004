Arroz.prototype.slice = function(start, end){
    var result = []
    for(var i = start ; i < this.length; i ++){
        if(i < end ) {
            result[result.length] = this[i]
        }  
    }
    return result
} 