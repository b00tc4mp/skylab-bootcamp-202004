 Arroz.prototype.join=function(element) {
    var text=this[0];
    if (element===undefined){
        for(var i=1;i<this.length;i++)
            text+="," + this[i];
        
       
    } else{ for(var i=1;i<this.length;i++)
            text+=element+this[i];
    }return text;
}