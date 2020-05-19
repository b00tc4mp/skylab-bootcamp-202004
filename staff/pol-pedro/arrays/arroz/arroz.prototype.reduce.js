Object.defineProperty(Arroz.prototype, 'reduce', {
    value: function (callback, startNum) {debugger
        var acc;
        var difType = false;
        if (typeof callback === 'undefined'){debugger
            throw new Error('You have to pass a callback!!');
        }
        if (this.length === 0){debugger
            throw new Error('Cant reduce an empty array');
        }
        for (var i = 0; i < this.length; i++){
            if (typeof this[0] !== typeof this[i]){debugger
                difType = true;
            }
        }
        if (typeof startNum !== 'undefined' && typeof startNum != typeof this[1]){
            difType = true;
        }
        if (difType === true){debugger
            typeof startNum === 'undefined' ? acc = '' : acc = startNum;
            acc = acc.toString();
            for (var i = 0; i < this.length; i++){ // not sure if the var i = 0 is needed, but im gona put it in case the variable i dosent gets restart after the first for in
                acc = callback(acc, this[i].toString(), i, this);
            }
        }
        else{
            if ( typeof this[0] === 'number' || typeof this[0] === 'boolean'){
                typeof startNum === 'undefined' ? acc = 0 : acc = startNum;
            }
            else if ( typeof this[0] === 'string'){
                typeof startNum === 'undefined' ? acc = '' : acc = startNum;
                acc = acc.toString();
            }
            for (var i = 0; i < this.length; i++) {debugger
                acc = callback(acc, this[i], i, this);
            }
        }
        return acc;

    },
    enumerable: false, // throw error si no se envia ninguna funcion
    writable: true

})