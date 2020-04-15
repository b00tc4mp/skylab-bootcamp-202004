'use strict'
function Arroz(){
    if(arguments.length){
        for(var i=0;i<arguments.length;i++){
            this[i]=arguments[i];
        }
    }
    
    this.length=arguments.length;
}