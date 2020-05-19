Object.defineProperty(Arroz.prototype, 'findIndex', {
    value: function (callback) {debugger
        if (this.length === 0){
            throw new Error ('No elemets on Arroz');
        }
        for (var i = 0; i < this.length; i++){
            if (callback(this[i], i, this)){
                return i;
            }
        }
        return undefined;

    },
    enumerable: false, // throw error si no se envia ninguna funcion
    writable: true

})