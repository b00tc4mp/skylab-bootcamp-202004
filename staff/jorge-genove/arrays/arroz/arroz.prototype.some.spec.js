"use strict";

describe("Arroz.prototype.some", function () {
  it("should iterate on each numeric element and  return a new instance with each value multiplied by 10", function () {
    var array = new Arroz(1, 2, 3, 4, 5);

    var result1 = array.some(function (element) {
     return element < 8;
    });
    var result2 = array.some(function (element) {
     return  element < 6;
    });

    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

  it("should iterate an arroz and return false if no one value its equal to the element throw it with the callback", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6);

    var result1 = array.some(function (element) {
    return  element > 8;
    });
    var result2 = array.some(function (element) {
     return element > 9;
    });

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  it("if the array its empty it mus return false", function () {
    var array = new Arroz();

    var result = array.some(function (element) {
     return element < 8;

      expect(result).toBe(false);
    });
  });
  it("if the callback is not a function a type error must be throw", function () {
    var array = new Arroz(1, 2, 3, 4, 5);

    try {
      array.some();
    } catch (error) {
      var result = error;
    }
    expect(result instanceof TypeError).toBeTruthy();
    expect(result.message).toBe("undefined is not a function");
  });
});
