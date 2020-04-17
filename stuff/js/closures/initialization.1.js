var algo;

(function() { // IIFE alias "selfie"
    var cosa = { what: 'cosa' }

    var otraCosa = function() { return 'otra cosa' }

    algo = {
        cosa: cosa,
        otraCosa: otraCosa
    }
})();

console.log(cosa);
console.log(otraCosa);
console.log(algo);