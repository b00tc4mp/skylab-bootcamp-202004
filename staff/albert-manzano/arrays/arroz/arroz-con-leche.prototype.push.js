'use strict';

ArrozConLeche.prototype.push = function() {
    for (var i in arguments)
        if (!(arguments[i] instanceof Arroz)) throw new TypeError(arguments[i] + ' is not an Arroz')

    var result = Arroz.prototype.push.apply(this, arguments);

    return result
};
