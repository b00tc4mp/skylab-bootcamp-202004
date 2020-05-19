Object.defineProperty(Arroz.prototype, 'indexOf', {
    value: function (number, position) {
    var starIndex ;
        if (typeof position === 'undefined' || (this.length + position) <= 0 ) {
            starIndex = 0;
        }
        else if (position >= 0){
            starIndex = position;
        }
        else {
            starIndex = position + this.length;
        }
        for (var i = starIndex; i < this.length; i++) {
            if(this[i] === number){
                return i;
            }
        }
        return -1;
    },
    enumerable: false,
    writable: true
})

