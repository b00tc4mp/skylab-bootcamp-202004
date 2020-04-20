"use strict";

function Arroz(length) {
  if (arguments.length === 1 && typeof length === "number") {
    if (!(length % 1 === 0)) throw new RangeError("Invalid arroz length");
    // Specify the length of the Arroz with empty info on index
    for (var i = 1; i < length; i++) this[i] = arguments[i];
    this.length = length;
  } else if (arguments.length) {
    // Create new index for each argument
    for (var i in arguments) this[i] = arguments[i];
    this.length = arguments.length;
  } else {
    this.length = arguments.length;
  }
}
