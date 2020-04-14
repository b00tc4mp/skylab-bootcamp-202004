Array.prototype.includes = function(element, start = 0){
    for(var i =start; i < this.length; i++){
        if(this[i] === element) return true
    }
    return false
} 
