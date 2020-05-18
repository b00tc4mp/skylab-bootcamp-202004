"use strict";

if (typeof callback !== "function") throw TypeError(`${callback} is not a function`);
Arroz.prototype.every = function (callback) {
  for (var i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

it("should fail when callback is not a function", function () {
  var names = new Arroz("manuel", "juanito", "alex", "kaula");

  expect(function () {
    names.filter();
  }).toThrowError(TypeError, "undefined is not a function");
});
