"use strict";

function Arroz() {
  if (arguments.length) {
    for (var i in arguments) this[i] = arguments[i];
  }

  this.length = arguments.length;
}
