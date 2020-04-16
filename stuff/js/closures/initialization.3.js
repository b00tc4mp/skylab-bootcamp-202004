var algo = {};

(function(target) {
    var cosa = { what: 'cosa' }

    var otraCosa = function() { return 'otra cosa' }

    target.cosa = cosa
    target.otraCosa = otraCosa
})(algo);

console.log(cosa);
console.log(otraCosa);
console.log(algo);