"use strict";

describe("Arroz.prototype.find", function () {
  it("should find the first element in the array greater or equal to 18", function () {
    var peopleAge = new Arroz(3, 4, 7, 10, 20, 18, 40);

    var iFoundSomething = peopleAge.find(function (age) {
      return age >= 18;
    });

    expect(iFoundSomething).toBe(20);
  });
  it("should find the first element in the array greater or equal to 18", function () {
    var peopleAge = new Arroz(3, 4, 7, 10, 20, 18, 40);

    expect(function () {
      var result = peopleAge.find(1);
    }).toThrowError(TypeError, "1 is not a function");
  });
});
