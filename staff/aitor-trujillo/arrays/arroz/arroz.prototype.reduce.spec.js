"use strict";

describe("Arroz.prototype.reduce", function () {
  it("should return myArr to a single element of a sum of all inside", function () {
    var arroz = new Arroz(1, 2, 3, 4);

    var result = arroz.reduce(function (acum, curr) {
      return acum + curr;
    });

    expect(result).toBe(10);
  });
  it("should return myArr to a single element of a sum of all inside", function () {
    var arroz = new Arroz("a", "b", "c", "d");

    var result = arroz.reduce(function (acum, curr) {
      return acum + curr;
    });

    expect(result).toBe("abcd");
  });
  it("should return myArr to a single element of a sum of all inside", function () {
    var arroz = new Arroz(1, 2, 3, 4);

    var result = arroz.reduce(function (acum, curr) {
      return acum + curr;
    });

    expect(result).toBe(10);
  });
  it("should return an error if there is not a function in reduce method", function () {
    var arroz = new Arroz(1, 2, 3, 4);

    expect(function () {
      var result = arroz.reduce();
    }).toThrowError(TypeError, "undefined is not a function");
  });
});
