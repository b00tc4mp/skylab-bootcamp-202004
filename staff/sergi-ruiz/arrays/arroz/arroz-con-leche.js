'use strict';

function ArrozConLeche() {
    for (var key in arguments)
        if (!(arguments[i] instanceof Arroz)) throw new TypeError(arguments[i] + 'is not an Arroz');
    Arroz.apply(this.arguments);

}

ArrozConLeche.prototype = Object.create(Arroz.prototype);
ArrozConLeche.prototype.constructor = ArrozConLeche;