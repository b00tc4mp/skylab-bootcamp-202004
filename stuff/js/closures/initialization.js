var algo = (function() {
    var cosa = { what: 'cosa' }

    var otraCosa = function() { return 'otra cosa' }

    return {
        cosa: cosa,
        otraCosa: otraCosa
    }
})();

console.log(cosa);
console.log(otraCosa);
console.log(algo);