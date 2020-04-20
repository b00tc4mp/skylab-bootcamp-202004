'use strict'
function Arroz(){
    Object.defineProperty(this, 'length', {
        value: 0,
        enumerable: false,
        writable: true
    });
    if(arguments.length){
        for(var i=0;i<arguments.length;i++){
            this[i]=arguments[i];
        }
    }
    this.length=arguments.length;
}
