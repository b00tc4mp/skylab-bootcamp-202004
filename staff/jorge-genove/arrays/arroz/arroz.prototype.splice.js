Arroz.prototype.splice = function(startIndex,deleteCount,addItem) {
    var sliced = []
    var origin = []
    var supportArr = []
if (typeof deleteCount === 'undefined' || deleteCount > this.lenght - startIndex){
    deleteCount = this.length
if (deleteCount <= 0 ){deleteCount = 0}
}
    if(deleteCount > 0 ){
    for (var i = startIndex; i < startIndex + deleteCount; i++  ){  
        sliced[sliced.length] = this[i]}
    for (var i = 0; i < startIndex; i++){
        supportArr[supportArr.length] = this[i]}
    if (typeof arguments !== undefined){
        for (var k = 2; k < arguments.length; k++){
            supportArr[supportArr.length] = arguments[k]
            var counter =  k 
        }
    for ( var j = startIndex + deleteCount; j < this.length; j++){
        supportArr[supportArr.length] = this[j]
    }
    }    
    }
    counter = counter - 1  
    this.length = this.length + counter - deleteCount 
    for (var k = 0; k < this.length; k++){
        this[k] = supportArr[k]
    }
return sliced
    }
