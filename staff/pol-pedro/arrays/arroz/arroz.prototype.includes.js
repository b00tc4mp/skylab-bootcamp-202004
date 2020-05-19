Object.defineProperty(Arroz.prototype, 'includes', {
    value: function (value, index) {debugger
        if(index < 0 && (index + this.length) >= 0){ debugger
            index = this.length + index;
        }
        else if ((index + this.length < 0) || typeof index === 'undefined') { debugger
            index = 0;
        } 
        for (index ; index < this.length; index++) { debugger
            if (this[index] === value){
                return true;
            }
        }
        return false;
    },
    enumerable: false,
    writable: true

})
