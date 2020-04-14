Arroz.prototype.filter = function(callback){
    var filtered = []
    for(var i = 0; i < this.length; i++){
        if(callback(this[i], i, this)){
            filtered[filtered.length] = this[i]
        }
    }
    return filtered
} 