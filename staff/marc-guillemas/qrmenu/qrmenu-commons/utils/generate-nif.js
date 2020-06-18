const generateNIF = () => {
    let nif = ""
    const nifLetters = "TRWAGMYFPDXBNJZSQVHLCKE"
    while(nif.length !== 8) nif = nif + Math.floor(Math.random()*10)
    
    if(nif.length === 8) {
        nif = nif + nifLetters[Math.floor(Math.random()*nifLetters.length)]
    }    

    return nif
}

module.exports = {
    generateNIF
}