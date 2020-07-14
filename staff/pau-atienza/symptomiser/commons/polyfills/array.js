Array.validate = function(input){

    if(!this.isArray(input)) throw new TypeError(`${input} is not an Array`)
}.bind(Array)