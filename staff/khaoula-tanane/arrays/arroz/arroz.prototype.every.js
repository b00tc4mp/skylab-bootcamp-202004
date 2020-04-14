Arroz.prototype.every = function(callback){
    for(var i = 0; i < this.length; i++){
        if(!callback(this[i], i, this)){
            return false
        }
    }
    return true
} 