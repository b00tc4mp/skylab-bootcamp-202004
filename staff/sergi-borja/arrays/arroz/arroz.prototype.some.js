Arroz.prototype.some = function(expression){
    if(typeof expression === 'string') throw TypeError('String is not a function!');
    if(typeof expression === 'undefined') throw TypeError('Undefined is not a function!');
    for(var i = 0; i<this.length; i++){
        if(expression(this[i])) return true;
    }
}