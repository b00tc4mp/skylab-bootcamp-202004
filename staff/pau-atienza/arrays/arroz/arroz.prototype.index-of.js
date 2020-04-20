Object.defineProperty(Arroz.prototype, 'indexOf', {
    value: function (element, index = 0){
    
        if (index>= this.length) return -1;
        else if(index <0)  {
            index = this.length+index;
            if (index <0) index = 0;
        }
        var i = index;
    
        for(i; i<this.length; i++){
            if (this[i] === element) return i;
        };
        return -1;
    },
    enumerable: false,
    writable: true
});