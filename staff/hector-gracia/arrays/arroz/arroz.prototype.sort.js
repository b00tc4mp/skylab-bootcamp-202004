'use strict';
//Method that rearranges the elements of the arroz
Arroz.prototype.sort= (function(){
    function selectionSort(){
        var min;
        var index=0;
        var copy=new Arroz();
        var result=new Arroz();
        for(var i=0;i<this.length;i++){
            copy.push(this[i]);
        }
        while(copy.length>0){
            for(i=0;i<copy.length;i++){
                if(i===0){
                    min=copy[0];
                    index=0;
                }if(copy[i]<min){
                    min=copy[i];
                    index=i;
                }
            }
            result.push(min);
            copy.splice(index,1);
        }
        for(var j=0;j<this.length;j++){
            this[j]=result[j];
        } 
    }
    function bubleSort(){
        var aux;
    
        for(var i=0;i<=this.length-1;i++){
            for(var j=this.length-1;j>=i+1;j--){
                if(this[j-1]>this[j]){
                    aux=this[j];
                    this[j]=this[j-1];
                    this[j-1]=aux;
                }
            }
        }
    }
    return function(style){
        if(typeof style==="undefined"){
            return selectionSort.call(this);
        }else if(style==="selection"){
            return selectionSort.call(this);
        }else if(style==="bubble"){
            return bubleSort.call(this);
        }
    }
})()

