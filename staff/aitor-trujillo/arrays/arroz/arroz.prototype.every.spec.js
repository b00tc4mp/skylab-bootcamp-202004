"use strict";

describe("Arroz.prototype.every", function () {
  it("should return true if all elements are greater or equal than 18", function () {
    var arroz = new Arroz(18, 21, 25, 28, 40, 58, 60);

    var iFoundSomething = arroz.every(function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(true);
  });
  it("should return false if all elements aren't greater or equal than 18", function () {
    var arroz = new Arroz(5, 21, 25, 28, 40, 58, 60);

    var iFoundSomething = arroz.every(function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(false);
  });
  it("should return error if every callback is empty", function () {
    var arroz = new Arroz(5, 21, 25, 28, 40, 58, 60);

    expect(function () {
      var result = arroz.every();
    }).toThrowError(TypeError, "undefined is not a function");
  });
});
