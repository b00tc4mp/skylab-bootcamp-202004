Arroz.prototype.filter = function(){
    var newArray = [];
    for(var i=0; i<this.length; i++){
        if(this[i].length>5){
            newArray.push(this[i]);
        }
    }
    return newArray;
}
