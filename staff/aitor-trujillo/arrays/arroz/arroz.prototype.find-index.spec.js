"use strict";

describe("Arroz.prototype.findIndex", function () {
  it("should find the first element in the array greater or equal to 18 and returns it's index", function () {
    var peopleAge = new Arroz(3, 4, 7, 10, 20, 18, 40);

    var iFoundSomething = peopleAge.findIndex(function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(4);
  });
  it("should return an error if findIndex does not find a function", function () {
    var peopleAge = new Arroz(3, 4, 7, 10, 20, 18, 40);

    expect(function () {
      peopleAge.findIndex("function");
    }).toThrowError(TypeError, "function is not a function");
  });
});
