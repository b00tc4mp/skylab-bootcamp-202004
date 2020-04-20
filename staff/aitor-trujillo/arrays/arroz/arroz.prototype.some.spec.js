"use strict";

describe("Arroz.prototype.some", function () {
  it("should return true if it finds greater or equal than 18", function () {
    var arroz = new Arroz(3, 4, 7, 10, 20, 18, 40);

    var iFoundSomething = arroz.some(function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(true);
  });
  it("should return false if it doesn't find greater or equal than 18", function () {
    var arroz = new Arroz(3, 4, 7, 10, 12, 16, 17);

    var iFoundSomething = arroz.some(function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(false);
  });
  it("should return an error if there is no function in .some method", function () {
    var arroz = new Arroz(3, 4, 7, 10, 20, 18, 40);

    expect(function () {
      var iFoundSomething = arroz.some();
    }).toThrowError(TypeError, "undefined is not a function");
  });
});
