const NIF_REGEX = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;


const NIF = {
    
    isNIF(nif) {
        return NIF_REGEX.test(nif)
    }
}

NIF.validate = function (nif) {
  
    if (!this.isNIF(nif)) throw new Error(`${nif} is not a NIF`)
}.bind(NIF)


module.exports = NIF