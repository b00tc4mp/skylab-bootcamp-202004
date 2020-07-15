'use strict'

Arroz.prototype.splice = function (start, deleteCount) {
    var result = new Arroz ();

    if (typeof start !== 'undefined' && typeof start === 'number') {
        if (start > 0 && start < this.length) {
            for (var i = start; i < this.length; i++)
                result.push(this[i]);
            
            for(var deleted = this.length-1; deleted >= start; deleted--)
                delete this[deleted];

            this.length = start;

            for (var newElement = 2; newElement < arguments.length; newElement++)
                this.push(arguments[newElement]);

            if (typeof deleteCount !== 'undefined' && typeof deleteCount === 'number') {
                for (var j = deleteCount; j < result.length; j++){
                    this.push(result[j]);
                    delete result[j];
                }

                deleteCount !== 0 ? result.length = deleteCount : result.length = 0;
            }

        } else if (start < 0) {
            if (this.length > (-start)) {
                for (var i = this.length + start; i < this.length; i++)
                    result.push(this[i]);

                for(var deleted = this.length -1 ; deleted >= this.length + start; deleted--)
                    delete this[deleted];
                
                this.length += start;

                for (var newElement = 2; newElement < arguments.length; newElement++)
                    this.push(arguments[newElement]);

                if (typeof deleteCount !== 'undefined' && typeof deleteCount === 'number') {
                    for (var j = deleteCount; j < result.length; j++){
                        this.push(result[j]);
                        delete result[j];
                    }

                    deleteCount !== 0 ? result.length = deleteCount : result.length = 0;
                }
                
            } else {
                for (var i = 0; i < this.length; i ++){
                    result.push(this[i]);
                    delete this[i];
                }

                this.length = 0;
            }
        }
    }

    return result;
}